uniform float uTime;

varying vec3 vPosition;

void main() {

    // Stripes
    float stripes = mod((vPosition.y - uTime ) , 1.0);
    //float stripes = mod((vPosition.y + uTime * 0.02) * 20.0, 1.0);
    // stripes = pow(stripes, 3.0);

    gl_FragColor = vec4(vPosition, stripes);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}