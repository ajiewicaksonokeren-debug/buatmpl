import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RedeemButton } from "@/components/RedeemButton";

export default async function RedeemPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/redeem");

  const [user, items] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.user.id } }),
    prisma.rewardItem.findMany({
      where: { active: true, OR: [{ stock: null }, { stock: { gt: 0 } }] },
      orderBy: { pointsCost: "asc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-1">Tukar Poin</h1>
      <p className="text-neutral-400 text-sm mb-2">
        Poin ditukar dengan hadiah barang/voucher, bukan uang tunai. Tim kami akan
        menghubungi kamu untuk proses pengiriman.
      </p>
      <p className="text-sm text-neutral-300 mb-8">
        Saldo poin kamu: <span className="text-amber-400 font-semibold">{user.pointsBalance}</span>
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
            <p className="text-xs text-neutral-500 uppercase tracking-wide">{item.category}</p>
            <p className="text-white font-semibold mt-1">{item.name}</p>
            {item.description && (
              <p className="text-xs text-neutral-500 mt-1">{item.description}</p>
            )}
            <div className="flex items-center justify-between mt-4">
              <span className="text-amber-400 font-semibold text-sm">
                {item.pointsCost} pts
              </span>
              <RedeemButton rewardItemId={item.id} canAfford={user.pointsBalance >= item.pointsCost} />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">Belum ada hadiah tersedia.</p>
        )}
      </div>
    </div>
  );
}
