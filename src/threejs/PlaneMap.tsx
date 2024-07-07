import { Environment, OrbitControls } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import planeBlossom from '/palneBlossom.jpg?url';
import satoshi from '/satoshi.jpg?url';

const PlaneMap = () => {
    const { scene, camera } = useThree();
    const texture = useLoader(THREE.TextureLoader, satoshi);

    // 텍스처 설정
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;

    const planeGeo = new THREE.PlaneGeometry(20, 10);
    const planeMater = new THREE.MeshBasicMaterial({ map: texture });
    const newMesh = new THREE.Mesh(planeGeo, planeMater);
    newMesh.position.set(0.5, 1, 8);
    newMesh.rotation.y = Math.PI;
    scene.add(newMesh);

    return <>{newMesh && <primitive object={newMesh} />}</>;
};

export default PlaneMap;
