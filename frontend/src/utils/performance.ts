import * as THREE from 'three';

export const getLODLevel = (camera: THREE.Camera, target: THREE.Object3D) => {
  const cameraPosition = new THREE.Vector3();
  const targetPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  target.getWorldPosition(targetPosition);
  const distance = cameraPosition.distanceTo(targetPosition);

  if (distance < 20) return 'high';
  if (distance < 60) return 'medium';
  return 'low';
};

export const frustumCull = (camera: THREE.Camera, objects: THREE.Object3D[]) => {
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(matrix);
  return objects.filter((obj) => frustum.intersectsObject(obj));
};
