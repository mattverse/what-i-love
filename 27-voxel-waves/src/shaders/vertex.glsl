varying vec2 vUv;
varying float vElevation;

uniform float uTime;

attribute vec3 pos;

void main() {
    vUv = uv;

    float elevationX = abs(sin(pos.x * 5. + uTime * 1.));
    float elevationZ = abs(sin(pos.z * 5. + uTime * 1.));
    float elevation = elevationX + elevationZ;
    vElevation = elevation;

    float yPos = position.y + elevation;
    vec3 newPosition = vec3(position.x, yPos, position.z);

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(newPosition, 1.0);
}