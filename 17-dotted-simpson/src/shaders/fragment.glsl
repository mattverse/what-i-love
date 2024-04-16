uniform vec2 uResolution;
uniform vec3 uBaseColor;
uniform vec3 uPointColor;
uniform float uTime;

varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);
    vec2 uv = gl_FragCoord.xy / uResolution.y;

    vec2 originalUv = uv;
    originalUv *= 120.;
    originalUv = mod(originalUv, 0.7);
    float point = distance(originalUv, vec2(0.5));

    // point intensity (size)
    vec3 direction = vec3(cos(uTime), sin(uTime), 0.);
    float intensity = dot(normal, direction);

    point = 1. - step(intensity * 0.52, point);

    // points in the remaining blank spaces
    vec2 blankUv = uv;
    blankUv *= 150.;
    blankUv = mod(blankUv, 0.8);
    float blankSpacePoints = distance(blankUv, vec2(0.5));
    blankSpacePoints = 1. - step(0.1, blankSpacePoints);

    // fill in blank spaces with points by maxing them out
    point = max(point, blankSpacePoints);

    vec3 color = mix(uPointColor, uBaseColor, point);

    gl_FragColor = vec4(color, 1.0);

    // #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}