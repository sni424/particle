import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const CanvasComponent = ({ children }) => {
    return (
        <Canvas
            gl={{
                toneMapping: THREE.CustomToneMapping,
                antialias: true,
            }}
        >
            {children}
        </Canvas>
    );
};

export default CanvasComponent;
