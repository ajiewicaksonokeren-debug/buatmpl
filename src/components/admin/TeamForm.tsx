"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TeamForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, shortName }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menambah tim.");
      return;
    }
    setName("");
    setShortName("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Nama Tim</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Kode Singkat</label>
        <input
          required
          maxLength={10}
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
          className="w-24 rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 text-sm font-semibold px-3 py-1.5 rounded-md"
      >
        {loading ? "..." : "Tambah Tim"}
      </button>
      {error && <p className="text-xs text-red-400 w-full">{error}</p>}
    </form>
  );
}
