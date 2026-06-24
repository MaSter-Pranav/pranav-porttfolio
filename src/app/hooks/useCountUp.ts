'use client';

import { useEffect, useState } from 'react';

type UseCountUpOptions = {
  from?: number;
  to: number;
  durationMs?: number;
  decimals?: number;
  formatter?: (value: number) => string;
};

export function useCountUp({
  from = 0,
  to,
  durationMs = 1200,
  decimals = 0,
  formatter,
}: UseCountUpOptions): string {
  const [value, setValue] = useState<number>(from);

  useEffect(() => {
    let startTime = performance.now();
    let frameId = 0;
    const delta = to - from;

    const animate = (time: number) => {
      const elapsed = Math.min(time - startTime, durationMs);
      const progress = durationMs > 0 ? elapsed / durationMs : 1;
      const eased = -0.5 * (Math.cos(Math.PI * progress) - 1);
      setValue(from + delta * eased);

      if (elapsed < durationMs) {
        frameId = requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [from, to, durationMs]);

  if (formatter) {
    return formatter(value);
  }

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}
