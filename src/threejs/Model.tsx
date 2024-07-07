import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Corrected path
import room from '/scene (1).glb?url';

const Model = () => {
    const gltf = useLoader(GLTFLoader, room);
    return <primitive object={gltf.scene} />;
};

export default Model;
