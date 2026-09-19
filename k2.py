"""Kelompok Pekerjaan 2 — Sistem Tanggap Darurat, P3K, Tindakan Tanggap Darurat (maks 12 halaman)."""
from deck import *

K = 2
UNITS = [
    ("M.71KKK01.002.1", "Merancang Sistem Tanggap Darurat"),
    ("M.71KKK01.006.1", "Mengelola Pertolongan Pertama pada Kecelakaan Kerja (P3K) di Tempat Kerja"),
    ("M.71KKK01.007.1", "Mengelola Tindakan Tanggap Darurat"),
]
BAHASAN = [
    "Peraturan terkait tanggap darurat",
    "Daftar sarana prasarana/fasilitas tanggap darurat",
    "Prosedur tanggap darurat dan P3K",
    "Daftar periksa tanggap darurat",
    "Program pelatihan tanggap darurat",
]


def build(path="output/K2_Tanggap_Darurat_dan_P3K.pptx"):
    prs = new_deck()
    cover(prs, K, "Perancangan Sistem Tanggap Darurat, Pengelolaan P3K & Tindakan Tanggap Darurat", 3, "15 menit + 15 menit tanya jawab")

    # 2 — ruang lingkup + daftar pembahasan
    s = content(prs, "RUANG LINGKUP & DAFTAR PEMBAHASAN", "Unit kompetensi yang dibahas dan alur penyajian", K, 2)
    pill(s, X0, 0.95, 3.30, "Unit Kompetensi Kelompok Pekerjaan 2")
    table(s, X0, 1.28, 3.30, 1.3, [["No", "Kode Unit", "Judul Unit"]] + [[str(i + 1), u[0], u[1]] for i, u in enumerate(UNITS)],
          widths=[0.09, 0.33, 0.58], row_h=0.32, size=6.5, head_size=6.5)
    pill(s, X0, 2.80, 3.30, "Fokus Presentasi", GREEN)
    textbox(s, X0 + 0.05, 3.11, 3.20, 0.70,
            ["• Perancangan sistem tanggap darurat", "• Pengelolaan P3K di tempat kerja",
             "• Pengelolaan tindakan tanggap darurat"], 8)
    card(s, X0, 3.90, 3.30, 0.70, None,
         "Hasil evaluasi internal: prosedur keselamatan sudah baik, namun sistem tanggap darurat belum teruji pada situasi nyata.", size=7.5)
    pill(s, 4.95, 0.95, 3.35, "Daftar Pembahasan")
    numbered(s, 4.95, 1.28, 3.35, BAHASAN, row_h=0.34, gap=0.08, size=7.5)

    # 3 — penjabaran studi kasus
    s = content(prs, "PENJABARAN STUDI KASUS", "Kondisi kesiapan tanggap darurat yang menjadi dasar analisis", K, 3)
    card(s, X0, 0.95, W, 0.68, None,
         "Evaluasi internal tim K3 dan manajemen menemukan bahwa meskipun prosedur keselamatan sudah baik, sistem tanggap darurat belum "
         "sepenuhnya teruji dalam situasi nyata. Simulasi selama enam bulan menunjukkan beberapa area masih memerlukan perbaikan, "
         "khususnya ketersediaan dan kesiapan sarana prasarana tanggap darurat.", size=8.5)
    cw, gap = 2.22, 0.12
    card(s, X0, 1.78, cw, 1.55, "Temuan Simulasi",
         ["• Waktu evakuasi melebihi target", "• Alarm tidak terdengar di semua area",
          "• Jalur evakuasi terhalang material", "• Petugas belum paham peran", "• Titik kumpul belum memadai"], NAVY, size=7.5)
    card(s, X0 + cw + gap, 1.78, cw, 1.55, "Kelemahan Sarana",
         ["• APAR kedaluwarsa/tekanan kurang", "• Isi kotak P3K tidak lengkap",
          "• Rambu & lampu darurat redup", "• Alat komunikasi darurat terbatas", "• Hydrant belum diuji berkala"], ORANGE, size=7.5)
    card(s, X0 + 2 * (cw + gap), 1.78, cw, 1.55, "Sasaran Perbaikan",
         ["• Sistem tanggap darurat teruji", "• Sarana siap pakai 100%",
          "• Petugas terlatih & tersertifikasi", "• Waktu evakuasi ≤ 5 menit", "• Prosedur terdokumentasi"], GREEN, size=7.5)
    note(s, X0, 3.48, W, "Peran Koordinator K3: menyusun analisis kesiapan dan dokumen presentasi sistem tanggap darurat", h=0.28)
    card(s, X0, 3.88, W, 0.70, None,
         ["Output yang dihasilkan: daftar sarana prasarana tanggap darurat, prosedur tanggap darurat & P3K, daftar periksa kesiapan, "
          "serta program pelatihan dan simulasi sebagai dasar rekomendasi perbaikan kepada manajemen."], size=8)

    # 4 — peraturan
    s = content(prs, "1. PERATURAN TERKAIT TANGGAP DARURAT", "Dasar hukum penyelenggaraan tanggap darurat dan P3K", K, 4)
    table(s, X0, 0.95, 4.75, 3.2, [
        ["No", "Peraturan", "Substansi Pokok"],
        ["1", "UU No. 1 Tahun 1970", "Syarat K3: pencegahan & penanggulangan kebakaran, jalan penyelamatan"],
        ["2", "PP No. 50 Tahun 2012", "SMK3 — kesiagaan & tanggap keadaan darurat (elemen 6.7)"],
        ["3", "Kepmenaker No. 186/MEN/1999", "Unit penanggulangan kebakaran di tempat kerja"],
        ["4", "Permenaker No. 15 Tahun 2008", "P3K di tempat kerja — petugas, kotak, & isi P3K"],
        ["5", "Permenaker No. 4 Tahun 1980", "Pemasangan & pemeliharaan APAR"],
        ["6", "Permen PU No. 26/PRT/M/2008", "Sarana proteksi kebakaran & jalur evakuasi bangunan"],
        ["7", "ISO 45001:2018 klausul 8.2", "Kesiapsiagaan & tanggap darurat"],
    ], widths=[0.07, 0.35, 0.58], row_h=0.39, size=7)
    card(s, 6.25, 0.95, 2.05, 2.72, "Kewajiban Perusahaan",
         ["• Menyusun & menguji prosedur tanggap darurat secara berkala.",
          "• Menyediakan sarana proteksi kebakaran dan jalur evakuasi.",
          "• Menunjuk petugas P3K bersertifikat sesuai jumlah pekerja.",
          "• Melaporkan kejadian darurat & kecelakaan kerja."], NAVY, size=7)
    note(s, 6.25, 3.79, 2.05, "Diuji minimal 1 tahun sekali", GREEN, WHITE, 7, h=0.36)
    note(s, X0, 4.28, 4.75, "Rasio petugas P3K: 1 orang per 25–150 pekerja sesuai potensi bahaya (Permenaker 15/2008)", h=0.28)

    # 5 — organisasi tanggap darurat
    s = content(prs, "2. ORGANISASI & SARANA TANGGAP DARURAT", "Struktur tim dan pembagian peran saat keadaan darurat", K, 5)
    pill(s, X0, 0.95, W, "Struktur Tim Tanggap Darurat")
    roles = [("Ketua Tim (Emergency Coordinator)", "Memimpin penanganan & memutuskan evakuasi"),
             ("Regu Pemadam Kebakaran", "Pemadaman awal dengan APAR/hydrant"),
             ("Regu Evakuasi", "Mengarahkan pekerja ke titik kumpul & head count"),
             ("Regu P3K", "Pertolongan pertama & rujukan korban"),
             ("Regu Keamanan & Komunikasi", "Mengamankan area, menghubungi instansi terkait")]
    for i, (r, d) in enumerate(roles):
        y = 1.30 + i * 0.44
        card(s, X0, y, 3.40, 0.38, None, [(r, True, NAVY, 7.5)], size=7.5)
        textbox(s, X0 + 3.52, y + 0.06, 3.43, 0.30, d, 7.5)
    note(s, X0, 3.62, W, "Nomor darurat internal dan eksternal (damkar, ambulans, rumah sakit rujukan) dipasang di setiap area kerja", h=0.28)
    card(s, X0, 4.02, W, 0.58, None,
         "Setiap regu memiliki deputi/pengganti agar sistem tetap berjalan pada seluruh shift, termasuk shift malam dan hari libur.", size=8)

    # 6 — sarana prasarana
    s = content(prs, "2. DAFTAR SARANA PRASARANA TANGGAP DARURAT", "Ketersediaan dan status kesiapan fasilitas darurat", K, 6)
    table(s, X0, 0.95, W, 2.85, [
        ["Sarana / Fasilitas", "Jumlah", "Lokasi", "Status", "Tindak Lanjut"],
        ["APAR (dry chemical & CO₂)", "24 unit", "Seluruh area produksi & kantor", ("3 kedaluwarsa", RED), "Refill & retag"],
        ["Hydrant & selang", "6 titik", "Area produksi dan gudang", ("Perlu uji", ORANGE), "Uji tekanan berkala"],
        ["Kotak P3K tipe B", "8 kotak", "Produksi, gudang, kantor", ("Isi kurang", ORANGE), "Lengkapi sesuai lampiran"],
        ["Alarm & sistem deteksi", "12 titik", "Seluruh gedung", ("Sebagian lemah", ORANGE), "Tambah sounder area bising"],
        ["Jalur & rambu evakuasi", "5 jalur", "Menuju 2 titik kumpul", ("Terhalang", RED), "Bebaskan jalur, cat ulang"],
        ["Eyewash & safety shower", "3 unit", "Gudang bahan kimia", ("Siap", GREEN), "Uji aliran mingguan"],
        ["Tandu & kursi roda", "4 unit", "Klinik & area produksi", ("Siap", GREEN), "Inspeksi bulanan"],
    ], widths=[0.26, 0.11, 0.26, 0.17, 0.24], row_h=0.34, size=6.8)
    note(s, X0, 4.00, W, "Sarana darurat wajib diinspeksi berkala dan hasilnya dicatat pada kartu inspeksi tiap unit", h=0.28)

    # 7 — prosedur tanggap darurat
    s = content(prs, "3. PROSEDUR TANGGAP DARURAT", "Alur penanganan keadaan darurat dari deteksi hingga pemulihan", K, 7)
    steps = ["Deteksi & Alarm", "Lapor ke Tim", "Penanganan Awal", "Evakuasi", "Head Count", "Pemulihan"]
    bw = (W - 5 * 0.10) / 6
    for i, st in enumerate(steps):
        x = X0 + i * (bw + 0.10)
        card(s, x, 0.95, bw, 0.72, None, [(str(i + 1), True, NAVY, 13), (st, True, INK, 7)], size=7, align=PP_ALIGN.CENTER)
        if i < 5:
            textbox(s, x + bw, 1.18, 0.10, 0.20, "›", 11, MUTED, bold=True, align=PP_ALIGN.CENTER)
    card(s, X0, 1.82, 3.40, 1.42, "Tindakan Kunci", [
        "• Hentikan pekerjaan, amankan mesin & sumber energi.", "• Bunyikan alarm dan hubungi tim tanggap darurat.",
        "• Padamkan api awal bila aman dengan APAR yang sesuai.", "• Evakuasi lewat jalur terdekat, jangan gunakan lift.",
        "• Berkumpul di titik kumpul untuk penghitungan jumlah."], NAVY, size=7.5)
    card(s, X0 + 3.52, 1.82, 3.43, 1.42, "Larangan Saat Darurat", [
        "• Kembali ke area sebelum dinyatakan aman.", "• Menggunakan APAR jenis salah (mis. air pada panel listrik).",
        "• Menghalangi jalur evakuasi dan akses hydrant.", "• Menangani korban tanpa kompetensi P3K.",
        "• Menyebarkan informasi tanpa persetujuan tim."], RED, size=7.5)
    note(s, X0, 3.38, W, "Target waktu evakuasi seluruh pekerja ke titik kumpul: maksimal 5 menit sejak alarm berbunyi", h=0.28)
    card(s, X0, 3.78, W, 0.80, "Pasca Kejadian", [
        "• Investigasi penyebab, pendataan korban & kerugian, pelaporan ke Disnaker bila terjadi kecelakaan kerja.",
        "• Evaluasi keefektifan prosedur dan pembaruan dokumen tanggap darurat sebagai tindakan perbaikan."], GREEN, size=7.5)

    # 8 — dokumen ERP
    s = content(prs, "3. DOKUMEN EMERGENCY RESPONSE PLAN (ERP)", "Bukti dokumentasi sistem tanggap darurat yang disusun", K, 8)
    picture(s, "erp_p1.png", X0, 0.95, 4.35, 3.08, "Emergency Response Plan — dokumen yang telah diisi")
    card(s, 5.95, 0.95, 2.35, 1.35, "Isi Pokok ERP", ["• Identifikasi potensi darurat", "• Struktur & peran tim",
                                                      "• Prosedur respons per skenario", "• Denah evakuasi & titik kumpul",
                                                      "• Daftar kontak darurat"], NAVY, size=7.5)
    card(s, 5.95, 2.38, 2.35, 1.35, "Skenario yang Disiapkan", ["• Kebakaran & ledakan", "• Tumpahan bahan kimia",
                                                                "• Kecelakaan kerja berat", "• Gempa bumi", "• Kegagalan listrik total"], ORANGE, size=7.5)
    note(s, 5.95, 3.82, 2.35, "Ditinjau minimal 1 tahun sekali", GREEN, WHITE, 7, h=0.30)
    note(s, X0, 4.30, 4.35, "ERP disahkan manajemen dan disosialisasikan ke seluruh pekerja", h=0.28)

    # 9 — P3K
    s = content(prs, "4. PENGELOLAAN P3K DI TEMPAT KERJA", "Mengacu Permenaker No. 15 Tahun 2008", K, 9)
    cw = 2.22
    card(s, X0, 0.95, cw, 1.50, "Petugas P3K", ["• Bersertifikat pelatihan P3K", "• Ditunjuk dengan surat keputusan",
                                                "• Tersedia di setiap shift", "• Rasio sesuai jumlah pekerja", "• Penyegaran berkala"], NAVY, size=7.5)
    card(s, X0 + cw + 0.12, 0.95, cw, 1.50, "Fasilitas P3K", ["• Ruang P3K & klinik", "• Kotak P3K tipe A/B/C",
                                                              "• Alat evakuasi (tandu, kursi roda)", "• Eyewash & safety shower",
                                                              "• Alat angkut korban"], ORANGE, size=7.5)
    card(s, X0 + 2 * (cw + 0.12), 0.95, cw, 1.50, "Isi Kotak P3K", ["• Kasa, perban, plester", "• Antiseptik & kapas",
                                                                    "• Gunting, pinset, sarung tangan", "• Kantong plastik & masker",
                                                                    "• Buku catatan & daftar isi"], GREEN, size=7.5)
    table(s, X0, 2.60, W, 1.30, [
        ["Jenis Kotak", "Jumlah Pekerja", "Penempatan", "Keterangan"],
        ["Tipe A", "Kurang dari 26 pekerja", "1 kotak per unit kerja", "Risiko rendah"],
        ["Tipe B", "26–50 pekerja", "1 kotak per unit kerja", "Digunakan di area produksi"],
        ["Tipe C", "51–100 pekerja", "1 kotak per unit kerja", "Ditambah sesuai jarak & bahaya"],
    ], widths=[0.16, 0.24, 0.28, 0.32], row_h=0.32, size=7)
    note(s, X0, 4.02, W, "Setiap penggunaan isi kotak P3K dicatat dan segera dilengkapi kembali oleh petugas P3K", h=0.28)

    # 10 — daftar periksa
    s = content(prs, "5. DAFTAR PERIKSA KESIAPAN TANGGAP DARURAT", "Checklist inspeksi bulanan sarana dan sistem darurat", K, 10)
    table(s, X0, 0.95, W, 3.05, [
        ["No", "Item Pemeriksaan", "Kriteria Layak", "Frekuensi", "Hasil"],
        ["1", "APAR", "Tekanan normal, segel utuh, belum kedaluwarsa", "Bulanan", ("Perlu tindakan", RED)],
        ["2", "Hydrant & selang", "Tekanan cukup, selang tidak bocor", "Triwulan", ("Perlu uji", ORANGE)],
        ["3", "Kotak P3K", "Isi lengkap sesuai lampiran, tidak kedaluwarsa", "Bulanan", ("Perlu tindakan", ORANGE)],
        ["4", "Alarm & detektor", "Berbunyi ≥ 15 dB di atas bising area", "Bulanan", ("Perlu tindakan", ORANGE)],
        ["5", "Jalur & pintu evakuasi", "Bebas hambatan, pintu mudah dibuka", "Mingguan", ("Perlu tindakan", RED)],
        ["6", "Lampu darurat & rambu", "Menyala saat listrik padam, jelas terbaca", "Bulanan", ("Sesuai", GREEN)],
        ["7", "Titik kumpul", "Aman, luas cukup, rambu terlihat", "Bulanan", ("Sesuai", GREEN)],
    ], widths=[0.06, 0.24, 0.36, 0.15, 0.19], row_h=0.36, size=6.8)
    note(s, X0, 4.18, W, "Temuan checklist ditindaklanjuti dengan target waktu dan penanggung jawab yang jelas", h=0.28)

    # 11 — program pelatihan
    s = content(prs, "6. PROGRAM PELATIHAN TANGGAP DARURAT", "Membangun kompetensi dan menguji kesiapan sistem", K, 11)
    table(s, X0, 0.95, W, 1.95, [
        ["Program", "Sasaran Peserta", "Frekuensi", "Output"],
        ["Pelatihan pemadaman api (APAR/hydrant)", "Regu pemadam & operator", "1 tahun sekali", "Sertifikat & daftar hadir"],
        ["Pelatihan P3K bersertifikat", "Petugas P3K tiap shift", "3 tahun sekali", "Lisensi petugas P3K"],
        ["Simulasi evakuasi menyeluruh", "Seluruh pekerja & tamu", "1 tahun sekali (min.)", "Laporan waktu evakuasi"],
        ["Drill tumpahan bahan kimia", "Operator gudang kimia", "6 bulan sekali", "Evaluasi penanganan spill"],
        ["Safety talk kesiapsiagaan", "Seluruh pekerja", "Bulanan", "Notulen & absensi"],
    ], widths=[0.34, 0.24, 0.19, 0.23], row_h=0.32, size=7)
    card(s, X0, 3.05, 3.40, 1.10, "Indikator Keberhasilan", ["• Waktu evakuasi ≤ 5 menit", "• 100% pekerja mengikuti simulasi",
                                                             "• Seluruh temuan drill ditutup tepat waktu"], GREEN, size=7.5)
    card(s, X0 + 3.52, 3.05, 3.43, 1.10, "Evaluasi Pasca Simulasi", ["• Debriefing bersama seluruh regu",
                                                                     "• Catat kendala & akar penyebabnya", "• Revisi prosedur dan sarana yang kurang"], NAVY, size=7.5)
    note(s, X0, 4.25, W, "Hasil simulasi menjadi dasar revisi ERP dan penganggaran sarana tanggap darurat", h=0.28)

    # 12 — kesimpulan
    s = content(prs, "KESIMPULAN & REKOMENDASI", "Rangkuman hasil analisis Kelompok Pekerjaan 2", K, 12)
    card(s, X0, 0.95, 4.20, 1.95, "Poin Utama", [
        "• Sistem tanggap darurat membutuhkan kesiapan tiga unsur: sarana, prosedur, dan manusia.",
        "• Hasil simulasi menunjukkan sarana darurat belum seluruhnya siap pakai.",
        "• P3K wajib dikelola sesuai Permenaker 15/2008: petugas bersertifikat dan kotak P3K lengkap.",
        "• Prosedur tanggap darurat harus diuji berkala, bukan hanya didokumentasikan.",
        "• Seluruh kegiatan menjadi bukti pemenuhan elemen kesiagaan darurat dalam SMK3."], NAVY, size=8)
    card(s, 5.72, 0.95, 2.58, 1.95, "Rekomendasi Prioritas", [
        "1. Refill & retag APAR kedaluwarsa", "2. Lengkapi isi kotak P3K",
        "3. Bebaskan jalur evakuasi", "4. Tambah sounder di area bising",
        "5. Uji hydrant secara berkala", "6. Jadwalkan simulasi menyeluruh"], GREEN, size=8)
    for i, (t, d) in enumerate([("Jangka Pendek", "0–1 bulan: perbaikan sarana kritis & jalur evakuasi"),
                                ("Jangka Menengah", "1–3 bulan: pelatihan regu & pembaruan ERP"),
                                ("Jangka Panjang", "3–12 bulan: simulasi terpadu & audit kesiapsiagaan")]):
        card(s, X0 + i * (2.34 + 0.06), 3.05, 2.34, 0.80, t, d, [NAVY, ORANGE, GREEN][i], size=7.5)
    note(s, X0, 4.00, W, "Target: seluruh sarana darurat siap pakai dan waktu evakuasi memenuhi standar", h=0.28)
    textbox(s, X0, 4.45, W, 0.30, "Terima kasih — siap untuk sesi tanya jawab", 11, NAVY, bold=True, align=PP_ALIGN.CENTER)

    Path(path).parent.mkdir(exist_ok=True)
    prs.save(path)
    return path


if __name__ == "__main__":
    print(build())
