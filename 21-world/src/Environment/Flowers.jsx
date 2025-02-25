import * as THREE from 'three';
import { useControls } from 'leva';
import { useMemo, useEffect, useRef } from 'react';

export default function Flowers() {
    // Leva controls for color customization
    // const { flowerLeaves, middleFlower } = useControls('flower color', {
    //     flowerLeaves: '#ffffff',
    //     middleFlower: '#e8c900',
    // });

    // // Materials with dynamic color updates
    // const flowerMiddleMaterial = useMemo(() => new THREE.MeshBasicMaterial(), []);
    // const flowerLeavesMaterial = useMemo(() => new THREE.MeshBasicMaterial(), []);

    // // Update material colors when Leva controls change
    // useEffect(() => {
    //     flowerMiddleMaterial.color.set('#e8c900');
    // }, [middleFlower, flowerMiddleMaterial]);

    // useEffect(() => {
    //     flowerLeavesMaterial.color.set('#ffffff');
    // }, [flowerLeaves, flowerLeavesMaterial]);

    const flowerMiddleMaterial = new THREE.MeshBasicMaterial({ color: "#e8c900" })
    const flowerLeavesMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" })

    // Define flower positions (add more entries for additional flowers)
    const flowerPositions = useMemo(() => [
        [-36.2, 0.38, 2.2],
        [-28.2, 0.38, -1.7],
        [-22.2, 0.38, -0.2],
        [-16.9, 0.38, -1.8],
        [-10.5, 0.38, -0.3],
        [-9, 0.38, -2],
        [-4, 0.38, -2],
        [-2, 0.38, 0],
        [6.4, 0.38, -3.1],
        [14.5, 0.38, -3.8],
    ], []);

    // Shared geometry and dimensions
    const flowerWidth = 0.1;
    const flowerGeometry = useMemo(() => new THREE.PlaneGeometry(flowerWidth, flowerWidth), []);

    // Refs for accessing InstancedMesh objects
    const middleRef = useRef();
    const leavesRef = useRef();

    // Update instance matrices when positions change
    useEffect(() => {
        if (!middleRef.current || !leavesRef.current) return;

        const dummy = new THREE.Object3D();

        // Update center instances
        flowerPositions.forEach((pos, index) => {
            dummy.position.set(...pos);
            dummy.rotation.x = -Math.PI / 2;
            dummy.updateMatrix();
            middleRef.current.setMatrixAt(index, dummy.matrix);
        });
        middleRef.current.instanceMatrix.needsUpdate = true;

        // Update petal instances
        let instanceId = 0;
        flowerPositions.forEach(pos => {
            const offsets = [
                [flowerWidth, 0, 0], [-flowerWidth, 0, 0],
                [0, 0, flowerWidth], [0, 0, -flowerWidth],
            ];
            offsets.forEach(offset => {
                dummy.position.set(
                    pos[0] + offset[0],
                    pos[1],
                    pos[2] + offset[2]
                );
                dummy.rotation.x = -Math.PI / 2;
                dummy.updateMatrix();
                leavesRef.current.setMatrixAt(instanceId, dummy.matrix);
                instanceId++;
            });
        });
        leavesRef.current.instanceMatrix.needsUpdate = true;
    }, [flowerPositions]);

    return (
        <>
            <instancedMesh
                ref={middleRef}
                args={[flowerGeometry, flowerMiddleMaterial, flowerPositions.length]}
            />
            <instancedMesh
                ref={leavesRef}
                args={[flowerGeometry, flowerLeavesMaterial, flowerPositions.length * 4]}
            />
        </>
    );
}