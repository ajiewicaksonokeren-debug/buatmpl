import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block text-xs font-semibold tracking-wide text-amber-400 bg-amber-400/10 rounded-full px-3 py-1 mb-4">
          FREE TO PLAY &middot; TANPA TARUHAN UANG
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Tebak Skor & Tebak Pemain MPL, Kumpulkan Poin, Menangin Hadiah
        </h1>
        <p className="mt-4 text-neutral-400 text-lg">
          Prediksi skor pertandingan MPL dan tebak pemain dari fotonya, dapatkan
          poin dan tiket spin, lalu tukar poinmu dengan hadiah menarik. Gratis
          untuk semua orang, tanpa deposit.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/register"
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-6 py-3 rounded-md transition"
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/predict"
            className="border border-white/15 hover:bg-white/5 text-white px-6 py-3 rounded-md transition"
          >
            Lihat Pertandingan
          </Link>
        </div>
      </div>

      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          title="1. Tebak Skor"
          desc="Prediksi skor tiap pertandingan sebelum kick-off. Semakin akurat, semakin besar poin & tiket yang kamu dapat."
        />
        <FeatureCard
          title="2. Tebak Pemain"
          desc="Tebak nama pemain dari fotonya. Setiap pemain hanya bisa dijawab sekali, jawaban benar langsung dapat poin."
        />
        <FeatureCard
          title="3. Putar Spin"
          desc="Setiap tebakan tepat memberimu tiket spin. Setiap putaran dijamin dapat hadiah — tidak ada yang gagal."
        />
        <FeatureCard
          title="4. Tukar Poin"
          desc="Kumpulkan poin dari prediksi & spin, lalu tukarkan dengan hadiah di katalog — bukan uang tunai."
        />
      </div>

      <div className="mt-16 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-neutral-400">
        <p className="font-semibold text-neutral-200 mb-1">Catatan penting</p>
        <p>
          Platform ini murni permainan prediksi berbasis poin. Tidak ada pembelian
          tiket/entry berbayar, tidak ada judi, dan poin tidak dapat dicairkan
          menjadi uang tunai. Semua hadiah disediakan langsung oleh penyelenggara.
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-6">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400">{desc}</p>
    </div>
  );
}
