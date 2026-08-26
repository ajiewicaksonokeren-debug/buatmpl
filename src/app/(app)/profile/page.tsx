import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const resultLabel: Record<string, string> = {
  PENDING: "Menunggu",
  EXACT: "Tepat!",
  CORRECT_WINNER: "Pemenang Benar",
  WRONG: "Salah",
  VOID: "Dibatalkan",
};

const resultColor: Record<string, string> = {
  PENDING: "text-neutral-400",
  EXACT: "text-emerald-400",
  CORRECT_WINNER: "text-amber-400",
  WRONG: "text-red-400",
  VOID: "text-neutral-500",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/profile");

  const [user, predictions, redemptions] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.user.id } }),
    prisma.prediction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { match: { include: { homeTeam: true, awayTeam: true } } },
    }),
    prisma.redemptionRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { rewardItem: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
      <p className="text-neutral-400 text-sm mb-8">{user.email}</p>

      <h2 className="text-sm font-semibold text-neutral-300 mb-3">Riwayat Prediksi</h2>
      <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5 mb-8">
        {predictions.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-white">
              {p.match.homeTeam.name} {p.predHomeScore}:{p.predAwayScore} {p.match.awayTeam.name}
            </span>
            <span className={resultColor[p.result]}>{resultLabel[p.result]}</span>
          </div>
        ))}
        {predictions.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">Belum ada prediksi.</p>
        )}
      </div>

      <h2 className="text-sm font-semibold text-neutral-300 mb-3">Riwayat Penukaran</h2>
      <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
        {redemptions.map((r) => (
          <div key={r.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-white">{r.rewardItem.name}</span>
            <span className="text-xs text-neutral-400">{r.status}</span>
          </div>
        ))}
        {redemptions.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">Belum ada penukaran.</p>
        )}
      </div>
    </div>
  );
}
