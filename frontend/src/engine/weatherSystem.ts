import type { EnvironmentSpec } from '../types/world';

export type WeatherMode = 'clear' | 'fog' | 'rain' | 'sunset';

export interface WeatherState {
  mode: WeatherMode;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  rainIntensity: number;
  lightColor: string;
}

export const resolveWeather = (world?: EnvironmentSpec): WeatherState => {
  if (!world) {
    return { mode: 'clear', fogColor: '#bcd7ff', fogNear: 60, fogFar: 280, rainIntensity: 0, lightColor: '#ffffff' };
  }

  if (world.climate === 'tropical') {
    return { mode: 'rain', fogColor: '#8ba4b8', fogNear: 40, fogFar: 180, rainIntensity: 0.7, lightColor: '#dce7f2' };
  }

  if (world.environment.toLowerCase().includes('revolution')) {
    return { mode: 'fog', fogColor: '#9ea3ad', fogNear: 35, fogFar: 140, rainIntensity: 0, lightColor: '#e9edf3' };
  }

  if (Math.abs(world.currentYear) > 1200) {
    return { mode: 'sunset', fogColor: '#f1b48d', fogNear: 55, fogFar: 220, rainIntensity: 0, lightColor: '#ffd3b8' };
  }

  return { mode: 'clear', fogColor: '#bcd7ff', fogNear: 60, fogFar: 280, rainIntensity: 0, lightColor: '#ffffff' };
};
