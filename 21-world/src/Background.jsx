import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Background() {
    const { scene } = useThree();
    // const backgroundTexture = useTexture("https://images.unsplash.com/photo-1595404603599-2ad07f19556d?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); // Load image
    const backgroundTexture = useTexture("https://images.unsplash.com/photo-1634289836099-deb79de5e7a0?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); // Load image
    // const backgroundTexture = useTexture("https://images.unsplash.com/photo-1481007553706-bde1ba8e91fd?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); // Load image

    useEffect(() => {
        scene.background = backgroundTexture; // Set background
    }, [scene, backgroundTexture]);

    return null; // No need to return anything
}
