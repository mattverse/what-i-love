attribute vec3 instancedPosition;

uniform float count;
uniform float time;

varying vec2 vUv;
varying vec3 vInstancePosition;

#include ./includes/4d-noise.glsl

void main() {
    vUv = uv;
    vInstancePosition = instancedPosition;

    float floatingSpeed = 1.;
    float offsetFactor = 0.15;

    float instanceOffset = snoise(vec4(instancedPosition, 0.5));
    float localTime = time + instanceOffset * 2.0;
    float noise = snoise(vec4(instancedPosition, localTime * floatingSpeed));

    vec3 offset = vec3(noise, noise, noise) * offsetFactor;

    vec4 modelPosition = modelMatrix * vec4(position + offset, 1.0);
    gl_Position = projectionMatrix * viewMatrix * instanceMatrix * modelPosition;
}
