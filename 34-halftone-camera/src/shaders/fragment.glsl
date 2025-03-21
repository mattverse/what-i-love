const float PIXEL_SIZE = 20.;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = texture2D(inputBuffer, uv);
    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb) * 0.8;

    vec2 coord = uv * resolution;
    vec2 pixelPos = floor(coord / PIXEL_SIZE) * PIXEL_SIZE;
    vec2 pixelCenter = pixelPos + vec2(PIXEL_SIZE / 2.);
    float radius = lum > 0.4 ? 0.4 : lum > 0.25 ? 0.35 : lum > 0.101 ? 0.3 : 0.125;

    float distanceToCenter = distance(pixelCenter, coord);
    float pixelRadius = radius * PIXEL_SIZE;

    if(distanceToCenter <= radius * 20.) {
        outputColor = vec4(1.0);
    } else {
        outputColor = vec4(0., 0., 0., 1.0);
    }
}