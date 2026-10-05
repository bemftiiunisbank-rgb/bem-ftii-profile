const anggotaList = [
  {
    id: "ang-1",
    nama: "Tatryan Kautsar Al-Firdaus",
    nim: "2610511001",
    divisi: "Gubernur",
    jabatan: "Gubernur Mahasiswa FTII",
    prodi: "Teknik Informatika",
    angkatan: "2026",
    foto_url: "/img/anggota/gubernur-tatryan.png",
    bio: "Berkomitmen membawa BEM FTII menjadi akselerator inovasi teknologi berdaya saing global dan menjunjung integritas.",
    instagram: "@tatryan.kautsar",
    linkedin: "linkedin.com/in/tatryan-kautsar",
    urutan: 1
  },
  {
    id: "ang-2",
    nama: "Raflian Taofiq Z.M",
    nim: "2610521002",
    divisi: "Wakil Gubernur",
    jabatan: "Wakil Gubernur Mahasiswa FTII",
    prodi: "Sistem Informasi",
    angkatan: "2026",
    foto_url: "/img/anggota/wagub-raflian.png",
    bio: "Menyelaraskan sinergi seluruh elemen fakultas demi terciptanya iklim organisasi yang sehat, suportif, dan adaptif.",
    instagram: "@rafliantaofiq",
    linkedin: "linkedin.com/in/rafliantaofiq",
    urutan: 2
  },
  {
    id: "ang-3",
    nama: "Salma Nur Azizah",
    nim: "2210531008",
    divisi: "Sekretaris",
    jabatan: "Sekretaris Umum I",
    prodi: "Teknik Industri",
    angkatan: "2022",
    foto_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Memastikan tata kelola administrasi dan pengarsipan kabinet berjalan cepat, tertib, dan berbasis digital.",
    instagram: "@salmanuraz",
    linkedin: "linkedin.com/in/salma-nur-azizah",
    urutan: 3
  },
  {
    id: "ang-4",
    nama: "Devina Maharani",
    nim: "2310511045",
    divisi: "Sekretaris",
    jabatan: "Sekretaris Umum II",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    foto_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Bertanggung jawab atas sirkulasi persuratan ormawa dan risalah rapat kerja presidium kabinet.",
    instagram: "@devinamaharani",
    linkedin: "linkedin.com/in/devina-maharani",
    urutan: 4
  },
  {
    id: "ang-5",
    nama: "Rifki Fajar Pratama",
    nim: "2210521019",
    divisi: "Bendahara",
    jabatan: "Bendahara Umum I",
    prodi: "Sistem Informasi",
    angkatan: "2022",
    foto_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Menjaga transparansi anggaran kabinet dan akuntabilitas realisasi dana program kerja fakultas.",
    instagram: "@rifkifajar_",
    linkedin: "linkedin.com/in/rifki-fajar",
    urutan: 5
  },
  {
    id: "ang-6",
    nama: "Aulia Nurul Hikmah",
    nim: "2310531014",
    divisi: "Bendahara",
    jabatan: "Bendahara Umum II",
    prodi: "Teknik Industri",
    angkatan: "2023",
    foto_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    bio: "Mengelola arus kas operasional sekretariat dan pendanaan kewirausahaan mandiri kabinet.",
    instagram: "@aulianurul.h",
    linkedin: "linkedin.com/in/aulia-nurul",
    urutan: 6
  },
  {
    id: "ang-7",
    nama: "Bagas Satria Wicaksana",
    nim: "2210511088",
    divisi: "Kominfo",
    jabatan: "Kepala Divisi Kominfo",
    prodi: "Teknik Informatika",
    angkatan: "2022",
    foto_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bio: "Memimpin strategi komunikasi visual, publikasi media, dan pengembangan infrastruktur digital BEM FTII.",
    instagram: "@bagassatria.w",
    linkedin: "linkedin.com/in/bagas-satria-w",
    urutan: 7
  },
  {
    id: "ang-8",
    nama: "Siti Rahmawati",
    nim: "2310511092",
    divisi: "Kominfo",
    jabatan: "Staf Multimedia & Konten",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    foto_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    bio: "Kreator konten grafis dan dokumentasi video kegiatan ormawa FTII.",
    instagram: "@siti.rahmawati",
    linkedin: "linkedin.com/in/siti-rahmawati",
    urutan: 8
  },
  {
    id: "ang-9",
    nama: "Dimas Aditya Wardhana",
    nim: "2210521077",
    divisi: "Inteks",
    jabatan: "Kepala Divisi Inteks",
    prodi: "Sistem Informasi",
    angkatan: "2022",
    foto_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "Membangun relasi strategis ormawa dengan korporasi teknologi, ekosistem industri, dan jejaring alumni.",
    instagram: "@dimasaditya.w",
    linkedin: "linkedin.com/in/dimas-aditya-w",
    urutan: 9
  },
  {
    id: "ang-10",
    nama: "Fajar Maulana Sidik",
    nim: "2210511033",
    divisi: "Advokasi",
    jabatan: "Kepala Divisi Advokasi",
    prodi: "Teknik Informatika",
    angkatan: "2022",
    foto_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bio: "Garda terdepan pengawalan hak finansial UKT mahasiswa dan fasilitator kebijakan dekanat.",
    instagram: "@fajarmaulana.s",
    linkedin: "linkedin.com/in/fajar-maulana-sidik",
    urutan: 10
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Filter berdasarkan query param ?divisi=...
  const { divisi } = req.query;
  let results = anggotaList;

  if (divisi && divisi !== 'Semua') {
    results = results.filter(a => a.divisi.toLowerCase() === divisi.toLowerCase());
  }

  return res.status(200).json({
    status: 'success',
    total: results.length,
    data: results
  });
}
