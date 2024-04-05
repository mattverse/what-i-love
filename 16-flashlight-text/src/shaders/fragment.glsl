uniform vec3 uLightDirection;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 color = vec3(0);
    vec3 normal = normalize(vNormal);

    vec3 modelPosition = vPosition;

    vec3 lightPosition = uLightDirection;

    vec3 lightPositionDelta = lightPosition - modelPosition;
    float lightDistance = length(lightPositionDelta);

    float decayFactor = .7;
    float decay = 1.0 - lightDistance * decayFactor;
    decay = max(0.0, decay);

    vec3 lightDirection = normalize(lightPosition);
    float lightOrientation = dot(normal, lightDirection);
    lightOrientation = max(0., lightOrientation);

    float lightIntensity = 3.5;

    vec3 lightColor = vec3(1.0);
    color = lightColor * lightOrientation * decay * lightIntensity;

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}