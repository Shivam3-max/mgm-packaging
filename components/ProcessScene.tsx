"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import useHostSize from "./useHostSize";
import * as THREE from "three";
import AutoSize from "./AutoSize";
import useInView from "./useInView";

/* ============================================================================
   Granule to gusset, as one continuous body of material.
   The same particles are the granules, then the melt, then the blown bubble,
   then the flat web, then the finished bag — because that is literally true.
   Nothing is added and nothing is thrown away; it only changes shape.
   ========================================================================== */

const COUNT = 4200;

function rand(seed: number) {
  // deterministic, so the shape is identical on every render
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildShapes() {
  const r = rand(7919);
  const shapes: Float32Array[] = [];

  // 01 — granules: a loose heap
  const granules = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const a = r() * Math.PI * 2;
    const rad = Math.pow(r(), 0.5) * 1.35;
    granules[i * 3] = Math.cos(a) * rad;
    granules[i * 3 + 1] = -1.15 + Math.pow(r(), 1.6) * 0.85;
    granules[i * 3 + 2] = Math.sin(a) * rad * 0.55;
  }
  shapes.push(granules);

  // 02 — extruder: a dense vertical column feeding a die
  const column = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT;
    const a = r() * Math.PI * 2;
    const rad = 0.20 + r() * 0.13;
    column[i * 3] = Math.cos(a) * rad;
    column[i * 3 + 1] = -1.5 + t * 2.6;
    column[i * 3 + 2] = Math.sin(a) * rad;
  }
  shapes.push(column);

  // 03 — the blown bubble: the film balloon coming off the die
  const bubble = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const a = r() * Math.PI * 2;
    const t = r();
    const y = -1.6 + t * 3.2;
    // classic bubble profile: narrow at the die, expands, then stabilises
    const profile = 0.18 + 1.05 * Math.sin(Math.min(1, t * 1.35) * Math.PI * 0.62);
    bubble[i * 3] = Math.cos(a) * profile;
    bubble[i * 3 + 1] = y;
    bubble[i * 3 + 2] = Math.sin(a) * profile;
  }
  shapes.push(bubble);

  // 04 — the web: collapsed flat, travelling to the sealer
  const web = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const u = r() * 2 - 1;
    const v = r() * 2 - 1;
    web[i * 3] = u * 2.3;
    web[i * 3 + 1] = v * 1.5;
    web[i * 3 + 2] = Math.sin(u * 3.1) * 0.10 + (r() - 0.5) * 0.03;
  }
  shapes.push(web);

  // 05 — the bag: a filled pillow
  const bag = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const face = r();
    const u = r() * 2 - 1;
    const v = r() * 2 - 1;
    const bulge = (1 - Math.abs(u) * 0.85) * (1 - Math.abs(v) * 0.7);
    if (face < 0.44) {
      bag[i * 3] = u * 1.15;
      bag[i * 3 + 1] = v * 1.55;
      bag[i * 3 + 2] = 0.34 * bulge;
    } else if (face < 0.88) {
      bag[i * 3] = u * 1.15;
      bag[i * 3 + 1] = v * 1.55;
      bag[i * 3 + 2] = -0.34 * bulge;
    } else {
      // the seams
      const edge = r();
      bag[i * 3] = edge < 0.5 ? -1.15 : 1.15;
      bag[i * 3 + 1] = v * 1.55;
      bag[i * 3 + 2] = (r() * 2 - 1) * 0.34 * bulge;
    }
  }
  shapes.push(bag);

  return shapes;
}

function Cloud({ progressRef }: { progressRef: React.RefObject<number> }) {
  const shapes = useMemo(() => buildShapes(), []);
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(shapes[0]);
    const col = new Float32Array(COUNT * 3);
    const navy = new THREE.Color("#5E9BEF");
    const lime = new THREE.Color("#9ACB4F");
    const white = new THREE.Color("#DCE9FB");
    for (let i = 0; i < COUNT; i++) {
      const c = i % 11 === 0 ? lime : i % 3 === 0 ? white : navy;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [shapes]);

  const current = useRef(new Float32Array(shapes[0]));

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 0.9999);
    const seg = p * (shapes.length - 1);
    const i0 = Math.floor(seg);
    const i1 = Math.min(shapes.length - 1, i0 + 1);
    // ease within each segment so beats settle rather than slide
    const raw = seg - i0;
    const f = raw * raw * (3 - 2 * raw);

    const a = shapes[i0];
    const b = shapes[i1];
    const cur = current.current;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    const t = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.0016, delta); // frame-rate independent easing

    for (let i = 0; i < COUNT; i++) {
      const j = i * 3;
      const tx = a[j] + (b[j] - a[j]) * f;
      const ty = a[j + 1] + (b[j + 1] - a[j + 1]) * f;
      const tz = a[j + 2] + (b[j + 2] - a[j + 2]) * f;

      cur[j] += (tx - cur[j]) * k;
      cur[j + 1] += (ty - cur[j + 1]) * k;
      cur[j + 2] += (tz - cur[j + 2]) * k;

      // a little life so it never looks frozen
      const w = Math.sin(t * 0.8 + i * 0.05) * 0.012;
      arr[j] = cur[j] + w;
      arr[j + 1] = cur[j + 1];
      arr[j + 2] = cur[j + 2] + w;
    }
    attr.needsUpdate = true;

    if (points.current) {
      points.current.rotation.y = t * 0.11 + p * 0.9;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ProcessScene({
  progressRef,
}: { progressRef: React.RefObject<number> }) {
  const host = useRef<HTMLDivElement>(null);
  const { w, h } = useHostSize(host);
  const inView = useInView(host);

  return (
    <div ref={host} style={{ position: "absolute", inset: 0 }}>
      {w > 0 && h > 0 && (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, width: w, height: h }}
      frameloop={inView ? "always" : "never"}
    >
      <AutoSize />
      <Cloud progressRef={progressRef} />
    </Canvas>
      )}
    </div>
  );
}
