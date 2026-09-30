"use client";

import { useState } from "react";
import Link from "next/link";

export default function SymmetryPage() {
  const [perspective, setPerspective] = useState<"architecture" | "security" | "resilience">("architecture");
  const perspectives = [
    {
      id: "p1",
      title: "Monolithic Next.js + Route Handlers vs Microservice Workers",
      tradeoff: "Reduces operational surface at the expense of long-running job timeouts",
      risk: "Low immediate risk; high refactoring friction if scale exceeds serverless limits",
      verdict: "Recommended for Vertical Slice v1",
    },
    {
      id: "p2",
      title: "Constrained Decoding vs Post-Generative Retries",
      tradeoff: "Post-generative retries work with any vendor API, but increase latency on failure",
      risk: "Context window saturation if retry loops exceed 3 iterations",
      verdict: "Bounded 2-pass validation chosen",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 w-full flex-1">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-300">
          Chambers
        </Link>
        <span>/</span>
        <span className="text-cyan-400">2-symmetry</span>
      </div>

      <div className="flex items-start justify-between mb-8 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-500/10 mb-2">
            Chamber 02
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Symmetry Chamber
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Examines candidates from contrasting perspectives, challenges assumptions,
            and produces structured trade-off matrices for informed decision-making.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-zinc-500">
          <div>Next Chamber &rarr;</div>
          <Link href="/rooms/3-laboratory" className="text-violet-400 hover:underline">
            3. Laboratory Chamber
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
            {(["architecture", "security", "resilience"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPerspective(mode)}
                className={`flex-1 py-1.5 px-3 rounded text-xs font-medium capitalize transition-colors ${
                  perspective === mode
                    ? "bg-zinc-800 text-cyan-400 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode} Lens
              </button>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center justify-between">
              <span>Candidate Trade-off Evaluation</span>
              <span className="text-xs font-mono text-cyan-400">OPTIONS_COMPARED</span>
            </h2>

            <div className="space-y-4">
              {perspectives.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-zinc-800 bg-zinc-950/70 space-y-2 text-xs"
                >
                  <div className="font-semibold text-zinc-200 text-sm">{item.title}</div>
                  <div className="text-zinc-400">
                    <span className="text-zinc-500 font-mono">Trade-off:</span> {item.tradeoff}
                  </div>
                  <div className="text-zinc-400">
                    <span className="text-zinc-500 font-mono">Risk Profile:</span> {item.risk}
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
                    <span className="font-mono text-cyan-400 text-[11px]">{item.verdict}</span>
                    <span className="text-zinc-600 text-[10px]">Validated Decision Basis</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
              <Link href="/rooms/1-incubator" className="text-xs text-zinc-400 hover:text-white">
                &larr; Return to Incubator
              </Link>
              <Link
                href="/rooms/3-laboratory"
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors"
              >
                Proceed to Laboratory &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Chamber Invariant
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Consumes an Incubator output rather than silently rewriting the original idea.
              Outputs structured options with evidence and uncertainty margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
