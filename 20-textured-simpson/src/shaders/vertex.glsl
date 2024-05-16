uniform sampler2D uBlueTexture;
uniform sampler2D uCircleTexture;
uniform sampler2D uTilesTexture;

uniform vec2 uResolution;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uResolution.y * 0.03;
    gl_PointSize *= (1.0 / -viewPosition.z);

    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);

    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vNormal = modelNormal;
    vUv = uv;

}