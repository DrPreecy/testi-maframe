"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductionPage() {
  const [releaseStatus, setReleaseStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [auditLog, setAuditLog] = useState([
    {
      id: "prod-01",
      action: "EVIDENCE_VERIFIED",
      actor: "Operator Workflow Engine",
      timestamp: "Today, 12:00 UTC",
      note: "Laboratory validation results verified (4/4 tests passed).",
    },
  ]);

  const handleApprove = () => {
    setReleaseStatus("approved");
    setAuditLog((prev) => [
      {
        id: "prod-" + (prev.length + 1),
        action: "PRODUCTION_APPROVED",
        actor: "Operator Human-in-the-Loop",
        timestamp: new Date().toLocaleTimeString(),
        note: "Release candidate v0.1.0 authorized for publication.",
      },
      ...prev,
    ]);
  };

  const handleReject = () => {
    setReleaseStatus("rejected");
    setAuditLog((prev) => [
      {
        id: "prod-" + (prev.length + 1),
        action: "PRODUCTION_REJECTED",
        actor: "Operator Human-in-the-Loop",
        timestamp: new Date().toLocaleTimeString(),
        note: "Artifact rejected. Returned to Laboratory with feedback.",
      },
      ...prev,
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 w-full flex-1">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-300">
          Chambers
        </Link>
        <span>/</span>
        <span className="text-emerald-400">4-production</span>
      </div>

      <div className="flex items-start justify-between mb-8 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-2">
            Chamber 04
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Production Chamber
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Final gatekeeper enforcing human authorization, audit logging, and immutable publication outcomes.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-zinc-500">
          <div>Workspace Root &rarr;</div>
          <Link href="/" className="text-zinc-400 hover:underline">
            All Chambers
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Release Candidate Gate
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold uppercase ${
                  releaseStatus === "approved"
                    ? "border border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                    : releaseStatus === "rejected"
                    ? "border border-red-500/30 text-red-400 bg-red-500/10"
                    : "border border-amber-500/30 text-amber-400 bg-amber-500/10"
                }`}
              >
                {releaseStatus}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-950/70 text-xs space-y-2 mb-6">
              <div className="font-semibold text-zinc-200">Release Candidate: v0.1.0-alpha</div>
              <div className="text-zinc-400">
                Source Repository: <span className="font-mono text-zinc-300">DrPreecy/testi-maframe</span>
              </div>
              <div className="text-zinc-400">
                Laboratory Evidence: <span className="text-emerald-400 font-mono">Verified (4/4 checks passed)</span>
              </div>
            </div>

            {releaseStatus === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  Approve & Publish Artifact
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium text-xs transition-colors"
                >
                  Reject with Feedback
                </button>
              </div>
            )}

            {releaseStatus === "approved" && (
              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-xs text-emerald-300 font-mono">
                PUBLICATION_COMPLETED: Artifact deployed and recorded in EventLog.
              </div>
            )}

            {releaseStatus === "rejected" && (
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-950/30 text-xs text-red-300 font-mono">
                PRODUCTION_REJECTED: Feedback dispatched to Chamber 03 (Laboratory).
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
              <span>Audit Trail</span>
              <span className="text-zinc-600">EventLog</span>
            </h2>
            <div className="space-y-3">
              {auditLog.map((log) => (
                <div key={log.id} className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/80 text-xs">
                  <div className="flex justify-between items-center font-mono text-[10px] text-zinc-500 mb-1">
                    <span className="text-emerald-400">{log.action}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="text-zinc-300">{log.note}</div>
                  <div className="text-[10px] text-zinc-500 mt-1 font-mono">Actor: {log.actor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
