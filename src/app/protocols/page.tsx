export default function ProtocolsPage(): JSX.Element {
  const skills = [
    { category: 'Execution Runtimes', items: ['C#', '.NET 10/Core', 'ASP.NET Web API', 'EF Core', 'Java', 'Python'] },
    { category: 'Distributed Pipelines', items: ['Kafka', 'gRPC', 'RabbitMQ', 'Docker', 'Azure Cloud'] },
    { category: 'Architectural Topologies', items: ['Saga Pattern', 'CQRS', 'Domain-Driven Design (DDD)', 'Microservices', 'Outbox Pattern', 'Clean Architecture'] },
    { category: 'Interface Layouts', items: ['Angular 14+', 'React', 'TypeScript', 'RxJS', 'Node.js'] },
    { category: 'Automation & AI Models', items: ['OpenAI API Engineering', 'GitHub Copilot Integration', 'CI/CD Pipelines', 'Observability'] },
  ];

  return (
    <main className="min-h-screen p-8 sm:p-24 pt-28 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400">// CORE ENGINES</h2>
        <h1 className="text-4xl font-black tracking-tight text-white mt-2">Technical Matrix & System Protocols</h1>
        <p className="mt-3 text-sm text-slate-400 max-w-2xl">
          A curated set of technologies, patterns, and tooling I use to design resilient, high-throughput
          distributed systems. This matrix highlights practical competency and production-grade experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skillGroup, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md hover:border-sky-500/30 transition-all">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">// {skillGroup.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-sky-400 hover:border-sky-400/40 transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}