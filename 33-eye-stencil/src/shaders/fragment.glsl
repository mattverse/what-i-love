uniform sampler2D pattern;

const float pixelSize = 32.0;
const float textureNum = 4.0;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 pixelUv = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, pixelUv);

    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb) * 2.9;
    vec2 cellUV = fract(uv / normalizedPixelSize);
    float charIndex = clamp(floor(lum * (textureNum)), 0., textureNum - 1.);
    vec2 asciiUV = vec2((charIndex + cellUV.x) / textureNum, cellUV.y);

    float pat = texture2D(pattern, asciiUV).r;

    outputColor = vec4(pat * vec3(1.0), 1.0);
}