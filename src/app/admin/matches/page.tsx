import { prisma } from "@/lib/prisma";
import { TeamForm } from "@/components/admin/TeamForm";
import { MatchForm } from "@/components/admin/MatchForm";
import { ResultForm } from "@/components/admin/ResultForm";

export default async function AdminMatchesPage() {
  const [teams, matches] = await Promise.all([
    prisma.team.findMany({ orderBy: { name: "asc" } }),
    prisma.match.findMany({
      orderBy: { startTime: "desc" },
      include: { homeTeam: true, awayTeam: true },
    }),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tim</h2>
        <TeamForm />
        <div className="mt-3 flex flex-wrap gap-2">
          {teams.map((t) => (
            <span
              key={t.id}
              className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-neutral-300"
            >
              {t.name}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tambah Pertandingan</h2>
        <MatchForm teams={teams} />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Daftar Pertandingan</h2>
        <div className="space-y-2">
          {matches.map((m) => (
            <div
              key={m.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-neutral-900/40 px-4 py-3"
            >
              <div>
                <p className="text-sm text-white">
                  {m.homeTeam.name} vs {m.awayTeam.name}
                  {m.status === "FINISHED" && (
                    <span className="text-amber-400 ml-2">
                      ({m.homeScore}:{m.awayScore})
                    </span>
                  )}
                </p>
                <p className="text-xs text-neutral-500">
                  {m.startTime.toLocaleString("id-ID")} &middot; {m.status}
                </p>
              </div>
              {m.status !== "FINISHED" && <ResultForm matchId={m.id} />}
            </div>
          ))}
          {matches.length === 0 && (
            <p className="text-sm text-neutral-500">Belum ada pertandingan.</p>
          )}
        </div>
      </section>
    </div>
  );
}
