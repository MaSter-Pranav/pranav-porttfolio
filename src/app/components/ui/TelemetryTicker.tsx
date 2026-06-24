'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type TelemetryTickerProps = {
  className?: string;
};

const telemetryStrings = [
  '[SYS_OK] // KAFKA_MESSAGE_INGESTED // GRPC_STREAM_IDLE // OVERHEAD_REDUCED_BY_25%',
  '[NODE_HEALTH] // OUTBOX_SYNC_COMPLETED // SAGAS_RECONCILED // LATENCY_STABILIZED',
  '[TRACE] // EVENT_DRIVEN_PIPELINE // AZURE_RELAY_LIVE // BACKPRESSURE_SMOOTHED',
  '[AGENT] // COPILOT_AUTOMATION // OPTIMIZED_BUILD // 15+ HRS_SAVED',
];

export default function TelemetryTicker({ className = '' }: TelemetryTickerProps) {
  const [index, setIndex] = useState<number>(0);
  const currentTick = telemetryStrings[index];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % telemetryStrings.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={`pointer-events-none w-full max-w-5xl rounded-3xl border border-slate-800/70 bg-slate-950/85 px-6 py-3 text-xs uppercase tracking-[0.35em] text-slate-400 shadow-[0_0_60px_rgba(15,23,42,0.28)] ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={currentTick}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="whitespace-nowrap overflow-hidden overflow-ellipsis"
        >
          {currentTick}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
