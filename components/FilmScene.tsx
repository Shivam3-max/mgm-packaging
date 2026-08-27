"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import useHostSize from "./useHostSize";
import * as THREE from "three";
import AutoSize from "./AutoSize";

/* ============================================================================
   The hero is a sheet of polyethylene film.
   Not a decorative abstract shape — the product itself, rippling under a
   moving light. Custom shader rather than a transmission material: it is a
   fraction of the cost and gives exact control over the film look.
   ========================================================================== */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform vec2  uPointer;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying float vWave;

  // the surface: a sum of travelling sines, slightly steeper toward the edges
  float surface(vec2 p, float t) {
    float w = 0.0;
    w += sin(p.x * 1.9 + t * 0.85) * 0.55;
    w += sin(p.x * 3.7 - t * 1.15 + p.y * 1.1) * 0.26;
    w += sin(p.y * 2.4 + t * 0.62) * 0.30;
    w += sin((p.x + p.y) * 3.1 - t * 0.94) * 0.14;
    // let the sheet hang slightly at the vertical edges
    w *= 1.0 + 0.34 * abs(p.x) * 0.5;
    return w;
  }

  void main() {
    vUv = uv;

    vec3 pos = position;
    float t = uTime;

    // pointer nudges the wave phase, so the sheet answers the mouse
    vec2 p = pos.xy + uPointer * 0.55;

    float w = surface(p, t);
    pos.z += w * uAmp;
    vWave = w;

    // analytic-ish normal from finite differences of the same function
    float e = 0.08;
    float wx = surface(p + vec2(e, 0.0), t);
    float wy = surface(p + vec2(0.0, e), t);
    vec3 tangentX = normalize(vec3(e, 0.0, (wx - w) * uAmp));
    vec3 tangentY = normalize(vec3(0.0, e, (wy - w) * uAmp));
    vec3 n = normalize(cross(tangentX, tangentY));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * n);
    vViewDir = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3  uNavy;
  uniform vec3  uNavyDeep;
  uniform vec3  uLime;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(vViewDir);

    // fresnel — film goes bright and milky at grazing angles, like real PE
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.4);

    // a light that travels across the sheet
    vec3 lightDir = normalize(vec3(sin(uTime * 0.22) * 0.85, 0.55, 0.85));
    float diff = clamp(dot(n, lightDir) * 0.5 + 0.5, 0.0, 1.0);

    vec3 h = normalize(lightDir + v);
    float spec = pow(clamp(dot(n, h), 0.0, 1.0), 46.0);

    // base: deep navy, lifting toward the top of the sheet
    vec3 base = mix(uNavyDeep, uNavy, vUv.y * 0.85 + 0.15);
    base = mix(base, uNavy * 1.22, diff * 0.42);

    // milky film bloom at the edges
    vec3 film = mix(base, vec3(0.86, 0.92, 1.0), fres * 0.62);

    // specular sheen — the thing that makes it read as plastic and not fabric
    film += vec3(0.92, 0.96, 1.0) * spec * 0.85;

    // a whisper of the brand lime where the sheet folds away from the light
    float fold = smoothstep(0.25, -0.55, vWave);
    film = mix(film, uLime, fold * 0.085);

    // faint horizontal extrusion lines — film comes off a die, not a printer
    float lines = sin(vUv.y * 210.0) * 0.5 + 0.5;
    film += lines * 0.014;

    // vignette so the headline stays readable over the left of the sheet
    float vig = smoothstep(0.02, 0.62, vUv.x);
    float alpha = 0.30 + 0.70 * vig;

    gl_FragColor = vec4(film, alpha);
  }
`;

function Sheet({ reduced }: { reduced: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.42 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uNavy: { value: new THREE.Color("#0A3E8C") },
      uNavyDeep: { value: new THREE.Color("#01173C") },
      uLime: { value: new THREE.Color("#85B53D") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!mat.current) return;

    // reduced motion: hold a still, fully-formed sheet
    if (!reduced) {
      mat.current.uniforms.uTime.value += delta * 0.85;
    }

    // ease the pointer so the sheet drifts rather than snaps
    pointer.current.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      reduced ? 1 : 0.035
    );
    mat.current.uniforms.uPointer.value.copy(pointer.current);

    if (mesh.current && !reduced) {
      mesh.current.rotation.y = -0.22 + pointer.current.x * 0.055;
      mesh.current.rotation.x = 0.04 + pointer.current.y * 0.035;
    }
  });

  // cover the viewport generously so no edge is visible
  const w = Math.max(viewport.width * 1.5, 9);
  const h = Math.max(viewport.height * 1.5, 9);

  return (
    <mesh ref={mesh} rotation={[0.04, -0.22, 0]}>
      <planeGeometry args={[w, h, 130, 130]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function FilmScene({ reduced = false }: { reduced?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const { w, h } = useHostSize(host);

  return (
    <div ref={host} style={{ position: "absolute", inset: 0 }}>
      {w > 0 && h > 0 && (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, width: w, height: h }}
      frameloop={reduced ? "demand" : "always"}
    >
      <AutoSize />
      <Sheet reduced={reduced} />
    </Canvas>
      )}
    </div>
  );
}
