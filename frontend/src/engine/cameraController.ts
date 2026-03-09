import { WORLD_SETTINGS } from '../constants/worldConfig';

export interface CameraSettings {
  movementSpeed: number;
  lookSpeed: number;
  collisionRadius: number;
}

export const defaultCameraSettings: CameraSettings = {
  movementSpeed: WORLD_SETTINGS.baseMovementSpeed,
  lookSpeed: WORLD_SETTINGS.baseLookSpeed,
  collisionRadius: 0.75
};
