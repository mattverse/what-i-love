uniform vec2 uPointer;

const float SCANLINE_WIDTH = 8.0;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // pointer pos scales from -1 ~ 1 so we need to normalize it to 0~1 range. 
    vec2 normalizedPointerPos = uPointer * 0.5 + 0.5;
    float dist = length(uv - normalizedPointerPos);
    float radius = 0.2;

    float maxZoom = 2.0;
    float zoomFactor = mix(maxZoom, 1.0, smoothstep(0.0, radius, dist));
    vec2 zoomUV = normalizedPointerPos + (uv - normalizedPointerPos) / zoomFactor;

    vec2 normalizedPixelSize = 10.0 / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(zoomUV / normalizedPixelSize);

    vec2 pixelPos = zoomUV * resolution;
    vec2 coord = pixelPos / SCANLINE_WIDTH;

    vec2 cellUvCoord = fract(coord) * 2.0 - 1.0;
    vec2 border = 1.0 - cellUvCoord * cellUvCoord * SCANLINE_WIDTH;

    vec4 color = texture2D(inputBuffer, uvPixel);
    color.rgb *= border.y;

    float lines = sin(uv.y * 700.0 + time * 100.);
    color *= lines + 1.8;

    // for brightness
    color.rgb *= 10.0;
    outputColor = color;
}