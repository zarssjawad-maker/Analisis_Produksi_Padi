# 🛰️ Analisis Produksi Padi Sumatera (1993–2020) — "Monitoring Panen"

Laporan interaktif berbasis web (single-page) yang menyajikan analisis statistik terhadap **produksi padi di 8 provinsi Pulau Sumatera periode 1993–2020**. Proyek ini merupakan **Tugas Besar Mata Kuliah Analisis Data Statistik** — Program Studi Informatika, Fakultas Sains dan Teknologi, Universitas Al‑Azhar Indonesia.

**Kelompok 2:**
- Raffi Islamay Putra (0102525015)
- Rayhan Zacky (0102525017)
- Azhar Jawad (0102525021)
- Fachri Muzzaki (0102525022)

Dosen Pengampu: **Tri Aji Nugroho, S.T., M.T.**

---

## 📖 Tentang Proyek

Padi adalah komoditas pangan strategis nasional, dan Pulau Sumatera merupakan salah satu lumbung padi utama Indonesia. Namun, produksi padi di kawasan ini cenderung fluktuatif akibat kombinasi faktor agronomis (luas panen) dan iklim (curah hujan, suhu, kelembapan). Proyek ini menganalisis data historis 1993–2020 untuk memahami pola dan kekuatan hubungan antar variabel tersebut secara kuantitatif pada cakupan multi-provinsi.

### Rumusan Masalah
1. Bagaimana karakteristik (rata-rata, sebaran, distribusi) produksi padi antar provinsi di Sumatera selama 1993–2020?
2. Apakah terdapat hubungan signifikan antara **luas panen** dengan produksi padi?
3. Apakah terdapat hubungan signifikan antara **curah hujan** dengan produksi padi?
4. Apakah terdapat hubungan signifikan antara **kelembapan** dengan produksi padi?
5. Apakah terdapat hubungan signifikan antara **suhu rata-rata** dengan produksi padi?

### Hipotesis
Empat hipotesis diuji menggunakan **uji korelasi Spearman** (rank-based), karena data diketahui tidak berdistribusi normal berdasarkan uji Shapiro-Wilk:

| # | Hubungan yang Diuji | H₀ | H₁ |
|---|---|---|---|
| 1 | Luas Panen ↔ Produksi | ρ₁ = 0 | ρ₁ ≠ 0 |
| 2 | Curah Hujan ↔ Produksi | ρ₂ = 0 | ρ₂ ≠ 0 |
| 3 | Kelembapan ↔ Produksi | ρ₃ = 0 | ρ₃ ≠ 0 |
| 4 | Suhu Rata-rata ↔ Produksi | ρ₄ = 0 | ρ₄ ≠ 0 |

### Batasan Penelitian
- Tidak membahas faktor sosial-ekonomi petani (modal, teknologi, akses kredit).
- Tidak melakukan pemodelan prediktif (regresi) — fokus pada eksplorasi dan uji hubungan.
- Tidak menyimpulkan kausalitas (korelasi ≠ kausalitas).
- Hanya mencakup provinsi di Pulau Sumatera.

### Variabel
- **Dependen:** Produksi Padi
- **Independen:** Luas Panen, Curah Hujan, Suhu Rata-rata, Kelembapan
- **Kontrol:** Provinsi, Tahun

---

## 🗂️ Struktur File

```
├── ADS.html                             # Laporan utama (single-page, self-contained)
├── style.css                            # Salinan mandiri design system (belum di-link ke HTML)
├── animations.js                        # Lapisan animasi & efek visual tambahan (aditif)
├── Proposal_ADS_Tugas_Besar-2.docx      # Dokumen proposal (Bab I & II: problem definition, data collection & cleaning)
└── bab-14-proyek-akhir-2.md             # Materi kuliah acuan (Bab 14: Proyek Akhir Analisis Data)
```

> **Catatan penting:** `ADS.html` saat ini **self-contained** — seluruh CSS dan JavaScript (termasuk isi `animations.js`) sudah disalin langsung ke dalam tag `<style>` dan `<script>` di file HTML tersebut. Baris `<link rel="stylesheet" href="style.css">` dan `<script src="animations.js">` di bagian `<head>` masih dalam kondisi **di-comment**. `style.css` dan `animations.js` disediakan sebagai berkas sumber terpisah (mis. untuk pengembangan/maintenance lebih rapi), namun belum diaktifkan sebagai file eksternal.

---

## 🚀 Cara Menjalankan

Karena `ADS.html` sudah membawa seluruh CSS/JS di dalamnya, cukup:

1. Unduh/clone seluruh folder.
2. Buka `ADS.html` langsung di browser (atau jalankan lewat local server, mis. `python3 -m http.server`, agar koneksi ke CDN eksternal — Google Fonts, Leaflet, Chart.js — berjalan optimal).
3. Tidak diperlukan proses build/instalasi tambahan — murni HTML/CSS/JS statis.

Jika ingin memisahkan kembali CSS/JS ke file eksternal, aktifkan (hapus komentar) baris `<link>` dan `<script>` di `<head>`, lalu hapus blok `<style>`/`<script>` duplikat di dalam `ADS.html`.

---

## ✨ Fitur Laporan Interaktif

Desain mengusung tema **"konsol pemantauan satelit / radar agroklimat"** — sawah dibaca sebagai data: kontur terasering menjadi garis topografi, angka menjadi telemetri, dan setiap panel adalah "jendela sensor".

- **01 — Dashboard Utama:** ringkasan statistik, filter rentang tahun & provinsi, grafik tren, dan peta interaktif (Leaflet) sebaran provinsi di Sumatera.
- **02 — Statistik Deskriptif:** ukuran pemusatan & penyebaran untuk lima variabel numerik.
- **03 — Visualisasi Data:** histogram, boxplot, scatter plot, dan heatmap korelasi (tab interaktif, Chart.js).
- **04 — Uji Normalitas (Shapiro-Wilk):** dasar pemilihan uji korelasi non-parametrik.
- **05 — Uji Korelasi Spearman:** hasil pengujian keempat hipotesis.
- **06 — Insight, Rekomendasi & Kesimpulan:** ringkasan temuan akhir dan rekomendasi kebijakan.
- Mode terang/gelap, sidebar navigasi dengan scroll-spy, animasi reveal-on-scroll, count-up angka, dan efek visual lain (aurora canvas, cursor glow, tombol magnetik, ripple).

---

## 🛠️ Teknologi

| Kategori | Teknologi |
|---|---|
| Struktur & Gaya | HTML5, CSS3 (custom design system, CSS variables) |
| Tipografi | Fraunces, Inter, IBM Plex Mono (Google Fonts) |
| Grafik/Chart | [Chart.js](https://www.chartjs.org/) v4.4.4 |
| Peta | [Leaflet](https://leafletjs.com/) v1.9.4 |
| Interaktivitas | Vanilla JavaScript (tanpa framework/build tool) |
| Dataset | `Data_Tanaman_Padi_Sumatera_version_1.csv` — data panel 8 provinsi Sumatera, 1993–2020, diproses dengan Python (pandas, numpy, scipy, matplotlib, seaborn) di Google Colab |

---

## 📚 Referensi Akademik

Proyek ini dikerjakan mengikuti panduan **Bab 14 — Proyek Akhir: Analisis Data End-to-End dengan AI sebagai Co-Analyst** (`bab-14-proyek-akhir.md`), yang mencakup tahapan end-to-end: *problem definition → data collection → data cleaning → exploratory data analysis → statistical modeling → interpret & communicate*, termasuk kewajiban dokumentasi penggunaan AI (AI Usage Log) secara transparan.

Sumber data mengacu pada publikasi resmi **Badan Pusat Statistik (BPS)** dan **Satu Data Indonesia (data.go.id)**.
