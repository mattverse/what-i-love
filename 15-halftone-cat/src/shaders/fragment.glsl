uniform vec2 uResolution;
uniform vec3 uBaseColor;
uniform vec3 uPointColor;

varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);
    vec2 uv = gl_FragCoord.xy / uResolution.y;

    vec3 direction = vec3(0.0, -1.0, 0.0);
    float intensity = dot(normal, direction);

    // intensity = smoothstep(0.1,  0.8, intensity);

    uv *= 200.;
    uv = mod(uv, 1.0);

    float point = distance(uv, vec2(0.5));
    point = 1. - step(0.9 * intensity, point);

    vec3 color = mix(uBaseColor, uPointColor, point);

    vec3 upperDirection = vec3(0.0, 1.0, 0.0);
    intensity = dot(normal, upperDirection);

    float upperPoints = distance(uv, vec2(0.5));
    upperPoints = 1. - step(0.6 * intensity, upperPoints);

    color = mix(color, uPointColor, upperPoints);

    gl_FragColor = vec4(color, 1.0);

   #include <tonemapping_fragment>
    #include <colorspace_fragment>
}