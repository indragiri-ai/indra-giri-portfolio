/**
 * Districts where Indra has done fieldwork, joined to the map in
 * components/ui/NepalMap.tsx.
 *
 * SOURCE: public/My_field_visit/Districts.xlsx (owner supplied). District names
 * in that sheet are Excel "Geography" linked data types, so the cells read
 * #VALUE! as plain text and the real names live in xl/richData. Extracted via
 * the cell vm attribute -> valueMetadata -> futureMetadata -> rvb chain.
 * If the sheet is updated, re-extract rather than retyping by hand.
 *
 * PROJECT NAMES: the sheet uses shorthand ("dairy market and vegetable
 * market", "Urbanisation project- WVI"). These are mapped to the official
 * project names already used in data.ts so the map and the Research section
 * agree. Rows naming two projects become two entries.
 *
 * One row per district per project.
 */

import { districtNames } from "./nepal-map";

export interface FieldEntry {
  /** Any common spelling; run it through `resolveDistrict` before matching. */
  district: string;
  project: string;
  /** Omitted where the sheet did not identify a commissioning organisation. */
  org?: string;
  /** "2024" or "2024 - 2025". Shown verbatim. Empty if the sheet had no year. */
  year: string;
}

/**
 * Common spelling variants mapped to the Survey Department's official names.
 * Left side is lowercased input, right side must exist in `districtNames`.
 * Extend this as the spreadsheet throws up new spellings.
 */
const ALIASES: Record<string, string> = {
  tanahun: "Tanahu",
  tanahoun: "Tanahu",
  chitwan: "Chitawan",
  kavre: "Kabhrepalanchok",
  kavrepalanchok: "Kabhrepalanchok",
  kavrepalanchowk: "Kabhrepalanchok",
  kabhrepalanchowk: "Kabhrepalanchok",
  makwanpur: "Makawanpur",
  dhanusa: "Dhanusha",
  sindhupalchowk: "Sindhupalchok",
  tehrathum: "Terhathum",
  kapilvastu: "Kapilbastu",
  "nawalparasi east": "Nawalpur",
  "nawalparasi west": "Parasi",
  nawalparasi: "Nawalpur",
  "rukum (east)": "Rukum East",
  "rukum (west)": "Rukum West",
  dolpo: "Dolpa",
  solu: "Solukhumbu",
  udaypur: "Udayapur",
  sunsari: "Sunsari",
  /* Excel's Geography type resolved some cells to a town or a rural
     municipality rather than the district. Owner confirmed these mappings. */
  dhangadhi: "Kailali",
  makwanpurgadhi: "Makawanpur",
  "lalitpur district, nepal": "Lalitpur",
};

const CANONICAL = new Map(districtNames.map((n) => [n.toLowerCase(), n]));

/** Returns the official district name, or null if it cannot be matched. */
export function resolveDistrict(input: string): string | null {
  const key = input.trim().toLowerCase().replace(/\s+/g, " ");
  return CANONICAL.get(key) ?? ALIASES[key] ?? null;
}

export const fieldwork: FieldEntry[] = [
  { district: "Kaski", project: "Dairy Market Study", org: "Heifer International", year: "2025" },
  { district: "Kaski", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2025" },
  { district: "Tanahun", project: "Dairy Market Study", org: "Heifer International", year: "2025" },
  { district: "Tanahun", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2025" },
  { district: "Parbat", project: "Dairy Market Study", org: "Heifer International", year: "2024" },
  { district: "Parbat", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2024" },
  { district: "Mustang", project: "Student field visit", org: "National College", year: "2024" },
  { district: "Gorkha", project: "Student field visit", org: "School programme", year: "2022" },
  { district: "Syangja", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2025" },
  { district: "Rupandehi", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2025" },
  { district: "Chitwan", project: "Dairy Market Study", org: "Heifer International", year: "2025" },
  { district: "Chitwan", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2025" },
  // Sheet said "Nawalparasi"; owner confirmed this is Nawalpur (the eastern
  // half of the district that split in 2015), not Parasi.
  { district: "Nawalpur", project: "Dairy Market Study", org: "Heifer International", year: "2025" },
  { district: "Nawalpur", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2025" },
  { district: "Kathmandu", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2025 - 2026" },
  { district: "Kathmandu", project: "AI Awareness Among Professionals in Nepal", org: "Sankhya AI", year: "2025 - 2026" },
  { district: "Kathmandu", project: "Dairy Market Study", org: "Heifer International", year: "2025 - 2026" },
  { district: "Kathmandu", project: "Internal Child Sex Trafficking Study", org: "Anahata Nepal", year: "2025 - 2026" },
  { district: "Lalitpur", project: "Endline Evaluation: Brick Plus Project", org: "World Vision International", year: "2025 - 2026" },
  { district: "Lalitpur", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2025 - 2026" },
  { district: "Lalitpur", project: "AI Awareness Among Professionals in Nepal", org: "Sankhya AI", year: "2025 - 2026" },
  { district: "Lalitpur", project: "Dairy Market Study", org: "Heifer International", year: "2025 - 2026" },
  { district: "Lalitpur", project: "Internal Child Sex Trafficking Study", org: "Anahata Nepal", year: "2025 - 2026" },
  { district: "Bhaktapur", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2025 - 2026" },
  { district: "Bhaktapur", project: "AI Awareness Among Professionals in Nepal", org: "Sankhya AI", year: "2025 - 2026" },
  { district: "Bhaktapur", project: "Dairy Market Study", org: "Heifer International", year: "2025 - 2026" },
  { district: "Bhaktapur", project: "Internal Child Sex Trafficking Study", org: "Anahata Nepal", year: "2025 - 2026" },
  { district: "Kavrepalanchowk", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2026" },
  { district: "Kavrepalanchowk", project: "Dairy Market Study", org: "Heifer International", year: "2026" },
  { district: "Sindhupalchowk", project: "Dairy Market Study", org: "Heifer International", year: "2026" },
  { district: "Sindhupalchowk", project: "Impact Evaluation: Vegetable Collection Centres", org: "iDE Nepal", year: "2026" },
  { district: "Makwanpurgadhi", project: "Student field visit", org: "National College", year: "2026" },
  { district: "Parsa", project: "Student field visit", org: "National College", year: "2026" },
  { district: "Surkhet", project: "N-WASH Municipality Plan", org: "Chingad Rural Municipality", year: "2024 - 2025" },
  { district: "Surkhet", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2024 - 2025" },
  { district: "Dailekh", project: "N-WASH Municipality Plan", year: "2024" },
  { district: "Jajarkot", project: "Child-focused Qualitative Research", org: "World Vision International", year: "2024" },
  { district: "Kalikot", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2024" },
  { district: "Jumla", project: "Child-focused Qualitative Research", org: "World Vision International", year: "2024" },
  { district: "Kailali", project: "Child-focused Qualitative Research", org: "World Vision International", year: "2024" },
  { district: "Kanchanpur", project: "Child-focused Qualitative Research", org: "World Vision International", year: "2024" },
  { district: "Dhangadhi", project: "Child-focused Qualitative Research", org: "World Vision International", year: "2024" },
  { district: "Jhapa", project: "Value Chain Analysis of Large Cardamom", org: "Neeti Anusandhan Pratishthan", year: "2026" },
  { district: "Ilam", project: "Value Chain Analysis of Large Cardamom", org: "Neeti Anusandhan Pratishthan", year: "2026" },
  { district: "Panchthar", project: "Value Chain Analysis of Large Cardamom", org: "Neeti Anusandhan Pratishthan", year: "2026" },
  { district: "Taplejung", project: "Value Chain Analysis of Large Cardamom", org: "Neeti Anusandhan Pratishthan", year: "2026" },
  { district: "Banke", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2026" },
  { district: "Bardiya", project: "Landscape Analysis of Urbanisation", org: "World Vision International", year: "2024" },
  { district: "Myagdi", project: "Student field visit", org: "National College", year: "2025" },
  { district: "Baglung", project: "Student field visit", org: "National College", year: "" },
];

export interface DistrictWork {
  district: string;
  entries: FieldEntry[];
}

/** Groups fieldwork by official district name. Unmatched names are reported. */
export function groupFieldwork(entries: FieldEntry[] = fieldwork): {
  byDistrict: Map<string, FieldEntry[]>;
  unmatched: string[];
} {
  const byDistrict = new Map<string, FieldEntry[]>();
  const unmatched: string[] = [];

  for (const entry of entries) {
    const name = resolveDistrict(entry.district);
    if (!name) {
      if (!unmatched.includes(entry.district)) unmatched.push(entry.district);
      continue;
    }
    const list = byDistrict.get(name);
    if (!list) {
      byDistrict.set(name, [entry]);
      continue;
    }
    /* Two source rows can resolve to one district (a town and its district),
       which would otherwise show the same project twice in the tooltip. */
    const duplicate = list.some(
      (e) => e.project === entry.project && e.year === entry.year
    );
    if (!duplicate) list.push(entry);
  }

  return { byDistrict, unmatched };
}
