import * as THREE from 'three';
import type { EnvironmentSpec } from '../types/world';
import { WORLD_SETTINGS } from '../constants/worldConfig';

export interface CityData {
  buildingMatrices: THREE.Matrix4[];
  roads: Array<{ radius: number; width: number }>;
  districts: Array<{ name: string; center: [number, number, number] }>;
}

export const generateCityLayout = (world: EnvironmentSpec): CityData => {
  const targetBuildings = Math.floor(WORLD_SETTINGS.npcCount * WORLD_SETTINGS.buildingDensity * 10);
  const count = Math.min(240, Math.max(40, Math.max(world.buildings.length * 50, targetBuildings)));
  const buildingMatrices: THREE.Matrix4[] = [];

  for (let i = 0; i < count; i += 1) {
    const ring = 10 + (i % 10) * 2.5;
    const theta = (i / count) * Math.PI * 2;
    const noise = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const x = Math.cos(theta) * (ring + noise * 2);
    const z = Math.sin(theta) * (ring + noise * 2);
    const scale = 0.8 + ((i % 4) * 0.35);

    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(x, 0.9, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, theta, 0)),
      new THREE.Vector3(scale, scale + 0.8, scale)
    );
    buildingMatrices.push(matrix);
  }

  return {
    buildingMatrices,
    roads: [
      { radius: 8, width: 1.5 },
      { radius: 20, width: 2.5 },
      { radius: 32, width: 3 }
    ].slice(0, WORLD_SETTINGS.ringRoadCount),
    districts: [
      { name: 'trade', center: [0, 0, 0] },
      { name: 'residential', center: [14, 0, 6] },
      { name: 'civic', center: [-12, 0, -8] }
    ]
  };
};
