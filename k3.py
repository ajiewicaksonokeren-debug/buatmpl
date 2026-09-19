"""Kelompok Pekerjaan 3 — Komunikasi K3, Izin Kerja, Sistem Dokumentasi K3 (maks 8 halaman)."""
from deck import *

K = 3
UNITS = [
    ("M.71KKK01.003.1", "Melakukan Komunikasi K3"),
    ("M.71KKK01.004.1", "Mengawasi Pelaksanaan Izin Kerja"),
    ("M.71KKK01.010.1", "Mengelola Sistem Dokumentasi K3"),
]
BAHASAN = [
    "Daftar periksa permasalahan K3",
    "Media informasi K3",
    "Prosedur terkait izin kerja (Work Permit)",
    "Daftar periksa dokumen K3",
]


def build(path="output/K3_Komunikasi_Izin_Kerja_Dokumentasi.pptx"):
    prs = new_deck()
    cover(prs, K, "Komunikasi K3, Pengawasan Izin Kerja & Pengelolaan Sistem Dokumentasi K3", 3, "15 menit + 15 menit tanya jawab")

    # 2 — ruang lingkup + daftar pembahasan
    s = content(prs, "RUANG LINGKUP & DAFTAR PEMBAHASAN", "Unit kompetensi yang dibahas dan alur penyajian", K, 2)
    pill(s, X0, 0.95, 3.30, "Unit Kompetensi Kelompok Pekerjaan 3")
    table(s, X0, 1.28, 3.30, 1.3, [["No", "Kode Unit", "Judul Unit"]] + [[str(i + 1), u[0], u[1]] for i, u in enumerate(UNITS)],
          widths=[0.09, 0.33, 0.58], row_h=0.30, size=6.5, head_size=6.5)
    pill(s, X0, 2.80, 3.30, "Fokus Presentasi", GREEN)
    textbox(s, X0 + 0.05, 3.11, 3.20, 0.70, ["• Komunikasi K3", "• Pelaksanaan izin kerja", "• Pengelolaan sistem dokumentasi K3"], 8)
    card(s, X0, 3.90, 3.30, 0.70, None,
         "Tiga unit ini menjamin informasi K3 tersampaikan, pekerjaan berisiko terkendali, dan bukti penerapan K3 terdokumentasi.", size=7.5)
    pill(s, 4.95, 0.95, 3.35, "Daftar Pembahasan")
    numbered(s, 4.95, 1.28, 3.35, BAHASAN, row_h=0.36, gap=0.10, size=7.5)

    # 3 — penjabaran studi kasus
    s = content(prs, "PENJABARAN STUDI KASUS", "Kondisi perusahaan yang menjadi dasar analisis komunikasi & dokumentasi K3", K, 3)
    card(s, X0, 0.95, W, 0.68, None,
         "Setelah sistem pengendalian risiko dan tanggap darurat diperbaiki, perusahaan menemukan bahwa dokumentasi dan prosedur K3 masih "
         "menjadi tantangan: dokumen K3 tidak selalu tersedia, informasi K3 belum tersebar efektif ke seluruh karyawan, dan work permit "
         "belum dijalankan dengan disiplin.", size=8.5)
    cw, gap = 2.22, 0.12
    card(s, X0, 1.78, cw, 1.55, "Permasalahan Utama",
         ["• Work permit tidak konsisten dipakai", "• Informasi K3 tidak merata",
          "• Dokumen K3 sulit ditemukan", "• Revisi dokumen tidak terkendali", "• Rekaman K3 tidak lengkap"], NAVY, size=7.5)
    card(s, X0 + cw + gap, 1.78, cw, 1.55, "Dampak yang Terjadi",
         ["• Pekerjaan berisiko tanpa kendali", "• Pekerja tidak paham bahaya",
          "• Temuan audit SMK3 berulang", "• Investigasi sulit dilakukan", "• Risiko sanksi ketidakpatuhan"], ORANGE, size=7.5)
    card(s, X0 + 2 * (cw + gap), 1.78, cw, 1.55, "Sasaran Perbaikan",
         ["• Komunikasi K3 dua arah efektif", "• Izin kerja disiplin & terverifikasi",
          "• Dokumen K3 terkendali & mudah diakses", "• Rekaman lengkap & terjaga", "• Siap diaudit sewaktu-waktu"], GREEN, size=7.5)
    note(s, X0, 3.48, W, "Peran Koordinator K3: menyusun analisis kasus dan dokumen presentasi perbaikan sistem K3", h=0.28)
    card(s, X0, 3.88, W, 0.70, None,
         ["Output yang dihasilkan: daftar periksa permasalahan K3, rancangan media informasi K3, prosedur izin kerja, dan daftar periksa "
          "dokumen K3 sebagai dasar rekomendasi perbaikan kepada manajemen."], size=8)

    # 4 — daftar periksa permasalahan K3
    s = content(prs, "1. DAFTAR PERIKSA PERMASALAHAN K3", "Hasil pemeriksaan kondisi penerapan K3 di lapangan", K, 4)
    table(s, X0, 0.95, 5.45, 3.0, [
        ["No", "Elemen yang Diperiksa", "Kondisi", "Temuan"],
        ["1", "Kebijakan K3 tersosialisasi", ("Sebagian", ORANGE), "Belum menjangkau pekerja shift malam"],
        ["2", "Safety induction pekerja/tamu", ("Ada", GREEN), "Rekaman tidak selalu diarsipkan"],
        ["3", "Rambu & poster K3", ("Kurang", ORANGE), "Tidak ada di area gudang kimia"],
        ["4", "Pelaksanaan work permit", ("Tidak disiplin", RED), "Pekerjaan panas tanpa izin tertulis"],
        ["5", "Ketersediaan dokumen K3", ("Sebagian", ORANGE), "SOP versi lama masih beredar"],
        ["6", "Rekaman inspeksi & pelatihan", ("Kurang", RED), "Tidak lengkap dan tidak terpusat"],
        ["7", "Tindak lanjut temuan K3", ("Sebagian", ORANGE), "Tanpa target waktu & PIC"],
    ], widths=[0.06, 0.32, 0.18, 0.44], row_h=0.36, size=7)
    card(s, 6.95, 0.95, 1.35, 1.55, "Rekapitulasi", [("2", True, RED, 15), ("temuan kritis", False, MUTED, 6.5),
                                                     ("4", True, ORANGE, 15), ("perlu perbaikan", False, MUTED, 6.5)], NAVY, size=7, align=PP_ALIGN.CENTER)
    card(s, 6.95, 2.58, 1.35, 1.37, "Prioritas", ["• Work permit", "• Rekaman K3", "• Kendali versi dokumen", "• Rambu area kimia"], GREEN, size=7)
    note(s, X0, 4.10, W, "Akar masalah bukan ketiadaan sistem, melainkan kedisiplinan pelaksanaan dan pengendalian dokumen", h=0.28)

    # 5 — media informasi K3
    s = content(prs, "2. MEDIA INFORMASI K3", "Pemilihan media komunikasi sesuai tujuan dan sasaran", K, 5)
    table(s, X0, 0.95, W, 2.35, [
        ["Media", "Sasaran", "Frekuensi", "Tujuan Komunikasi"],
        ["Safety induction", "Pekerja baru, tamu, kontraktor", "Setiap kedatangan", "Pengenalan bahaya & aturan dasar K3"],
        ["Safety talk / toolbox meeting", "Pekerja per regu", "Harian sebelum kerja", "Bahaya pekerjaan hari itu & pengendalian"],
        ["Rambu, poster, banner", "Seluruh area kerja", "Permanen, ditinjau 6 bulan", "Peringatan bahaya & kewajiban APD"],
        ["Papan informasi & digital display", "Seluruh pekerja", "Mingguan", "Statistik K3, temuan, pengumuman"],
        ["Grup pesan & email internal", "Pekerja & manajemen", "Insidental", "Informasi cepat & darurat"],
    ], widths=[0.26, 0.24, 0.22, 0.28], row_h=0.34, size=7)
    card(s, X0, 3.42, 3.40, 1.00, "Syarat Komunikasi Efektif", ["• Bahasa sederhana & mudah dipahami",
                                                                 "• Visual jelas, sesuai standar warna rambu", "• Dua arah: ada umpan balik pekerja"], NAVY, size=7.5)
    card(s, X0 + 3.52, 3.42, 3.43, 1.00, "Bukti Pelaksanaan", ["• Daftar hadir & notulen safety talk",
                                                               "• Foto pemasangan rambu & poster", "• Rekaman induction dan sosialisasi"], GREEN, size=7.5)
    note(s, X0, 4.52, W, "Komunikasi K3 wajib menjangkau seluruh shift, termasuk kontraktor dan tamu", h=0.26)

    # 6 — izin kerja
    s = content(prs, "3. PROSEDUR IZIN KERJA (PERMIT TO WORK)", "Pengendalian pekerjaan berisiko tinggi melalui izin kerja tertulis", K, 6)
    picture(s, "permit_p1.png", X0, 0.95, 2.35, 3.05, "Form izin kerja yang telah diisi")
    pill(s, 3.95, 0.95, 4.35, "Alur Pelaksanaan Izin Kerja")
    numbered(s, 3.95, 1.28, 4.35, [
        "Pengajuan izin oleh pelaksana pekerjaan", "Identifikasi bahaya & penetapan pengendalian (JSA)",
        "Verifikasi lapangan oleh pengawas & petugas K3", "Persetujuan & penerbitan izin kerja",
        "Pengawasan selama pekerjaan berlangsung", "Penutupan izin & serah terima area bersih",
    ], row_h=0.28, gap=0.05, size=7.5)
    card(s, 3.95, 3.35, 2.10, 1.02, "Jenis Izin Kerja", ["• Pekerjaan panas (hot work)", "• Ruang terbatas",
                                                         "• Ketinggian & penggalian", "• Pekerjaan listrik (LOTO)"], NAVY, size=7)
    card(s, 6.20, 3.35, 2.10, 1.02, "Titik Kritis Pengawasan", ["• Izin berlaku sesuai waktu kerja",
                                                                "• Fire watcher pada hot work", "• Gas test ruang terbatas", "• APD & alat sesuai izin"], RED, size=7)
    note(s, X0, 4.32, 2.35, "Tanpa izin = pekerjaan dihentikan", GREEN, WHITE, 7, h=0.26)

    # 7 — dokumentasi K3
    s = content(prs, "4. DAFTAR PERIKSA DOKUMEN K3", "Pengendalian dokumen dan rekaman sistem manajemen K3", K, 7)
    table(s, X0, 0.95, 5.45, 2.95, [
        ["No", "Dokumen / Rekaman", "Masa Simpan", "Status"],
        ["1", "Kebijakan & sasaran K3", "Selama berlaku", ("Tersedia", GREEN)],
        ["2", "Manual & prosedur K3 (SOP, JSA)", "Selama berlaku + 2 tahun", ("Versi lama beredar", RED)],
        ["3", "Dokumen IBPR/HIRADC", "Ditinjau 1 tahun sekali", ("Tersedia", GREEN)],
        ["4", "Rekaman izin kerja", "Minimal 2 tahun", ("Tidak lengkap", RED)],
        ["5", "Rekaman pelatihan & induction", "Minimal 5 tahun", ("Sebagian", ORANGE)],
        ["6", "Laporan inspeksi & audit K3", "Minimal 5 tahun", ("Sebagian", ORANGE)],
        ["7", "Laporan kecelakaan & investigasi", "Minimal 5 tahun", ("Tersedia", GREEN)],
    ], widths=[0.06, 0.46, 0.26, 0.22], row_h=0.35, size=7)
    card(s, 6.95, 0.95, 1.35, 2.95, "Kendali Dokumen", ["• Identifikasi & penomoran",
                                                                "• Pengesahan sebelum terbit", "• Kendali versi & revisi",
                                                                "• Distribusi terkendali", "• Penarikan dokumen usang",
                                                                "• Akses mudah di titik pakai"], NAVY, size=7)
    note(s, X0, 4.05, W, "Dokumen usang wajib ditarik dan diberi tanda agar tidak digunakan kembali (PP 50/2012)", h=0.28)

    # 8 — kesimpulan
    s = content(prs, "KESIMPULAN & REKOMENDASI", "Rangkuman hasil analisis Kelompok Pekerjaan 3", K, 8)
    card(s, X0, 0.95, 4.20, 1.95, "Poin Utama", [
        "• Komunikasi K3 efektif membuat pekerja memahami bahaya, prosedur, dan kewajiban APD.",
        "• Izin kerja adalah kendali utama pekerjaan berisiko tinggi dan wajib dijalankan disiplin.",
        "• Dokumentasi K3 yang terkendali menjadi bukti penerapan dan dasar perbaikan berkelanjutan.",
        "• Temuan utama: work permit tidak konsisten dan rekaman K3 belum lengkap.",
        "• Ketiga unit saling menopang pemenuhan SMK3 (PP 50/2012) dan ISO 45001."], NAVY, size=8)
    card(s, 5.72, 0.95, 2.58, 1.95, "Rekomendasi Prioritas", [
        "1. Tegakkan sistem izin kerja", "2. Tarik & ganti SOP versi lama",
        "3. Sentralisasi rekaman K3 digital", "4. Safety talk harian tiap regu",
        "5. Lengkapi rambu area kimia", "6. Audit dokumen K3 tiap semester"], GREEN, size=8)
    for i, (t, d) in enumerate([("Jangka Pendek", "0–1 bulan: penegakan izin kerja & sosialisasi"),
                                ("Jangka Menengah", "1–3 bulan: kendali versi & sentralisasi rekaman"),
                                ("Jangka Panjang", "3–12 bulan: audit internal & digitalisasi dokumen")]):
        card(s, X0 + i * (2.34 + 0.06), 3.05, 2.34, 0.80, t, d, [NAVY, ORANGE, GREEN][i], size=7.5)
    note(s, X0, 4.00, W, "Target: nihil pekerjaan berisiko tanpa izin kerja dan dokumen K3 siap audit", h=0.28)
    textbox(s, X0, 4.45, W, 0.30, "Terima kasih — siap untuk sesi tanya jawab", 11, NAVY, bold=True, align=PP_ALIGN.CENTER)

    Path(path).parent.mkdir(exist_ok=True)
    prs.save(path)
    return path


if __name__ == "__main__":
    print(build())
