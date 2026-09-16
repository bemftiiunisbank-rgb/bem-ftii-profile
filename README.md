# Website Profil BEM FTII (Fakultas Teknologi Informasi dan Industri)

Website profil resmi **BEM FTII** berbasis **TypeScript**, arsitektur **Multi-Page**, desain modern bertema **Merah Crimson & Dark Slate Tech**, dan integrasi database **Supabase**.

---

## 🚀 Fitur Utama & Halaman

1. **Beranda (`/`)**:
   - Hero banner dengan nuansa teknologi informasi & industri.
   - Sambutan resmi Gubernur & Wakil Gubernur Mahasiswa.
   - Quick counters (15+ Pengurus, 7 Divisi, 7+ Proker, 100% Advokasi).
   - Kartu 7 divisi dan sorotan program kerja unggulan.
   - Call-to-action kanal aspirasi mahasiswa.

2. **Tentang Kabinet (`/tentang`)**:
   - Filosofi Kabinet *Sinergi Teknologi* dan makna warna Merah Crimson.
   - Makna elemen lambang: Roda Gerigi (Industri), Sirkuit/Chip (TI), Sayap (Tri Dharma).
   - Visi & Misi 6 poin strategis.
   - 4 Nilai Utama: *Inovatif, Sinergis, Solutif, Berintegritas*.

3. **Struktur Organisasi & Direktori Anggota (`/struktur`)**:
   - Bagan hierarki kepemimpinan bertingkat (Presidium, Sekretariat/Bendahara, Divisi).
   - Filter tab interaktif untuk **7 Divisi**:
     1. Gubernur Mahasiswa
     2. Wakil Gubernur Mahasiswa
     3. Bendahara Umum & Operasional
     4. Sekretariat Jenderal
     5. Divisi Kominfo (Media & IT)
     6. Divisi Inteks (Hubungan Internal & Eksternal/Industri)
     7. Divisi Advokasi (Advokesma Mahasiswa)
   - Kolom pencarian instan berdasarkan nama pengurus, jabatan, atau prodi.
   - Kartu profil anggota dengan foto, jabatan, prodi, angkatan, bio, serta link Instagram dan LinkedIn.

4. **Program Kerja Hub (`/proker`)**:
   - Katalog program kerja lengkap dengan filter divisi dan status (*Terlaksana / Sedang Berjalan / Akan Datang*).
   - Informasi detail: tanggal, sasaran, tujuan, lokasi, serta tombol pendaftaran atau unduh LPJ.

5. **Kanal Layanan & Aspirasi Mahasiswa (`/aspirasi`)**:
   - **Form Aspirasi**: Pilihan kirim terbuka atau **Anonim** untuk menjaga privasi mahasiswa.
   - **Live Ticket Tracker**: Lacak status penanganan advokasi mahasiswa secara real-time via kode tiket (contoh kode demo: `FTII-7821` atau `FTII-4412`).
   - Timeline 4 tahap penanganan: *Diterima $\rightarrow$ Verifikasi/Kajian $\rightarrow$ Disampaikan ke Dekanat $\rightarrow$ Selesai*.
   - FAQ Advokasi dan kontak hotline darurat 24 jam.

6. **Warta & Rilis Pers (`/berita` dan `/berita/:slug`)**:
   - Berita rilis pers resmi, hearing dekanat, kerjasama industri, dan update organisasi.
   - Halaman detail berita dengan fitur salin tautan artikel.

7. **Kontak & Sekretariat (`/kontak`)**:
   - Denah lokasi sekretariat Student Center FTII Lt. 2.
   - Jadwal jam operasional piket pengurus.
   - Formulir kirim pesan kerjasama/audiensi langsung ke sekretariat.

---

## 🛠️ Panduan Integrasi Supabase

Website ini memiliki arsitektur **Hybrid Data**:
- **Saat ini (Local Mode)**: Berjalan 100% interaktif menggunakan data mock realistis BEM FTII.
- **Menghubungkan ke Supabase Asli**:
  1. Buat proyek baru di [Supabase Console](https://app.supabase.com).
  2. Buka menu **SQL Editor**, buka file `supabase_schema.sql` di proyek ini, salin isinya, lalu klik **Run**.
  3. Buka menu **Project Settings $\rightarrow$ API**, lalu salin:
     - Project URL
     - Anon / Public Key
  4. Buka file `.env` di folder proyek ini dan tempelkan:
     ```env
     VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
  5. Restart dev server. Aplikasi akan otomatis beralih membaca dan menyimpan data secara langsung ke Supabase!

---

## 💻 Menjalankan Proyek Secara Lokal

Server dev sudah berjalan di:
```
http://localhost:5173/
```

Jika ingin menjalankan kembali di kemudian hari melalui PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File tools\run_npm.ps1 run dev
```

Untuk melakukan build production:
```powershell
powershell -ExecutionPolicy Bypass -File tools\run_npm.ps1 run build
```
