import * as THREE from 'three'

export default function Envmaps(cubeTextureLoader) {
    const envMap1 = cubeTextureLoader.load([
        '/envmap/1.jpeg',
        '/envmap/1.jpeg',
        '/envmap/1.jpeg',
        '/envmap/1.jpeg',
        '/envmap/1.jpeg',
        '/envmap/1.jpeg',
    ])
    envMap1.colorSpace = THREE.SRGBColorSpace

    const envMap2 = cubeTextureLoader.load([
        '/envmap/2.jpeg',
        '/envmap/2.jpeg',
        '/envmap/2.jpeg',
        '/envmap/2.jpeg',
        '/envmap/2.jpeg',
        '/envmap/2.jpeg',
    ])
    envMap2.colorSpace = THREE.SRGBColorSpace

    const envMap3 = cubeTextureLoader.load([
        '/envmap/3.jpeg',
        '/envmap/3.jpeg',
        '/envmap/3.jpeg',
        '/envmap/3.jpeg',
        '/envmap/3.jpeg',
        '/envmap/3.jpeg',
    ])
    envMap3.colorSpace = THREE.SRGBColorSpace

    const envMap4 = cubeTextureLoader.load([
        '/envmap/4.jpeg',
        '/envmap/4.jpeg',
        '/envmap/4.jpeg',
        '/envmap/4.jpeg',
        '/envmap/4.jpeg',
        '/envmap/4.jpeg',
    ])
    envMap1.colorSpace = THREE.SRGBColorSpace

    const envMap5 = cubeTextureLoader.load([
        '/envmap/5.jpeg',
        '/envmap/5.jpeg',
        '/envmap/5.jpeg',
        '/envmap/5.jpeg',
        '/envmap/5.jpeg',
        '/envmap/5.jpeg',
    ])
    envMap5.colorSpace = THREE.SRGBColorSpace

    const envMap6 = cubeTextureLoader.load([
        '/envmap/6.jpeg',
        '/envmap/6.jpeg',
        '/envmap/6.jpeg',
        '/envmap/6.jpeg',
        '/envmap/6.jpeg',
        '/envmap/6.jpeg',
    ])
    envMap6.colorSpace = THREE.SRGBColorSpace

    const envMap7 = cubeTextureLoader.load([
        '/envmap/7.jpeg',
        '/envmap/7.jpeg',
        '/envmap/7.jpeg',
        '/envmap/7.jpeg',
        '/envmap/7.jpeg',
        '/envmap/7.jpeg',
    ])
    envMap7.colorSpace = THREE.SRGBColorSpace

    const envMaps = [envMap1, envMap2, envMap3, envMap4, envMap5, envMap6, envMap7];
    return envMaps
}