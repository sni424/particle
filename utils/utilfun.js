import * as THREE from 'three';

export const dfsFun = (optionData, meshName) => {
    let stack = [];
    if (optionData) {
        stack = [...optionData];
        while (stack.length > 0) {
            const object = stack.pop();
            if (object) {
                if (object.name === meshName) {
                    return object;
                } else {
                    if (object.children && object.children.length > 0) {
                        for (const child of object.children) {
                            stack.push(child);
                        }
                    }
                }
            }
        }
    }
};

export const centerAndZoomToObject = (findObject, camera, orbitControl) => {
    const box = new THREE.Box3().setFromObject(findObject);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // 카메라의 위치를 바운딩 박스의 크기에 기반하여 설정합니다.
    const maxSize = Math.max(size.x, size.y, size.z);
    const fovRadians = camera.fov * (Math.PI / 180);
    const distance = maxSize / 2 / Math.tan(fovRadians / 2.5);
    const cameraPosition = center.clone().add(new THREE.Vector3(0, 0, distance)); // 약간의 여유를 두어 모델 전체가 보이도록 합니다.

    // 카메라 위치와 타겟을 설정합니다.
    camera.position.set(cameraPosition.x, cameraPosition.y + 0.7, cameraPosition.z);

    camera.near = distance / 10;
    // camera.far = distance * 2;
    camera.updateProjectionMatrix();
    orbitControl.target.set(center.x, center.y, center.z);
    orbitControl.autoRotate = true;
};
