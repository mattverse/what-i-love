uniform sampler2D pattern;

const float pixelSize = 32.0;
const float textureNum = 22.0;

const float blackIndex = 0.;
const float darkIntenseIndex = 4.;
const float darkMildIndex = 8.;
const float whiteIntenseIndex = 16.0;
const float whiteMildIndex = 21.0;

float random(vec2 c) {
    return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 pixelUv = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, pixelUv);

    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb) * 4.;

    float charIndex = 0.0;
    float rand = random(pixelUv);

    if(lum > 0.9) {
        // White intense to white mild (16-21) - 6 patterns
        charIndex = floor(rand * (whiteMildIndex - whiteIntenseIndex + 1.0)) + whiteIntenseIndex;
    } else if(lum > 0.7) {
        // Dark mild to white intense (8-16) - 9 patterns
        charIndex = floor(rand * (whiteIntenseIndex - darkMildIndex)) + darkMildIndex;
    } else if(lum > 0.3) {
        // Dark intense to dark mild (4-8) - 5 patterns
        charIndex = floor(rand * (darkMildIndex - darkIntenseIndex)) + darkIntenseIndex;
    } else if(lum > 0.01) {
        // Black to dark intense (0-4) - 5 patterns
        charIndex = floor(rand * (darkIntenseIndex - blackIndex + 1.0)) + blackIndex;
    } else {
        // Pure black
        charIndex = blackIndex;
    }

    vec2 cellUV = fract(uv / normalizedPixelSize);
    vec2 asciiUV = vec2((charIndex + cellUV.x) / textureNum, cellUV.y);

    float pat = texture2D(pattern, asciiUV).r;

    outputColor = vec4(pat * vec3(1.0), 1.0);
}