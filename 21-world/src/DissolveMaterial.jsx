// DissolveMaterial.js
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

class DissolveMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        // Make sure to pass in the original texture if you want it
        uMap: { value: null },
        uDissolveProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

          vec4 nomdelNormal = modelMatrix * vec4(normal, 0.0);
          vNormal = modelNormal.xyz;
          vPosition = modelPosition.xyz;
        }


      `,
      fragmentShader: /* glsl */ `
        // A very simple pseudo-noise function just as an example
        // You can use a proper noise library or a texture-based noise for more advanced effects
        float random(vec2 co) {
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        uniform sampler2D uMap;
        uniform float uTime;
        uniform float uDissolveProgress;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;


        void main() {
          vec4 texColor = texture2D(uMap, vUv);
          float noise = random(vUv + uTime);
          float threshold = smoothstep(0.0, 1.0, uDissolveProgress);
          
          if(noise > threshold) {
              discard;
          }
          
          gl_FragColor = texColor;
          gl_FragColor.a = 1.0 - (threshold - noise); // Optional alpha fade
      }
      `
    })
  }
}

extend({ DissolveMaterialImpl })

export { DissolveMaterialImpl }
