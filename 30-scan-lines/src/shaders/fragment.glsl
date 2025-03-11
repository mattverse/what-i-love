uniform vec2 uPointer;

const float SCANLINE_WIDTH = 8.0;

#include ./includes/noise.glsl

const float DISTORTION = 0.33;
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

    float noise = max(0.0, snoise(vec2(time, uv.y * 0.3)) - 0.3) * DISTORTION;
    noise += (snoise(vec2(time * 10.0, uv.y * 2.4)) - 0.5) * 0.05;
    float xpos = uvPixel.x - noise * noise * 0.15;

    vec4 color = texture2D(inputBuffer, vec2(xpos, uvPixel.y));

    color.rgb = mix(color.rgb, vec3(0.0), noise * 3.3);

    if(floor(mod(pixelPos.y * 0.25, 2.0)) == 0.0) {
        color *= 1.0 - (0.15);
    }

    // for brightness
    color.rgb *= 10.0;
    outputColor = color;
}