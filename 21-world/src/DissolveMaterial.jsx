// DissolveMaterial.js
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

class DissolveMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uDissolveProgress: { value: 0 },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#70c1ff') }
      },
      vertexShader: /* glsl */ `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        uniform float uTime;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Glitch effect
          float glitchTime = uTime - modelPosition.y;
          float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
          glitchStrength /= 3.0;
          glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
          glitchStrength *= 0.05;
          
          modelPosition.y += (random(modelPosition.zx + uTime) - 0.3);

          
          vUv = uv;
          vPosition = modelPosition.xyz;
          vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
          vNormal = modelNormal.xyz;
          
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform float uDissolveProgress;
        uniform float uTime;
        uniform vec3 uColor;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          // Dissolve effect
          float noise = random(vUv * 3.0 + vec2(uTime * 0.5));
          float threshold = smoothstep(uDissolveProgress - 0.2, uDissolveProgress + 0.2, noise);
          if(threshold < 0.5) discard;
        
          // Holographic effect
          vec3 normal = normalize(vNormal);
          if(!gl_FrontFacing) normal *= -1.0;
          
          // Stripes
          float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
          stripes = pow(stripes, 3.0);
          
          // Fresnel
          vec3 viewDirection = normalize(vPosition - cameraPosition);
          float fresnel = dot(viewDirection, normal) + 1.0;
          fresnel = pow(fresnel, 2.0);
          
          float falloff = smoothstep(0.8, 0.2, fresnel);
          float holographic = (stripes * fresnel) + (fresnel * 1.25);
          holographic *= falloff;
          
          // Combine effects
          vec3 finalColor = uColor * holographic;
          float alpha = holographic * (1.0 - uDissolveProgress);
          
          gl_FragColor = vec4(finalColor, alpha);
          
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }
}


extend({ DissolveMaterialImpl })

export { DissolveMaterialImpl }