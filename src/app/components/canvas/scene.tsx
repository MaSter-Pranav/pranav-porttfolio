'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CoreMesh from './CoreMesh';
import AudioManager from './AudioManager';

type ScenePageState = 'home' | 'infrastructure' | 'protocols';

function resolvePageState(pathname: string | null): ScenePageState {
  if (!pathname) return 'home';
  if (pathname.startsWith('/infrastructure')) return 'infrastructure';
  if (pathname.startsWith('/protocols')) return 'protocols';
  return 'home';
}

export default function Scene() {
  const pathname = usePathname();
  const pageState = useMemo<ScenePageState>(() => resolvePageState(pathname), [pathname]);
  const { scrollYProgress } = useScroll();
  const morphValue = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0.22, 0.55, 0.78, 1.0]);
  const [morphStrength, setMorphStrength] = React.useState<number>(0.22);
  const [audioLevel, setAudioLevel] = React.useState<number>(0);

  useMotionValueEvent(morphValue, 'change', (value) => {
    setMorphStrength(value);
  });

  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 58 }}>
        <fog attach="fog" args={['#020617', 4, 16]} />
        <ambientLight intensity={0.18} />
        <pointLight position={[-10, -10, -10]} color="#1e1b4b" intensity={3.8} />
        <pointLight position={[10, 10, 10]} color="#0369a1" intensity={6.4} />
        <Stars radius={80} depth={40} count={2800} factor={4} saturation={0.55} fade speed={1.8} />
        <AudioManager onLevel={setAudioLevel} />
        <CoreMesh pageState={pageState} morphStrength={morphStrength} audioLevel={audioLevel} />
      </Canvas>
    </div>
  );
}
