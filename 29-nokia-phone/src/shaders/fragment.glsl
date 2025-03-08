varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uResolution;

const float LUMINENCE_MULTIPLIER = 1.4;
vec3 dither(in vec2 uv, in float lum) {
    vec3 ditheredColor = vec3(1.0);
    if(lum < 0.6) {
        ditheredColor = vec3(0.);
    } else {
        ditheredColor = vec3(0.549, 0.647, 0.412) * LUMINENCE_MULTIPLIER;
    }

    return ditheredColor;
}

const float PIXEL_SIZE = 14.0;
const float BORDER_SIZE = 2.;
const float CURVE = 0.35;

void main() {
    vec2 curveUV = vUv * 2.0 - 1.;
    vec2 offset = curveUV.yx * CURVE;
    curveUV += curveUV * offset * offset;
    curveUV = curveUV * 0.5 + 0.5;

    vec2 coord = vUv * uResolution;

    vec2 normalizedPixelSize = PIXEL_SIZE / uResolution;

    vec2 pixelizedUV = normalizedPixelSize * floor(vUv / normalizedPixelSize);

    vec4 color = texture2D(uTexture, pixelizedUV);
    // get luminence of the input buffer
    float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);

    vec3 resultingColor = dither(vUv, lum);
    color.rgb = resultingColor;

    if(-BORDER_SIZE < mod(coord.x, PIXEL_SIZE) && mod(coord.x, PIXEL_SIZE) < BORDER_SIZE) {
        color.rgb = vec3(0.549, 0.647, 0.412);
    }

    if(-BORDER_SIZE < mod(coord.y, PIXEL_SIZE) && mod(coord.y, PIXEL_SIZE) < 1.) {
        color.rgb = vec3(0.549, 0.647, 0.412);
    } 

    // add curved edge 
    vec2 edge = smoothstep(0., 0.02, curveUV) * (1. - smoothstep(1. - 0.02, 1., curveUV));
    color.rgb *= edge.x * edge.y;

    gl_FragColor = color;

}