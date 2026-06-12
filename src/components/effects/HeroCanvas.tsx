"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Reads the live accent token so the field matches the active theme. */
function useAccentColor(): string {
  return useMemo(() => {
    if (typeof window === "undefined") return "#ff5c38";
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    if (!raw) return "#ff5c38";
    const [r, g, b] = raw.split(" ").map(Number);
    return `rgb(${r}, ${g}, ${b})`;
  }, []);
}

function DataField({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const accent = useAccentColor();
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = ref.current;
    if (!p) return;
    p.rotation.y = Math.sin(t * 0.05) * 0.18 + state.pointer.x * 0.12;
    p.rotation.x = Math.cos(t * 0.06) * 0.1 + state.pointer.y * 0.08;
    p.position.y = Math.sin(t * 0.1) * 0.15;
  });

  // scale slightly with viewport so mobile doesn't feel empty
  const scale = Math.min(1, viewport.width / 10) * 0.9 + 0.4;

  return (
    <points ref={ref} scale={scale}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={accent}
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GhostField({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y = -state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8d93a8"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <DataField />
      <GhostField />
    </Canvas>
  );
}
