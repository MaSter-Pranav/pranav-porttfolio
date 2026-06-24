'use client';

import { useEffect, useRef } from 'react';

type AudioManagerProps = {
  onLevel?: (level: number) => void;
  autoPlay?: boolean;
};

export default function AudioManager({ onLevel, autoPlay = true }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    let mounted = true;
    let stopOscillator: (() => void) | null = null;

    const setup = () => {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Create analyser chain
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;
      const bufLen = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufLen);

      // Try to load external audio file, otherwise use fallback oscillator
      let usedMediaFile = false;
      try {
        const audio = new Audio('/ambient.mp3');
        audio.loop = true;
        audio.crossOrigin = 'anonymous';
        audioRef.current = audio;

        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        usedMediaFile = true;

        if (autoPlay) {
          audio.play().catch(() => {
            // user gesture required or file not found
          });
        }
      } catch {
        // fallback: create oscillator for ambient tone
      }

      // If media file failed or wasn't used, create fallback tone
      if (!usedMediaFile) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = 110;
        gainNode.gain.value = 0.08;
        oscillator.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(ctx.destination);
        oscillator.start();
        stopOscillator = () => {
          try {
            oscillator.stop();
          } catch {
            // already stopped
          }
        };
      }

      // Animation loop for frequency analysis
      const tick = () => {
        if (!mounted) return;
        const analyserNode = analyserRef.current;
        const data = dataArrayRef.current;
        if (analyserNode && data) {
          try {
            analyserNode.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
            let sum = 0;
            for (let i = 0; i < data.length; i++) sum += data[i];
            const avg = sum / data.length / 255;
            onLevel?.(avg);
          } catch {
            // frequency data read failed
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    setup();

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopOscillator) stopOscillator();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {
          // context already closed
        }
      }
    };
  }, [onLevel, autoPlay]);

  return null;
}
