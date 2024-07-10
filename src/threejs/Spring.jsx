import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Spring = () => {
  const ref = useRef();

  // 꽃잎 모양의 ShapeGeometry를 생성 (크기를 줄임)
  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.025); // 크기 줄임
    shape.bezierCurveTo(0.0125, 0.0125, 0.0125, -0.0125, 0, -0.025); // 크기 줄임
    shape.bezierCurveTo(-0.0125, -0.0125, -0.0125, 0.0125, 0, 0.025); // 크기 줄임
    return new THREE.ShapeGeometry(shape);
  }, []);

  // 박스의 중심 위치와 크기 설정
  const boxPosition = new THREE.Vector3(0, 0.5, -1);
  const boxDimensions = { width: 3, height: 3, depth: 3 };

  const particles = useMemo(() => {
    return Array.from({ length: 2000 }).map(() => ({
      position: new THREE.Vector3(
        boxPosition.x + (Math.random() - 0.5) * boxDimensions.width,
        boxPosition.y + (Math.random() - 0.5) * boxDimensions.height,
        boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        -0.001,
        (Math.random() - 0.5) * 0.002
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
  }, [boxPosition, boxDimensions]);

  useFrame(() => {
    if (ref.current) {
      particles.forEach((particle, i) => {
        particle.position.add(particle.velocity);
        particle.rotation.x += particle.rotationSpeed.x;
        particle.rotation.y += particle.rotationSpeed.y;
        particle.rotation.z += particle.rotationSpeed.z;

        // 파티클의 위치 초기화
        if (particle.position.y < -1) {
          particle.position.set(
            boxPosition.x + (Math.random() - 0.5) * boxDimensions.width,
            boxPosition.y + boxDimensions.height / 2,
            boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth
          );
          particle.velocity.set(
            (Math.random() - 0.5) * 0.002,
            -0.002,
            (Math.random() - 0.5) * 0.002
          );
        }

        // 박스 내부로 파티클의 위치를 제한
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
    <instancedMesh ref={ref} args={[petalShape, null, particles.length]}>
      <meshStandardMaterial
        color={new THREE.Color(0xffc0cb)} // 분홍색으로 설정
        emissive={new THREE.Color(0xffc0cb)} // 분홍색으로 설정
        emissiveIntensity={1}
        transparent
      />
    </instancedMesh>
  );
};

export default Spring;
