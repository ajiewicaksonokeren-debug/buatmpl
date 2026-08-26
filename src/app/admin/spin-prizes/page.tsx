import { prisma } from "@/lib/prisma";
import { SpinPrizeForm } from "@/components/admin/SpinPrizeForm";

export default async function AdminSpinPrizesPage() {
  const prizes = await prisma.spinPrize.findMany({ orderBy: { createdAt: "desc" } });
  const totalWeight = prizes.filter((p) => p.active).reduce((s, p) => s + p.weight, 0);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">Tambah Hadiah Spin</h2>
        <SpinPrizeForm />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-300 mb-3">
          Daftar Hadiah Spin (setiap putaran pasti dapat hadiah)
        </h2>
        <div className="space-y-2">
          {prizes.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-neutral-900/40 px-4 py-3"
            >
              <div>
                <p className="text-sm text-white">{p.name}</p>
                <p className="text-xs text-neutral-500">
                  bobot {p.weight}
                  {p.active && totalWeight > 0
                    ? ` (~${((p.weight / totalWeight) * 100).toFixed(1)}% peluang)`
                    : ""}{" "}
                  &middot; stok: {p.stock ?? "tanpa batas"}
                </p>
              </div>
              <span className={p.active ? "text-emerald-400 text-xs" : "text-neutral-500 text-xs"}>
                {p.active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          ))}
          {prizes.length === 0 && <p className="text-sm text-neutral-500">Belum ada hadiah spin.</p>}
        </div>
      </section>
    </div>
  );
}
