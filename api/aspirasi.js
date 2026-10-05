export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nama, email, kategori, judul_aspirasi, isi_aspirasi } = req.body || {};

    if (!isi_aspirasi) {
      return res.status(400).json({
        status: 'error',
        message: 'Field isi_aspirasi wajib diisi!'
      });
    }

    const ticketCode = `FTII-${Date.now().toString().slice(-6)}`;

    return res.status(201).json({
      status: 'success',
      message: 'Tiket aspirasi berhasil diterima oleh Divisi Advokasi BEM FTII',
      ticket_code: ticketCode,
      data: {
        ticket_code: ticketCode,
        nama: nama || 'Anonim',
        email: email || '-',
        kategori: kategori || 'Umum',
        judul_aspirasi: judul_aspirasi || 'Aspirasi Mahasiswa',
        isi_aspirasi: isi_aspirasi,
        status: 'diterima',
        created_at: new Date().toISOString()
      }
    });
  }

  // GET handler
  return res.status(200).json({
    status: 'success',
    message: 'Kanal API Aspirasi BEM FTII Unisbank siap menerima request POST',
    usage: {
      method: 'POST',
      url: '/api/aspirasi',
      headers: {
        'Content-Type': 'application/json'
      },
      sample_body: {
        nama: 'Nama Mahasiswa (opsional)',
        email: 'email@edu.unisbank.ac.id (opsional)',
        kategori: 'Fasilitas & Lab',
        judul_aspirasi: 'AC Laboratorium Gedung Kendeng',
        isi_aspirasi: 'Mohon perbaikan pendingin ruangan di Lab Komputer 3.'
      }
    }
  });
}
