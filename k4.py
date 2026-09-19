"""Kelompok Pekerjaan 4 — Investigasi Kecelakaan Kerja & Evaluasi Pemenuhan Persyaratan K3 (maks 6 halaman)."""
from deck import *

K = 4
UNITS = [
    ("M.71KKK01.013.1", "Melakukan Investigasi Kecelakaan Kerja"),
    ("M.71KKK01.012.1", "Mengevaluasi Pemenuhan Persyaratan dan Prosedur K3"),
]
BAHASAN = [
    "Peraturan perundang-undangan terkait investigasi kecelakaan kerja",
    "Laporan investigasi kecelakaan kerja",
    "Hasil evaluasi pemenuhan persyaratan dan prosedur K3",
]


def build(path="output/K4_Investigasi_dan_Evaluasi_K3.pptx", prs=None):
    prs = prs or new_deck()
    cover(prs, K, "Investigasi Kecelakaan Kerja & Evaluasi Pemenuhan Persyaratan dan Prosedur K3", 2, "10 menit + 10 menit tanya jawab")

    # 2 — ruang lingkup + pembahasan + kasus
    s = content(prs, "RUANG LINGKUP, PEMBAHASAN & STUDI KASUS", "Unit kompetensi, alur penyajian, dan kasus yang dianalisis", K, 2)
    pill(s, X0, 0.95, 3.30, "Unit Kompetensi Kelompok Pekerjaan 4")
    table(s, X0, 1.28, 3.30, 0.95, [["No", "Kode Unit", "Judul Unit"]] + [[str(i + 1), u[0], u[1]] for i, u in enumerate(UNITS)],
          widths=[0.09, 0.33, 0.58], row_h=0.32, size=6.5, head_size=6.5)
    pill(s, X0, 2.45, 3.30, "Daftar Pembahasan", GREEN)
    numbered(s, X0, 2.78, 3.30, BAHASAN, row_h=0.42, gap=0.06, size=7, accent=GREEN)
    pill(s, 4.95, 0.95, 3.35, "Penjabaran Studi Kasus")
    card(s, 4.95, 1.28, 3.35, 1.10, None,
         "Operator mesin mengalami cedera serius akibat terjebak di antara mesin yang berputar. Produksi dihentikan dua hari untuk "
         "penyelidikan dan korban membutuhkan perawatan medis intensif.", size=7.5)
    card(s, 4.95, 2.48, 3.35, 1.00, "Keputusan Manajemen", ["• Investigasi menyeluruh atas kecelakaan",
                                                            "• Evaluasi pemenuhan persyaratan & prosedur K3",
                                                            "• Penetapan tindakan perbaikan & pencegahan"], NAVY, size=7.5)
    card(s, 4.95, 3.58, 3.35, 1.00, "Fokus Presentasi", ["• Pelaksanaan investigasi kecelakaan kerja",
                                                         "• Evaluasi pemenuhan persyaratan dan prosedur K3"], GREEN, size=7.5)

    # 3 — peraturan + laporan investigasi
    s = content(prs, "1. PERATURAN & LAPORAN INVESTIGASI KECELAKAAN", "Dasar hukum dan dokumen hasil investigasi", K, 3)
    table(s, X0, 0.95, 4.35, 2.30, [
        ["No", "Peraturan", "Substansi Pokok"],
        ["1", "UU No. 1 Tahun 1970", "Kewajiban melaporkan setiap kecelakaan kerja"],
        ["2", "Permenaker No. 3 Tahun 1998", "Tata cara pelaporan & pemeriksaan kecelakaan"],
        ["3", "PP No. 50 Tahun 2012", "SMK3 — penyelidikan insiden & tindakan perbaikan"],
        ["4", "PP No. 44 Tahun 2015", "Jaminan kecelakaan kerja (BPJS Ketenagakerjaan)"],
        ["5", "Permenaker No. 5 Tahun 2021", "Pengawasan norma K3 & sanksi"],
    ], widths=[0.07, 0.33, 0.60], row_h=0.38, size=7)
    card(s, X0, 3.38, 4.35, 1.18, "Kewajiban Pelaporan", [
        "• Kecelakaan kerja wajib dilaporkan ke Disnaker setempat maksimal 2×24 jam sejak kejadian.",
        "• Laporan menggunakan formulir Bentuk 3 KK2A dan dilengkapi kronologi serta bukti pendukung.",
        "• Klaim JKK diajukan ke BPJS Ketenagakerjaan disertai laporan tahap I dan tahap II."], NAVY, size=7)
    picture(s, "lkk_p1.png", 5.90, 0.95, 1.18, 2.30, "Laporan hal. 1")
    picture(s, "lkk_p2.png", 7.15, 0.95, 1.15, 2.30, "Laporan hal. 2")
    card(s, 5.90, 3.38, 2.40, 1.18, "Isi Pokok Laporan", [
        "• Identitas korban & kronologi", "• Penyebab langsung & dasar",
        "• Kerugian: cedera, downtime 2 hari", "• Tindakan perbaikan & PIC"], GREEN, size=7)

    # 4 — analisis akar penyebab
    s = content(prs, "2. ANALISIS AKAR PENYEBAB (ROOT CAUSE ANALYSIS)", "Metode 5 Why dan kategori fishbone atas kecelakaan mesin", K, 4)
    pill(s, X0, 0.95, 4.20, "Analisis 5 Why")
    whys = [("Mengapa operator terjepit?", "Tangan masuk ke area mesin yang berputar."),
            ("Mengapa tangan bisa masuk?", "Machine guard dilepas dan tidak dipasang kembali."),
            ("Mengapa guard dilepas?", "Untuk mempercepat pembersihan saat mesin berjalan."),
            ("Mengapa mesin tidak dimatikan?", "LOTO belum diterapkan dan tidak diawasi."),
            ("Mengapa LOTO tidak diterapkan?", "Prosedur ada namun belum disosialisasikan & diawasi.")]
    for i, (q, a) in enumerate(whys):
        y = 1.28 + i * 0.44
        card(s, X0, y, 4.20, 0.40, None, [(f"{i+1}. {q}", True, NAVY, 7), (a, False, INK, 7)], size=7)
    card(s, 4.80, 0.95, 1.70, 1.40, "Manusia", ["• Melanggar prosedur", "• Terbiasa mengambil jalan pintas",
                                                "• Pelatihan LOTO belum merata"], ORANGE, size=7)
    card(s, 6.60, 0.95, 1.70, 1.40, "Mesin", ["• Guard mudah dilepas", "• Tidak ada interlock",
                                              "• Emergency stop jauh"], NAVY, size=7)
    card(s, 4.80, 2.45, 1.70, 1.40, "Metode", ["• SOP pembersihan tidak jelas", "• LOTO tidak diterapkan",
                                               "• Izin kerja tidak dipakai"], RED, size=7)
    card(s, 6.60, 2.45, 1.70, 1.40, "Manajemen", ["• Pengawasan lapangan lemah", "• Inspeksi tidak berkala",
                                                  "• Temuan tidak ditindaklanjuti"], GREEN, size=7)
    note(s, X0, 3.95, W, "Akar penyebab: lemahnya penerapan & pengawasan LOTO serta pengaman mesin", h=0.28)
    card(s, X0, 4.35, W, 0.55, None,
         "Rekomendasi: pasang guard berinterlock, terapkan LOTO wajib, revisi SOP pembersihan mesin, latih ulang operator, dan tambah inspeksi harian.", size=7.5)

    # 5 — evaluasi pemenuhan persyaratan K3
    s = content(prs, "3. EVALUASI PEMENUHAN PERSYARATAN & PROSEDUR K3", "Tingkat kesesuaian penerapan K3 terhadap persyaratan", K, 5)
    table(s, X0, 0.95, 5.60, 2.90, [
        ["Persyaratan / Prosedur", "Acuan", "Kesesuaian", "Tindakan Perbaikan"],
        ["Pengamanan mesin (guarding)", "Permenaker 38/2016", ("Tidak sesuai", RED), "Pasang guard berinterlock"],
        ["Prosedur LOTO", "PP 50/2012; SOP internal", ("Tidak sesuai", RED), "Terapkan & awasi LOTO"],
        ["Izin kerja pemeliharaan", "SOP internal", ("Sebagian", ORANGE), "Wajibkan izin kerja"],
        ["Pelatihan operator mesin", "UU 1/1970 Pasal 9", ("Sebagian", ORANGE), "Pelatihan ulang & uji paham"],
        ["Inspeksi K3 berkala", "PP 50/2012", ("Sebagian", ORANGE), "Jadwal inspeksi harian"],
        ["Pelaporan kecelakaan", "Permenaker 3/1998", ("Sesuai", GREEN), "Pertahankan"],
        ["Pelayanan kesehatan & JKK", "PER.03/MEN/1982; PP 44/2015", ("Sesuai", GREEN), "Pertahankan"],
    ], widths=[0.30, 0.26, 0.18, 0.26], row_h=0.34, size=6.8)
    card(s, 7.10, 0.95, 1.20, 2.90, "Skor Evaluasi", [("29%", True, RED, 14), ("tidak sesuai", False, MUTED, 6.5),
                                                      ("43%", True, ORANGE, 14), ("sebagian sesuai", False, MUTED, 6.5),
                                                      ("28%", True, GREEN, 14), ("sesuai", False, MUTED, 6.5)], NAVY, size=7, align=PP_ALIGN.CENTER)
    note(s, X0, 4.00, W, "Ketidaksesuaian kritis (guarding & LOTO) wajib ditutup sebelum mesin dioperasikan kembali", h=0.28)

    # 6 — kesimpulan
    s = content(prs, "KESIMPULAN & REKOMENDASI", "Rangkuman hasil analisis Kelompok Pekerjaan 4", K, 6)
    card(s, X0, 0.95, 4.20, 1.95, "Poin Utama", [
        "• Investigasi bertujuan menemukan akar penyebab, bukan mencari kesalahan individu.",
        "• Akar penyebab kecelakaan: guard dilepas dan LOTO tidak diterapkan serta lemahnya pengawasan.",
        "• Evaluasi menunjukkan 29% persyaratan K3 tidak sesuai dan 43% baru sebagian terpenuhi.",
        "• Tindakan perbaikan wajib disertai penanggung jawab, target waktu, dan verifikasi.",
        "• Hasil investigasi menjadi masukan pembaruan IBPR, SOP, dan program pelatihan."], NAVY, size=8)
    card(s, 5.72, 0.95, 2.58, 1.95, "Prioritas Perbaikan", [
        "1. Machine guard berinterlock", "2. Penerapan LOTO wajib",
        "3. Revisi SOP pembersihan mesin", "4. Pelatihan ulang operator",
        "5. Inspeksi harian mesin", "6. Verifikasi efektivitas perbaikan"], GREEN, size=8)
    for i, (t, d) in enumerate([("Segera", "0–7 hari: mesin di-LOTO sampai guard terpasang"),
                                ("Jangka Menengah", "1–3 bulan: SOP, pelatihan, inspeksi harian"),
                                ("Jangka Panjang", "3–12 bulan: audit internal & tinjauan manajemen")]):
        card(s, X0 + i * (2.34 + 0.06), 3.05, 2.34, 0.80, t, d, [RED, ORANGE, GREEN][i], size=7.5)
    note(s, X0, 4.00, W, "Target: nihil kecelakaan berulang dengan penyebab yang sama (zero repeat accident)", h=0.28)
    textbox(s, X0, 4.45, W, 0.30, "Terima kasih — siap untuk sesi tanya jawab", 11, NAVY, bold=True, align=PP_ALIGN.CENTER)

    if path:
        Path(path).parent.mkdir(exist_ok=True)
        prs.save(path)
    return path or prs


if __name__ == "__main__":
    print(build())
