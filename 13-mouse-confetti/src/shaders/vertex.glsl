attribute float aSize;
attribute float aTimeMultiplier;

uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uTime;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Falling
    float fallingProgress = remap(progress, 0., 1., 0., 1.); // Increase the range for more significant movement
    fallingProgress = clamp(fallingProgress, 0., 1.);
    // Apply a different non-linear transformation to slow down the fall
    // Here, we use an exponential decay formula for a slower fall effect
    fallingProgress = 1. - exp(-1. * fallingProgress);
    newPosition.y -= fallingProgress * 0.8; // Increase the multiplier for a more significant Y-axis movement

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * uResolution.y * aSize;
    gl_PointSize *= 1. / -viewPosition.z;

    if(gl_PointSize < 1.) {
        gl_Position = vec4(9999.9);
    }
}