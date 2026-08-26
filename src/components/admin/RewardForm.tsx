"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RewardForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [pointsCost, setPointsCost] = useState(100);
  const [stock, setStock] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/rewards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        pointsCost,
        stock: stock === "" ? null : Number(stock),
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menambah hadiah.");
      return;
    }
    setName("");
    setCategory("");
    setPointsCost(100);
    setStock("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Nama Hadiah</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Kategori</label>
        <input
          required
          placeholder="mis. Diamond ML, Voucher, Merchandise"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Biaya Poin</label>
        <input
          type="number"
          min={1}
          required
          value={pointsCost}
          onChange={(e) => setPointsCost(Number(e.target.value))}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-400 mb-1">Stok (kosongkan = tanpa batas)</label>
        <input
          type="number"
          min={0}
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 text-sm outline-none focus:border-amber-400"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 text-sm font-semibold px-3 py-1.5 rounded-md"
        >
          {loading ? "..." : "Tambah Hadiah"}
        </button>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>
    </form>
  );
}
