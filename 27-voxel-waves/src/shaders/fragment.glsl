varying vec2 vUv;
varying float vElevation;

void main() {
    float width = 0.05;
    float borderX = max(1. - step(width, vUv.x), 1. - step(width, 1. - vUv.x));
    float borderY = max(1. - step(width, vUv.y), 1. - step(width, 1. - vUv.y));

    float border = max(borderX, borderY);

    vec3 colorA = vec3(7.0 / 255.0, 15.0 / 255.0, 70.0 / 255.0);   // #070f46
    vec3 colorB = vec3(136.0 / 255.0, 233.0 / 255.0, 255.0 / 255.0); // #88e9ff

    vec3 black = vec3(0.0, 0.0, 0.0);

    vec3 color = mix(colorA, colorB, vElevation);
    color = mix(black, color, border);

    gl_FragColor = vec4(color, 1.);
}