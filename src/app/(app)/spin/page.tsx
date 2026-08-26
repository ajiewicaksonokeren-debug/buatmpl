import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SpinButton } from "@/components/SpinButton";

export default async function SpinPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/spin");

  const [user, prizes, history] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.user.id } }),
    prisma.spinPrize.findMany({
      where: { active: true, OR: [{ stock: null }, { stock: { gt: 0 } }] },
    }),
    prisma.spinResult.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { prize: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-white mb-1">Spin Hadiah</h1>
      <p className="text-neutral-400 text-sm mb-2">
        Setiap putaran dijamin dapat hadiah — tidak ada yang gagal.
      </p>
      <p className="text-sm text-neutral-300 mb-10">
        Tiket kamu: <span className="text-amber-400 font-semibold">{user.ticketBalance}</span>
      </p>

      <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-10 mb-10">
        <SpinButton ticketBalance={user.ticketBalance} />
      </div>

      <div className="text-left mb-10">
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Hadiah yang Tersedia</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {prizes.map((p) => (
            <div key={p.id} className="rounded-lg border border-white/10 bg-neutral-900/30 px-4 py-3">
              <p className="text-white text-sm font-medium">{p.name}</p>
              {p.description && <p className="text-xs text-neutral-500">{p.description}</p>}
            </div>
          ))}
          {prizes.length === 0 && (
            <p className="text-sm text-neutral-500">Belum ada hadiah spin tersedia.</p>
          )}
        </div>
      </div>

      <div className="text-left">
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Riwayat Spin</h2>
        <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-white">{h.prize.name}</span>
              <span className="text-xs text-neutral-500">
                {h.createdAt.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          {history.length === 0 && (
            <p className="px-4 py-6 text-sm text-neutral-500">Belum ada riwayat spin.</p>
          )}
        </div>
      </div>
    </div>
  );
}
