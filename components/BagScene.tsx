"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import AutoSize from "./AutoSize";
import useHostSize from "./useHostSize";

/* ============================================================================
   A polybag, built the way a polybag is actually made.

   A box with bulging faces still reads as a box. A real bag is a flat tube:
   sealed flat at the bottom, inflated through the body, flat again at the
   mouth. So the cross-section here is a superellipse whose depth is driven by
   a fill profile down the height — zero at the seals, full through the middle.

   That one idea gives every variant for free:
     · squareness 2   → a soft pillow (plain, printed, coloured)
     · squareness 4+  → a bag that stands square (gusset)
     · a ridge in the profile near the top → a zip track
     · a crease pulled in at the sides    → a side gusset
   ========================================================================== */

export interface BagConfig {
  width: number;       // half flat-width
  height: number;
  depth: number;       // half depth when fully inflated
  squareness: number;  // superellipse exponent: 2 = pillow, 5 = boxy
  gusset: number;      // 0 = none
  zip: boolean;
  zipAt: number;       // height of the zip track, 0–1
  mouthStart: number;  // where the bag tapers back to a flat mouth
  tint: [number, number, number];
  opaque: number;      // 0 = clear film, 1 = fully pigmented
  print: boolean;
  zipTint: [number, number, number];
}

const BASE: BagConfig = {
  width: 1.05, height: 2.55, depth: 0.34, squareness: 2.2,
  gusset: 0, zip: false, zipAt: 0.86, mouthStart: 0.80,
  tint: [0.86, 0.90, 0.95], opaque: 0, print: false,
  zipTint: [0.85, 0.25, 0.22],
};

export const BAG_PRESETS: Record<string, BagConfig> = {
  plain: { ...BASE },

  printed: { ...BASE, print: true, depth: 0.33, opaque: 0.06 },

  "zip-lock": {
    ...BASE,
    width: 1.12, height: 2.25, depth: 0.30,
    squareness: 2.4, zip: true, zipAt: 0.855, mouthStart: 0.90,
  },

  gusset: {
    ...BASE,
    width: 0.96, height: 2.7, depth: 0.50,
    squareness: 4.2, gusset: 0.62, mouthStart: 0.76,
  },

  // deliberately a different proportion — short and wide, so "custom size"
  // reads as a different bag rather than the same one relabelled
  "custom-sizes": {
    ...BASE,
    width: 1.32, height: 2.0, depth: 0.38, squareness: 3.0, mouthStart: 0.82,
  },

  coloured: {
    ...BASE,
    tint: [0.16, 0.34, 0.62], opaque: 0.94, depth: 0.35,
  },
};

/* ————————————————— geometry ————————————————— */

const ss = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function makeBagGeometry(cfg: BagConfig) {
  const SU = 132; // around the tube
  const SV = 116; // bottom to top

  const point = (u: number, v: number, out: THREE.Vector3) => {
    const th = u * Math.PI * 2;
    const ct = Math.cos(th);
    const st = Math.sin(th);

    // how inflated the bag is at this height: flat at the bottom seal,
    // full through the body, tapering back to a flat mouth
    const fill = ss(0.0, 0.13, v) * (1 - ss(cfg.mouthStart, 1.0, v) * 0.93);

    // superellipse cross-section
    const p = 2 / cfg.squareness;
    const sx = Math.sign(ct) * Math.pow(Math.abs(ct), p);
    const sz = Math.sign(st) * Math.pow(Math.abs(st), p);

    // the flat width narrows a little as the bag fills — perimeter is conserved
    let x = cfg.width * (1 - 0.09 * fill) * sx;
    // never exactly zero, or the two walls coincide and the normals go bad
    let z = cfg.depth * (0.022 + 0.978 * fill) * sz;

    // side gusset: a fold pulled inward at the sides, deepest at the base
    if (cfg.gusset > 0) {
      const sideness = Math.pow(Math.abs(ct), 12);
      const fold = cfg.gusset * sideness * (1 - ss(0.5, 1.0, v)) * ss(0.06, 0.3, v);
      x -= Math.sign(ct) * fold * cfg.width * 0.5;
      z *= 1 + 0.5 * sideness * (1 - ss(0.1, 0.85, v));
    }

    // zip track: a raised ridge across the full width
    if (cfg.zip) {
      const band = Math.exp(-Math.pow((v - cfg.zipAt) / 0.018, 2));
      z += Math.sign(st) * band * 0.034;
      x *= 1 - band * 0.012;
    }

    // film wrinkles — diagonal, strongest mid-body, gone at the seals
    const body = Math.sin(Math.min(1, Math.max(0, v)) * Math.PI);
    const wr =
      Math.sin(th * 5 + v * 12.5) * body * 0.011 +
      Math.sin(th * 3 - v * 8.0) * body * 0.009 +
      Math.sin(th * 11 + v * 5.0) * body * 0.004;
    const len = Math.hypot(x, z) || 1;
    x += (x / len) * wr;
    z += (z / len) * wr;

    out.set(x, (v - 0.5) * cfg.height, z);
  };

  const count = (SU + 1) * (SV + 1);
  const pos = new Float32Array(count * 3);
  const uv = new Float32Array(count * 2);
  const tmp = new THREE.Vector3();

  let pi = 0;
  let ui = 0;
  for (let j = 0; j <= SV; j++) {
    const v = j / SV;
    for (let i = 0; i <= SU; i++) {
      point(i / SU, v, tmp);
      pos[pi++] = tmp.x; pos[pi++] = tmp.y; pos[pi++] = tmp.z;
      uv[ui++] = i / SU; uv[ui++] = v;
    }
  }

  const idx: number[] = [];
  for (let j = 0; j < SV; j++) {
    for (let i = 0; i < SU; i++) {
      const a = j * (SU + 1) + i;
      const b = a + 1;
      const c = a + (SU + 1);
      const d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ————————————————— the printed mark ————————————————— */

function makePrintTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d");
  if (!g) return null;

  g.clearRect(0, 0, 512, 512);

  // the M mark — the gusset fold, same as the site logo
  g.lineJoin = "miter";
  g.lineCap = "square";
  g.lineWidth = 42;
  g.strokeStyle = "#022F73";
  g.beginPath();
  g.moveTo(158, 292);
  g.lineTo(158, 176);
  g.lineTo(256, 254);
  g.lineTo(354, 176);
  g.lineTo(354, 292);
  g.stroke();

  // the lit facet
  g.strokeStyle = "#85B53D";
  g.beginPath();
  g.moveTo(256, 254);
  g.lineTo(354, 176);
  g.stroke();

  g.textAlign = "center";
  g.fillStyle = "#022F73";
  g.font = "800 76px Archivo, Helvetica, Arial, sans-serif";
  g.fillText("MGM", 256, 380);

  g.fillStyle = "#5C871F";
  g.font = "600 26px 'IBM Plex Mono', ui-monospace, monospace";
  g.fillText("P A C K A G I N G", 256, 420);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ————————————————— material ————————————————— */

const vert = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const frag = /* glsl */ `
  precision highp float;

  uniform vec3  uTint;
  uniform float uOpaque;
  uniform float uBack;      // 1.0 when drawing the far wall
  uniform float uHasPrint;
  uniform sampler2D uPrint;
  uniform float uZip;
  uniform float uZipAt;
  uniform vec3  uZipTint;
  uniform float uGusset;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;

  // a cheap studio environment: bright above, soft grey below
  vec3 env(vec3 dir) {
    float t = dir.y * 0.5 + 0.5;
    vec3 sky     = vec3(1.00, 1.00, 1.00);
    vec3 horizon = vec3(0.84, 0.89, 0.95);
    vec3 ground  = vec3(0.55, 0.59, 0.66);
    return t > 0.5 ? mix(horizon, sky, (t - 0.5) * 2.0)
                   : mix(ground, horizon, t * 2.0);
  }

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(vViewDir);
    if (uBack > 0.5) N = -N;

    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);

    vec3 key = normalize(vec3(0.45, 0.80, 0.90));
    vec3 fillL = normalize(vec3(-0.75, 0.20, 0.45));
    float diff = clamp(dot(N, key), 0.0, 1.0) * 0.72
               + clamp(dot(N, fillL), 0.0, 1.0) * 0.24
               + 0.24;

    vec3 h = normalize(key + V);
    float spec = pow(clamp(dot(N, h), 0.0, 1.0), 78.0);

    // reflected studio — this is what makes it read as film and not paper
    vec3 e = env(reflect(-V, N));

    vec3 film = mix(vec3(0.74, 0.80, 0.89), vec3(1.0), diff * 0.42);
    film = mix(film, e, 0.50);

    vec3 base = mix(film, uTint * (0.55 + diff * 0.6), uOpaque);
    float inkA = 0.0;

    // print sits on the front wall only, in the middle of the face
    if (uHasPrint > 0.5 && uBack < 0.5 && vUv.x > 0.135 && vUv.x < 0.365) {
      // u runs right-to-left across the front wall (x = cos), so flip it, and
      // the canvas texture is already flipY, so height maps straight through
      vec2 pUv = vec2(1.0 - (vUv.x - 0.135) / 0.23, (vUv.y - 0.30) / 0.41);
      if (pUv.y > 0.0 && pUv.y < 1.0) {
        vec4 ink = texture2D(uPrint, pUv);
        inkA = ink.a;
        base = mix(base, ink.rgb * (0.55 + diff * 0.55), ink.a * 0.94);
      }
    }

    // zip track — two ridges and a coloured thread, as on a real bag
    if (uZip > 0.5) {
      float rail = exp(-pow(abs(vUv.y - uZipAt) / 0.010, 2.0));
      float thread = exp(-pow((vUv.y - (uZipAt + 0.030)) / 0.006, 2.0));
      base = mix(base, vec3(1.0), rail * 0.30);
      base = mix(base, uZipTint, thread * 0.75);
    }

    // gusset crease — a soft dark line down each side fold
    if (uGusset > 0.5) {
      float side = min(abs(vUv.x - 0.0), min(abs(vUv.x - 0.5), abs(vUv.x - 1.0)));
      float crease = exp(-pow(side / 0.012, 2.0)) * (1.0 - smoothstep(0.55, 0.95, vUv.y));
      base *= 1.0 - crease * 0.30;
    }

    // seals top and bottom read denser — two layers of film welded together
    float seal = (1.0 - smoothstep(0.0, 0.075, vUv.y))
               + smoothstep(0.955, 1.0, vUv.y);
    base = mix(base, base * 0.86 + 0.10, clamp(seal, 0.0, 1.0) * 0.55);

    // the silhouette of clear film on a light stage reads cool grey, not
    // white — a white edge on a white ground disappears
    vec3 edgeTint = vec3(0.58, 0.66, 0.78);
    base = mix(base, edgeTint, fres * 0.50 * (1.0 - uOpaque));

    base += vec3(1.0) * spec * (uBack > 0.5 ? 0.25 : 0.95);

    // Clear polyethylene is almost invisible where it faces you flat. What you
    // actually see is the grazing edge, the specular on the wrinkle crests and
    // the far wall through the near one. Driving alpha from fresnel and
    // specular rather than a flat value is what stops it reading as a pillow.
    float clearA = 0.11 + fres * 0.62 + spec * 0.95;
    float solid  = max(uOpaque, inkA * 0.94);
    float alpha  = mix(clearA, 0.97, solid);
    if (uBack > 0.5) alpha *= 0.62;

    gl_FragColor = vec4(base, clamp(alpha, 0.0, 1.0));
  }
`;

/** shallow-clone uniforms so the two passes don't share value refs */
function cloneUniforms(u: Record<string, { value: unknown }>, back: number) {
  const out: Record<string, { value: unknown }> = { uBack: { value: back } };
  for (const k of Object.keys(u)) out[k] = { value: u[k].value };
  return out;
}

function Bag({ cfg, spin }: { cfg: BagConfig; spin: number }) {
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(() => makeBagGeometry(cfg), [cfg]);
  const print = useMemo(() => (cfg.print ? makePrintTexture() : null), [cfg.print]);

  useEffect(
    () => () => {
      geo.dispose();
      print?.dispose();
    },
    [geo, print]
  );

  const shared = useMemo(
    () => ({
      uTint: { value: new THREE.Color(cfg.tint[0], cfg.tint[1], cfg.tint[2]) },
      uOpaque: { value: cfg.opaque },
      uHasPrint: { value: cfg.print ? 1 : 0 },
      uPrint: { value: print },
      uZip: { value: cfg.zip ? 1 : 0 },
      uZipAt: { value: cfg.zipAt },
      uZipTint: { value: new THREE.Color(cfg.zipTint[0], cfg.zipTint[1], cfg.zipTint[2]) },
      uGusset: { value: cfg.gusset > 0 ? 1 : 0 },
    }),
    [cfg, print]
  );

  const backU = useMemo(() => cloneUniforms(shared, 1), [shared]);
  const frontU = useMemo(() => cloneUniforms(shared, 0), [shared]);

  useFrame((state) => {
    if (!group.current) return;
    const target = spin + Math.sin(state.clock.elapsedTime * 0.24) * 0.30;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.06;
    group.current.rotation.x = -0.04 + Math.sin(state.clock.elapsedTime * 0.19) * 0.035;
  });

  return (
    <group ref={group} rotation={[-0.04, 0.42, 0]}>
      {/* far wall first, then the near wall over it — that layering is what
          makes clear film look like something you can see into */}
      <mesh geometry={geo} renderOrder={1}>
        <shaderMaterial
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={backU}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geo} renderOrder={2}>
        <shaderMaterial
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={frontU}
          side={THREE.FrontSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** a soft contact shadow, so the bag sits on something */
function Shadow({ cfg }: { cfg: BagConfig }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const g = c.getContext("2d");
    if (!g) return null;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(20,38,68,0.42)");
    grad.addColorStop(0.55, "rgba(20,38,68,0.15)");
    grad.addColorStop(1, "rgba(20,38,68,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);

  useEffect(() => () => tex?.dispose(), [tex]);
  if (!tex) return null;

  return (
    <mesh
      position={[0, -cfg.height / 2 - 0.03, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={0}
    >
      <planeGeometry args={[cfg.width * 3.6, cfg.depth * 9]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} />
    </mesh>
  );
}

export default function BagScene({ preset = "plain" }: { preset?: string }) {
  const cfg = BAG_PRESETS[preset] ?? BAG_PRESETS.plain;
  const [spin, setSpin] = useState(0.42);
  const drag = useRef<{ x: number; base: number } | null>(null);
  const host = useRef<HTMLDivElement>(null);
  const { w, h } = useHostSize(host);

  return (
    <div
      ref={host}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, base: spin };
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        setSpin(drag.current.base + (e.clientX - drag.current.x) * 0.009);
      }}
      onPointerUp={() => { drag.current = null; }}
      onPointerLeave={() => { drag.current = null; }}
    >
      {w > 0 && h > 0 && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.05, 5.3], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: w, height: h }}
        >
          <AutoSize />
          <Shadow cfg={cfg} />
          <Bag cfg={cfg} spin={spin} />
        </Canvas>
      )}
    </div>
  );
}
