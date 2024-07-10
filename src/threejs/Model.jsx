import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Corrected path
import { useEffect, useRef } from "react";
import { dfsFun } from "../../utils/utilfun";
import * as THREE from "three";

import cherry from "/sakura_spring.glb?url";
import dyson from "/scene (88).glb?url";
import lamp from "/lamp metal (Anisotropy Intensity).png?url";

const Model = ({ setModelData }) => {
  const gltf = useLoader(GLTFLoader, dyson);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current && gltf.scene) {
      setModelData(gltf.scene);

      //   const treeLeaf = dfsFun(gltf.scene.children, "Cylinder006");
      //   treeLeaf.emissiveIntensity = 1;
      //   treeLeaf.material.depthWrite = true;
      //   treeBranch.material.depthWrite = true;
      const newColor = new THREE.Color("#ffc23d");
      const treeLeaf = dfsFun(gltf.scene.children, "Cylinder006");
      treeLeaf.material.Color = newColor;
      treeLeaf.material.emissiveIntensity = 3;
    }
  }, [gltf.scene]);

  return <primitive ref={modelRef} object={gltf.scene} />;
};

export default Model;
