import * as THREE from 'three';

export const updateCrowdMotion = (nodes: THREE.Object3D[], elapsed: number) => {
  nodes.forEach((node, idx) => {
    node.position.x += Math.sin(elapsed * 0.5 + idx) * 0.002;
    node.position.z += Math.cos(elapsed * 0.5 + idx) * 0.002;
    node.rotation.y = elapsed * 0.1 + idx;
  });
};
