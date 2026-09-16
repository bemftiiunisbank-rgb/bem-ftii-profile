import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import '../styles/kontak.css';

export const KontakPage: React.FC = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [subjek, setSubjek] = useState('');
  const [pesan, setPesan] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setNama('');
      setEmail('');
      setSubjek('');
      setPesan('');
    }, 1000);
  };

  return (
    <main className="kontak-page">
      {/* Editorial Page Header */}
      <section className="page-header-editorial">
        <div className="container">
          <div className="page-header-inner">
            <div className="page-kicker">
              <span className="page-kicker-line"></span>
              <span className="page-kicker-text">LAYANAN & KOMUNIKASI RESMI · KABINET 2026/2027</span>
            </div>
            <h1 className="page-headline-editorial">
              Hubungi & Kunjungi Kantor Sekretariat
            </h1>
            <p className="page-subtext-editorial">
              Pintu sekretariat BEM FTII Universitas Stikubank Semarang terbuka untuk audiensi mahasiswa, kemitraan korporasi, urusan persuratan ormawa, dan layanan tatap muka.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container">
          <div className="kontak-grid">
            {/* Info Column */}
            <div className="kontak-info-column">
              <div className="kontak-card-main">
                <div className="sekretariat-item">
                  <div className="sekretariat-icon-box">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="sekretariat-title">Sekretariat FTII (Kampus Kendeng)</h4>
                    <p className="sekretariat-val">
                      Gedung Student Center FTII Lt. 2, Kampus Kendeng Unisbank, Jl. Kendeng I, Bendan Ngisor, Kec. Gajahmungkur, Kota Semarang 50233
                    </p>
                  </div>
                </div>

                <div className="sekretariat-item">
                  <div className="sekretariat-icon-box">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="sekretariat-title">Kampus Mugas</h4>
                    <p className="sekretariat-val">
                      Jl. Tri Lomba Juang No. 1, Mugassari, Kec. Semarang Selatan, Kota Semarang 50241
                    </p>
                  </div>
                </div>

                <div className="sekretariat-item">
                  <div className="sekretariat-icon-box">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="sekretariat-title">Email Resmi</h4>
                    <p className="sekretariat-val">
                      bemftii@edu.unisbank.ac.id<br />
                      sekretariat.bemftii.unisbank@gmail.com
                    </p>
                  </div>
                </div>

                <div className="sekretariat-item">
                  <div className="sekretariat-icon-box">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="sekretariat-title">Narahubung & Hotline Resmi</h4>
                    <div className="kontak-phone-list">
                      <a 
                        href="https://wa.me/628993083311" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="kontak-phone-badge"
                        title="Chat WhatsApp Gubernur Mahasiswa BEM FTII"
                      >
                        <span className="phone-badge-role">Gubernur:</span>
                        <strong className="phone-badge-val">+62 899-3083-311</strong>
                        <span className="phone-badge-action">WA ↗</span>
                      </a>
                      <a 
                        href="https://wa.me/6282113449785" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="kontak-phone-badge"
                        title="Chat WhatsApp Layanan Advokasi BEM FTII"
                      >
                        <span className="phone-badge-role">Advokasi:</span>
                        <strong className="phone-badge-val">+62 821-1344-9785</strong>
                        <span className="phone-badge-action">WA ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unisbank Almamater Card (Light Editorial) */}
              <div className="almamater-kontak-card">
                <div className="almamater-kontak-header">
                  <div className="almamater-logo-wrapper">
                    <img 
                      src="/img/logo-unisbank.png" 
                      alt="Universitas Stikubank Semarang" 
                      className="almamater-logo-img"
                    />
                  </div>
                  <span className="almamater-tag">ALMAMATER TERPADU</span>
                </div>
                <div className="almamater-kontak-text">
                  <h4 className="almamater-title">Universitas Stikubank Semarang</h4>
                  <p className="almamater-slogan"><em>"Digital Youth Entrepreneurial University"</em></p>
                  <a 
                    href="https://www.unisbank.ac.id" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="almamater-link"
                  >
                    <span>Kunjungi Portal Resmi www.unisbank.ac.id</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Jam Operasional (Light Editorial Card) */}
              <div className="jam-card">
                <div className="jam-card-header">
                  <div className="jam-icon-box">
                    <Clock size={18} />
                  </div>
                  <h4 className="jam-card-title">Jam Operasional Sekretariat</h4>
                </div>
                <table className="jam-table">
                  <tbody>
                    <tr>
                      <td className="jam-day">Senin – Kamis</td>
                      <td className="jam-time">09.00 – 17.00 WIB</td>
                    </tr>
                    <tr>
                      <td className="jam-day">Jumat</td>
                      <td className="jam-time">09.00 – 16.30 WIB</td>
                    </tr>
                    <tr>
                      <td className="jam-day">Sabtu – Minggu / Libur</td>
                      <td className="jam-time highlight">Khusus Agenda Ormawa / Proker</td>
                    </tr>
                  </tbody>
                </table>
                <div className="jam-footer-note">
                  <span>Piket Fungsionaris BEM FTII di Student Center Lt. 2 Kampus Kendeng.</span>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="kontak-card-main">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Kirim Pesan atau Kerjasama</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Untuk permohonan kerjasama, sponsorship, atau pertanyaan umum ke fungsionaris BEM FTII.
              </p>

              {sent ? (
                <div className="success-alert">
                  <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4>Pesan Berhasil Terkirim!</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Terima kasih telah menghubungi BEM FTII. Tim sekretariat akan merespons pesan Anda dalam kurun waktu 1x24 jam kerja.
                  </p>
                  <button
                    className="btn btn-outline-red"
                    style={{ marginTop: '1.5rem', padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                    onClick={() => setSent(false)}
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nama Lengkap / Lembaga / Perusahaan</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan nama Anda..."
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Alamat Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Subjek Keperluan</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contoh: Penawaran Sponsorship F-TIEX 2026 / Audiensi Ormawa"
                      value={subjek}
                      onChange={(e) => setSubjek(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Isi Pesan</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Tuliskan rincian maksud dan tujuan Anda..."
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem' }}>
                    <Send size={18} />
                    <span>Kirim Pesan ke BEM FTII</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
