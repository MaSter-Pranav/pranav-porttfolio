export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 pt-32">
      {/* Top Telemetry Panel */}
      <div className="flex w-full max-w-6xl items-start justify-between text-xs text-slate-500">
        <div>LOC // GURGAON, IN [cite: 2, 25, 37]<br />STKP // .NET 10 . AZURE . KAFKA [cite: 20, 32]</div>
        <div className="text-right font-bold text-sky-500 animate-pulse">STATUS // OPERATIONAL</div>
      </div>

      {/* Center Manifesto Block */}
      <div className="max-w-4xl my-auto">
        <h1 className="text-7xl font-black tracking-tighter uppercase md:text-9xl bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-600">
          PRANAVRAJ [cite: 1, 24]
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-light text-slate-400 leading-relaxed max-w-2xl">
          I build fault-tolerant infrastructure and orchestrate distributed event pipelines that achieve <span className="text-white font-bold">99.9% uptime</span> for critical mission architectures[cite: 10, 13, 28].
        </p>
        
        <div className="mt-8 flex gap-4">
          <a href="/infrastructure" className="pointer-events-auto px-6 py-3 rounded-xs bg-sky-500 text-slate-950 font-bold tracking-wider hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 text-xs uppercase">
            Initialize Overview
          </a>
        </div>
      </div>

      {/* Bottom Metrics HUD */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 w-full max-w-6xl border-t border-slate-900 pt-8 text-left">
        <div>
          <div className="text-2xl font-bold text-white">3.2+ Years</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Runtime Experience </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-sky-400">99.9%</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Aviation Platform Uptime [cite: 13]</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-400">80% Max</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">API Throughput Optimization [cite: 16, 47]</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-400">15+ Hrs</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Weekly Dev Automation [cite: 18, 48]</div>
        </div>
      </div>
    </main>
  );
}