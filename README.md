# MPL Tebak Skor

Platform prediksi skor pertandingan MPL (Mobile Legends Professional League).
Pengguna menebak skor, mengumpulkan poin & tiket spin, memutar roda hadiah
(dijamin menang), dan menukar poin dengan hadiah dari katalog.

## Prinsip desain (penting)

Platform ini **bukan** platform judi/taruhan:

- Gratis untuk semua orang — tidak ada biaya masuk, deposit, atau taruhan uang.
- Poin dan tiket **tidak bisa dicairkan menjadi uang tunai**.
- Roda spin **selalu memberi hadiah** — tidak ada hasil "gagal/kalah".
- Semua hadiah (diamond, voucher, merchandise) dipenuhi **manual oleh admin**
  setelah pengguna mengajukan penukaran poin — bukan proses otomatis yang
  terhubung ke sistem top-up pihak ketiga.

## Stack

- Next.js 16 (App Router) + TypeScript
- Prisma 6 + SQLite (ganti `DATABASE_URL` di `.env` untuk pakai Postgres/MySQL di produksi)
- NextAuth v5 (Credentials provider, JWT session)
- Tailwind CSS 4

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env   # lalu ganti AUTH_SECRET/NEXTAUTH_SECRET dengan string acak yang panjang
npm run db:push        # sinkronkan schema Prisma ke database
npm run db:seed        # buat akun admin + data contoh (tim, pertandingan, hadiah)
npm run dev
```

Akun admin default setelah seed: `admin@mpltebak.local` / `admin12345`
(ganti password ini sebelum deploy ke publik, atau set `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` sebelum menjalankan seed).

## Alur fitur

1. **Prediksi** (`/predict`) — pengguna menebak skor sebelum `lockTime`.
   Tebakan tepat = 100 poin + 1 tiket spin. Tebak pemenang saja = 30 poin.
2. **Admin input hasil** (`/admin/matches`) — begitu hasil asli dimasukkan,
   seluruh prediksi pada pertandingan itu otomatis dinilai (`src/lib/scoring.ts`).
3. **Spin** (`/spin`) — 1 tiket = 1 putaran, hadiah diundi berbobot dari
   `SpinPrize` yang aktif; selalu ada hasil (`src/lib/spin.ts`).
4. **Tukar poin** (`/redeem`) — poin dipotong saat pengajuan, admin
   menyetujui/menolak/menandai terkirim di `/admin/redemptions`. Penolakan
   otomatis mengembalikan poin.
5. **Dompet** (`/wallet`) — saldo poin, tiket, dan riwayat transaksi.
6. **Peringkat** (`/leaderboard`) — ranking berdasarkan saldo poin.

## Struktur admin

Rute `/admin/*` hanya bisa diakses user dengan `role = ADMIN` (dicek di
`src/app/admin/layout.tsx` dan setiap route API lewat `requireAdmin()`).
Naikkan role user manual lewat Prisma Studio (`npx prisma studio`) atau
query langsung ke database bila perlu admin tambahan.

## Catatan sebelum go-live

- Ganti `AUTH_SECRET`/`NEXTAUTH_SECRET` dan `DATABASE_URL` untuk produksi.
- Pastikan proses pemenuhan hadiah (top-up diamond, pengiriman merchandise)
  punya SOP manual yang jelas — sistem ini hanya mencatat permintaan,
  tidak melakukan pembayaran/pengiriman otomatis.
- Tambahkan rate limiting / captcha pada `/register` dan `/api/predictions`
  bila platform sudah publik, untuk mencegah akun ganda/spam.
