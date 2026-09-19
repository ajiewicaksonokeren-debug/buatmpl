# Knowledge Graph — Deck AK3U FR.IA.04A (Mohammad Ajie Wicaksono)

Sumber kebenaran supaya deck ini **tidak perlu digenerate ulang dari nol**. Ubah data di sini → jalankan `python3 build.py`.

## 1. Sumber & keputusan

| Node | Isi |
|---|---|
| Skema | AHLI KESELAMATAN DAN KESEHATAN KERJA UMUM — SKM/2037/00013/2/2021/1 |
| Dokumen acuan | `FR.IA.04A. PENJELASAN PROYEK SINGKAT ATAU KEGIATAN TERSTRUKTUR LAINNYA` |
| Deck lama | `Tugas_k3_Ajie_2.pptx` (49 slide, 1 file) — sumber **design token** & **aset form** |
| Masalah deck lama | Satu file campur 4 kelompok; footer Kelompok 3 nempel di slide Kelompok 1; isi Kelompok 1 (IBPR, APD, kesehatan kerja) tertukar dengan isi Kelompok 3 (komunikasi, izin kerja, dokumentasi); dua bahasa desain (Calibri/Google-shape vs Play+Arial); melebihi batas halaman FR.IA.04A |
| Keputusan | Pecah jadi **4 file**, satu per Kelompok Pekerjaan, satu bahasa desain, patuh batas halaman |

## 2. Batas halaman (wajib, dari FR.IA.04A)

| Kelompok | Unit | Waktu buat | Maks halaman | Presentasi | File | Slide terpakai |
|---|---|---|---|---|---|---|
| 1 | 5 | 60 menit | 12 | 15' + 15' | `K1_Pengendalian_Risiko_K3.pptx` | 12 |
| 2 | 3 | 60 menit | 12 | 15' + 15' | `K2_Tanggap_Darurat_dan_P3K.pptx` | 12 |
| 3 | 3 | 40 menit | 8 | 15' + 15' | `K3_Komunikasi_Izin_Kerja_Dokumentasi.pptx` | 8 |
| 4 | 2 | 30 menit | 6 | 10' + 10' | `K4_Investigasi_dan_Evaluasi_K3.pptx` | 6 |

## 3. Peta unit kompetensi → deck

- **K1** — 001.1 Strategi Pengendalian Risiko · 005.1 Pengukuran Faktor Bahaya · 011.1 Manajemen Risiko · 008.1 APD · 009.1 Pelayanan Kesehatan Kerja
- **K2** — 002.1 Sistem Tanggap Darurat · 006.1 P3K · 007.1 Tindakan Tanggap Darurat
- **K3** — 003.1 Komunikasi K3 · 004.1 Izin Kerja · 010.1 Sistem Dokumentasi K3
- **K4** — 013.1 Investigasi Kecelakaan Kerja · 012.1 Evaluasi Pemenuhan Persyaratan & Prosedur K3

## 4. Design token (diekstrak dari PPT lama, jangan diubah sembarangan)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| NAVY | `#1D305A` | balok kiri/kanan, judul, pill utama, header tabel |
| GREEN | `#8DC63F` | aksen kanan-atas, parallelogram kiri-bawah, status positif |
| ORANGE | `#F57A20` | status "sebagian/perlu perbaikan" |
| RED | `#C0392B` | status kritis / tidak sesuai |
| BLUE grad | `#3E7FCD → #96C0FF` | 3 garis diagonal dekoratif |
| BORDER | `#DCE1E6` | garis kartu |
| INK / MUTED / TINT | `#222222` / `#6E7680` / `#E9F1FF` | teks isi / subjudul & footer / pita catatan |
| Font | Calibri | seluruh deck |
| Kanvas | 10" × 5.625" (16:9) | — |

### Grid tetap
- Kolom konten aman: **x 1.35" → 8.30"** (lebar 6.95") — di luar itu ketiban balok navy/hijau.
- Judul slide y `0.33` (auto-kecil kalau >48 karakter), subjudul y `0.63`, konten mulai y `0.95`, batas bawah y `≈4.85`, footer y `5.29`.
- Dekorasi digambar paling awal (jadi selalu di belakang konten).

## 5. Komponen (`deck.py`)

`new_deck` · `cover` · `content` (judul+subjudul+dekor+footer) · `pill` · `card(header, bullets)` · `note` (pita highlight) · `numbered` (daftar bernomor) · `table` (header navy, zebra, warna status per sel) · `picture` (fit rasio otomatis + caption) · `textbox`.

Aturan muat teks yang sudah terverifikasi render:
- kartu 2.22" lebar, teks 7.5pt → **± 34 karakter per baris**;
- pita `note` selebar 6.95", 7.5pt → **± 95 karakter satu baris** (lebih dari itu meluber);
- baris `numbered` 0.30" cukup untuk 1 baris teks; pakai 0.42" kalau teksnya 2 baris.

## 6. Aset (`assets/`)

| File | Asal | Dipakai di |
|---|---|---|
| `keyvisual.png`, `icon.png` | deck lama | semua cover |
| `ibpr_p1.png`, `ibpr_p2.png` | Form IBPR terisi | K1 slide 5 & 6 |
| `erp_p1.png` | Emergency Response Plan terisi | K2 slide 8 |
| `permit_p1.png`, `permit_p2.png` | Form Work Permit terisi | K3 slide 6 |
| `lkk_p1.png`, `lkk_p2.png` | Laporan Kecelakaan Kerja terisi | K4 slide 3 |

## 7. Struktur slide per deck

**K1** 1 Cover · 2 Ruang lingkup + daftar pembahasan · 3 Penjabaran kasus · 4 Peraturan · 5 IBPR/HIRADC · 6 Matriks risiko · 7 Standar pengukuran · 8 Data hasil pengukuran · 9 Kebutuhan APD · 10 Inspeksi APD · 11 Pelayanan kesehatan kerja · 12 Kesimpulan
**K2** 1 Cover · 2 Ruang lingkup · 3 Penjabaran kasus · 4 Peraturan · 5 Organisasi tim · 6 Sarana prasarana · 7 Prosedur tanggap darurat · 8 Dokumen ERP · 9 P3K · 10 Daftar periksa · 11 Program pelatihan · 12 Kesimpulan
**K3** 1 Cover · 2 Ruang lingkup · 3 Penjabaran kasus · 4 Daftar periksa permasalahan · 5 Media informasi · 6 Izin kerja · 7 Dokumen K3 · 8 Kesimpulan
**K4** 1 Cover · 2 Ruang lingkup + kasus · 3 Peraturan + laporan investigasi · 4 Root cause (5 Why + fishbone) · 5 Evaluasi pemenuhan · 6 Kesimpulan

## 8. Data yang MASIH DUMMY — wajib diganti angka asli sebelum asesmen

- K1 slide 8: seluruh hasil pengukuran (92 dBA, 88 dBA, 3,4 mg/m³, 180 lux, 29,5 °C).
- K1 slide 6: jumlah aktivitas/level risiko (6 / 1 ekstrim / 5 tinggi) — samakan dengan form IBPR yang dilampirkan.
- K2 slide 6: jumlah APAR, hydrant, kotak P3K, dan statusnya.
- K3 slide 4 & 7: status tiap item checklist.
- K4 slide 5: skor 29% / 43% / 28%.

## 9. Cara pakai ulang

```bash
pip install python-pptx pillow lxml
python3 build.py          # semua deck → output/
python3 k3.py             # satu deck saja
```
Ganti isi → edit list/tabel di `k1.py`–`k4.py`. Ganti tampilan → edit token & komponen di `deck.py` (berlaku ke empat deck sekaligus).
