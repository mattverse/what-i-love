import React from 'react';
import './TextSection.css'; // Make sure to import the CSS file
import { Html } from '@react-three/drei'

const TextSection = () => {
    return (
        <Html
            position={[-4, -4, -4]}
        >
            <div className="top-left-text">
                We're all choosing amongst a jar of sins
            </div>
        </Html>
    );
}

export default TextSection;
