import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Scene from './components/canvas/scene';
import HUDOverlay from './components/ui/HUDOverlay';
import '@/app/globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'PRANAVRAJ // SYSTEM ARCHITECT',
  description: 'High-throughput distributed systems & orchestration engine panels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} bg-slate-950 text-slate-100`}>
      <body className="antialiased font-mono selection:bg-sky-500 selection:text-white">
        {/* Persistent High-End Background WebGL Environment */}
        <Scene />
        
        {/* Global Structural Layout Grid Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 border-[12px] border-slate-950/20 mix-blend-difference" />
        
        {/* Global HUD Navigation System */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6 backdrop-blur-xs bg-gradient-to-b from-slate-950/50 to-transparent">
          <span className="text-sm font-black tracking-widest text-sky-400">PRANAVRAJ.SYS</span>
          <div className="flex space-x-6 text-xs uppercase tracking-wider font-bold">
            <a href="/" className="hover:text-sky-400 transition-colors pointer-events-auto">Core</a>
            <a href="/infrastructure" className="hover:text-sky-400 transition-colors pointer-events-auto">Infrastructure</a>
            <a href="/protocols" className="hover:text-sky-400 transition-colors pointer-events-auto">Protocols</a>
            <a href="/registry" className="hover:text-sky-400 transition-colors pointer-events-auto">Registry</a>
          </div>
        </nav>

        <HUDOverlay />

        {/* Content Mount */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}