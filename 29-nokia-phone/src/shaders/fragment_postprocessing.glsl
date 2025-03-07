vec3 dither(in vec2 uv, in float lum) {
    vec3 ditheredColor = vec3(1.0);
    if(lum < 0.3) {
        ditheredColor = vec3(0.);
    } else {
        ditheredColor = vec3(0.549, 0.647, 0.412);
    }

    return ditheredColor;
}

const float PIXEL_SIZE = 8.0;
const float BORDER_SIZE = 1.;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // first we need to get the overall coord
    vec2 coord = uv * resolution;
    // then normalize the pixel size 
    vec2 normalizedPixelSize = PIXEL_SIZE / resolution;

    vec2 pixelizedUV = normalizedPixelSize * floor(uv / normalizedPixelSize);

    vec4 color = texture2D(inputBuffer, pixelizedUV);
    // get luminence of the input buffer
    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);

    // TODO:  add borders at the end
    vec3 resultingColor = dither(uv, lum);
    color.rgb = resultingColor;

    if(-BORDER_SIZE < mod(coord.x, PIXEL_SIZE) && mod(coord.x, PIXEL_SIZE) < BORDER_SIZE) {
        color.rgb = vec3(0.549, 0.647, 0.412);
    }

    if(-BORDER_SIZE < mod(coord.y, PIXEL_SIZE) && mod(coord.y, PIXEL_SIZE) < 1.) {
        color.rgb = vec3(0.549, 0.647, 0.412);
    } 

    // then we add it to the final color

    outputColor = color;
}