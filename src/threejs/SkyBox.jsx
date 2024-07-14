import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import skybox_spring from '/skybox_spring.glb?url';

import skybox_winter from '/skybox_winter.glb?url';

const skyboxes = [skybox_spring, skybox_winter];

const SkyBox = ({ step }) => {
    const { scene } = useThree();
    const groupRef = useRef(new THREE.Group());
    const currentSkybox = skyboxes[step - 1];
    const skybox = useLoader(GLTFLoader, currentSkybox);

    useEffect(() => {
        const group = groupRef.current;

        // 그룹의 모든 자식 제거
        group.clear();

        if (skybox.scene) {
            // 새 모델 추가
            group.add(skybox.scene);
        }
    }, [skybox]);

    return <primitive ref={groupRef} object={groupRef.current} />;
};

export default SkyBox;
