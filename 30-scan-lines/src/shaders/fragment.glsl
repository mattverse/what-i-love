const float SCANLINE_WIDTH = 5.0;
const float DISPLAY_WIDTH = 7.0;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 coord = uv * resolution;
    vec4 color = texture2D(inputBuffer, uv);

    float unitSize = SCANLINE_WIDTH + DISPLAY_WIDTH;
    float linePosition = mod(coord.y, unitSize);

    if(linePosition > DISPLAY_WIDTH) {
        color.rgb = vec3(0.);
    }

    color.rgb *= 4.0;
    outputColor = color;

}