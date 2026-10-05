export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    message: 'Selamat datang di REST API Resmi BEM FTII Universitas Stikubank Semarang',
    organization: 'Badan Eksekutif Mahasiswa FTII Unisbank',
    cabinet: 'Kabinet Sinergi Nyata',
    period: '2026/2027',
    endpoints: {
      "GET /api/anggota": "Daftar 50 fungsionaris & pengguna BEM FTII (filter: ?divisi=&prodi=&angkatan=&role=&search=&page=&limit=)",
      "GET /api/users": "Alias endpoint /api/anggota (50 user untuk pengujian Postman)",
      "GET /api/pengguna": "Alias endpoint /api/anggota (50 user Bahasa Indonesia)",
      "GET /api/proker": "Katalog program kerja & agenda kabinet",
      "POST /api/aspirasi": "Pengiriman tiket aspirasi mahasiswa"
    },
    documentation: "Gunakan aplikasi Postman atau browser untuk menguji endpoint di atas."
  });
}

