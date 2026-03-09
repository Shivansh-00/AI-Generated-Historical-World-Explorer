import { create } from 'zustand';
import type { EnvironmentSpec } from '../types/world';

export type CameraMode = 'orbit' | 'first-person';

interface WorldState {
  currentWorld?: EnvironmentSpec;
  selectedNPC?: string;
  timelineYear?: number;
  cameraMode: CameraMode;
  isLoading: boolean;
  npcAnswer?: string;
  errorMessage?: string;
  setWorld: (world?: EnvironmentSpec) => void;
  setSelectedNPC: (npc?: string) => void;
  setTimelineYear: (year?: number) => void;
  setCameraMode: (mode: CameraMode) => void;
  setLoading: (loading: boolean) => void;
  setNPCAnswer: (answer?: string) => void;
  setErrorMessage: (message?: string) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  cameraMode: 'first-person',
  isLoading: false,
  setWorld: (currentWorld) => set({ currentWorld }),
  setSelectedNPC: (selectedNPC) => set({ selectedNPC }),
  setTimelineYear: (timelineYear) => set({ timelineYear }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setLoading: (isLoading) => set({ isLoading }),
  setNPCAnswer: (npcAnswer) => set({ npcAnswer }),
  setErrorMessage: (errorMessage) => set({ errorMessage })
}));
