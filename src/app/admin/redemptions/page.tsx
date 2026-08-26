import { prisma } from "@/lib/prisma";
import { RedemptionActions } from "@/components/admin/RedemptionActions";

export default async function AdminRedemptionsPage() {
  const requests = await prisma.redemptionRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, rewardItem: true },
  });

  return (
    <div>
      <h2 className="text-sm font-semibold text-neutral-300 mb-3">Permintaan Penukaran</h2>
      <div className="space-y-2">
        {requests.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-neutral-900/40 px-4 py-3"
          >
            <div>
              <p className="text-sm text-white">
                {r.user.name} &rarr; {r.rewardItem.name}{" "}
                <span className="text-amber-400">({r.rewardItem.pointsCost} pts)</span>
              </p>
              <p className="text-xs text-neutral-500">
                Kontak: {r.contactInfo} &middot; {r.createdAt.toLocaleString("id-ID")} &middot;{" "}
                {r.status}
              </p>
            </div>
            <RedemptionActions id={r.id} status={r.status} />
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-sm text-neutral-500">Belum ada permintaan penukaran.</p>
        )}
      </div>
    </div>
  );
}
