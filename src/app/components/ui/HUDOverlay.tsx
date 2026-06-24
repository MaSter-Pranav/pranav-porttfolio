'use client';

import { motion } from 'framer-motion';
import TelemetryTicker from './TelemetryTicker';
import { useCountUp } from '../../hooks/useCountUp';

type HUDOverlayProps = {
  className?: string;
};

export default function HUDOverlay({ className = '' }: HUDOverlayProps) {
  const percentage = useCountUp({ to: 80, durationMs: 1800, decimals: 0 });
  const hoursSaved = useCountUp({ to: 15, durationMs: 2000, decimals: 0 });
  const uptime = useCountUp({ from: 0, to: 99.9, durationMs: 1600, decimals: 1 });
  const latencyDrop = useCountUp({ from: 0, to: 25, durationMs: 1700, decimals: 0, formatter: (value) => `${Math.round(value)}%` });

  return (
    <div className={`pointer-events-none fixed bottom-6 right-6 z-50 flex w-full max-w-[440px] flex-col items-end gap-4 px-4 ${className}`}>
      <div className="w-full rounded-3xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl px-5 py-4 shadow-[0_0_80px_rgba(14,165,233,0.08)]">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'PERFORMANCE SCALE', value: `${percentage}%`, accent: 'text-sky-400' },
            { label: 'WEEKLY AUTOMATION', value: `${hoursSaved}+ HRS`, accent: 'text-emerald-400' },
            { label: 'PLATFORM UPTIME', value: `${uptime}%`, accent: 'text-white' },
            { label: 'PIPELINE LATENCY DROP', value: `${latencyDrop}`, accent: 'text-violet-400' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
              <p className={`mt-3 text-2xl font-black tracking-tight ${item.accent}`}>{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <TelemetryTicker className="w-full" />
    </div>
  );
}
