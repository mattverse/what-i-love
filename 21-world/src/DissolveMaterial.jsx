// DissolveMaterial.js
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// DissolveMaterial.js
// DissolveMaterial.js
class DissolveMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uDissolveProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uDissolveProgress;
        uniform float uTime;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          // Animated noise pattern
          float noise = random(vUv * 3.0 + vec2(uTime * 0.5));
          
          // Dissolve threshold with smooth edges
          float threshold = smoothstep(
            uDissolveProgress - 0.2,
            uDissolveProgress + 0.2, 
            noise
          );
          
          if(threshold < 0.5) discard;
          
          // Base color with edge glow
          vec3 color = vec3(0.2, 0.5, 1.0);
          float edge = smoothstep(0.3, 0.5, threshold);
          color = mix(color, vec3(1.0), edge);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true
    })
  }
}
extend({ DissolveMaterialImpl })

export { DissolveMaterialImpl }
