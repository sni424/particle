import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Winter = () => {
    const ref = useRef();

    // 박스의 중심 위치와 크기 설정
    const boxPosition = new THREE.Vector3(0, 5, 0);
    const boxDimensions = { width: 20, height: 20, depth: 20 };

    // 파티클의 위치와 속도를 생성
    const particles = useMemo(() => {
        return Array.from({ length: 2000 }).map(() => ({
            position: new THREE.Vector3(
                boxPosition.x + (Math.random() - 0.5) * boxDimensions.width,
                boxPosition.y + (Math.random() - 0.5) * boxDimensions.height,
                boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.002,
                -0.01 - Math.random() * 0.01,
                (Math.random() - 0.5) * 0.002
            ),
        }));
    }, [boxPosition, boxDimensions]);

    useFrame(() => {
        if (ref.current) {
            particles.forEach((particle, i) => {
                particle.position.add(particle.velocity);
                if (particle.position.y < boxPosition.y - boxDimensions.height / 2) {
                    particle.position.set(
                        boxPosition.x + (Math.random() - 0.5) * boxDimensions.width, // x
                        boxPosition.y + boxDimensions.height / 2, // y를 상위로 초기화
                        boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth // z
                    );
                    particle.velocity.set(
                        (Math.random() - 0.5) * 0.002,
                        -0.01 - Math.random() * 0.01, // y 속도
                        (Math.random() - 0.5) * 0.002
                    );
                }
                const matrix = new THREE.Matrix4()
                    .setPosition(particle.position)
                    .scale(new THREE.Vector3(0.5, 0.5, 0.5)); // 스케일 조정
                ref.current.setMatrixAt(i, matrix);
            });
            ref.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={ref} args={[null, null, 2000]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
                color={new THREE.Color(0xffffff)}
                emissive={new THREE.Color(0xffffff)} // 분홍색으로 설정
                emissiveIntensity={0.8}
            />
        </instancedMesh>
    );
};

export default Winter;
