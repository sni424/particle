import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Corrected path
import room from '/scene (1).glb?url';
import cherry from '/sakura_spring.glb?url';
import { useEffect, useRef } from 'react';
import { dfsFun } from '../../utils/utilfun';

const Model = ({ setModelData }) => {
    const gltf = useLoader(GLTFLoader, cherry);
    const modelRef = useRef();

    useEffect(() => {
        if (modelRef.current && gltf.scene) {
            setModelData(gltf.scene);

            // Model에 다른 레이어를 할당 (1번 레이어)
            modelRef.current.layers.set(2);
            const treeLeaf = dfsFun(gltf.scene.children, 'sakura_tree_sakura_tree01_0');
            const treeBranch = dfsFun(gltf.scene.children, 'sakura_tree_sakura_tree03_0');
            treeLeaf.material.depthWrite = true;
            treeBranch.material.depthWrite = true;
        }
    }, [gltf.scene]);
    return <primitive ref={modelRef} object={gltf.scene} />;
};

export default Model;
