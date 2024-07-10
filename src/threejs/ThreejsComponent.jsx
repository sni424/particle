import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { centerAndZoomToObject } from "../../utils/utilfun";

import dance from "/dancing_hall_1k.hdr?url";

const ThreejsComponent = ({ modelData }) => {
  const { scene, camera, gl } = useThree();
  const orbit = useRef();

  // const color = new THREE.Color(0xa6e1d3);
  scene.background = null;
  gl.autoClear = false;
  gl.setClearColor(0xffffff, 0.0);
  console.log(camera, orbit);
  // const boxGeo = new THREE.BoxGeometry(2, 2);
  // const boxMater = new THREE.MeshBasicMaterial({ color: 'red' });
  // const newMesh = new THREE.Mesh(boxGeo, boxMater);
  // newMesh.position.set(0, 0, -1);
  // scene.add(newMesh);

  useEffect(() => {
    if (camera && modelData) {
      centerAndZoomToObject(modelData, camera, orbit.current);
    }
  }, [camera, modelData]);

  return (
    <>
      <Environment
        // preset="sunset"
        files={dance}
      />
      <OrbitControls ref={orbit} />
    </>
  );
};

export default ThreejsComponent;
