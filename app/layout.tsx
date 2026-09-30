import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operator Workspace",
  description: "AI-assisted workspace for deterministic room workflows",
  openGraph: {
    title: "Operator Workspace",
    description: "AI-assisted workspace for deterministic room workflows",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-zinc-800">
        <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Operator Workspace
            </Link>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
              v0.1.0
            </span>
          </div>
          <nav className="flex items-center gap-1 text-sm font-medium text-zinc-400">
            <Link href="/rooms/1-incubator" className="px-3 py-1.5 rounded hover:text-white hover:bg-zinc-800/80 transition-colors">
              1. Incubator
            </Link>
            <Link href="/rooms/2-symmetry" className="px-3 py-1.5 rounded hover:text-white hover:bg-zinc-800/80 transition-colors">
              2. Symmetry
            </Link>
            <Link href="/rooms/3-laboratory" className="px-3 py-1.5 rounded hover:text-white hover:bg-zinc-800/80 transition-colors">
              3. Laboratory
            </Link>
            <Link href="/rooms/4-production" className="px-3 py-1.5 rounded hover:text-white hover:bg-zinc-800/80 transition-colors">
              4. Production
            </Link>
          </nav>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-zinc-800/80 px-6 py-3 text-xs text-zinc-500 flex justify-between items-center bg-zinc-950">
          <div>Operator Workspace • LangGraph & Prisma Postgres Event Sourcing</div>
          <div className="font-mono text-zinc-600">Runtime: Node.js 22</div>
        </footer>
      </body>
    </html>
  );
}
