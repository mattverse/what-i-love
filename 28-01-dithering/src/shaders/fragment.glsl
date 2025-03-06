precision highp float;
uniform sampler2D palette;

float random(vec2 c) {
    return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

const mat2x2 bayerMatrix2x2 = mat2x2(0.0, 2.0, 3.0, 1.0) / 4.0;

const mat4x4 bayerMatrix4x4 = mat4x4(0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0) / 16.0;

const float bayerMatrix8x8[64] = float[64](0.0 / 64.0, 48.0 / 64.0, 12.0 / 64.0, 60.0 / 64.0, 3.0 / 64.0, 51.0 / 64.0, 15.0 / 64.0, 63.0 / 64.0, 32.0 / 64.0, 16.0 / 64.0, 44.0 / 64.0, 28.0 / 64.0, 35.0 / 64.0, 19.0 / 64.0, 47.0 / 64.0, 31.0 / 64.0, 8.0 / 64.0, 56.0 / 64.0, 4.0 / 64.0, 52.0 / 64.0, 11.0 / 64.0, 59.0 / 64.0, 7.0 / 64.0, 55.0 / 64.0, 40.0 / 64.0, 24.0 / 64.0, 36.0 / 64.0, 20.0 / 64.0, 43.0 / 64.0, 27.0 / 64.0, 39.0 / 64.0, 23.0 / 64.0, 2.0 / 64.0, 50.0 / 64.0, 14.0 / 64.0, 62.0 / 64.0, 1.0 / 64.0, 49.0 / 64.0, 13.0 / 64.0, 61.0 / 64.0, 34.0 / 64.0, 18.0 / 64.0, 46.0 / 64.0, 30.0 / 64.0, 33.0 / 64.0, 17.0 / 64.0, 45.0 / 64.0, 29.0 / 64.0, 10.0 / 64.0, 58.0 / 64.0, 6.0 / 64.0, 54.0 / 64.0, 9.0 / 64.0, 57.0 / 64.0, 5.0 / 64.0, 53.0 / 64.0, 42.0 / 64.0, 26.0 / 64.0, 38.0 / 64.0, 22.0 / 64.0, 41.0 / 64.0, 25.0 / 64.0, 37.0 / 64.0, 21.0 / 64.0);

vec3 whiteNoiseDither(vec2 uv, float lum) {
    vec3 color = vec3(0.0);

    if(lum < random(uv)) {
        color = vec3(0.0);
    } else {
        color = vec3(1.0);
    }

    return color;
}

vec3 orderedDither(vec2 uv, float lum) {
    vec3 color = vec3(0.0);
    float threshold = 0.0;

    // we will be using a 8.0 matrix size here for now
    int x = int(uv.x * resolution.x) % 8;
    int y = int(uv.y * resolution.y) % 8;
    threshold = bayerMatrix8x8[y * 8 + x];
    float bias = 0.8;

    if(lum < threshold + bias) {
        color = vec3(0.0);
    } else {
        color = vec3(1.0);

    }

    return color;
}

vec3 dither(vec2 uv, float lum) {
    // turn it into color that of 0~1 based on luminence
    vec3 color = vec3(lum);

    int x = int(uv.x * resolution.x) % 8;
    int y = int(uv.y * resolution.y) % 8;

    float bias = 0.88;
    // this should be same as color num of our palette texture 
    float colorNum = 4.0;
    float threshold = bayerMatrix8x8[y * 8 + x] - bias;

    color.rgb += threshold * 0.2;
    color.r = floor(color.r * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
    color.g = floor(color.g * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
    color.b = floor(color.b * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);

    // we use the texture input as pallette for our dithers
    vec3 paletteColor = texture2D(palette, vec2(color.r)).rgb;

    return paletteColor;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float pixelSize = 16.0;
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);

    vec4 color = texture2D(inputBuffer, uvPixel);
    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);
    color.rgb = dither(uv, lum);

    outputColor = color;
}