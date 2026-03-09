import type { EnvironmentSpec } from '../types/world.js';

const worldStore = new Map<string, EnvironmentSpec>();

export const saveWorld = (world: EnvironmentSpec) => {
  worldStore.set(world.id, world);
  return world;
};

export const getWorld = (id: string) => worldStore.get(id);
