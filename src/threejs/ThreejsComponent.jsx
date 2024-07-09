import { Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreejsComponent = () => {
  const { scene, camera } = useThree();
  const orbit = useRef();
  const color = new THREE.Color(0x808080);
  scene.background = color;
  console.log(camera, orbit);
  // const boxGeo = new THREE.BoxGeometry(5, 4);
  // const boxMater = new THREE.MeshBasicMaterial({ color: 'red' });
  // const newMesh = new THREE.Mesh(boxGeo, boxMater);
  // newMesh.position.set(1, 1, 3.3);
  // scene.add(newMesh);
  useEffect(() => {
    if (camera) {
      camera.position.set(0.32, 1.2, 0.27);
      orbit.current.position0.set(0, 3, 5);
      orbit.current.target.set(
        -0.08293900397585911,
        0.5689524576974492,
        -0.6090364824553958
      );
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
