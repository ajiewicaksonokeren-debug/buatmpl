import { prisma } from "@/lib/prisma";
import { RewardForm } from "@/components/admin/RewardForm";

export default async function AdminRewardsPage() {
  const items = await prisma.rewardItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tambah Hadiah Katalog</h2>
        <RewardForm />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Katalog Hadiah</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-neutral-900/40 px-4 py-3"
            >
              <div>
                <p className="text-sm text-white">{item.name}</p>
                <p className="text-xs text-neutral-500">
                  {item.category} &middot; {item.pointsCost} pts &middot; stok:{" "}
                  {item.stock ?? "tanpa batas"}
                </p>
              </div>
              <span className={item.active ? "text-emerald-400 text-xs" : "text-neutral-500 text-xs"}>
                {item.active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-neutral-500">Belum ada hadiah.</p>}
        </div>
      </section>
    </div>
  );
}
