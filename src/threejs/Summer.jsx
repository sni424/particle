import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Summer = () => {
    const ref = useRef();

    // 박스의 중심 위치와 크기 설정
    const boxPosition = new THREE.Vector3(0, 2, 0);
    const boxDimensions = { width: 5, height: 5, depth: 5 };
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
                -0.02 - Math.random() * 0.02, // 속도를 두 배 빠르게 설정
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
                        -0.02 - Math.random() * 0.02, // 속도를 두 배 빠르게 설정
                        (Math.random() - 0.5) * 0.002
                    );
                }
                const matrix = new THREE.Matrix4().setPosition(particle.position).scale(new THREE.Vector3(0.1, 1, 0.1)); // 비 모양으로 길쭉하게 스케일 조정
                ref.current.setMatrixAt(i, matrix);
            });
            ref.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={ref} args={[null, null, 2000]}>
            <cylinderGeometry args={[0.02, 0.02, 0.08, 16]} />
            <meshStandardMaterial
                color={new THREE.Color(0xffffff)}
                emissive={new THREE.Color(0xffffff)}
                metalness={1}
                roughness={0}
                emissiveIntensity={0.7}
            />
        </instancedMesh>
    );
};

export default Summer;
