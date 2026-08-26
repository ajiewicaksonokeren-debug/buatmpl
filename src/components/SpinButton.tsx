"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SpinButton({ ticketBalance }: { ticketBalance: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSpin() {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await fetch("/api/spin", { method: "POST" });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal memutar.");
      return;
    }
    setResult(data.prize?.name ?? "Hadiah");
    router.refresh();
  }

  return (
    <div className="text-center">
      <button
        onClick={handleSpin}
        disabled={loading || ticketBalance < 1}
        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-950 font-semibold px-8 py-3 rounded-full transition text-lg"
      >
        {loading ? "Memutar..." : ticketBalance < 1 ? "Tiket Habis" : "Putar Sekarang"}
      </button>

      {result && (
        <p className="mt-4 text-emerald-400 font-semibold text-lg">
          Selamat! Kamu mendapatkan: {result} 🎉
        </p>
      )}
      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
    </div>
  );
}
