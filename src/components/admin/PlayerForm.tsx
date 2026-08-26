"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Team = { id: string; name: string };

export function PlayerForm({ teams }: { teams: Team[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, teamId, photoUrl }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menambah pemain.");
      return;
    }
    setName("");
    setPhotoUrl("");
    router.refresh();
  }

  if (teams.length === 0) {
    return <p className="text-sm text-neutral-500">Tambah minimal 1 tim dulu di tab Pertandingan.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Nama Pemain</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Tim</label>
        <select
          required
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
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
      <div className="sm:col-span-2">
        <label className="block text-xs text-neutral-400 mb-1">URL Foto</label>
        <input
          required
          type="url"
          placeholder="https://..."
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 text-sm font-semibold px-3 py-1.5 rounded-md"
        >
          {loading ? "..." : "Tambah Pemain"}
        </button>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>
    </form>
  );
}
