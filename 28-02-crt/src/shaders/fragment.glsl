precision highp float;
uniform sampler2D palette;

float random(vec2 c) {
    return fract(sin(dot(c.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
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

const float COLOR_NUM = 8.;
vec3 dither(vec2 uv, vec3 color) {
    int x = int(uv.x * resolution.x) % 8;
    int y = int(uv.y * resolution.y) % 8;
    float threshold = bayerMatrix8x8[y * 8 + x];

    color.rgb += threshold * 0.6;
    color.r = floor(color.r * (COLOR_NUM - 1.0) + 0.5) / (COLOR_NUM - 1.0);
    color.g = floor(color.g * (COLOR_NUM - 1.0) + 0.5) / (COLOR_NUM - 1.0);
    color.b = floor(color.b * (COLOR_NUM - 1.0) + 0.5) / (COLOR_NUM - 1.0);

    return color;
}

const float BORDER_WIDTH = 0.9;
const float PIXEL_SIZE = 16.0;
const float MASK_INTENSITY = 1.0;
const float CURVE = 0.25;

void mainUv(inout vec2 uv) {
    float shake = (noise(vec2(uv.y) * sin(time * 400.0) * 100.0) - 0.5) * 0.0025;
    uv.x += shake * 1.5;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

    vec2 curveUV = uv * 2.0 - 1.0;
    vec2 offset = curveUV.yx * CURVE;
    curveUV += curveUV * offset * offset;
    curveUV = curveUV * 0.5 + 0.5;

    vec2 pixelPos = uv * resolution;

    // get the pixel position coordinate
    vec2 coord = pixelPos / PIXEL_SIZE;

    vec2 subCoord = coord * vec2(3, 1);
    // figure out the the index of the current pixel (either r,g,b (0,1,2))
    float index = mod(floor(subCoord.x), 3.);
    // map index to color
    vec3 maskColor = vec3(index == 0.0, index == 1.0, index == 2.0) * 2.0;

    // we only give offset on y axis for every 3 pixel
    vec2 cellOffset = vec2(0, mod(floor(coord.x), 3.0) * 0.5);

    // we put border around every subcoords (rgb)
    vec2 cellUvSubCoord = fract(vec2(subCoord + cellOffset)) * 2.0 - 1.0;
    vec2 border = 1.0 - cellUvSubCoord * cellUvSubCoord * BORDER_WIDTH;
    maskColor.rgb *= border.x * border.y;

    vec2 rgbCellUv = floor(vec2(coord + cellOffset)) * PIXEL_SIZE / resolution;
    vec4 color = texture2D(inputBuffer, rgbCellUv);
    color.rgb = dither(rgbCellUv, color.rgb);

    color.rgb *= 1.0 + (maskColor - 1.0) * MASK_INTENSITY;

    vec2 edge = smoothstep(0., 0.02, curveUV) * (1. - smoothstep(1. - 0.02, 1., curveUV));
    color.rgb *= edge.x * edge.y;

    outputColor = color;
}