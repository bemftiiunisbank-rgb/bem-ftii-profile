const prokerList = [
  {
    id: "proker-1",
    judul: "FTII Tech Career & Internship Fair 2026",
    slug: "ftii-tech-career-fair-2026",
    divisi: "Inteks",
    status: "akan_datang",
    tanggal_mulai: "2026-10-15",
    tanggal_selesai: "2026-10-16",
    lokasi: "Gedung Student Center Lt. 3, Kampus Kendeng",
    deskripsi: "Bursa karir tahunan dan rekrutmen magang bersama lebih dari 20 mitra korporasi IT dan startup nasional."
  },
  {
    id: "proker-2",
    judul: "Posko Advokasi UKT & Penyesuaian Finansial Semester Genap",
    slug: "posko-advokasi-ukt-semester-genap",
    divisi: "Advokasi",
    status: "sedang_berjalan",
    tanggal_mulai: "2026-08-01",
    tanggal_selesai: "2026-09-30",
    lokasi: "Sekretariat BEM FTII / Online",
    deskripsi: "Layanan pendampingan verifikasi berkas permohonan banding, cicilan, dan keringanan UKT mahasiswa FTII."
  },
  {
    id: "proker-3",
    judul: "Workshop Desain UI/UX & Pemrograman Web Modern",
    slug: "workshop-ui-ux-web-modern",
    divisi: "Kominfo",
    status: "selesai",
    tanggal_mulai: "2026-07-20",
    tanggal_selesai: "2026-07-21",
    lokasi: "Laboratorium Komputer Kampus Mugas",
    deskripsi: "Pelatihan komprehensif rancang bangun antarmuka digital dan implementasi arsitektur frontend."
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { status, divisi } = req.query;
  let results = prokerList;

  if (status) {
    results = results.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }
  if (divisi) {
    results = results.filter(p => p.divisi.toLowerCase() === divisi.toLowerCase());
  }

  return res.status(200).json({
    status: 'success',
    total: results.length,
    data: results
  });
}
