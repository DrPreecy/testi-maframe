"use client";

import { useState } from "react";
import Link from "next/link";

export default function IncubatorPage() {
  const [ideaText, setIdeaText] = useState("");
  const [submittedCandidate, setSubmittedCandidate] = useState<string | null>(null);
  const [events, setEvents] = useState<Array<{ id: string; type: string; timestamp: string; note: string }>>([
    {
      id: "ev-01",
      type: "ROOM_INITIALIZED",
      timestamp: "Initial",
      note: "Incubator chamber standby. Awaiting raw candidate formulation.",
    },
  ]);

  const handleRefine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    const newEvent = {
      id: "ev-" + (events.length + 1),
      type: "USER_INPUT_RECORDED",
      timestamp: new Date().toLocaleTimeString(),
      note: `Raw idea captured (${ideaText.length} chars). Ready for LangGraph refinement cycle.`,
    };

    setSubmittedCandidate(ideaText);
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 w-full flex-1">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-300">
          Chambers
        </Link>
        <span>/</span>
        <span className="text-amber-400">1-incubator</span>
      </div>

      <div className="flex items-start justify-between mb-8 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono border border-amber-500/30 text-amber-400 bg-amber-500/10 mb-2">
            Chamber 01
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Incubator Chamber
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Captures unstructured ideas, surfaces assumptions, identifies open questions,
            and refines input into a clear candidate artifact.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-zinc-500">
          <div>Next Chamber &rarr;</div>
          <Link href="/rooms/2-symmetry" className="text-cyan-400 hover:underline">
            2. Symmetry Chamber
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <h2 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Raw Idea Ingestion
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Enter an unstructured proposition, prompt, or architectural thesis.
            </p>
            <form onSubmit={handleRefine}>
              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="e.g. Architect a deterministic event-sourced state machine for multi-agent code evaluation with isolated microVM execution..."
                rows={5}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-500">
                  {ideaText.length} characters
                </span>
                <button
                  type="submit"
                  disabled={!ideaText.trim()}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-medium text-xs transition-colors"
                >
                  Record & Refine Idea
                </button>
              </div>
            </form>
          </div>

          {submittedCandidate && (
            <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-mono font-semibold uppercase text-amber-400">
                  Candidate Staged
                </h3>
                <span className="text-xs font-mono text-zinc-500">Status: Unvalidated</span>
              </div>
              <p className="text-xs text-zinc-300 font-mono whitespace-pre-wrap bg-zinc-950/60 p-3 rounded border border-zinc-800">
                {submittedCandidate}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-zinc-400">
                  Ready to proceed to comparative analysis
                </span>
                <Link
                  href="/rooms/2-symmetry"
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
                >
                  Transfer to Symmetry &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
              <span>EventLog Feed</span>
              <span className="text-zinc-600">Append-only</span>
            </h2>
            <div className="space-y-3">
              {events.map((ev) => (
                <div key={ev.id} className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/80 text-xs">
                  <div className="flex justify-between items-center font-mono text-[10px] text-zinc-500 mb-1">
                    <span className="text-amber-400/80">{ev.type}</span>
                    <span>{ev.timestamp}</span>
                  </div>
                  <div className="text-zinc-300">{ev.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950 text-xs text-zinc-400 space-y-2">
            <div className="font-semibold text-zinc-200">Chamber Boundary Rule</div>
            <p className="text-zinc-500">
              The Incubator owns raw input and clarification. It must not present an idea as validated or production-ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
