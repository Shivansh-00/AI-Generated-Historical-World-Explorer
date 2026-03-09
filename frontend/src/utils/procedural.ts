import * as THREE from 'three';
import type { EnvironmentSpec } from '../types/world';

export const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const createBuildingTransforms = (world: EnvironmentSpec) => {
  const transforms: THREE.Matrix4[] = [];
  const count = Math.min(200, world.buildings.length * 40);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 15 + (i % 8) * 3 + seededRandom(i) * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = 0.8;
    const scale = 0.9 + (i % 3) * 0.5;
    const m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0)), new THREE.Vector3(scale, scale + 1, scale));
    transforms.push(m);
  }
  return transforms;
};
