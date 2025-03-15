import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'

import fragmentShader from './shaders/fragment.glsl'

class HalftoneEffectImpl extends Effect {
    constructor() {
        const uniforms = new Map([])
        super("HalftoneEffect", fragmentShader, {
            uniforms
        })
    }
}

const HalftoneEffect = wrapEffect(HalftoneEffectImpl)


function VideoPlane() {
    const meshRef = useRef()
    const [video, setVideo] = useState(null)
    const { size } = useThree()

    // Initialize video stream
    useEffect(() => {
        const initVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' }
                })
                const videoEl = document.createElement('video')
                videoEl.srcObject = stream
                videoEl.autoplay = true
                videoEl.playsInline = true
                videoEl.play()
                setVideo(videoEl)
            } catch (error) {
                console.error('Error accessing camera:', error)
            }
        }

        if (navigator.mediaDevices?.getUserMedia) initVideo()

        return () => {
            if (video?.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    // Update plane size based on viewport
    useFrame(() => {
        if (video && meshRef.current) {
            // Adjust aspect ratio
            const videoAspect = video.videoWidth / video.videoHeight
            const viewportAspect = size.width / size.height

            if (viewportAspect > videoAspect) {
                meshRef.current.scale.x = (size.height / size.width) * videoAspect
                meshRef.current.scale.y = 1
            } else {
                meshRef.current.scale.x = 1
                meshRef.current.scale.y = (size.width / size.height) / videoAspect
            }
        }
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[3, 2]} /> {/* Base size, scaling handled in useFrame */}
            {video && (
                <meshBasicMaterial>
                    <videoTexture
                        attach="map"
                        args={[video]}
                        colorSpace={THREE.SRGBColorSpace}
                    />
                </meshBasicMaterial>
            )}
        </mesh>
    )
}



export default function Experience() {
    return <>
        <VideoPlane />
        <EffectComposer>
            <HalftoneEffect />
        </EffectComposer>
    </>
}