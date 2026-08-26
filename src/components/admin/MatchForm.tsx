"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Team = { id: string; name: string };

export function MatchForm({ teams }: { teams: Team[] }) {
  const router = useRouter();
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [week, setWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [lockTime, setLockTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        homeTeamId,
        awayTeamId,
        week: week || undefined,
        startTime: new Date(startTime).toISOString(),
        lockTime: new Date(lockTime).toISOString(),
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menambah pertandingan.");
      return;
    }
    setWeek("");
    setStartTime("");
    setLockTime("");
    router.refresh();
  }

  if (teams.length < 2) {
    return <p className="text-sm text-neutral-500">Tambah minimal 2 tim dulu.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
      <Select label="Tim Home" value={homeTeamId} onChange={setHomeTeamId} teams={teams} />
      <Select label="Tim Away" value={awayTeamId} onChange={setAwayTeamId} teams={teams} />
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Minggu/Week (opsional)</label>
        <input
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div />
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Waktu Mulai</label>
        <input
          type="datetime-local"
          required
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Prediksi Ditutup Pada</label>
        <input
          type="datetime-local"
          required
          value={lockTime}
          onChange={(e) => setLockTime(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 text-sm font-semibold px-3 py-1.5 rounded-md"
        >
          {loading ? "..." : "Tambah Pertandingan"}
        </button>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>
    </form>
  );
}

function Select({
  label,
  value,
  onChange,
  teams,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  teams: Team[];
}) {
  return (
    <div>
      <label className="block text-xs text-neutral-400 mb-1">{label}</label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
      >
        <option value="">Pilih tim</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
