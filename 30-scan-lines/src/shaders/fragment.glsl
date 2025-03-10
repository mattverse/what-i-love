const float SCANLINE_WIDTH = 8.0;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = 10.0 / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);

    vec2 pixelPos = uv * resolution;
    vec2 coord = pixelPos / SCANLINE_WIDTH;

    vec2 cellUvCoord = fract(coord) * 2.0 - 1.0;
    vec2 border = 1.0 - cellUvCoord * cellUvCoord * SCANLINE_WIDTH;

    vec4 color = texture2D(inputBuffer, uvPixel);
    color.rgb *= border.y;

    // for brightness
    color.rgb *= 10.0;
    outputColor = color;
}