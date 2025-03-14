uniform sampler2D pattern;

const float pixelSize = 50.0;
const float textureNum = 22.0;
const float noiseSpeed = 0.1; // Speed of pattern changes
const float shiftChance = 0.1; // Probability of shifting (0-1)

#include ./includes/random.glsl
#include ./includes/noise.glsl

// Luminance group boundaries
const float blackMax = 0.0;
const float darkIntenseMin = 1.0;
const float darkIntenseMax = 4.0;
const float darkMildMin = 5.0;
const float darkMildMax = 8.0;
const float whiteIntenseMin = 16.0;
const float whiteIntenseMax = 21.0;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 pixelUv = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, pixelUv);

    // Calculate cell coordinates for noise
    vec2 cellCoord = floor(uv / normalizedPixelSize);

    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb) * 4.;
    float rand = random(pixelUv);
    float charIndex = 0.0;
    float groupMin = 0.0;
    float groupMax = 0.0;

    // Store original group boundaries
    if(lum > 0.9) {
        groupMin = whiteIntenseMin;
        groupMax = whiteIntenseMax;
        charIndex = floor(rand * (groupMax - groupMin + 1.0)) + groupMin;
    } else if(lum > 0.57) {
        groupMin = darkMildMin;
        groupMax = darkMildMax;
        charIndex = floor(rand * (groupMax - groupMin + 1.0)) + groupMin;
    } else if(lum > 0.3) {
        groupMin = darkIntenseMin;
        groupMax = darkIntenseMax;
        charIndex = floor(rand * (groupMax - groupMin + 1.0)) + groupMin;
    } else if(lum > 0.1) {
        groupMin = blackMax + 1.0;
        groupMax = darkIntenseMax;
        charIndex = floor(rand * (groupMax - groupMin + 1.0)) + groupMin;
    } else {
        // Black group - no shifts allowed
        groupMin = blackMax;
        groupMax = blackMax;
        charIndex = blackMax;
    }

    // Cell-aligned noise with temporal component
    float n = noise(cellCoord * 0.5 + vec2(time * noiseSpeed));
    float indexShift = 0.0;

    if(lum > 0.01) {
        if(n > (1.0 - shiftChance)) {
            indexShift = 1.0;
        } else if(n < shiftChance) {
            indexShift = -1.0;
        }
    }
    charIndex = clamp(charIndex + indexShift, groupMin, groupMax);

    // Final safety clamp to prevent invalid texture lookups
    charIndex = clamp(charIndex, 0.0, textureNum - 1.0);

    // UV calculations
    vec2 cellUV = fract(uv / normalizedPixelSize);
    vec2 asciiUV = vec2((charIndex + cellUV.x) / textureNum, cellUV.y);

    float pat = texture2D(pattern, asciiUV).r;
    outputColor = vec4(pat * vec3(1.0), 1.0);
}