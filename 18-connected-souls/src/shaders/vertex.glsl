uniform vec2 uResolution;

#include ./includes/simplexNoise3d.glsl

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uResolution.y * 0.05;
    gl_PointSize *= (1.0 / -viewPosition.z);
}