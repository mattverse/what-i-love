uniform sampler2D uBlueTexture;
uniform sampler2D uCircleTexture;
uniform sampler2D uTilesTexture;

uniform vec2 uResolution;
uniform vec3 uBaseColor;
uniform vec3 uPointColor;
uniform float uTime;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 normal = normalize(vNormal);
    vec2 uv = gl_FragCoord.xy / uResolution.y;

    vec3 a = texture(uBlueTexture, gl_PointCoord).rgb;

    gl_FragColor = vec4(a, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}