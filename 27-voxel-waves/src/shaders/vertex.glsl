varying vec2 vUv;
varying float vElevation;

uniform float uTime;

attribute vec3 pos;

#include ./includes/perlin_noise.glsl

void main() {
    vUv = uv;

    float elevationX = abs(sin(pos.x * 4.3 + uTime * 1.));
    float elevationZ = abs(sin(pos.z * 3.5 + uTime * 1.));
    float elevation = elevationX + elevationZ;
    elevation *= 3.;
    elevation -= abs(cnoise(vec3(pos.xz * 10., uTime * 0.3)) * 1.5);
    vElevation = elevation;

    float disappear = 1. - step(elevation, 3.);

    float yPos = position.y + elevation;
    vec3 newPosition = vec3(position.x, yPos, position.z) * disappear;

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(newPosition, 1.0);
}