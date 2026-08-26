import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PredictionCard } from "@/components/PredictionCard";

export default async function PredictPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/predict");

  const matches = await prisma.match.findMany({
    where: { status: { in: ["SCHEDULED", "LOCKED"] } },
    orderBy: { startTime: "asc" },
    include: {
      homeTeam: true,
      awayTeam: true,
      predictions: { where: { userId: session.user.id } },
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-1">Prediksi Pertandingan</h1>
      <p className="text-neutral-400 text-sm mb-8">
        Tebak skor tepat = 100 poin + 1 tiket spin. Tebak pemenang saja = 30 poin.
      </p>

      {matches.length === 0 && (
        <p className="text-neutral-500 text-sm">Belum ada pertandingan yang dijadwalkan.</p>
      )}

      <div className="space-y-4">
        {matches.map((m) => {
          const existing = m.predictions[0];
          const locked = new Date() >= m.lockTime || m.status !== "SCHEDULED";
          return (
            <PredictionCard
              key={m.id}
              matchId={m.id}
              homeTeamName={m.homeTeam.name}
              awayTeamName={m.awayTeam.name}
              startTime={m.startTime.toISOString()}
              lockTime={m.lockTime.toISOString()}
              locked={locked}
              initialHome={existing?.predHomeScore}
              initialAway={existing?.predAwayScore}
            />
          );
        })}
      </div>
    </div>
  );
}
