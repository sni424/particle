import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import blossoms from "/sakura.png?url"; // 경로를 실제 이미지 파일 경로로 변경하세요

const Spring = () => {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, blossoms);

  // 박스의 위치와 크기 설정
  const boxPosition = new THREE.Vector3(-0.5, 0.5, -2);
  const boxDimensions = { width: 7, height: 4, depth: 3 };

  const particles = Array.from({ length: 1000 }).map(() => ({
    position: new THREE.Vector3(
      boxPosition.x + (Math.random() - 0.5) * boxDimensions.width,
      boxPosition.y + (Math.random() - 0.5) * boxDimensions.height,
      boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.005,
      -0.002,
      (Math.random() - 0.5) * 0.005
    ),
    rotation: new THREE.Euler(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI
    ),
    rotationSpeed: new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01
    ),
  }));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      particles.forEach((particle, i) => {
        particle.position.add(particle.velocity);
        particle.rotation.x += particle.rotationSpeed.x;
        particle.rotation.y += particle.rotationSpeed.y;
        particle.rotation.z += particle.rotationSpeed.z;

        // 박스 내부로 파티클의 위치를 제한
        if (particle.position.y < boxPosition.y - boxDimensions.height / 2) {
          particle.position.y = boxPosition.y + boxDimensions.height / 2;
          particle.position.x =
            boxPosition.x + (Math.random() - 0.5) * boxDimensions.width;
          particle.position.z =
            boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth;
        }

        if (
          particle.position.x < boxPosition.x - boxDimensions.width / 2 ||
          particle.position.x > boxPosition.x + boxDimensions.width / 2
        ) {
          particle.velocity.x = -particle.velocity.x;
        }

        if (
          particle.position.z < boxPosition.z - boxDimensions.depth / 2 ||
          particle.position.z > boxPosition.z + boxDimensions.depth / 2
        ) {
          particle.velocity.z = -particle.velocity.z;
        }

        const matrix = new THREE.Matrix4()
          .makeRotationFromEuler(particle.rotation)
          .setPosition(particle.position);

        ref.current.setMatrixAt(i, matrix);
      });
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={ref} args={[null, null, particles.length]}>
      <planeGeometry args={[0.05, 0.05]} />
      <meshStandardMaterial
        map={texture}
        color={new THREE.Color(0xffc0cb)} // 분홍색으로 설정
        emissive={new THREE.Color(0xffc0cb)} // 분홍색으로 설정
        emissiveIntensity={1}
        transparent
      />
    </instancedMesh>
  );
};

export default Spring;
