varying vec2 vUv;

void main() {
    float width = 0.03;
    float prec = 0.001;

    float borderX = min(step(width, vUv.x), step(width, 1. - vUv.x));
    float borderY = min(step(width, vUv.y), step(width, 1. - vUv.y));
    float border = min(borderX, borderY);

    gl_FragColor = vec4(border, 1.0, 1., 1.0);

   #include <tonemapping_fragment>
    #include <colorspace_fragment>
}