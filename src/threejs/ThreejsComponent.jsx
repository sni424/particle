import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { centerAndZoomToObject } from "../../utils/utilfun";

const ThreejsComponent = ({ modelData, step, setAllModelsLoaded }) => {
  const { scene, camera } = useThree();
  const orbit = useRef();

  useEffect(() => {
    if (camera && modelData.length > 3 && scene) {
      centerAndZoomToObject(modelData[step - 1], camera, orbit.current);
      setAllModelsLoaded(true);
    }
  }, [camera, modelData, step]);

  return (
    <>
      <Environment preset="city" />
      <OrbitControls ref={orbit} enablePan={false} />
    </>
  );
};

export default ThreejsComponent;
