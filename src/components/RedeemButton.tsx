"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RedeemButton({
  rewardItemId,
  canAfford,
}: {
  rewardItemId: string;
  canAfford: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/redemptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rewardItemId, contactInfo }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menukar poin.");
      return;
    }
    setDone(true);
    router.refresh();
  }

  if (done) {
    return <p className="text-xs text-emerald-400">Permintaan terkirim, tunggu konfirmasi admin.</p>;
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        disabled={!canAfford}
        className="text-xs bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-semibold px-3 py-1.5 rounded-md transition"
      >
        {canAfford ? "Tukar" : "Poin Kurang"}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <input
        required
        minLength={5}
        placeholder="Nomor WA / email untuk konfirmasi"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        className="w-full text-xs rounded-md bg-neutral-950 border border-white/10 px-2 py-1.5 outline-none focus:border-amber-400"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="text-xs bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 font-semibold px-3 py-1.5 rounded-md transition"
        >
          {loading ? "Mengirim..." : "Konfirmasi"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-neutral-400 hover:text-white px-3 py-1.5"
        >
          Batal
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}
