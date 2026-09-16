import type { Anggota, Proker, Berita, Aspirasi } from '../types/database';

export const initialAnggota: Anggota[] = [
  // 1. Gubernur & Wakil Gubernur
  {
    id: 'ang-1',
    nama: 'Muhammad Raihan Pratama',
    nim: '2210511012',
    divisi: 'Gubernur',
    jabatan: 'Gubernur Mahasiswa FTII',
    prodi: 'Teknik Informatika',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Berkomitmen membawa BEM FTII menjadi akselerator inovasi teknologi berdaya saing global dan menjunjung integritas.',
    instagram: '@raihanpratama.id',
    linkedin: 'linkedin.com/in/raihan-pratama',
    urutan: 1
  },
  {
    id: 'ang-2',
    nama: 'Anindya Laksmi Putri',
    nim: '2210521034',
    divisi: 'Wakil Gubernur',
    jabatan: 'Wakil Gubernur Mahasiswa FTII',
    prodi: 'Sistem Informasi',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Menyelaraskan sinergi seluruh elemen fakultas demi terciptanya iklim organisasi yang sehat, suportif, dan adaptif.',
    instagram: '@anindyalaksmi',
    linkedin: 'linkedin.com/in/anindya-laksmi',
    urutan: 2
  },

  // 2. Sekretaris
  {
    id: 'ang-3',
    nama: 'Salma Nur Azizah',
    nim: '2210531008',
    divisi: 'Sekretaris',
    jabatan: 'Sekretaris Umum I',
    prodi: 'Teknik Industri',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Memastikan tata kelola administrasi dan pengarsipan kabinet berjalan cepat, tertib, dan berbasis digital.',
    instagram: '@salmanuraz',
    linkedin: 'linkedin.com/in/salma-nur-azizah',
    urutan: 3
  },
  {
    id: 'ang-4',
    nama: 'Aura Cinta Kirana',
    nim: '2310511090',
    divisi: 'Sekretaris',
    jabatan: 'Sekretaris II & Biro Rumah Tangga',
    prodi: 'Teknik Informatika',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1534751516642-a171ed28a0e5?auto=format&fit=crop&w=600&q=80',
    bio: 'Pengelolaan inventaris, logistik sekretariat, dan kearsipan persuratan BEM FTII.',
    instagram: '@auracinta_k',
    linkedin: 'linkedin.com/in/auracinta',
    urutan: 4
  },

  // 3. Bendahara
  {
    id: 'ang-5',
    nama: 'Fathur Rahman Hakim',
    nim: '2210521077',
    divisi: 'Bendahara',
    jabatan: 'Bendahara Umum',
    prodi: 'Sistem Informasi',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Menjaga akuntabilitas dan transparansi sirkulasi keuangan kabinet dengan sistem pembukuan digital modern.',
    instagram: '@fathurrhakim',
    linkedin: 'linkedin.com/in/fathur-hakim',
    urutan: 5
  },
  {
    id: 'ang-6',
    nama: 'Nabila Syakira',
    nim: '2310531021',
    divisi: 'Bendahara',
    jabatan: 'Bendahara Operasional & Dana Usaha',
    prodi: 'Teknik Industri',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    bio: 'Mengembangkan inisiatif kemandirian finansial ormawa melalui merchandise kreatif dan sponsorship.',
    instagram: '@nabilasykr',
    linkedin: 'linkedin.com/in/nabila-syakira',
    urutan: 6
  },

  // 4. Kominfo
  {
    id: 'ang-7',
    nama: 'Kevin Dwi Wicaksono',
    nim: '2210511045',
    divisi: 'Kominfo',
    jabatan: 'Kepala Divisi Kominfo',
    prodi: 'Teknik Informatika',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Membangun citra digital BEM FTII yang interaktif, informatif, dan mutakhir melalui konten visual dan portal web.',
    instagram: '@kevindwiw',
    linkedin: 'linkedin.com/in/kevin-dwi',
    urutan: 7
  },
  {
    id: 'ang-8',
    nama: 'Dinda Ayu Maharani',
    nim: '2310511115',
    divisi: 'Kominfo',
    jabatan: 'Staff Ahli Media Kreatif & Desain',
    prodi: 'Teknik Informatika',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    bio: 'Spesialis desain grafis UI/UX, branding kabinet, dan publikasi sosial media.',
    instagram: '@dindaayuma',
    linkedin: 'linkedin.com/in/dinda-maharani',
    urutan: 8
  },
  {
    id: 'ang-9',
    nama: 'Bagas Aditya Nugraha',
    nim: '2310521099',
    divisi: 'Kominfo',
    jabatan: 'Staff Ahli IT & Pengembangan Web',
    prodi: 'Sistem Informasi',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Pengembang platform digital, sistem voting, dan portal informasi terpadu FTII.',
    instagram: '@bagasadit_n',
    linkedin: 'linkedin.com/in/bagas-aditya',
    urutan: 9
  },

  // 5. Inteks (Internal & Eksternal)
  {
    id: 'ang-10',
    nama: 'Dimas Arya Saputra',
    nim: '2210531055',
    divisi: 'Inteks',
    jabatan: 'Kepala Divisi Inteks',
    prodi: 'Teknik Industri',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'Menghubungkan civitas akademika FTII dengan jaringan industri nasional, alumni, serta ormawa se-Indonesia.',
    instagram: '@dimasaryasp',
    linkedin: 'linkedin.com/in/dimas-arya',
    urutan: 10
  },
  {
    id: 'ang-11',
    nama: 'Clarissa Valerie',
    nim: '2310521088',
    divisi: 'Inteks',
    jabatan: 'Staff Ahli Hubungan Eksternal & Korporasi',
    prodi: 'Sistem Informasi',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    bio: 'Menginisiasi kemitraan strategis, company visit, dan kolaborasi beasiswa industri teknologi.',
    instagram: '@clarissaval',
    linkedin: 'linkedin.com/in/clarissa-valerie',
    urutan: 11
  },
  {
    id: 'ang-12',
    nama: 'Aldi Renaldi',
    nim: '2310531040',
    divisi: 'Inteks',
    jabatan: 'Staff Ahli Harmonisasi Internal Ormawa',
    prodi: 'Teknik Industri',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    bio: 'Mempererat kekeluargaan dan sinergi antar-Himpunan Mahasiswa Jurusan di lingkungan FTII.',
    instagram: '@aldirenaldi_7',
    linkedin: 'linkedin.com/in/aldi-renaldi',
    urutan: 12
  },

  // 6. Advokasi (Advokasi & Kesejahteraan Mahasiswa)
  {
    id: 'ang-13',
    nama: 'Rizky Danuarta',
    nim: '2210511062',
    divisi: 'Advokasi',
    jabatan: 'Kepala Divisi Advokasi',
    prodi: 'Teknik Informatika',
    angkatan: '2022',
    foto_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    bio: 'Garda terdepan dalam memperjuangkan hak-hak mahasiswa, transparansi UKT, serta fasilitas akademik yang layak.',
    instagram: '@rizkydanuarta',
    linkedin: 'linkedin.com/in/rizky-danuarta',
    urutan: 13
  },
  {
    id: 'ang-14',
    nama: 'Tiara Salsabila',
    nim: '2310511078',
    divisi: 'Advokasi',
    jabatan: 'Staff Ahli Advokasi Finansial & Beasiswa',
    prodi: 'Teknik Informatika',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    bio: 'Mendampingi mahasiswa dalam pengajuan banding/keringanan UKT serta diseminasi info beasiswa prestasi & afirmasi.',
    instagram: '@tiarasalsa',
    linkedin: 'linkedin.com/in/tiara-salsabila',
    urutan: 14
  },
  {
    id: 'ang-15',
    nama: 'Hilman Fauzi',
    nim: '2310531065',
    divisi: 'Advokasi',
    jabatan: 'Staff Ahli Layanan Sarana & Fasilitas Lab',
    prodi: 'Teknik Industri',
    angkatan: '2023',
    foto_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    bio: 'Menghimpun aspirasi terkait kebutuhan sarana praktikum laboratorium dan ruang belajar mahasiswa FTII.',
    instagram: '@hilmanfauzi',
    linkedin: 'linkedin.com/in/hilman-fauzi',
    urutan: 15
  }
];

export const initialProker: Proker[] = [
  {
    id: 'pro-1',
    judul: 'FTII Tech & Industry Expo (F-TIEX) 2026',
    slug: 'ftii-tech-industry-expo-2026',
    divisi: 'Inteks',
    deskripsi: 'Pameran inovasi teknologi dan industri terbesar se-fakultas yang mempertemukan startup, korporasi manufaktur & IT, serta karya tugas akhir mahasiswa unggulan.',
    tujuan: 'Membuka peluang karir, riset kolaboratif, dan penyerapan talenta muda FTII langsung oleh mitra industri.',
    sasaran: 'Seluruh mahasiswa FTII, praktisi industri, dan umum',
    status: 'sedang_berjalan',
    tanggal_mulai: '2026-10-14',
    tanggal_selesai: '2026-10-16',
    lokasi: 'Auditorium Utama & Gedung FTII Hall',
    poster_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    link_pendaftaran: 'https://ftii-expo.id/register'
  },
  {
    id: 'pro-2',
    judul: 'Posko Advokasi Terpadu & Kawal UKT',
    slug: 'posko-advokasi-terpadu-kawal-ukt',
    divisi: 'Advokasi',
    deskripsi: 'Pendampingan administrasi, verifikasi berkas, serta hearing dekanat bagi mahasiswa yang mengalami kendala ekonomi dalam pembayaran UKT semester ganjil/genap.',
    tujuan: 'Menjamin tidak ada satupun mahasiswa FTII yang putus kuliah karena kendala ekonomi.',
    sasaran: 'Mahasiswa aktif FTII yang membutuhkan penyesuaian UKT',
    status: 'sedang_berjalan',
    tanggal_mulai: '2026-08-01',
    tanggal_selesai: '2026-09-30',
    lokasi: 'Sekretariat BEM FTII & Online via Zoom',
    poster_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    link_pendaftaran: '#'
  },
  {
    id: 'pro-3',
    judul: 'FTII Media & Branding Academy',
    slug: 'ftii-media-branding-academy',
    divisi: 'Kominfo',
    deskripsi: 'Workshop intensif UI/UX Design, Creative Copywriting, Video Editing, dan Web Development bagi staf biro kominfo himpunan dan mahasiswa FTII.',
    tujuan: 'Meningkatkan literasi digital dan keterampilan kreatif mahasiswa untuk portofolio profesional.',
    sasaran: 'Mahasiswa angkatan 2023 - 2025',
    status: 'selesai',
    tanggal_mulai: '2026-05-10',
    tanggal_selesai: '2026-05-24',
    lokasi: 'Lab Komputer Multimedia FTII',
    poster_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    lpj_url: '#'
  },
  {
    id: 'pro-4',
    judul: 'Leadership & Industrial Management Training (LKMM-TD)',
    slug: 'lkmm-td-ftii-2026',
    divisi: 'Gubernur',
    deskripsi: 'Pelatihan kepemimpinan manajemen mahasiswa tingkat dasar untuk mencetak calon organisatoris visioner berjiwa integritas.',
    tujuan: 'Membekali mahasiswa dengan keahlian manajerial, resolusi konflik, dan kepemimpinan adaptif.',
    sasaran: 'Mahasiswa baru dan pengurus muda ormawa',
    status: 'selesai',
    tanggal_mulai: '2026-03-05',
    tanggal_selesai: '2026-03-08',
    lokasi: 'Pusdiklat Agrowisata Kampus',
    poster_url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    lpj_url: '#'
  },
  {
    id: 'pro-5',
    judul: 'FTII Industrial Company Visit (Jakarta-Bandung Tech Corridor)',
    slug: 'ftii-industrial-company-visit',
    divisi: 'Inteks',
    deskripsi: 'Kunjungan studi lapangan ke data center tier-IV, pabrik otomasi industri, dan unicorn tech company di Jakarta & Bandung.',
    tujuan: 'Memberikan wawasan langsung implementasi IoT, AI, dan supply chain di industri skala besar.',
    sasaran: 'Mahasiswa tingkat 2 dan 3 semua program studi di FTII',
    status: 'akan_datang',
    tanggal_mulai: '2026-11-20',
    tanggal_selesai: '2026-11-23',
    lokasi: 'Kawasan Industri Cikarang & BSD Digital Hub',
    poster_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    link_pendaftaran: '#'
  },
  {
    id: 'pro-6',
    judul: 'Financial Literacy & Ormawa Budgeting Summit',
    slug: 'ormawa-budgeting-summit',
    divisi: 'Bendahara',
    deskripsi: 'Workshop standardisasi pelaporan keuangan (LPJ), pembukuan digital, dan audit dana hibah dekanat untuk seluruh himpunan dan BSO.',
    tujuan: 'Mewujudkan tata kelola keuangan ormawa FTII yang transparan, akuntabel, dan bebas penyimpangan.',
    sasaran: 'Seluruh Bendahara Himpunan Mahasiswa Jurusan (HMJ) se-FTII',
    status: 'akan_datang',
    tanggal_mulai: '2026-12-05',
    tanggal_selesai: '2026-12-06',
    lokasi: 'Ruang Sidang Senat FTII Lt. 3',
    poster_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pro-7',
    judul: 'Sistem Informasi Kearsipan & E-Office Ormawa',
    slug: 'sistem-kearsipan-e-office-ftii',
    divisi: 'Sekretaris',
    deskripsi: 'Digitalisasi sistem penomoran surat otomatis, verifikasi tanda tangan digital, dan repositori proposal online terpusat di FTII.',
    tujuan: 'Mempercepat birokrasi persuratan dari 5 hari kerja menjadi hitungan jam.',
    sasaran: 'Sekretariat seluruh lembaga mahasiswa FTII',
    status: 'sedang_berjalan',
    tanggal_mulai: '2026-07-15',
    tanggal_selesai: '2026-10-30',
    lokasi: 'Portal Online BEM FTII',
    poster_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialBerita: Berita[] = [
  {
    id: 'berita-1',
    judul: 'Hearing Terbuka BEM FTII dengan Dekanat: Bahas Optimalisasi Fasilitas Laboratorium Komputer dan Studio Riset',
    slug: 'hearing-terbuka-dekanat-fasilitas-lab',
    kategori: 'Advokasi & Kebijakan',
    ringkasan: 'BEM FTII berhasil membawa 142 poin aspirasi mahasiswa terkait peremajaan perangkat keras laboratorium dan pendingin ruangan di hadapan pimpinan dekanat.',
    konten: `Dalam rangka menindaklanjuti gelombang aspirasi yang masuk melalui formulir advokasi online BEM FTII, jajaran pengurus Divisi Advokasi bersama Gubernur dan Wakil Gubernur Mahasiswa FTII menggelar agenda Hearing Terbuka bersama jajaran Dekanat FTII pada Kamis (10/09).

Pertemuan yang berlangsung selama 3 jam ini memfokuskan pembahasan pada beberapa poin krusial:
1. Peremajaan unit PC laboratorium rekayasa perangkat lunak dan komputasi awan.
2. Penambahan bandwidth internet kampus di area gedung FTII.
3. Alokasi dana bantuan darurat bagi mahasiswa terdampak bencana alam.

Dekan FTII menyambut baik transparansi data berbasis tiket aspirasi yang disajikan BEM FTII dan berkomitmen untuk menganggarkan pengadaan inventaris baru pada kuartal akhir tahun anggaran berjalan.`,
    penulis: 'Biro Media Kominfo FTII',
    gambar_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    published_at: '2026-09-11'
  },
  {
    id: 'berita-2',
    judul: 'BEM FTII Resmi Tandatangani Nota Kesepahaman (MoU) dengan 5 Perusahaan Teknologi Nasional',
    slug: 'mou-bem-ftii-perusahaan-teknologi',
    kategori: 'Kemitraan Industri',
    ringkasan: 'Langkah strategis Divisi Inteks dalam membuka jalur magang bersertifikat, project mentoring, dan sponsor beasiswa bagi mahasiswa FTII.',
    konten: `Menjawab tantangan revolusi industri 4.0 dan kebutuhan link and match antara dunia akademik dengan industri riil, Divisi Hubungan Internal & Eksternal (Inteks) BEM FTII sukses meresmikan kolaborasi strategis dengan 5 entitas teknologi terkemuka.

Kolaborasi ini mencakup:
- Penyaluran kuota magang prioritas untuk mahasiswa tingkat akhir.
- Kuliah praktisi reguler setiap bulan oleh Lead Engineer industri.
- Fasilitas cloud computing gratis untuk riset skripsi berbasis AI dan Big Data.

Gubernur Mahasiswa FTII, Muhammad Raihan Pratama, menyatakan bahwa inisiatif ini dirancang agar lulusan FTII memiliki kesiapan kerja yang langsung diakui oleh pasar global.`,
    penulis: 'Divisi Inteks FTII',
    gambar_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    published_at: '2026-08-28'
  },
  {
    id: 'berita-3',
    judul: 'Peluncuran Website Resmi BEM FTII: Portal Terintegrasi Aspirasi, Database Proker, dan Profil Pengurus',
    slug: 'peluncuran-website-resmi-bem-ftii',
    kategori: 'Kilas Kabinet',
    ringkasan: 'Portal modern berbasis TypeScript dan arsitektur multi-page kini resmi dapat diakses publik untuk meningkatkan transparansi kepengurusan.',
    konten: `Sebagai komitmen mewujudkan era keterbukaan informasi dan digitalisasi ormawa, BEM FTII resmi merilis website profil kabinet generasi terbaru. Website ini dirancang oleh tim Kominfo dengan mengedepankan performa tinggi, keamanan data, dan kemudahan akses di semua perangkat ponsel pintar maupun desktop.

Fitur utama yang dapat dimanfaatkan mahasiswa meliputi:
1. Formulir Aspirasi Anonim dengan sistem kode tiket unik untuk melacak status penanganan.
2. Direktori profil anggota di 7 divisi kepengurusan.
3. Kalender program kerja interaktif beserta ketercapaian target.

Civitas akademika diundang untuk menjelajahi portal ini dan turut aktif berpartisipasi dalam dinamika kemahasiswaan FTII.`,
    penulis: 'Biro Media Kominfo FTII',
    gambar_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    published_at: '2026-09-01'
  }
];

export const initialAspirasi: Aspirasi[] = [
  {
    id: 'asp-1',
    ticket_code: 'FTII-7821',
    is_anonim: false,
    nama: 'Budi Santoso',
    nim: '2310511019',
    email: 'budi.s@student.campus.ac.id',
    prodi: 'Teknik Informatika',
    kategori: 'Fasilitas & Lab',
    judul_aspirasi: 'Pendingin Ruangan (AC) di Lab Komputer B Lantai 3 Tidak Dingin',
    isi_aspirasi: 'Mohon bantuannya untuk koordinasi dengan bagian sarpras fakultas, AC di Lab Komputer B sering mati saat sesi praktikum algoritma, membuat mahasiswa gerah dan PC overheating.',
    status: 'disampaikan',
    catatan_advokasi: 'Surat permohonan perbaikan telah ditandatangani Wadek II dan teknisi dijadwalkan servis minggu ini.',
    created_at: '2026-09-08T10:30:00Z'
  },
  {
    id: 'asp-2',
    ticket_code: 'FTII-4412',
    is_anonim: true,
    kategori: 'UKT & Finansial',
    judul_aspirasi: 'Perpanjangan Waktu Pembayaran Cicilan UKT Semester Ganjil',
    isi_aspirasi: 'Apakah ada dispensasi waktu 1 minggu tambahan untuk pembayaran cicilan kedua UKT karena kendala transfer orang tua?',
    status: 'selesai',
    catatan_advokasi: 'Dispensasi telah disetujui Biro Keuangan Rektorat hingga tanggal 25 September.',
    created_at: '2026-09-02T14:15:00Z'
  }
];
