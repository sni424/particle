import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Autum = () => {
    const ref = useRef();

    // 단풍 모양의 ShapeGeometry를 생성
    const leafShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);

        // 첫번째 잎사귀
        shape.bezierCurveTo(0.2, 0.8, 0.6, 1.0, 0.2, 1.2);
        shape.bezierCurveTo(0.6, 1.2, 0.4, 1.4, 0, 1.2);

        // 두번째 잎사귀
        shape.bezierCurveTo(-0.4, 1.4, -0.6, 1.2, -0.2, 1.2);
        shape.bezierCurveTo(-0.6, 1.0, -0.2, 0.8, 0, 0);

        // 세번째 잎사귀
        shape.bezierCurveTo(-0.6, 0.4, -1.2, 0.4, -1.0, 0.0);
        shape.bezierCurveTo(-1.2, -0.4, -0.6, -0.4, 0, 0);

        // 네번째 잎사귀
        shape.bezierCurveTo(-0.4, -0.6, -0.4, -1.2, 0, -1.0);
        shape.bezierCurveTo(0.4, -1.2, 0.4, -0.6, 0, 0);

        // 다섯번째 잎사귀
        shape.bezierCurveTo(0.4, -0.4, 1.2, -0.4, 1.0, 0.0);
        shape.bezierCurveTo(1.2, 0.4, 0.6, 0.4, 0, 0);
        return new THREE.ShapeGeometry(shape);
    }, []);

    // 박스의 중심 위치와 크기 설정
    const boxPosition = new THREE.Vector3(0, 4, 0);
    const boxDimensions = { width: 20, height: 20, depth: 20 };

    const particles = useMemo(() => {
        return Array.from({ length: 2000 }).map(() => ({
            position: new THREE.Vector3(
                boxPosition.x + (Math.random() - 0.5) * boxDimensions.width,
                boxPosition.y + (Math.random() - 0.5) * boxDimensions.height,
                boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                -0.005 - Math.random() * 0.005,
                (Math.random() - 0.5) * 0.01
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
                if (particle.position.y < 2) {
                    particle.position.set(
                        boxPosition.x + (Math.random() - 0.5) * boxDimensions.width,
                        boxPosition.y + boxDimensions.height / 2,
                        boxPosition.z + (Math.random() - 0.5) * boxDimensions.depth
                    );
                    particle.velocity.set(
                        (Math.random() - 0.5) * 0.01,
                        -0.005 - Math.random() * 0.005,
                        (Math.random() - 0.5) * 0.01
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
                    .setPosition(particle.position)
                    .scale(new THREE.Vector3(0.1, 0.1, 0.1)); // 스케일 조정

                ref.current.setMatrixAt(i, matrix);
            });
            ref.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={ref} args={[leafShape, null, particles.length]}>
            <meshStandardMaterial
                color={new THREE.Color(0xdf3c00)} // 단풍색으로 설정
                emissive={new THREE.Color(0xdf3c00)} // 단풍색으로 설정
                emissiveIntensity={0.8}
                transparent
            />
        </instancedMesh>
    );
};

export default Autum;
