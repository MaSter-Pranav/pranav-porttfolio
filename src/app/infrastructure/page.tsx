export default function InfrastructurePage() {
  return (
    <main className="min-h-screen p-8 sm:p-24 pt-32 max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">// PIPELINE DEPLOYMENTS</h2>
        <h1 className="text-4xl font-black tracking-tight text-white mt-2">Production Environments Managed</h1>
      </div>

      <div className="space-y-16 relative before:absolute before:inset-0 before:right-auto before:left-4 before:w-px before:bg-slate-900">
        
        {/* Node 01: Techbliss / IndiGo */}
        <div className="relative pl-12 group">
          <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-sky-500 group-hover:scale-150 transition-transform ring-4 ring-slate-950" />
          <div className="flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-sky-400 uppercase tracking-wider">Techbliss Digital (Client: IndiGo Aviation) </span>
            <span>July 2025 — PRESENT </span>
          </div>
          <h3 className="text-2xl font-bold text-white uppercase">HOTAC Orchestration Platform Architect </h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-3xl">
            Architected a high-availability execution network automating Flight, Hotel, and Transport logistics for crews and passengers. Implemented event-driven topologies utilizing the **Saga Pattern** across distributed vendor channels to achieve absolute ledger consistency[cite: 39].
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
            <li>• Mitigated data drops across the aviation grid by embedding custom **Idempotency** and **Outbox pattern** blocks.</li>
            <li>• Cut message latencies by <span className="text-sky-400 font-bold">25%</span> using optimized **Kafka pipelines** and low-overhead **gRPC** interfaces[cite: 40].</li>
          </ul>
        </div>

        {/* Node 02: ATIPL */}
        <div className="relative pl-12 group">
          <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform ring-4 ring-slate-950" />
          <div className="flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider">Acro Technologies India Pvt. Ltd. (ATIPL) </span>
            <span>Feb 2023 — July 2025 </span>
          </div>
          <h3 className="text-2xl font-bold text-white uppercase">XRM V2 Architectural Transition Lead </h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-3xl">
            Spearheaded the physical migration of a massive, legacy enterprise monolith into decoupled, **Domain-Driven Design (DDD)** microservices. Designed complex administrative layouts using Angular 14+ integrated with secure RBAC structures for analytical reporting[cite: 32, 46].
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
            <li>• Delivered an instantaneous performance improvement scaling from <span className="text-emerald-400 font-bold">40% to 80%</span> on core database pipelines via intensive SQL and EF Core LINQ query refactoring[cite: 16, 47].</li>
            <li>• Reclaimed over <span className="text-white font-bold">15 hours per week</span> in team performance velocity by deploying custom Generative AI agents for automated validation and optimization code reviews[cite: 18, 48].</li>
          </ul>
        </div>

        {/* Node 03: Happymonk.ai */}
        <div className="relative pl-12 group">
          <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-purple-500 group-hover:scale-150 transition-transform ring-4 ring-slate-950" />
          <div className="flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-purple-400 uppercase tracking-wider">Happymonk.ai </span>
            <span>Oct 2022 — Dec 2022 </span>
          </div>
          <h3 className="text-2xl font-bold text-white uppercase">Data Science Engineering Intern </h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-3xl">
            Engineered automated Python data processing architectures designed to feed high-integrity vector payloads into computer vision models. Isolated mathematical model data biases and optimized training pipeline execution cycles[cite: 52, 53].
          </p>
        </div>

      </div>
    </main>
  );
}