uniform sampler2D uBlueTexture;
uniform sampler2D uCircleTexture;
uniform sampler2D uTilesTexture;

uniform vec2 uResolution;
uniform vec3 uBaseColor;
uniform vec3 uPointColor;
uniform float uTime;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 normal = normalize(vNormal);
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec3 color;

    // Determine the texture to use based on the horizontal position
    if(uv.y < 0.5 && uv.x < 0.5) {
        // Use Blue texture for particles on the left side
        color = texture(uBlueTexture, gl_PointCoord).rgb;
    } else if(uv.y < 0.5 && uv.x > 0.5) {
        color = texture(uTilesTexture, gl_PointCoord).rgb;

    } else {
        // Use Circle texture for particles on the right side
        color = texture(uCircleTexture, gl_PointCoord).rgb;
    }

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
