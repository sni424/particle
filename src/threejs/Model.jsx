import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import cherry from '/model/scene (89).glb?url';
import autum from '/model/autum.glb?url';
import tree from '/model/xmas_tree.glb?url';

const models = [cherry, autum, tree];

const Model = ({ setModelData, step, onLoad }) => {
    const groupRef = useRef(new THREE.Group());
    const currentModel = models[step - 1];
    const model = useLoader(GLTFLoader, currentModel);

    useEffect(() => {
        const group = groupRef.current;

        // 그룹의 모든 자식 제거
        group.clear();

        if (model.scene) {
            // 새 모델 추가
            group.add(model.scene);
            setModelData(model.scene);
            onLoad(); // 모델 로드 완료 시 호출
        }
    }, [model, onLoad]);

    return <primitive ref={groupRef} object={groupRef.current} />;
};

export default Model;
