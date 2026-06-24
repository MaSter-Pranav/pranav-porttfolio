'use client';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useMemo, useState } from 'react';

type NodeDefinition = {
  label: string;
  accent: string;
  color: string;
};

const sagaNodes: NodeDefinition[] = [
  { label: 'FLIGHT', accent: 'text-sky-400', color: '#38bdf8' },
  { label: 'HOTEL', accent: 'text-emerald-400', color: '#34d399' },
  { label: 'TRANSPORT', accent: 'text-violet-400', color: '#c084fc' },
];

export function SagaPatternVisualizer() {
  const [compensating, setCompensating] = useState(false);
  const { scrollYProgress } = useScroll();
  const pulse = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.4, 0.9]);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(pulse, 'change', () => {
    // Force the motion system to stay alive for smooth stage transitions.
  });

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-sky-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_32%)]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-400">SAGA PATTERN VISUALIZER</p>
          <h2 className="text-3xl font-black text-white">Reactive transaction flow with compensating recovery.</h2>
          <p className="max-w-xl text-sm leading-relaxed text-slate-400">
            Signal the core orchestration network by hovering the failure node. The visualizer flips the execution stream into a compensating transaction state, showing how Flight, Hotel, and Transport bookings remain consistent even during rollback conditions.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => {
                setHovered(true);
                setCompensating(true);
              }}
              onHoverEnd={() => {
                setHovered(false);
                setCompensating(false);
              }}
              className="rounded-full border border-rose-500 px-5 py-3 text-xs uppercase tracking-[0.35em] text-rose-300 transition-colors hover:bg-rose-500/10"
            >
              Failure state
            </motion.button>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4 text-xs text-slate-400">
              <p className="font-mono text-slate-500 uppercase tracking-[0.35em]">COMPENSATING TRANSACTION</p>
              <p className="mt-2 text-sm text-slate-300">
                {compensating ? 'Reversing affected nodes and replaying safe events.' : 'Hover failure to simulate rollback propagation.'}
              </p>
            </div>
          </div>
        </div>

        <motion.div
          style={{ scale: pulse, opacity: glow }}
          className="group relative flex min-h-[360px] items-center justify-center rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6"
        >
          <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
          <div className="absolute inset-y-8 left-6 w-px bg-gradient-to-b from-transparent via-sky-500/40 to-transparent" />

          <div className="relative flex h-full w-full items-center justify-between gap-6">
            {sagaNodes.map((node, index) => (
              <motion.div
                key={node.label}
                animate={{ y: hovered ? [0, -10, 0] : [0, 4, 0], scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut', repeat: hovered ? Infinity : 0, repeatType: 'reverse' }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="relative flex h-24 w-24 items-center justify-center rounded-full border border-slate-800 shadow-[0_0_25px_rgba(56,189,248,0.18)]"
                  style={{ backgroundColor: `${node.color}12` }}
                >
                  <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-white/5 via-slate-900/10 to-transparent" />
                  <div
                    className="h-14 w-14 rounded-full border border-white/10"
                    style={{ boxShadow: `0 0 40px 8px ${node.color}30` }}
                  />
                </div>
                <span className={`text-xs uppercase tracking-[0.35em] ${node.accent}`}>{node.label}</span>
              </motion.div>
            ))}
          </div>

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M10,70 C30,10 70,10 90,70"
              fill="none"
              stroke={compensating ? '#f43f5e' : '#38bdf8'}
              strokeWidth="1.6"
              strokeDasharray={compensating ? '3 3' : '6 4'}
              style={{ transition: 'stroke 0.25s ease, stroke-dasharray 0.25s ease' }}
            />
            <path
              d="M10,30 L50,60 L90,30"
              fill="none"
              stroke={compensating ? '#f472b6' : '#34d399'}
              strokeWidth="1.4"
              strokeDasharray={compensating ? '2 4' : '5 5'}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

export function MonolithDissolution() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [1, 0.78, 0.6, 0.55]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [1, 0.92, 0.6, 0.15]);
  const fragmentOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.75, 1], [0, 0.4, 0.85, 1]);
  const fragmentOffset = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const fragments = useMemo(() => new Array(12).fill(null).map((_, index) => index), []);

  useMotionValueEvent(fragmentOffset, 'change', () => {
    // Keep the CSS render pipeline active while the fragments expand.
  });

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-emerald-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),_transparent_36%)]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">MONOLITH DISSOLUTION</p>
          <h2 className="text-3xl font-black text-white">From a glass block monolith to glowing microservice clusters.</h2>
          <p className="max-w-xl text-sm leading-relaxed text-slate-400">
            Scroll deeper to watch the rigid glass container fracture into autonomous microservice voxels. This motion represents the XRM V2 architectural transition from legacy rigidity to modular, observable distributed systems.
          </p>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center">
          <motion.div
            style={{ scale, opacity }}
            className="absolute inset-x-10 top-12 bottom-12 rounded-[2rem] border border-slate-700/70 bg-white/5 backdrop-blur-xl"
          />
          <div className="relative z-10 grid grid-cols-3 gap-4">
            {fragments.map((fragment) => (
              <motion.div
                key={fragment}
                initial={{ opacity: 0.1, scale: 0.65 }}
                style={{ opacity: fragmentOpacity, y: fragmentOffset, scale: fragmentOffset }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="h-20 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-[0_0_30px_rgba(34,197,94,0.12)]"
              >
                <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 p-3">
                  <div className="h-full w-full rounded-2xl border border-white/5 bg-slate-950/90" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
