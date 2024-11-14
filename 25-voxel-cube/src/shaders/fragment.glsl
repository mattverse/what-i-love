varying vec2 vUv;
varying float vDepth;
varying float vHidden;

float hue2rgb(float f1, float f2, float hue) {
    if(hue < 0.0)
        hue += 1.0;
    else if(hue > 1.0)
        hue -= 1.0;
    float res;
    if((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
    else if((2.0 * hue) < 1.0)
        res = f2;
    else if((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
        res = f1;
    return res;
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;

    if(hsl.y == 0.0) {
        rgb = vec3(hsl.z); // Luminance
    } else {
        float f2;

        if(hsl.z < 0.5)
            f2 = hsl.z * (1.0 + hsl.y);
        else
            f2 = hsl.z + hsl.y - hsl.y * hsl.z;

        float f1 = 2.0 * hsl.z - f2;

        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0 / 3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0 / 3.0));
    }
    return rgb;
}

vec3 hsl2rgb(float h, float s, float l) {
    return hsl2rgb(vec3(h, s, l));
}

void main() {
    float width = 0.03;
    float prec = 0.0001;
    float borderX = max(smoothstep(width + prec, width - prec, vUv.x), smoothstep(width + prec, width - prec, 1. - vUv.x));
    float borderY = max(smoothstep(width + prec, width - prec, vUv.y), smoothstep(width + prec, width - prec, 1. - vUv.y));
    float border = max(borderX, borderY);

    vec3 finalColor = mix(hsl2rgb(vDepth, vDepth * 0.5 + 0.5, vDepth), vec3(1., 1., 1.), border);
    if(vHidden < 0.5)
        discard;

    gl_FragColor = vec4(finalColor, 1.);
}