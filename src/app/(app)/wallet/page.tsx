import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const reasonLabel: Record<string, string> = {
  PREDICTION_EXACT: "Tebakan tepat",
  PREDICTION_WINNER: "Tebakan pemenang benar",
  PLAYER_GUESS: "Tebak pemain benar",
  SPIN_REWARD: "Hadiah spin",
  REDEMPTION: "Tukar hadiah",
  ADMIN_ADJUST: "Penyesuaian admin",
};

export default async function WalletPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/wallet");

  const [user, entries] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.user.id } }),
    prisma.pointsLedgerEntry.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-1">Dompet</h1>
      <p className="text-neutral-400 text-sm mb-8">
        Poin dan tiket kamu tidak dapat dicairkan menjadi uang tunai.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
          <p className="text-xs text-neutral-500">Saldo Poin</p>
          <p className="text-3xl font-bold text-amber-400">{user.pointsBalance}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
          <p className="text-xs text-neutral-500">Tiket Spin</p>
          <p className="text-3xl font-bold text-white">{user.ticketBalance}</p>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-neutral-300 mb-3">Riwayat Transaksi</h2>
      <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
        {entries.map((e) => (
          <div key={e.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="text-white">{reasonLabel[e.reason] ?? e.reason}</p>
              <p className="text-xs text-neutral-500">
                {e.createdAt.toLocaleString("id-ID")}
              </p>
            </div>
            <span className={e.amount >= 0 ? "text-emerald-400" : "text-red-400"}>
              {e.amount >= 0 ? "+" : ""}
              {e.amount}
            </span>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">Belum ada transaksi.</p>
        )}
      </div>
    </div>
  );
}
