import { Environment, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreejsComponent = () => {
    const { scene, camera } = useThree();
    const orbit = useRef();

    // const boxGeo = new THREE.BoxGeometry(5, 4);
    // const boxMater = new THREE.MeshBasicMaterial({ color: 'red' });
    // const newMesh = new THREE.Mesh(boxGeo, boxMater);
    // newMesh.position.set(1, 1, 3.3);
    // scene.add(newMesh);
    useEffect(() => {
        if (camera) {
            camera.position.set(0.04, 1.57, -0.4);
            orbit.current.position0.set(0, 3.06, 5);
            orbit.current.target.set(-0.27294223572609505, 1.3848387774436992, 0.9717040457644204);
        }
    }, [camera]);

    return (
        <>
            <Environment preset="city" />
            <OrbitControls ref={orbit} />
        </>
    );
};

export default ThreejsComponent;
