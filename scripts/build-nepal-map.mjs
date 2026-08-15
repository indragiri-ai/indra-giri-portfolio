/**
 * Generates src/lib/nepal-map.ts (inline SVG paths for Nepal's 77 districts)
 * from data/nepal-districts.geojson.
 *
 * Run with: node scripts/build-nepal-map.mjs
 *
 * WHY PRE-RENDER: projecting at build time means the site ships plain SVG path
 * strings. No map library, no tile server, no runtime network call, which keeps
 * the static export self contained and fast.
 *
 * BOUNDARY: the source is Nepal's UPDATED map (post May 2020), so Darchula
 * includes Kalapani, Lipulekh and Limpiyadhura. Verified by area: Darchula
 * measures ~2,672 sq km here versus ~2,350 in pre-2020 datasets, and the
 * district reaches 30.47N. Do NOT swap in a generic international boundary
 * file, most of them still draw the pre-2020 line.
 *
 * SOURCE: shapefiles from the National GeoPortal of Nepal (Survey Department,
 * Government of Nepal), converted to GeoJSON and simplified with mapshaper
 * (visvalingam 0.5%, keep-shapes, clean) to ~80 KB.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "data", "nepal-districts.geojson");
/* Districts dissolved into one shape, so the map can draw a national edge.
   Regenerate with:
   npx mapshaper data/nepal-districts.geojson -dissolve -o format=geojson \
     precision=0.001 data/nepal-outline.geojson */
const OUTLINE_SRC = join(root, "data", "nepal-outline.geojson");
const OUT = join(root, "src", "lib", "nepal-map.ts");

/** Provinces were renamed after this dataset was cut. Use current names. */
const PROVINCE = {
  1: "Koshi",
  2: "Madhesh",
  3: "Bagmati",
  4: "Gandaki",
  5: "Lumbini",
  6: "Karnali",
  7: "Sudurpashchim",
};

const VIEW_W = 1000; // viewBox width; height derives from the projection
const PAD = 8; // padding inside the viewBox, in viewBox units
const PRECISION = 1; // decimal places in path data

/* Spherical Mercator. Nepal spans 26N-30N so distortion is mild, and Mercator
   is what a reader's eye expects from a web map. */
const merc = ([lon, lat]) => [
  (lon * Math.PI) / 180,
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)),
];

const geo = JSON.parse(readFileSync(SRC, "utf8"));
if (geo.features.length !== 77) {
  throw new Error(`Expected 77 districts, found ${geo.features.length}`);
}

/* Pass 1: project every coordinate and find the extent. */
const projected = geo.features.map((f) => {
  const polys =
    f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  return {
    name: f.properties.DISTRICT,
    province: PROVINCE[f.properties.PROVINCE] ?? String(f.properties.PROVINCE),
    polys: polys.map((poly) => poly.map((ring) => ring.map(merc))),
  };
});

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const d of projected) {
  for (const poly of d.polys) {
    for (const ring of poly) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
}

const scale = (VIEW_W - PAD * 2) / (maxX - minX);
const VIEW_H = Math.round((maxY - minY) * scale + PAD * 2);
/* SVG y grows downward, so flip. */
const toView = ([x, y]) => [
  (x - minX) * scale + PAD,
  (maxY - y) * scale + PAD,
];

const r = (n) => Number(n.toFixed(PRECISION));

/** Area-weighted centroid of the largest ring, for tooltip and label anchors. */
function anchor(polys) {
  let best = null;
  let bestArea = -1; // comparing |area|, so start below any real polygon
  for (const poly of polys) {
    const ring = poly[0].map(toView);
    let a = 0, cx = 0, cy = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const cross = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
      a += cross;
      cx += (ring[j][0] + ring[i][0]) * cross;
      cy += (ring[j][1] + ring[i][1]) * cross;
    }
    a /= 2;
    if (Math.abs(a) > bestArea) {
      bestArea = Math.abs(a);
      best = [cx / (6 * a), cy / (6 * a)];
    }
  }
  return best;
}

/** Turns projected polygons into an SVG path string. */
function toPath(polys) {
  return polys
    .map((poly) =>
      poly
        .map((ring) => {
          const pts = ring.map(toView);
          const body = pts
            .slice(0, -1)
            .map(([x, y], i) => `${i === 0 ? "M" : "L"}${r(x)} ${r(y)}`)
            .join("");
          return `${body}Z`;
        })
        .join("")
    )
    .join("");
}

const outlineGeo = JSON.parse(readFileSync(OUTLINE_SRC, "utf8"));
/* mapshaper -dissolve emits a GeometryCollection, not a FeatureCollection. */
const outlineGeom = outlineGeo.features
  ? outlineGeo.features[0].geometry
  : outlineGeo.geometries[0];
const outlinePolys = (
  outlineGeom.type === "Polygon" ? [outlineGeom.coordinates] : outlineGeom.coordinates
).map((poly) => poly.map((ring) => ring.map(merc)));
const outlinePath = toPath(outlinePolys);

const records = projected
  .map((d) => {
    const path = d.polys
      .map((poly) =>
        poly
          .map((ring) => {
            const pts = ring.map(toView);
            /* Drop the closing duplicate; Z closes the subpath. */
            const body = pts
              .slice(0, -1)
              .map(([x, y], i) => `${i === 0 ? "M" : "L"}${r(x)} ${r(y)}`)
              .join("");
            return `${body}Z`;
          })
          .join("")
      )
      .join("");
    const [cx, cy] = anchor(d.polys);
    return { name: d.name, province: d.province, d: path, cx: r(cx), cy: r(cy) };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const ts = `/**
 * AUTO GENERATED by scripts/build-nepal-map.mjs. Do not edit by hand.
 *
 * Nepal's 77 districts as projected SVG paths (spherical Mercator, fitted to
 * the viewBox below). Boundary reflects Nepal's UPDATED map of May 2020:
 * Darchula includes Kalapani, Lipulekh and Limpiyadhura.
 *
 * Source: National GeoPortal of Nepal (Survey Department, Government of Nepal).
 */

export interface DistrictShape {
  /** Official district name as published by the Survey Department. */
  name: string;
  province: string;
  /** SVG path data in NEPAL_VIEWBOX coordinates. */
  d: string;
  /** Centroid of the district's largest polygon, for labels and tooltips. */
  cx: number;
  cy: number;
}

export const NEPAL_VIEWBOX = { width: ${VIEW_W}, height: ${VIEW_H} } as const;

/** All districts dissolved into one shape: the national edge. */
export const NEPAL_OUTLINE_PATH = ${JSON.stringify(outlinePath)};

export const MAP_ATTRIBUTION =
  "Boundaries: National GeoPortal, Survey Department, Government of Nepal";

export const districtShapes: DistrictShape[] = ${JSON.stringify(records, null, 0)};

export const districtNames: string[] = districtShapes.map((d) => d.name);
`;

writeFileSync(OUT, ts);

const kb = (s) => `${Math.round(Buffer.byteLength(s) / 1024)} KB`;
console.log(`districts   : ${records.length}`);
console.log(`viewBox     : ${VIEW_W} x ${VIEW_H}`);
console.log(`path data   : ${kb(records.map((x) => x.d).join(""))}`);
console.log(`written     : ${OUT} (${kb(ts)})`);
