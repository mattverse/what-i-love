uniform float count;
uniform float time;

varying vec2 vUv;
varying vec3 vInstancePosition;

#include ./includes/hsl2rgb.glsl
#include ./includes/4d-noise.glsl

void main() {

    float isBoundaryX = float(vInstancePosition.x < 3.0 || vInstancePosition.x > count - 4.0);
    float isBoundaryY = float(vInstancePosition.y < 3.0 || vInstancePosition.y > count - 4.0);
    float isBoundaryZ = float(vInstancePosition.z < 3.0 || vInstancePosition.z > count - 4.0);

    // Sum the boundary conditions; an edge cube has at least two boundaries
    float boundarySum = isBoundaryX + isBoundaryY + isBoundaryZ;
    if(boundarySum < 2.0)
        discard;

    // fragment shader for individual blocks
    float width = 0.03;
    float prec = 0.0001;

    float borderX = max(smoothstep(width + prec, width - prec, vUv.x), smoothstep(width + prec, width - prec, 1. - vUv.x));
    float borderY = max(smoothstep(width + prec, width - prec, vUv.y), smoothstep(width + prec, width - prec, 1. - vUv.y));
    float border = max(borderX, borderY);

    float baseColor = 0.2;
    float saturationOffset = .5;
    float noise = snoise(vec4(vInstancePosition, 8.9));

    // the greater noise factor is, the more variety we have in color range
    float noiseFactor = 1.;

    vec3 finalColor = mix(hsl2rgb(baseColor, baseColor + noise * noiseFactor + saturationOffset, baseColor), vec3(1., 1., 1.), border);

    gl_FragColor = vec4(finalColor, 1.);
}