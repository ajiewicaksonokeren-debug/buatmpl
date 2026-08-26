import { prisma } from "@/lib/prisma";

export default async function LeaderboardPage() {
  const users = await prisma.user.findMany({
    orderBy: { pointsBalance: "desc" },
    take: 50,
    select: { id: true, name: true, pointsBalance: true },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-1">Peringkat</h1>
      <p className="text-neutral-400 text-sm mb-8">Top 50 penebak dengan poin terbanyak.</p>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        {users.map((u, i) => (
          <div
            key={u.id}
            className={`flex items-center justify-between px-4 py-3 text-sm ${
              i % 2 === 0 ? "bg-neutral-900/50" : "bg-neutral-900/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 text-center font-bold ${
                  i === 0
                    ? "text-amber-400"
                    : i === 1
                    ? "text-neutral-300"
                    : i === 2
                    ? "text-amber-700"
                    : "text-neutral-500"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-white">{u.name}</span>
            </div>
            <span className="text-amber-400 font-semibold">{u.pointsBalance} pts</span>
          </div>
        ))}
        {users.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">Belum ada data.</p>
        )}
      </div>
    </div>
  );
}
