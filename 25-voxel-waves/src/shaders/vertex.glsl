varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;

float waveElevation(vec3 position) {
    float elevation = sin(position.x * 4. + uTime) *
        sin(position.z * 1.5 + uTime);

    return elevation;
}

void main() {
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float shift = 0.01;
    float elevation = waveElevation(modelPosition.xyz);

    modelPosition.y += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}