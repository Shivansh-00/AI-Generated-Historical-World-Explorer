import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FirstPersonControls, OrbitControls, Sky, Stats } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { EnvironmentSpec } from '../types/world';
import { generateWorldState } from '../engine/worldGenerator';
import { defaultCameraSettings } from '../engine/cameraController';
import { updateCrowdMotion } from '../engine/crowdSimulation';
import { getLODLevel } from '../utils/performance';
import { handleNPCClick } from '../engine/npcInteraction';
import { resolveWeather } from '../engine/weatherSystem';
import { useWorldStore } from '../store/worldStore';

interface HistoricalWorldSceneProps {
  world?: EnvironmentSpec;
  onNPCClick: (name: string) => void;
}

function RainParticles({ intensity }: { intensity: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = Math.floor(400 * intensity);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 120;
      arr[i * 3 + 1] = Math.random() * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return arr;
  }, [count]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    const position = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i += 1) {
      const yIndex = i * 3 + 1;
      position.array[yIndex] = (position.array[yIndex] as number) - delta * 20;
      if ((position.array[yIndex] as number) < 0) {
        position.array[yIndex] = 40;
      }
    }
    position.needsUpdate = true;
  });

  if (count <= 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#9ec5ff" size={0.15} transparent opacity={0.7} />
    </points>
  );
}

function BuildingInstances({ world }: { world: EnvironmentSpec }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const { city } = useMemo(() => generateWorldState(world), [world]);

  useEffect(() => {
    if (!ref.current) return;
    city.buildingMatrices.forEach((matrix, idx) => ref.current!.setMatrixAt(idx, matrix));
    ref.current.instanceMatrix.needsUpdate = true;
  }, [city]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, city.buildingMatrices.length]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#b6a189" />
    </instancedMesh>
  );
}

function NPCs({ world, onNPCClick }: { world: EnvironmentSpec; onNPCClick: (name: string) => void }) {
  const group = useRef<THREE.Group>(null);
  const { npcs } = useMemo(() => generateWorldState(world), [world]);

  useFrame((state) => {
    if (!group.current) return;
    updateCrowdMotion(group.current.children, state.clock.elapsedTime);
  });

  return (
    <group ref={group}>
      {npcs.map((npc) => (
        <mesh key={npc.id} position={npc.position} onClick={() => handleNPCClick(npc.name, onNPCClick)} castShadow>
          <capsuleGeometry args={[0.35, 1.1, 8, 12]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      ))}
    </group>
  );
}

function LODDebug() {
  const { camera, scene } = useThree();
  useFrame(() => {
    const sample = scene.children[0];
    if (!sample) return;
    getLODLevel(camera, sample);
  });
  return null;
}

function WorldContent({ world, onNPCClick }: HistoricalWorldSceneProps) {
  const cameraMode = useWorldStore((state) => state.cameraMode);
  if (!world) return null;
  const generated = generateWorldState(world);
  const weather = resolveWeather(world);

  return (
    <>
      <fog attach="fog" args={[weather.fogColor, weather.fogNear, weather.fogFar]} />
      <ambientLight intensity={generated.lighting.ambientIntensity} color={weather.lightColor} />
      <directionalLight intensity={generated.lighting.directionalIntensity} position={[8, 16, 4]} castShadow color={weather.lightColor} />
      <Sky distance={450000} sunPosition={generated.lighting.sunPosition} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[generated.terrainSize, generated.terrainSize]} />
        <meshStandardMaterial color={generated.groundColor} />
      </mesh>

      <BuildingInstances world={world} />
      <NPCs world={world} onNPCClick={onNPCClick} />

      {generated.city.roads.map((road) => (
        <mesh key={road.radius} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[road.radius, road.radius + road.width, 80]} />
          <meshBasicMaterial color="#1f2937" side={THREE.DoubleSide} />
        </mesh>
      ))}

      <RainParticles intensity={weather.rainIntensity} />

      {cameraMode === 'first-person' ? (
        <FirstPersonControls lookSpeed={defaultCameraSettings.lookSpeed} movementSpeed={defaultCameraSettings.movementSpeed} />
      ) : (
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />
      )}
      <LODDebug />
      <Stats />
    </>
  );
}

export default function HistoricalWorldScene({ world, onNPCClick }: HistoricalWorldSceneProps) {
  return (
    <Canvas camera={{ position: [0, 4, 12], fov: 65 }} shadows>
      <WorldContent world={world} onNPCClick={onNPCClick} />
    </Canvas>
  );
}
