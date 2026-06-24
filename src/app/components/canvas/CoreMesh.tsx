'use client';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type CoreMeshProps = {
  pageState: 'home' | 'infrastructure' | 'protocols';
  morphStrength: number;
  audioLevel?: number;
};

export default function CoreMesh({ pageState, morphStrength, audioLevel = 0 }: CoreMeshProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const previousMouse = useRef({ x: 0, y: 0 });

  const count = 2000;
  const [positions, originalPositions, stepFactors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const steps = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.2;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = orig[i * 3] = x;
      pos[i * 3 + 1] = orig[i * 3 + 1] = y;
      pos[i * 3 + 2] = orig[i * 3 + 2] = z;
      steps[i] = 0.6 + Math.random() * 2.4;
    }

    return [pos, orig, steps] as const;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geometry = pointsRef.current?.geometry;
    if (!geometry) return;

    const positionsArray = geometry.attributes.position.array as Float32Array;
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    const mouseAccel = Math.hypot(mouse.x - previousMouse.current.x, mouse.y - previousMouse.current.y);
    previousMouse.current = { x: mouse.x, y: mouse.y };

    const homeBias = pageState === 'home' ? 1.0 : pageState === 'infrastructure' ? 0.56 : 0.22;
    const infraBias = pageState === 'infrastructure' ? 1.0 : pageState === 'protocols' ? 0.24 : 0.1;
    const protocolBias = pageState === 'protocols' ? 1.0 : pageState === 'home' ? 0.2 : 0.35;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = stepFactors[i];
      const baseX = originalPositions[i3];
      const baseY = originalPositions[i3 + 1];
      const baseZ = originalPositions[i3 + 2];

      const phase = time * 0.18 + baseZ * 0.4;
      const homeTargetX = baseX * 0.42 + Math.sin(phase * 1.2) * 0.08;
      const homeTargetY = baseY * 0.42 + Math.cos(phase * 1.35) * 0.08;
      const homeTargetZ = baseZ * 0.22 + Math.sin(phase * 1.6) * 0.08;
      const infraTargetX = ((i % 50) - 25) * 0.15;
      const infraTargetY = Math.sin((i / 60) + time * 0.9) * 0.5;
      const infraTargetZ = (Math.floor(i / 50) - 20) * 0.12;
      const protocolTargetX = ((i % 40) - 20) * 0.12;
      const protocolTargetY = (Math.floor(i / 40) - 25) * 0.12;
      const protocolTargetZ = ((i % 8) - 4) * 0.24;

      const targetPositionX = homeTargetX * homeBias + infraTargetX * infraBias + protocolTargetX * protocolBias;
      const targetPositionY = homeTargetY * homeBias + infraTargetY * infraBias + protocolTargetY * protocolBias;
      const targetPositionZ = homeTargetZ * homeBias + infraTargetZ * infraBias + protocolTargetZ * protocolBias;

      const focusDX = targetX * (1 + mouseAccel * 1.2) - positionsArray[i3];
      const focusDY = targetY * (1 + mouseAccel * 1.2) - positionsArray[i3 + 1];
      const attraction = Math.min(0.08 + mouseAccel * 0.05, 0.32) * speed * morphStrength;

      positionsArray[i3] += (targetPositionX - positionsArray[i3]) * attraction;
      positionsArray[i3 + 1] += (targetPositionY - positionsArray[i3 + 1]) * attraction;
      positionsArray[i3 + 2] += (targetPositionZ - positionsArray[i3 + 2]) * attraction;

      const audioBoost = 1 + audioLevel * 1.6; // audioLevel 0..1 amplifies motion
      const waveStrength = Math.sin(time * (0.45 + audioLevel * 0.35) + i * 0.02) * (0.02 + audioLevel * 0.035);
      positionsArray[i3] += Math.sin(time * (1.2 + audioLevel * 0.8) + baseY) * waveStrength * speed * homeBias * audioBoost;
      positionsArray[i3 + 1] += Math.cos(time * (1.35 + audioLevel * 0.9) + baseX) * waveStrength * speed * homeBias * audioBoost;
      positionsArray[i3 + 2] += Math.sin(time * (1.1 + audioLevel * 0.6) + baseX * baseY) * waveStrength * speed * infraBias * audioBoost;
    }

    geometry.attributes.position.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.035 + morphStrength * 0.12;
      pointsRef.current.rotation.x = Math.sin(time * 0.12) * 0.08;
      pointsRef.current.rotation.z = Math.cos(time * 0.09) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#38bdf8"
        transparent
        opacity={0.78}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
