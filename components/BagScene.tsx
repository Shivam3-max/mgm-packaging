"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import useHostSize from "./useHostSize";
import * as THREE from "three";
import AutoSize from "./AutoSize";

/* ============================================================================
   An inflated polybag.
   A box is the wrong shape — a filled bag is a pillow: the faces bulge, the
   seams stay pinched. So the vertex shader pushes each vertex outward along
   its normal by an amount that falls off toward the seams, which is exactly
   how a real bag behaves under fill.
   ========================================================================== */

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uFullness;
  uniform float uGusset;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying float vBulge;

  void main() {
    vec3 pos = position;

    // distance from the seams, per axis, 0 at the edge → 1 at the face centre
    vec3 halfExtent = vec3(1.0, 1.35, 0.34);
    vec3 t = abs(pos) / halfExtent;
    float edge = max(max(t.x, t.y), t.z);
    float faceness = 1.0 - smoothstep(0.35, 1.0, edge);

    // pillow bulge
    float bulge = faceness * uFullness;

    // a gusset pinches the sides inward at the base
    float gussetPinch = uGusset * smoothstep(0.1, -1.0, pos.y) * (1.0 - abs(pos.x));
    bulge -= gussetPinch * 0.5;

    // gentle breathing so it reads as film, not moulded plastic
    bulge += sin(uTime * 0.9 + pos.y * 2.0) * 0.012 * faceness;

    pos += normalize(normal) * bulge;

    // soft creases across the face
    pos.z += sin(pos.y * 9.0 + pos.x * 3.0) * 0.012 * faceness * sign(position.z);

    vBulge = bulge;
    vUv = uv;

    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform vec3 uTint;
  uniform float uOpaque;
  uniform float uTime;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying float vBulge;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(vViewDir);
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);

    vec3 lightDir = normalize(vec3(0.55, 0.85, 0.95));
    float diff = clamp(dot(n, lightDir) * 0.5 + 0.5, 0.0, 1.0);
    vec3 h = normalize(lightDir + v);
    float spec = pow(clamp(dot(n, h), 0.0, 1.0), 62.0);

    // clear film reads as a very pale blue-white; tint pushes it to a colour
    vec3 clearFilm = mix(vec3(0.80, 0.86, 0.93), vec3(0.97, 0.99, 1.0), diff);
    vec3 base = mix(clearFilm, uTint, uOpaque);

    base += vec3(1.0) * spec * 0.55;
    base = mix(base, vec3(1.0), fres * 0.30);

    // faint stretch marks where the film is under most tension
    base += smoothstep(0.06, 0.16, vBulge) * 0.05;

    float alpha = mix(0.60, 0.97, uOpaque) + fres * 0.28;
    gl_FragColor = vec4(base, clamp(alpha, 0.0, 1.0));
  }
`;

function Bag({
  tint,
  opaque,
  gusset,
  spin,
}: { tint: string; opaque: number; gusset: number; spin: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFullness: { value: 0.30 },
      uGusset: { value: gusset },
      uTint: { value: new THREE.Color(tint) },
      uOpaque: { value: opaque },
    }),
    [tint, opaque, gusset]
  );

  useFrame((state, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta;
    if (mesh.current) {
      const target = spin + Math.sin(state.clock.elapsedTime * 0.28) * 0.28;
      mesh.current.rotation.y += (target - mesh.current.rotation.y) * 0.06;
      mesh.current.rotation.x = -0.06 + Math.sin(state.clock.elapsedTime * 0.22) * 0.04;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-0.06, 0.5, 0]}>
      <boxGeometry args={[2, 2.7, 0.68, 60, 70, 24]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function BagScene({
  tint = "#DCE6F2",
  opaque = 0,
  gusset = 0,
}: { tint?: string; opaque?: number; gusset?: number }) {
  const [spin, setSpin] = useState(0.5);
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
          camera={{ position: [0, 0, 5.6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: w, height: h }}
        >
          <AutoSize />
          <Bag tint={tint} opaque={opaque} gusset={gusset} spin={spin} />
        </Canvas>
      )}
    </div>
  );
}
