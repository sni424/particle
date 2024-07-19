import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";

import cherry from "/model/scene (89).glb?url";
import summer from "/model/summer.glb?url";
import autum from "/model/autum.glb?url";
import tree from "/model/xmas_tree.glb?url";

const models = [cherry, summer, autum, tree];

const Model = ({ modelData, setModelData, step, setAllModelsLoaded }) => {
  const groupRef = useRef(new THREE.Group());
  const { scene } = useThree();

  useEffect(() => {
    const loaders = models.map(
      (modelUrl) =>
        new Promise((resolve) => {
          const loader = new GLTFLoader();
          loader.load(modelUrl, (gltf) => {
            resolve(gltf.scene);
          });
        })
    );

    Promise.all(loaders).then((scenes) => {
      setModelData(scenes);
      // 모든 모델이 로드된 후 로더 상태 업데이트
    });
  }, [setModelData]);

  useEffect(() => {
    const group = groupRef.current;
    group.clear();

    if (step > 0 && modelData) {
      setModelData((pre) => {
        if (pre[step - 1]) {
          group.add(pre[step - 1]);
        }
        return pre;
      });
      scene.add(group); // 씬에 그룹 추가
    }

    return () => {
      scene.remove(group); // 컴포넌트 언마운트 시 씬에서 그룹 제거
    };
  }, [step, modelData, scene]);

  return null; // <primitive> 대신 null을 반환하여 그룹을 직접 씬에 추가
};

export default Model;
