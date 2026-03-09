import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export const loadModel = (path: string) => {
  return new Promise<unknown>((resolve, reject) => {
    loader.load(path, resolve, undefined, reject);
  });
};
