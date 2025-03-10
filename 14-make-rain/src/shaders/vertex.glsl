attribute float aSize;
attribute float aTimeMultiplier;

uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Falling
    float fallingProgress = remap(progress, 0., 18., 0., 7. );
    fallingProgress = clamp(fallingProgress, 0., 1.5);
    newPosition.y -= fallingProgress * 3.7;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * uResolution.y * aSize ;
    gl_PointSize *= 1. / -viewPosition.z;

    if(gl_PointSize < 1.) {
        gl_Position = vec4(9999.9);
    }
}