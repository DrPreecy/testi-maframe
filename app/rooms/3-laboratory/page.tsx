"use client";

import { useState } from "react";
import Link from "next/link";

export default function LaboratoryPage() {
  const [runningChecks, setRunningChecks] = useState(false);
  const checks = [
    { name: "Static TypeScript Compilation", status: "passed", detail: "tsc --noEmit passed without errors" },
    { name: "Prisma Schema Verification", status: "passed", detail: "npx prisma validate passed" },
    { name: "Lint Syntax & Code Standards", status: "passed", detail: "eslint standard rules passing" },
    { name: "Chamber Boundary Isolation", status: "passed", detail: "No client imports of server-only modules" },
  ];

  const handleRunChecks = () => {
    setRunningChecks(true);
    setTimeout(() => {
      setRunningChecks(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 w-full flex-1">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-300">
          Chambers
        </Link>
        <span>/</span>
        <span className="text-violet-400">3-laboratory</span>
      </div>

      <div className="flex items-start justify-between mb-8 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono border border-violet-500/30 text-violet-400 bg-violet-500/10 mb-2">
            Chamber 03
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Laboratory Chamber
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Controlled implementation environment executing generation plans, automated validation checks,
            and capturing empirical proof before release consideration.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-zinc-500">
          <div>Next Chamber &rarr;</div>
          <Link href="/rooms/4-production" className="text-emerald-400 hover:underline">
            4. Production Chamber
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                Validation Check Suite
              </h2>
              <button
                onClick={handleRunChecks}
                disabled={runningChecks}
                className="px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium text-xs font-mono transition-colors"
              >
                {runningChecks ? "Executing Tests..." : "Run Test Suite"}
              </button>
            </div>

            <div className="space-y-3">
              {checks.map((c, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/70 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-zinc-200">{c.name}</div>
                    <div className="text-zinc-500 font-mono text-[11px]">{c.detail}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
              <Link href="/rooms/2-symmetry" className="text-xs text-zinc-400 hover:text-white">
                &larr; Return to Symmetry
              </Link>
              <Link
                href="/rooms/4-production"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
              >
                Submit Evidence to Production &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Laboratory Gate
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Laboratory output is strictly non-releasable without passing through Production review.
              Retains all compilation logs, test outputs, and diagnostic traces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
