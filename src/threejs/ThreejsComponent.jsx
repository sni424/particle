import { Environment, MeshReflectorMaterial, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { centerAndZoomToObject } from '../../utils/utilfun';

const ThreejsComponent = ({ modelData }) => {
    const { camera } = useThree();
    const orbit = useRef();

    useEffect(() => {
        if (camera && modelData) {
            centerAndZoomToObject(modelData, camera, orbit.current);
        }
    }, [camera, modelData]);

    return (
        <>
            <Environment preset="city" />
            <OrbitControls ref={orbit} />
        </>
    );
};

export default ThreejsComponent;
