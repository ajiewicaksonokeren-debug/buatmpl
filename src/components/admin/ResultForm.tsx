"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResultForm({ matchId }: { matchId: string }) {
  const router = useRouter();
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, homeScore, awayScore }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menyimpan hasil.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={20}
        value={homeScore}
        onChange={(e) => setHomeScore(Number(e.target.value))}
        className="w-14 text-center rounded-md bg-neutral-950 border border-white/10 py-1 text-sm outline-none focus:border-amber-400"
      />
      <span className="text-neutral-500">:</span>
      <input
        type="number"
        min={0}
        max={20}
        value={awayScore}
        onChange={(e) => setAwayScore(Number(e.target.value))}
        className="w-14 text-center rounded-md bg-neutral-950 border border-white/10 py-1 text-sm outline-none focus:border-amber-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 text-xs font-semibold px-2 py-1.5 rounded-md"
      >
        {loading ? "..." : "Submit Hasil"}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}
