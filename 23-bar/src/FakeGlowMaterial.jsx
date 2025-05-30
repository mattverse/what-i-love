import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color, DoubleSide, AdditiveBlending } from 'three'

/**
 * @typedef {Object} FakeGlowMaterialProps
 * @property {Number} [falloff=0.1] - Controls the value of the Falloff effect. Ranges from 0.0 to 1.0.
 * @property {Number} [glowInternalRadius=6.0] - Controls the internal glow radius. Ranges from -1.0 to 1.0. Set a darker color to get the fresnel effect only.
 * @property {String} [glowColor='#00ff00'] - Specifies the color of the hologram. Use hexadecimal format.
 * @property {Number} [glowSharpness=1.0] - Specifies the edges sharpness. Defaults to 1.0.
 * @property {String} [side='THREE.FrontSide'] - Specifies side for the material, as THREE.DoubleSide. Options are "THREE.FrontSide", "THREE.BackSide", "THREE.DoubleSide". Defaults to "THREE.FrontSide".
 * @property {Boolean} [depthTest=false] - Enable or disable depthTest. Defaults to false.
 * @property {Number} [opacity=1.0] - Controls the opacity. Defaults to 1.0,
 */

/**
 * FakeGlow material component by Anderson Mancini - Feb 2024.
 * @param {FakeGlowMaterialProps} props - Props for the FakeGlowMaterial component.
 */
const FakeGlowMaterial = ({
    falloff = 0.1,
    glowInternalRadius = 6.0,
    glowColor = '#00ff00',
    glowSharpness = 1.0,
    side = 'THREE.FrontSide',
    depthTest = false,
    opacity = 1.0,
}) => {
    const FakeGlowMaterial = useMemo(() => {
        return shaderMaterial(
            {
                falloffAmount: falloff,
                glowInternalRadius: glowInternalRadius,
                glowColor: new Color(glowColor),
                glowSharpness: glowSharpness,
                opacity: opacity,
            },
            /*GLSL */
            `
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;
      }`,
            /*GLSL */
            ` 
      uniform vec3 glowColor;
      uniform float falloffAmount;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float opacity;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main()
      {
        // Normal
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing)
            normal *= - 1.0;
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        float falloff = smoothstep(0., falloffAmount, fresnel);
        float fakeGlow = fresnel;
        fakeGlow += fresnel * glowSharpness;
        fakeGlow *= falloff;
        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
        )
    }, [falloff, glowInternalRadius, glowColor, glowSharpness, opacity])

    extend({ FakeGlowMaterial })

    return (
        <fakeGlowMaterial
            key={FakeGlowMaterial.key}
            side={side}
            transparent={true}
            blending={AdditiveBlending}
            depthTest={depthTest}
        />
    )
}

FakeGlowMaterial.propTypes = {
    falloff: PropTypes.number,
    glowInternalRadius: PropTypes.number,
    glowColor: PropTypes.string,
    glowSharpness: PropTypes.number,
    side: PropTypes.oneOf([
        'THREE.FrontSide',
        'THREE.BackSide',
        'THREE.DoubleSide',
    ]),
}

export default FakeGlowMaterial