"""Kelompok Pekerjaan 1 — Pengendalian Risiko, Pengukuran Faktor Bahaya, Manajemen Risiko, APD, Pelayanan Kesehatan Kerja (maks 12 halaman)."""
from deck import *

K = 1
UNITS = [
    ("M.71KKK01.001.1", "Merancang Strategi Pengendalian Risiko K3 di Tempat Kerja"),
    ("M.71KKK01.005.1", "Melakukan Pengukuran Faktor Bahaya di Tempat Kerja"),
    ("M.71KKK01.011.1", "Menerapkan Manajemen Risiko K3"),
    ("M.71KKK01.008.1", "Mengelola Alat Pelindung Diri (APD) di Tempat Kerja"),
    ("M.71KKK01.009.1", "Menerapkan Program Pelayanan Kesehatan Kerja"),
]
BAHASAN = [
    "Peraturan terkait pengendalian risiko K3",
    "IBPR / HIRADC",
    "Standar pengukuran faktor bahaya",
    "Data hasil pengukuran faktor bahaya",
    "Hasil analisis kebutuhan APD",
    "Prosedur inspeksi APD",
    "Program pokok pelayanan kesehatan kerja",
]


def build(path="output/K1_Pengendalian_Risiko_K3.pptx"):
    prs = new_deck()
    cover(prs, K, "Strategi Pengendalian Risiko K3, Pengukuran Faktor Bahaya & Pelayanan Kesehatan Kerja", 5, "15 menit + 15 menit tanya jawab")

    # 2 — ruang lingkup + daftar pembahasan
    s = content(prs, "RUANG LINGKUP & DAFTAR PEMBAHASAN", "Unit kompetensi yang dibahas dan alur penyajian", K, 2)
    pill(s, X0, 0.95, 3.30, "Unit Kompetensi Kelompok Pekerjaan 1")
    table(s, X0, 1.28, 3.30, 1.9, [["No", "Kode Unit", "Judul Unit"]] + [[str(i + 1), u[0], u[1]] for i, u in enumerate(UNITS)],
          widths=[0.09, 0.33, 0.58], row_h=0.30, size=6.5, head_size=6.5)
    pill(s, X0, 3.35, 3.30, "Fokus Presentasi", GREEN)
    textbox(s, X0 + 0.05, 3.66, 3.20, 1.00,
            ["• Perancangan strategi pengendalian risiko K3", "• Pengukuran faktor bahaya di tempat kerja",
             "• Penerapan manajemen risiko K3", "• Pengelolaan APD", "• Penerapan program pelayanan kesehatan kerja"], 8)
    pill(s, 4.95, 0.95, 3.35, "Daftar Pembahasan")
    numbered(s, 4.95, 1.28, 3.35, BAHASAN, row_h=0.30, gap=0.06, size=7.5)

    # 3 — penjabaran studi kasus
    s = content(prs, "PENJABARAN STUDI KASUS", "Kondisi perusahaan yang menjadi dasar analisis pengendalian risiko K3", K, 3)
    card(s, X0, 0.95, W, 0.68, None,
         "Perusahaan memiliki potensi bahaya signifikan: kebisingan tinggi, paparan bahan kimia, serta risiko kecelakaan akibat mesin berat "
         "dan peralatan elektrik. Sistem K3 sudah ada, namun kecelakaan ringan masih berulang sehingga menurunkan produktivitas dan "
         "kesejahteraan pekerja. Manajemen memutuskan melakukan audit dan perbaikan sistem pengendalian risiko K3.", size=8.5)
    cw, gap = 2.22, 0.12
    card(s, X0, 1.78, cw, 1.55, "Potensi Bahaya Utama",
         ["• Kebisingan > NAB di produksi", "• Paparan bahan kimia & debu",
          "• Mesin berat & bagian bergerak", "• Peralatan elektrik bertegangan", "• Postur kerja tidak ergonomis"], NAVY, size=7.5)
    card(s, X0 + cw + gap, 1.78, cw, 1.55, "Dampak yang Terjadi",
         ["• Kecelakaan ringan berulang", "• Potensi PAK (NIHL, dermatitis)",
          "• Produktivitas & mutu terganggu", "• Biaya pengobatan & downtime", "• Risiko ketidakpatuhan hukum"], ORANGE, size=7.5)
    card(s, X0 + 2 * (cw + gap), 1.78, cw, 1.55, "Tujuan Perbaikan",
         ["• Audit pengendalian risiko", "• Menurunkan angka kecelakaan",
          "• Memenuhi NAB faktor bahaya", "• APD sesuai hasil penilaian", "• Pelayanan kesehatan kerja kuat"], GREEN, size=7.5)
    note(s, X0, 3.48, W, "Peran Koordinator K3: menyusun analisis kasus dan dokumen presentasi hasil pengendalian risiko K3", h=0.28)
    card(s, X0, 3.88, W, 0.70, None,
         ["Output yang dihasilkan: dokumen IBPR/HIRADC, laporan pengukuran faktor bahaya, matriks kebutuhan APD, prosedur inspeksi APD, "
          "dan program pokok pelayanan kesehatan kerja sebagai dasar rekomendasi perbaikan kepada manajemen."], size=8)

    # 4 — peraturan
    s = content(prs, "1. PERATURAN TERKAIT PENGENDALIAN RISIKO K3", "Dasar hukum penerapan pengendalian risiko di tempat kerja", K, 4)
    table(s, X0, 0.95, 4.75, 3.2, [
        ["No", "Peraturan", "Substansi Pokok"],
        ["1", "UU No. 1 Tahun 1970", "Keselamatan Kerja — syarat K3 & kewajiban pengurus"],
        ["2", "UU No. 13 Tahun 2003", "Ketenagakerjaan — hak pekerja atas K3 (Pasal 86–87)"],
        ["3", "PP No. 50 Tahun 2012", "Penerapan SMK3 — perencanaan & pengendalian risiko"],
        ["4", "Permenaker No. 5 Tahun 2018", "K3 Lingkungan Kerja — NAB faktor fisika & kimia"],
        ["5", "Permenaker No. 8 Tahun 2010", "Alat Pelindung Diri — penyediaan & pengelolaan"],
        ["6", "Permenakertrans PER.03/MEN/1982", "Pelayanan Kesehatan Kerja"],
        ["7", "Permenaker No. 2 Tahun 1980", "Pemeriksaan kesehatan tenaga kerja"],
        ["8", "ISO 45001:2018", "Sistem manajemen K3 berbasis risiko & peluang"],
    ], widths=[0.07, 0.35, 0.58], row_h=0.34, size=7)
    card(s, 6.25, 0.95, 2.05, 2.72, "Makna Penerapan",
         ["• Menjadi dasar hukum identifikasi bahaya dan pengendalian risiko.",
          "• Mewajibkan penyediaan APD, pengukuran faktor bahaya, dan pelayanan kesehatan kerja.",
          "• Menuntut pengendalian terdokumentasi dan dapat diaudit.",
          "• Sanksi administratif hingga pidana bila tidak dipenuhi."], NAVY, size=7)
    note(s, 6.25, 3.79, 2.05, "Hirarki pengendalian wajib diikuti", GREEN, WHITE, 7, h=0.36)
    note(s, X0, 4.28, 4.75, "Hirarki: Eliminasi → Substitusi → Rekayasa Teknis → Administratif → APD", h=0.28)

    # 5 — IBPR/HIRADC
    s = content(prs, "2. IBPR / HIRADC", "Identifikasi bahaya, penilaian risiko, dan penentuan pengendalian", K, 5)
    pill(s, X0, 0.95, 3.10, "Tahapan Penyusunan IBPR")
    numbered(s, X0, 1.28, 3.10, [
        "Menetapkan konteks & area kerja", "Identifikasi bahaya tiap aktivitas",
        "Analisis risiko (Likelihood × Severity)", "Evaluasi & penentuan level risiko",
        "Penentuan pengendalian sesuai hirarki", "Monitoring dan tinjauan ulang",
    ], row_h=0.28, gap=0.05, size=7.5)
    picture(s, "ibpr_p1.png", 4.65, 0.95, 3.65, 2.45, "Form IBPR/HIRADC yang telah diisi — halaman 1")
    card(s, X0, 3.62, W, 1.02, "Pendekatan Pengendalian", [
        "• Eliminasi/Substitusi: mengganti bahan kimia berbahaya dengan bahan yang lebih aman.",
        "• Rekayasa teknis: machine guard, interlock, local exhaust ventilation, enclosure kebisingan.",
        "• Administratif: SOP kerja aman, LOTO, rotasi kerja, rambu, pelatihan, izin kerja.",
        "• APD: sebagai lapisan terakhir, dipilih berdasarkan hasil penilaian risiko."], NAVY, size=8)

    # 6 — matriks risiko
    s = content(prs, "2. IBPR — MATRIKS RISIKO & PRIORITAS PENGENDALIAN", "Penetapan prioritas tindakan berdasarkan level risiko", K, 6)
    picture(s, "ibpr_p2.png", X0, 0.95, 4.15, 2.85, "Matriks risiko & rencana pengendalian — halaman 2")
    for i, (num, lbl, col) in enumerate([("6", "aktivitas dinilai", NAVY), ("1", "risiko ekstrim", RED), ("5", "risiko tinggi", ORANGE)]):
        x = 5.70 + i * 0.90
        card(s, x, 0.95, 0.82, 0.68, None, [(num, True, col, 15), (lbl, False, MUTED, 6)], size=6)
    card(s, 5.70, 1.75, 2.60, 0.92, "Prioritas Utama",
         "Operasi mesin roller/press berkategori Ekstrim karena potensi terjepit/terseret dapat menimbulkan cedera berat hingga fatal.", RED, size=7)
    card(s, 5.70, 2.75, 2.60, 0.92, "Kontrol Teknis",
         "Guard & interlock, emergency stop, penerapan LOTO, inspeksi tiap shift, serta SOP kerja aman menjadi kontrol inti.", NAVY, size=7)
    card(s, 5.70, 3.75, 2.60, 0.92, "Dokumentasi",
         "Melampirkan foto guard, panel & LOTO, SDS/spill kit, serta rambu sebagai bukti pengendalian terlaksana.", GREEN, size=7)
    note(s, X0, 4.22, 4.15, "Risiko Ekstrim/Tinggi wajib diturunkan lebih dulu", h=0.28)

    # 7 — standar pengukuran
    s = content(prs, "3. STANDAR PENGUKURAN FAKTOR BAHAYA", "Acuan NAB dan metode pengukuran yang digunakan", K, 7)
    table(s, X0, 0.95, W, 3.0, [
        ["Faktor Bahaya", "Standar Acuan", "NAB / Kriteria", "Metode & Alat"],
        ["Kebisingan", "Permenaker No. 5/2018; SNI 7231", "85 dBA untuk 8 jam kerja", "Sound Level Meter / noise dosimeter"],
        ["Pencahayaan", "Permenaker No. 5/2018; SNI 7062", "100–500 lux sesuai jenis pekerjaan", "Lux meter, titik ukur area kerja"],
        ["Iklim kerja (panas)", "Permenaker No. 5/2018", "ISBB 28–30 °C sesuai beban kerja", "Heat stress monitor (WBGT)"],
        ["Getaran lengan-tangan", "Permenaker No. 5/2018; ISO 5349", "4 m/detik² untuk 8 jam", "Vibration meter"],
        ["Debu respirabel", "Permenaker No. 5/2018; NIOSH 0600", "3 mg/m³ (respirable)", "Personal dust sampler gravimetri"],
        ["Uap/gas kimia", "Permenaker No. 5/2018; NIOSH/OSHA", "NAB per jenis bahan (lampiran)", "Gas detector / personal sampling"],
    ], widths=[0.18, 0.27, 0.25, 0.30], row_h=0.38, size=7)
    note(s, X0, 4.10, W, "Pengukuran oleh personel berkompeten; hasil dibandingkan NAB dan ditindaklanjuti", h=0.28)

    # 8 — data hasil pengukuran
    s = content(prs, "4. DATA HASIL PENGUKURAN FAKTOR BAHAYA", "Hasil pengukuran area kerja dan status pemenuhan NAB", K, 8)
    table(s, X0, 0.95, 5.55, 2.55, [
        ["Area", "Faktor", "Hasil", "NAB", "Status"],
        ["Produksi (roller/press)", "Kebisingan", "92 dBA", "85 dBA", ("Melebihi", RED)],
        ["Ruang kompresor", "Kebisingan", "88 dBA", "85 dBA", ("Melebihi", RED)],
        ["Gudang bahan kimia", "Uap pelarut", "0,7 × NAB", "1 × NAB", ("Sesuai", GREEN)],
        ["Area finishing", "Debu respirabel", "3,4 mg/m³", "3 mg/m³", ("Melebihi", RED)],
        ["Ruang QC", "Pencahayaan", "180 lux", "300 lux", ("Kurang", ORANGE)],
        ["Area pengelasan", "Iklim kerja (ISBB)", "29,5 °C", "30 °C", ("Sesuai", GREEN)],
    ], widths=[0.28, 0.22, 0.17, 0.15, 0.18], row_h=0.32, size=7)
    card(s, 7.05, 0.95, 1.25, 2.55, "Temuan", [("3", True, RED, 16), ("parameter di atas NAB", False, MUTED, 6.5),
                                               ("1", True, ORANGE, 16), ("parameter di bawah standar", False, MUTED, 6.5)], NAVY, size=7, align=PP_ALIGN.CENTER)
    card(s, X0, 3.58, W, 1.15, "Tindak Lanjut Pengendalian", [
        "• Kebisingan: enclosure/silencer pada kompresor, pembatasan waktu paparan, wajib ear muff (NRR ≥ 25 dB) di area > 85 dBA.",
        "• Debu: penambahan local exhaust ventilation dan housekeeping basah, pemakaian masker P2/N95.",
        "• Pencahayaan: penambahan armatur dan penggantian lampu di area QC hingga minimal 300 lux.",
        "• Pemantauan ulang dilakukan maksimal 6 bulan setelah perbaikan dan hasilnya didokumentasikan."], NAVY, size=8)

    # 9 — kebutuhan APD
    s = content(prs, "5. HASIL ANALISIS KEBUTUHAN APD", "Penentuan APD berdasarkan bahaya dan hasil penilaian risiko", K, 9)
    table(s, X0, 0.95, W, 2.75, [
        ["Area Kerja", "Bahaya Dominan", "APD yang Dibutuhkan", "Standar"],
        ["Produksi mesin", "Terjepit, terpotong, bising", "Safety helmet, safety shoes, ear muff, sarung tangan katun", "SNI / ANSI Z87"],
        ["Gudang kimia", "Paparan kimia, tumpahan", "Respirator cartridge, goggle, sarung tangan nitril, apron", "EN 374 / NIOSH"],
        ["Finishing", "Debu respirabel", "Masker N95/P2, goggle, coverall", "NIOSH 42 CFR 84"],
        ["Pengelasan", "Radiasi, percikan, fume", "Welding helmet, apron kulit, sarung tangan las, respirator", "EN 175 / ANSI"],
        ["Kelistrikan", "Kejut listrik, arc flash", "Sarung tangan isolasi, sepatu dielektrik, face shield", "IEC 60903"],
    ], widths=[0.16, 0.24, 0.42, 0.18], row_h=0.38, size=7)
    card(s, X0, 3.78, 3.40, 0.86, "Dasar Penetapan",
         "Jenis APD ditetapkan dari hasil IBPR/HIRADC dan data pengukuran faktor bahaya, bukan dari kebiasaan kerja.", NAVY, size=7.5)
    card(s, X0 + 3.52, 3.78, 3.43, 0.86, "Kewajiban Perusahaan",
         "APD disediakan cuma-cuma, sesuai ukuran pekerja, disertai pelatihan pemakaian dan rambu kewajiban APD (Permenaker 8/2010).", GREEN, size=7.5)

    # 10 — prosedur inspeksi APD
    s = content(prs, "6. PROSEDUR INSPEKSI ALAT PELINDUNG DIRI", "Memastikan APD layak pakai dan berfungsi sesuai spesifikasi", K, 10)
    pill(s, X0, 0.95, 3.30, "Alur Inspeksi APD")
    numbered(s, X0, 1.28, 3.30, [
        "Pemeriksaan mandiri sebelum digunakan", "Inspeksi berkala oleh petugas K3 (bulanan)",
        "Pencatatan pada kartu/checklist inspeksi", "Pemisahan APD rusak (tag & karantina)",
        "Penggantian dan pemusnahan APD afkir", "Evaluasi & pelaporan hasil inspeksi",
    ], row_h=0.28, gap=0.05, size=7.5)
    card(s, 4.85, 0.95, 1.68, 1.72, "Kriteria Layak", ["• Tidak retak/sobek", "• Tali & pengunci utuh",
                                                        "• Filter belum jenuh", "• Masa pakai berlaku", "• Bersih & tersimpan baik"], GREEN, size=7)
    card(s, 6.62, 0.95, 1.68, 1.72, "Kriteria Afkir", ["• Retak/berlubang/korosi", "• Daya redam menurun",
                                                        "• Terkontaminasi kimia", "• Melewati kedaluwarsa", "• Pernah menahan benturan"], RED, size=7)
    card(s, 4.85, 2.78, 3.45, 0.95, "Rekaman yang Dipelihara",
         ["• Kartu inspeksi APD per pekerja", "• Daftar distribusi & serah terima APD",
          "• Laporan APD rusak dan penggantiannya", "• Bukti pelatihan penggunaan APD"], NAVY, size=7.5)
    note(s, X0, 3.85, W, "APD hanya efektif bila tepat jenis, tepat ukuran, layak pakai, dan dipakai secara disiplin", h=0.28)

    # 11 — pelayanan kesehatan kerja
    s = content(prs, "7. PROGRAM POKOK PELAYANAN KESEHATAN KERJA", "Mengacu Permenakertrans No. PER.03/MEN/1982", K, 11)
    cw = 2.22
    card(s, X0, 0.95, cw, 1.75, "Preventif", ["• Pemeriksaan kesehatan awal, berkala, khusus",
                                              "• Pemantauan lingkungan kerja", "• Imunisasi & gizi kerja",
                                              "• Pendidikan & pembinaan K3", "• Pencegahan penyakit akibat kerja"], NAVY, size=7.5)
    card(s, X0 + cw + 0.12, 0.95, cw, 1.75, "Kuratif", ["• P3K di tempat kerja", "• Pengobatan tenaga kerja sakit",
                                                        "• Rujukan ke fasilitas kesehatan", "• Penanganan kasus kecelakaan kerja",
                                                        "• Pencatatan rekam medis pekerja"], ORANGE, size=7.5)
    card(s, X0 + 2 * (cw + 0.12), 0.95, cw, 1.75, "Rehabilitatif", ["• Pemulihan pasca kecelakaan",
                                                                    "• Penempatan sesuai kondisi kesehatan", "• Program return to work",
                                                                    "• Pendampingan kasus PAK", "• Evaluasi kelaikan kerja"], GREEN, size=7.5)
    table(s, X0, 2.85, W, 1.35, [
        ["Program", "Pelaksanaan", "Frekuensi", "Rekaman"],
        ["Pemeriksaan kesehatan berkala", "Klinik/dokter perusahaan", "1 tahun sekali", "Hasil MCU & status kelaikan"],
        ["Pemeriksaan khusus (bising, kimia)", "Audiometri & spirometri", "1 tahun sekali", "Laporan pemeriksaan khusus"],
        ["Promosi & edukasi kesehatan", "Tim K3 dan petugas kesehatan", "Triwulan", "Notulen & daftar hadir"],
    ], widths=[0.28, 0.25, 0.17, 0.30], row_h=0.32, size=7)
    note(s, X0, 4.32, W, "Hasil pemeriksaan kesehatan menjadi umpan balik untuk perbaikan IBPR dan penentuan APD", h=0.26)

    # 12 — kesimpulan
    s = content(prs, "KESIMPULAN & REKOMENDASI", "Rangkuman hasil analisis Kelompok Pekerjaan 1", K, 12)
    card(s, X0, 0.95, 4.20, 1.95, "Poin Utama", [
        "• Pengendalian risiko K3 harus berbasis IBPR/HIRADC dan mengikuti hirarki pengendalian.",
        "• Hasil pengukuran menunjukkan kebisingan, debu, dan pencahayaan belum memenuhi NAB.",
        "• Kebutuhan APD ditetapkan dari hasil penilaian risiko dan wajib diinspeksi berkala.",
        "• Program pelayanan kesehatan kerja melengkapi pengendalian teknis dan administratif.",
        "• Seluruh kegiatan wajib terdokumentasi sebagai bukti pemenuhan SMK3 (PP 50/2012)."], NAVY, size=8)
    card(s, 5.72, 0.95, 2.58, 1.95, "Rekomendasi Prioritas", [
        "1. Enclosure & silencer area bising", "2. Penambahan LEV di area finishing",
        "3. Perbaikan pencahayaan ruang QC", "4. Program inspeksi APD terjadwal",
        "5. Audiometri bagi pekerja terpapar bising", "6. Pengukuran ulang maksimal 6 bulan"], GREEN, size=8)
    for i, (t, d) in enumerate([("Jangka Pendek", "0–3 bulan: APD, rambu, SOP, pelatihan"),
                                ("Jangka Menengah", "3–6 bulan: rekayasa teknis & pengukuran ulang"),
                                ("Jangka Panjang", "6–12 bulan: audit SMK3 & sertifikasi")]):
        card(s, X0 + i * (2.34 + 0.06), 3.05, 2.34, 0.80, t, d, [NAVY, ORANGE, GREEN][i], size=7.5)
    note(s, X0, 4.00, W, "Target: menurunkan angka kecelakaan ringan dan memenuhi seluruh NAB faktor bahaya", h=0.28)
    textbox(s, X0, 4.45, W, 0.30, "Terima kasih — siap untuk sesi tanya jawab", 11, NAVY, bold=True, align=PP_ALIGN.CENTER)

    Path(path).parent.mkdir(exist_ok=True)
    prs.save(path)
    return path


if __name__ == "__main__":
    print(build())
