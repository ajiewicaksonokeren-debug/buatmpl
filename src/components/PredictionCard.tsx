"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  matchId: string;
  homeTeamName: string;
  awayTeamName: string;
  startTime: string;
  lockTime: string;
  locked: boolean;
  initialHome?: number;
  initialAway?: number;
};

export function PredictionCard({
  matchId,
  homeTeamName,
  awayTeamName,
  startTime,
  locked,
  initialHome,
  initialAway,
}: Props) {
  const router = useRouter();
  const [home, setHome] = useState(initialHome ?? 0);
  const [away, setAway] = useState(initialAway ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, predHomeScore: home, predAwayScore: away }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menyimpan prediksi.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
        <span>{new Date(startTime).toLocaleString("id-ID")}</span>
        {locked ? (
          <span className="text-red-400 font-medium">Ditutup</span>
        ) : (
          <span className="text-emerald-400 font-medium">Terbuka</span>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="flex-1 text-right font-semibold text-white">{homeTeamName}</span>
        <div className="flex items-center gap-2">
          <NumberInput value={home} onChange={setHome} disabled={locked || saving} />
          <span className="text-neutral-500">:</span>
          <NumberInput value={away} onChange={setAway} disabled={locked || saving} />
        </div>
        <span className="flex-1 text-left font-semibold text-white">{awayTeamName}</span>
      </div>

      {!locked && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 text-sm font-semibold px-4 py-1.5 rounded-md transition"
          >
            {saving ? "Menyimpan..." : "Simpan Prediksi"}
          </button>
          {saved && <span className="text-xs text-emerald-400">Tersimpan!</span>}
        </div>
      )}
      {error && <p className="mt-2 text-center text-xs text-red-400">{error}</p>}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled: boolean;
}) {
  return (
    <input
      type="number"
      min={0}
      max={20}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Math.max(0, Math.min(20, Number(e.target.value))))}
      className="w-14 text-center rounded-md bg-neutral-950 border border-white/10 py-1.5 text-white disabled:opacity-50 outline-none focus:border-amber-400"
    />
  );
}
