import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Corrected path
import room from "/scene (1).glb?url";
import cherry from "/sakura_spring.glb?url";

const Model = () => {
  const gltf = useLoader(GLTFLoader, cherry);
  return <primitive object={gltf.scene} />;
};

export default Model;
