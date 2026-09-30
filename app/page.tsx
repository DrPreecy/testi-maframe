import Link from "next/link";

export default function Home() {
  const chambers = [
    {
      num: "1",
      id: "1-incubator",
      name: "Incubator",
      href: "/rooms/1-incubator",
      tagline: "Capture & Refine Raw Ideas",
      desc: "Captures unstructured ideas, assumptions, and bounded clarification questions. Refines initial input into a validated candidate artifact without presenting it as production-ready.",
      accent: "from-amber-500/20 via-zinc-900 to-zinc-900",
      border: "hover:border-amber-500/40",
      badge: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    },
    {
      num: "2",
      id: "2-symmetry",
      name: "Symmetry",
      href: "/rooms/2-symmetry",
      tagline: "Multi-Perspective Analysis",
      desc: "Examines candidates from contrasting perspectives. Identifies contradictions, risk profiles, and trade-offs to produce a structured decision basis before implementation.",
      accent: "from-cyan-500/20 via-zinc-900 to-zinc-900",
      border: "hover:border-cyan-500/40",
      badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      num: "3",
      id: "3-laboratory",
      name: "Laboratory",
      href: "/rooms/3-laboratory",
      tagline: "Controlled Implementation & Validation",
      desc: "Executes bounded generation, technical experiments, and check suites in an isolated sandbox. Generates validation evidence without unauthorized external release.",
      accent: "from-violet-500/20 via-zinc-900 to-zinc-900",
      border: "hover:border-violet-500/40",
      badge: "border-violet-500/30 text-violet-400 bg-violet-500/10",
    },
    {
      num: "4",
      id: "4-production",
      name: "Production",
      href: "/rooms/4-production",
      tagline: "Approval & Publication Gate",
      desc: "Inspects validation evidence, requires explicit human review and approval, and publishes validated artifacts while recording audit events and rollback markers.",
      accent: "from-emerald-500/20 via-zinc-900 to-zinc-900",
      border: "hover:border-emerald-500/40",
      badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-1 flex flex-col justify-center">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          LangGraph • Event-Sourced Workspace
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Operator Workspace
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          AI-assisted workspace executing deterministic, multi-step room workflows
          across four isolated chambers. Every state transition is recorded as an immutable event.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chambers.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className={`group relative flex flex-col p-6 rounded-xl border border-zinc-800 bg-gradient-to-br ${c.accent} ${c.border} transition-all duration-200 shadow-sm hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border ${c.badge}`}>
                Chamber 0{c.num}
              </span>
              <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {c.id} &rarr;
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-white transition-colors">
              {c.name}
            </h2>
            <div className="text-xs font-medium text-zinc-400 mb-3 font-mono">
              {c.tagline}
            </div>
            <p className="text-xs text-zinc-400/90 leading-relaxed mb-4 flex-1">
              {c.desc}
            </p>
            <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>Status: Active</span>
              <span className="text-zinc-400 group-hover:underline">Enter Room</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
