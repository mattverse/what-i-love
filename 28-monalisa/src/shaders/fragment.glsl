const float PIXEL_SIZE = 20.0;
const float COLOR_NUM = 12.0;

const mat4x4 bayerMatrix4x4 = mat4x4(0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0) / 16.0;
const float bayerMatrix8x8[64] = float[64](0.0 / 64.0, 48.0 / 64.0, 12.0 / 64.0, 60.0 / 64.0, 3.0 / 64.0, 51.0 / 64.0, 15.0 / 64.0, 63.0 / 64.0, 32.0 / 64.0, 16.0 / 64.0, 44.0 / 64.0, 28.0 / 64.0, 35.0 / 64.0, 19.0 / 64.0, 47.0 / 64.0, 31.0 / 64.0, 8.0 / 64.0, 56.0 / 64.0, 4.0 / 64.0, 52.0 / 64.0, 11.0 / 64.0, 59.0 / 64.0, 7.0 / 64.0, 55.0 / 64.0, 40.0 / 64.0, 24.0 / 64.0, 36.0 / 64.0, 20.0 / 64.0, 43.0 / 64.0, 27.0 / 64.0, 39.0 / 64.0, 23.0 / 64.0, 2.0 / 64.0, 50.0 / 64.0, 14.0 / 64.0, 62.0 / 64.0, 1.0 / 64.0, 49.0 / 64.0, 13.0 / 64.0, 61.0 / 64.0, 34.0 / 64.0, 18.0 / 64.0, 46.0 / 64.0, 30.0 / 64.0, 33.0 / 64.0, 17.0 / 64.0, 45.0 / 64.0, 29.0 / 64.0, 10.0 / 64.0, 58.0 / 64.0, 6.0 / 64.0, 54.0 / 64.0, 9.0 / 64.0, 57.0 / 64.0, 5.0 / 64.0, 53.0 / 64.0, 42.0 / 64.0, 26.0 / 64.0, 38.0 / 64.0, 22.0 / 64.0, 41.0 / 64.0, 25.0 / 64.0, 37.0 / 64.0, 21.0 / 64.0);

vec3 dither(vec2 uv, vec3 color) {
    int x = int(uv.x / resolution.x) % 8;
    int y = int(uv.y / resolution.y) % 8;

    float threshold = bayerMatrix8x8[y * 8 + x];

    color.rgb += threshold;

    color.r = floor(color.r * (COLOR_NUM - 1.0) + 0.5) / (COLOR_NUM - 1.0);
    color.g = floor(color.g * (COLOR_NUM - 1.0) + 0.5) / (COLOR_NUM - 1.0);
    color.b = floor(color.b * (COLOR_NUM - 1.0) + 0.5) / (COLOR_NUM - 1.0);

    return color;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = vec4(1.0);  // Force white to see if anything appears

    if(uv.x > 0.5) {
        vec4 color = texture2D(inputBuffer, uv);
        outputColor = color;
    } else if(0.499 < uv.x && uv.x < 0.501) {
        outputColor = vec4(1., 1., 1., 0.2);
    } else {
        vec2 normalizedPixelSize = PIXEL_SIZE / resolution;
        vec2 pixelUV = normalizedPixelSize * floor(uv / normalizedPixelSize);
        vec4 color = texture2D(inputBuffer, pixelUV);
        color.rgb = dither(pixelUV, color.rgb);
        outputColor = color;
    }

}