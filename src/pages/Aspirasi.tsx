import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  MessageSquarePlus, 
  Lock, 
  HelpCircle, 
  PhoneCall 
} from 'lucide-react';
import { createAspirasi, trackAspirasiStatus } from '../lib/supabase';
import type { KategoriAspirasi, Aspirasi, StatusAspirasi } from '../types/database';
import '../styles/aspirasi.css';

export const AspirasiPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'track'>('form');

  // Form State
  const [isAnonim, setIsAnonim] = useState(false);
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [prodi, setProdi] = useState('Teknik Informatika');
  const [kategori, setKategori] = useState<KategoriAspirasi>('Akademik');
  const [judulAspirasi, setJudulAspirasi] = useState('');
  const [isiAspirasi, setIsiAspirasi] = useState('');

  // Submit Feedback
  const [submitting, setSubmitting] = useState(false);
  const [newTicketCode, setNewTicketCode] = useState<string | null>(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Tracking State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackedItem, setTrackedItem] = useState<Aspirasi | null>(null);
  const [trackNotFound, setTrackNotFound] = useState(false);

  const handleSubmitAspirasi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulAspirasi.trim() || !isiAspirasi.trim()) {
      alert('Mohon lengkapi judul dan isi aspirasi.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createAspirasi({
        is_anonim: isAnonim,
        nama: isAnonim ? undefined : nama,
        nim: isAnonim ? undefined : nim,
        email: isAnonim ? undefined : email,
        prodi: isAnonim ? undefined : prodi,
        kategori,
        judul_aspirasi: judulAspirasi,
        isi_aspirasi: isiAspirasi
      });

      setNewTicketCode(res.ticket_code);
      setFormSuccessMessage(res.message);
      // Reset form
      setJudulAspirasi('');
      setIsiAspirasi('');
      setNama('');
      setNim('');
      setEmail('');
    } catch (err) {
      console.error('Error submitting aspirasi:', err);
      alert('Terjadi kendala saat mengirim aspirasi. Silakan coba kembali.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setTrackLoading(true);
    setTrackNotFound(false);
    setTrackedItem(null);

    try {
      const res = await trackAspirasiStatus(trackQuery);
      if (res) {
        setTrackedItem(res);
      } else {
        setTrackNotFound(true);
      }
    } catch (err) {
      console.error('Track error:', err);
      setTrackNotFound(true);
    } finally {
      setTrackLoading(false);
    }
  };

  const steps: { key: StatusAspirasi; title: string; desc: string }[] = [
    { key: 'diterima', title: '1. Aspirasi Diterima', desc: 'Aspirasi telah masuk ke dalam sistem Divisi Advokasi FTII.' },
    { key: 'diproses', title: '2. Verifikasi & Kajian', desc: 'Tim Advokasi sedang memverifikasi urgensi dan menyiapkan berkas advokasi.' },
    { key: 'disampaikan', title: '3. Disampaikan ke Dekanat / Pihak Terkait', desc: 'Aspirasi telah dimasukkan ke agenda hearing atau nota dinas resmi.' },
    { key: 'selesai', title: '4. Selesai & Ditindaklanjuti', desc: 'Solusi telah disepakati dan diimplementasikan.' }
  ];

  const getStepStatus = (stepKey: StatusAspirasi, currentStatus: StatusAspirasi) => {
    const order: StatusAspirasi[] = ['diterima', 'diproses', 'disampaikan', 'selesai'];
    const stepIdx = order.indexOf(stepKey);
    const currIdx = order.indexOf(currentStatus);

    if (stepIdx < currIdx) return 'completed';
    if (stepIdx === currIdx) return 'active';
    return '';
  };

  return (
    <main className="aspirasi-page">
      {/* Editorial Page Header */}
      <section className="page-header-editorial">
        <div className="container">
          <div className="page-header-inner">
            <div className="page-kicker">
              <span className="page-kicker-line"></span>
              <span className="page-kicker-text">ADVOKASI & KESEJAHTERAAN MAHASISWA · FTII UNISBANK SEMARANG</span>
            </div>
            <h1 className="page-headline-editorial">
              Meja Kerja Layanan & Kanal Aspirasi
            </h1>
            <p className="page-subtext-editorial">
              Wadah terpercaya dan tertutup bagi seluruh mahasiswa FTII Universitas Stikubank Semarang untuk menyampaikan kendala fasilitas laboratorium Kampus Kendeng & Mugas, pendampingan finansial UKT, dan pengawalan kebijakan dekanat.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section">
        <div className="container">
          <div className="aspirasi-layout">
            {/* Left Column: Form or Tracker */}
            <div>
              <div className="aspirasi-tabs">
                <button
                  className={`aspirasi-tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                  onClick={() => setActiveTab('form')}
                >
                  <MessageSquarePlus size={18} />
                  <span>Kirim Aspirasi Baru</span>
                </button>
                <button
                  className={`aspirasi-tab-btn ${activeTab === 'track' ? 'active' : ''}`}
                  onClick={() => setActiveTab('track')}
                >
                  <Search size={18} />
                  <span>Lacak Tiket Aspirasi</span>
                </button>
              </div>

              {activeTab === 'form' ? (
                <div className="form-card">
                  {newTicketCode && formSuccessMessage && (
                    <div className="success-alert">
                      <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 0.75rem auto' }} />
                      <h4>Aspirasi Berhasil Terkirim!</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Simpan kode tiket berikut untuk memantau proses tindak lanjut advokasi Anda:
                      </p>
                      <div className="ticket-display">{newTicketCode}</div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Anda dapat memeriksa perkembangannya kapan saja melalui tab <strong>"Lacak Tiket Aspirasi"</strong>.
                      </p>
                      <button
                        className="btn btn-outline-red"
                        style={{ marginTop: '1rem', padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                        onClick={() => setNewTicketCode(null)}
                      >
                        Kirim Aspirasi Lain
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmitAspirasi}>
                    <label className="anonim-switch">
                      <input
                        type="checkbox"
                        checked={isAnonim}
                        onChange={(e) => setIsAnonim(e.target.checked)}
                      />
                      <div className="anonim-switch-text">
                        <strong>Kirim Sebagai Anonim</strong>
                        <span>Nama, NIM, dan identitas kontak Anda tidak akan dicatat dalam sistem publik.</span>
                      </div>
                    </label>

                    {!isAnonim && (
                      <>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Nama Lengkap</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Masukkan nama Anda..."
                              value={nama}
                              onChange={(e) => setNama(e.target.value)}
                              required={!isAnonim}
                            />
                          </div>
                          <div className="form-group">
                            <label>NIM (Nomor Induk Mahasiswa)</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Contoh: 21.01.53.0012"
                              value={nim}
                              onChange={(e) => setNim(e.target.value)}
                              required={!isAnonim}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Email Mahasiswa / Pribadi</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="nama@mhs.unisbank.ac.id"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required={!isAnonim}
                            />
                          </div>
                          <div className="form-group">
                            <label>Program Studi</label>
                            <select
                              className="form-control"
                              value={prodi}
                              onChange={(e) => setProdi(e.target.value)}
                            >
                              <option value="Teknik Informatika">Teknik Informatika</option>
                              <option value="Sistem Informasi">Sistem Informasi</option>
                              <option value="Teknik Industri">Teknik Industri</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="form-group">
                      <label>Kategori Masalah</label>
                      <select
                        className="form-control"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value as KategoriAspirasi)}
                      >
                        <option value="Akademik">Akademik & Dosen</option>
                        <option value="Fasilitas & Lab">Fasilitas Kampus & Laboratorium</option>
                        <option value="UKT & Finansial">Bantuan UKT & Beasiswa</option>
                        <option value="Kebijakan Kampus">Kebijakan Dekanat / Rektorat</option>
                        <option value="Kegiatan Mahasiswa">Kegiatan Mahasiswa / Ormawa</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Judul / Pokok Masalah</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ringkasan kendala (Contoh: Kendala AC Rusak di Lab Komputer B)"
                        value={judulAspirasi}
                        onChange={(e) => setJudulAspirasi(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Isi Aspirasi / Deskripsi Masalah</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        placeholder="Jelaskan secara rinci situasi, waktu kejadian, ruangan atau kronologi yang dialami..."
                        value={isiAspirasi}
                        onChange={(e) => setIsiAspirasi(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                      style={{ width: '100%', padding: '0.9rem' }}
                    >
                      <Send size={18} />
                      <span>{submitting ? 'Mengirim ke Database...' : 'Kirim Aspirasi ke BEM FTII'}</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* TAB TRACKING TIKET */
                <div className="form-card">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Lacak Penanganan Tiket</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                    Masukkan kode tiket yang Anda peroleh saat pengiriman (Contoh tiket demo: <code>FTII-7821</code> atau <code>FTII-4412</code>).
                  </p>

                  <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Kode Tiket (Contoh: FTII-7821)"
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
                      <Search size={18} />
                      <span>{trackLoading ? 'Mencari...' : 'Lacak'}</span>
                    </button>
                  </form>

                  {trackNotFound && (
                    <div style={{ padding: '1.5rem', background: 'rgba(239, 35, 60, 0.08)', border: '1px solid rgba(239, 35, 60, 0.25)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                      <AlertCircle size={28} color="#ef233c" style={{ margin: '0 auto 0.5rem auto' }} />
                      <p style={{ color: '#b91c1c', fontWeight: 600 }}>Kode Tiket Tidak Ditemukan</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Pastikan kode tiket yang dimasukkan tepat sesuai format (contoh: <code>FTII-7821</code>).
                      </p>
                    </div>
                  )}

                  {trackedItem && (
                    <div className="tracking-card">
                      <div className="tracking-header">
                        <div>
                          <div className="ticket-tag">{trackedItem.ticket_code}</div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Kategori: {trackedItem.kategori}
                          </span>
                        </div>
                        <span className={`status-badge ${trackedItem.status}`}>
                          {trackedItem.status}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        {trackedItem.judul_aspirasi}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                        "{trackedItem.isi_aspirasi}"
                      </p>

                      {/* Timeline Steps */}
                      <div className="timeline-tracker">
                        {steps.map((step) => {
                          const statusClass = getStepStatus(step.key, trackedItem.status);
                          return (
                            <div key={step.key} className={`timeline-step ${statusClass}`}>
                              <div className="timeline-dot"></div>
                              <div className="step-title">{step.title}</div>
                              <div className="step-desc">{step.desc}</div>
                            </div>
                          );
                        })}
                      </div>

                      {trackedItem.catatan_advokasi && (
                        <div style={{ background: '#f8fafc', borderLeft: '3px solid var(--color-primary)', padding: '1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', border: '1px solid var(--border-subtle)', borderLeftWidth: '3px', borderLeftColor: 'var(--color-primary)' }}>
                          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            CATATAN RESMI TIM ADVOKASI FTII:
                          </span>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                            {trackedItem.catatan_advokasi}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Information & FAQ */}
            <div className="advokasi-sidebar">
              <div className="info-sidebar-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                  <Lock size={20} />
                  <h4 style={{ color: 'var(--text-primary)' }}>Jaminan Kerahasiaan</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Divisi Advokasi BEM FTII memegang teguh asas kerahasiaan identitas pelapor. Aspirasi yang Anda kirimkan tidak akan disalahgunakan atau dibocorkan kepada pihak yang tidak berwenang.
                </p>
              </div>

              <div className="info-sidebar-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', color: 'var(--color-primary)' }}>
                  <HelpCircle size={20} />
                  <h4 style={{ color: 'var(--text-primary)' }}>Pertanyaan Umum (FAQ)</h4>
                </div>

                <div className="faq-list">
                  <div className="faq-item">
                    <h5>Berapa lama aspirasi ditindaklanjuti?</h5>
                    <p>Maksimal 2x24 jam kerja tim advokasi akan mengkaji dan memperbarui status tiket Anda.</p>
                  </div>
                  <div className="faq-item">
                    <h5>Bagaimana jika butuh pendampingan tatap muka?</h5>
                    <p>Anda dapat langsung berkunjung ke Ruang Advokasi BEM FTII di Student Center Lt. 2 setiap Senin - Jumat.</p>
                  </div>
                  <div className="faq-item">
                    <h5>Apakah bisa mengurus keringanan UKT lewat sini?</h5>
                    <p>Bisa. Pilih kategori "UKT & Finansial", cantumkan kendala ekonomi yang dialami dan nomor kontak yang dapat dihubungi.</p>
                  </div>
                </div>
              </div>

              <div className="hotline-editorial-card">
                <div className="hotline-card-header">
                  <div className="hotline-icon-badge">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <span className="hotline-kicker">RESPONS CEPAT & PENDAMPINGAN</span>
                    <h4 className="hotline-title">Layanan Narahubung Darurat</h4>
                  </div>
                </div>

                <p className="hotline-desc">
                  Untuk kebutuhan mendesak terkait pengawalan sanksi akademik sepihak, kendala finansial UKT darurat, atau pendampingan tatap muka langsung:
                </p>

                <div className="hotline-numbers-grid">
                  <a 
                    href="https://wa.me/628993083311" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hotline-item"
                    title="Hubungi Gubernur Mahasiswa BEM FTII via WhatsApp"
                  >
                    <div className="hotline-role-box">
                      <span className="hotline-badge-tag">GUBERNUR</span>
                      <strong className="hotline-number-text">+62 899-3083-311</strong>
                    </div>
                    <span className="hotline-action-label">Chat WA ↗</span>
                  </a>

                  <a 
                    href="https://wa.me/6282113449785" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hotline-item"
                    title="Hubungi Divisi Advokasi Mahasiswa via WhatsApp"
                  >
                    <div className="hotline-role-box">
                      <span className="hotline-badge-tag">ADVOKASI</span>
                      <strong className="hotline-number-text">+62 821-1344-9785</strong>
                    </div>
                    <span className="hotline-action-label">Chat WA ↗</span>
                  </a>
                </div>

                <div className="hotline-footer-note">
                  <span>Layanan tatap muka tersedia di Ruang Advokasi BEM FTII, Gedung Student Center Lt. 2 Kampus Kendeng.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
