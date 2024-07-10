import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Corrected path
import { useEffect, useRef } from "react";
import { dfsFun } from "../../utils/utilfun";
import * as THREE from "three";

import cherry from "/scene (89).glb?url";

const Model = ({ setModelData }) => {
  const gltf = useLoader(GLTFLoader, cherry);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current && gltf.scene) {
      setModelData(gltf.scene);
      //   const treeLeaf = dfsFun(gltf.scene.children, "Cylinder006");
      //   treeLeaf.emissiveIntensity = 1;
      //   treeLeaf.material.depthWrite = true;
      //   treeBranch.material.depthWrite = true;
    }
  }, [gltf.scene]);

  return <primitive ref={modelRef} object={gltf.scene} />;
};

export default Model;
