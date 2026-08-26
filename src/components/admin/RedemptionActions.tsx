"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RedemptionActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function updateStatus(newStatus: "APPROVED" | "REJECTED" | "FULFILLED") {
    setLoading(newStatus);
    await fetch(`/api/admin/redemptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(null);
    router.refresh();
  }

  if (status === "REJECTED" || status === "FULFILLED") {
    return <span className="text-xs text-neutral-500">Selesai</span>;
  }

  return (
    <div className="flex gap-2">
      {status === "PENDING" && (
        <button
          onClick={() => updateStatus("APPROVED")}
          disabled={loading !== null}
          className="text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 px-2 py-1 rounded-md disabled:opacity-50"
        >
          {loading === "APPROVED" ? "..." : "Setujui"}
        </button>
      )}
      {status === "APPROVED" && (
        <button
          onClick={() => updateStatus("FULFILLED")}
          disabled={loading !== null}
          className="text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 px-2 py-1 rounded-md disabled:opacity-50"
        >
          {loading === "FULFILLED" ? "..." : "Tandai Terkirim"}
        </button>
      )}
      <button
        onClick={() => updateStatus("REJECTED")}
        disabled={loading !== null}
        className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-1 rounded-md disabled:opacity-50"
      >
        {loading === "REJECTED" ? "..." : "Tolak"}
      </button>
    </div>
  );
}
