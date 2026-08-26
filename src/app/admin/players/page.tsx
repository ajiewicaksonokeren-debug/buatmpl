import { prisma } from "@/lib/prisma";
import { PlayerForm } from "@/components/admin/PlayerForm";

export default async function AdminPlayersPage() {
  const [teams, players] = await Promise.all([
    prisma.team.findMany({ orderBy: { name: "asc" } }),
    prisma.player.findMany({ orderBy: { createdAt: "desc" }, include: { team: true } }),
  ]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tambah Pemain</h2>
        <PlayerForm teams={teams} />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Daftar Pemain</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {players.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-neutral-900/40 px-4 py-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external, unpredictable admin-supplied URLs */}
              <img
                src={p.photoUrl}
                alt={p.name}
                className="w-12 h-12 rounded-full object-cover border border-white/10"
              />
              <div>
                <p className="text-sm text-white">{p.name}</p>
                <p className="text-xs text-neutral-500">{p.team.name}</p>
              </div>
            </div>
          ))}
          {players.length === 0 && <p className="text-sm text-neutral-500">Belum ada pemain.</p>}
        </div>
      </section>
    </div>
  );
}
