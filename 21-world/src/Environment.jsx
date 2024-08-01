import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Environment() {
    // const { nodes: brickNodes, materials: brickMaterials } = useGLTF('./environment/floor-detail.glb');
    const { nodes: floorNodes, materials: floorMaterials } = useGLTF('./environment/floor.glb');
    const { nodes: floorDetailNodes, materials: floorDetailMaterials } = useGLTF('./environment/floor-detail.glb')

    const createFloorDetailMesh = (position) => {
        return (
            <mesh
                geometry={floorDetailNodes['floor-detail_1'].geometry}
                material={floorDetailMaterials.colormap}
                position={position}
            />
        );
    };

    // Method to create floor mesh
    const createFloorMesh = (position) => {
        return (
            <mesh
                geometry={floorNodes['floor_1'].geometry}
                material={floorMaterials.colormap}
                position={position}
            />
        );
    };


    const createRandomMeshes = (xRange, zRange) => {
        const meshes = [];
        for (let x = xRange[0]; x <= xRange[1]; x++) {
            for (let z = zRange[0]; z <= zRange[1]; z++) {
                const position = [x, 0, z];
                const randomChoice = Math.random() < 0.1;
                if (randomChoice) {
                    meshes.push(createFloorDetailMesh(position));
                } else {
                    meshes.push(createFloorMesh(position));
                }
            }
        }
        return meshes;
    };

    return <>
        {createRandomMeshes([-30, 30], [-30, 30])}


    </>
}
