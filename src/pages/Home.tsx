import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight,
  Quote, 
  Calendar
} from 'lucide-react';
import { fetchProkerList, fetchAnggotaList } from '../lib/supabase';
import type { Proker, Anggota } from '../types/database';
import '../styles/home.css';

export const Home: React.FC = () => {
  const [prokers, setProkers] = useState<Proker[]>([]);
  const [leaders, setLeaders] = useState<Anggota[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [prokerData, anggotaData] = await Promise.all([
          fetchProkerList(),
          fetchAnggotaList()
        ]);
        setProkers(prokerData.slice(0, 3));
        const lead = anggotaData.filter(a => a.divisi === 'Gubernur' || a.divisi === 'Wakil Gubernur');
        setLeaders(lead);
      } catch (err) {
        console.error('Failed loading home data:', err);
      }
    }
    loadData();
  }, []);

  const servicePillars = [
    {
      code: '01',
      title: 'Meja Kerja Advokasi',
      desc: 'Pelayanan pengawalan hak finansial UKT, pendampingan akademik, dan kanal aspirasi tertutup.',
      link: '/aspirasi',
      action: 'Buka Kanal'
    },
    {
      code: '02',
      title: 'Agenda Program Kerja',
      desc: 'Direktori agenda tahunan, seminar teknologi, inkubasi riset, dan rekapitulasi LPJ kegiatan.',
      link: '/proker',
      action: 'Lihat Kalender'
    },
    {
      code: '03',
      title: 'Warta & Sikap Resmi',
      desc: 'Publikasi berkala, rilis pers dekanat, liputan kegiatan ormawa, dan diseminasi informasi sivitas.',
      link: '/berita',
      action: 'Baca Warta'
    },
    {
      code: '04',
      title: 'Struktur 7 Divisi',
      desc: 'Bagan kepengurusan, transparansi mandat kerja, dan daftar fungsionaris Kabinet 2026.',
      link: '/struktur',
      action: 'Bagan Kabinet'
    }
  ];

  const divisiCatalog = [
    {
      no: '01',
      name: 'Gubernur & Wagub',
      bidang: 'Presidium Eksekutif',
      desc: 'Nahkoda arah gerak, representasi tertinggi ormawa, dan koordinator sinergi kabinet.',
      link: '/struktur?divisi=Gubernur'
    },
    {
      no: '02',
      name: 'Sekretariat',
      bidang: 'Tata Kelola & Arsip',
      desc: 'Digitalisasi persuratan, standarisasi birokrasi ormawa, dan manajemen inventaris fakultas.',
      link: '/struktur?divisi=Sekretaris'
    },
    {
      no: '03',
      name: 'Bendahara',
      bidang: 'Finansial & Usaha Mandiri',
      desc: 'Pengelolaan kas terpadu, transparansi anggaran ormawa, dan diversifikasi dana mandiri.',
      link: '/struktur?divisi=Bendahara'
    },
    {
      no: '04',
      name: 'Kominfo',
      bidang: 'Media & Publikasi',
      desc: 'Pusat branding visual, publikasi multimedia, portal informasi digital, dan dokumentasi.',
      link: '/struktur?divisi=Kominfo'
    },
    {
      no: '05',
      name: 'Inteks',
      bidang: 'Internal & Jejaring Industri',
      desc: 'Jembatan kemitraan korporasi teknologi, relasi alumni, dan harmonisasi ormawa.',
      link: '/struktur?divisi=Inteks'
    },
    {
      no: '06',
      name: 'Advokasi',
      bidang: 'Kesejahteraan Mahasiswa',
      desc: 'Garda pembela hak mahasiswa, advokasi pembiayaan UKT, dan pendampingan fasilitas kampus.',
      link: '/struktur?divisi=Advokasi'
    }
  ];

  return (
    <main className="home-page">
      {/* 1. HERO SECTION (Swiss Editorial / Pentagram Grid) */}
      <section className="hero">
        <div className="container">
          <div className="hero-editorial-grid">
            {/* Left Column: Authoritative Editorial Statement */}
            <div className="hero-left-column">
              <div className="hero-meta-kicker">
                <span className="hero-kicker-line"></span>
                <span className="hero-kicker-text">UNIVERSITAS STIKUBANK (UNISBANK) SEMARANG · BEM FTII KABINET 2026/2027</span>
              </div>

              <h1 className="hero-headline">
                Wadah Pergerakan, Inovasi Teknologi, dan Kewirausahaan Pemuda Digital.
              </h1>

              <p className="hero-lead-text">
                Badan Eksekutif Mahasiswa Fakultas Teknologi Informasi dan Industri (FTII) Universitas Stikubank Semarang berdedikasi mengawal kedaulatan aspirasi sivitas akademika, memperkuat integritas riset teknologi terapan, serta membangun sinergi strategis antara dunia akademik dan ekosistem industri nasional.
              </p>

              <div className="hero-action-row">
                <Link to="/proker" className="btn btn-primary">
                  <span>Jelajahi Program Kerja</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/aspirasi" className="btn btn-secondary">
                  <span>Meja Layanan Advokasi</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Strategic Pillars Gazette Card */}
            <div className="hero-right-column">
              <div className="gazette-card">
                <div className="gazette-header">
                  <span className="gazette-badge">UNISBANK SEMARANG</span>
                  <span className="gazette-period">PERIODE 2026/2027</span>
                </div>
                <h3 className="gazette-title">Tiga Pilar Haluan Kerja Kabinet Sinergi Nyata</h3>

                <div className="gazette-pillars-list">
                  <div className="gazette-pillar-item">
                    <span className="pillar-index">01</span>
                    <div className="pillar-body">
                      <strong className="pillar-heading">Kedaulatan & Kesejahteraan Mahasiswa</strong>
                      <p className="pillar-text">
                        Pengawalan berkala terhadap kebijakan finansial UKT, fasilitas laboratorium Kampus Kendeng & Mugas, serta pendampingan hak akademik.
                      </p>
                    </div>
                  </div>

                  <div className="gazette-pillar-item">
                    <span className="pillar-index">02</span>
                    <div className="pillar-body">
                      <strong className="pillar-heading">Akselerasi Riset & Rekayasa Digital</strong>
                      <p className="pillar-text">
                        Inkubasi inovasi perangkat lunak, sistem enterprise, otomasi manufaktur industri, dan pembinaan delegasi kompetisi teknologi bergengsi.
                      </p>
                    </div>
                  </div>

                  <div className="gazette-pillar-item">
                    <span className="pillar-index">03</span>
                    <div className="pillar-body">
                      <strong className="pillar-heading">Sinergi Industri & Kewirausahaan Pemuda</strong>
                      <p className="pillar-text">
                        Mewujudkan karakter <em>Digital Youth Entrepreneurial University</em> melalui kemitraan korporasi terkemuka, program magang, dan inkubasi startup mahasiswa.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="gazette-footer">
                  <span className="gazette-subtext">FAKULTAS TEKNOLOGI INFORMASI DAN INDUSTRI · UNIVERSITAS STIKUBANK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Functional Institutional Service Strip */}
          <div className="service-strip-grid">
            {servicePillars.map((item) => (
              <Link to={item.link} key={item.code} className="service-strip-card">
                <div className="service-card-top">
                  <span className="service-card-code">{item.code}</span>
                  <ArrowUpRight size={16} className="service-card-arrow" />
                </div>
                <h4 className="service-card-title">{item.title}</h4>
                <p className="service-card-desc">{item.desc}</p>
                <div className="service-card-footer">
                  <span>{item.action}</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          {/* Institutional Affiliation Dossier: Universitas Stikubank Semarang */}
          <div className="unisbank-editorial-dossier">
            <div className="unisbank-dossier-grid">
              {/* Left Column: Almamater Identity & Heritage */}
              <div className="unisbank-dossier-left">
                <div className="unisbank-dossier-meta">
                  <span className="dossier-meta-line"></span>
                  <span className="dossier-meta-text">ALMAMATER MAHASISWA FTII</span>
                </div>
                
                <h3 className="unisbank-dossier-title">
                  Universitas Stikubank (Unisbank) Semarang
                </h3>

                <p className="unisbank-dossier-faculty">
                  Fakultas Teknologi Informasi dan Industri (FTII)
                </p>

                <div className="unisbank-dossier-tagline-wrap">
                  <span className="dossier-tagline-quote">“</span>
                  <span className="dossier-tagline-text">Digital Youth Entrepreneurial University</span>
                  <span className="dossier-tagline-quote">”</span>
                </div>

                <div className="unisbank-dossier-campuses">
                  <div className="dossier-campus-item">
                    <span className="campus-bullet"></span>
                    <div>
                      <strong>Kampus Kendeng (Pusat FTII):</strong>
                      <p>Jl. Kendeng I, Bendan Ngisor (Gedung Student Center Lt. 2)</p>
                    </div>
                  </div>
                  <div className="dossier-campus-item">
                    <span className="campus-bullet"></span>
                    <div>
                      <strong>Kampus Mugas:</strong>
                      <p>Jl. Tri Lomba Juang No. 1, Mugassari, Semarang</p>
                    </div>
                  </div>
                </div>

                <div className="unisbank-dossier-cta-row">
                  <Link to="/tentang" className="btn btn-secondary">
                    <span>Mengenal Almamater & Makna Lambang</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Emblems & 4 Academic Disciplines */}
              <div className="unisbank-dossier-right">
                <div className="unisbank-emblem-showcase">
                  <div className="emblem-crest-frame" title="Lambang Resmi BEM FTII Unisbank">
                    <img src="/img/logo-bem-ftii.png" alt="Crest BEM FTII Unisbank" />
                  </div>
                  <div className="emblem-unisbank-frame" title="Logo Resmi Universitas Stikubank Semarang">
                    <img src="/img/logo-unisbank.png" alt="Logo Unisbank Semarang" />
                  </div>
                </div>

                <div className="unisbank-programs-dossier">
                  <span className="programs-dossier-title">3 Program Studi Sarjana (S1) Naungan FTII:</span>
                  <div className="programs-grid-compact">
                    <div className="program-compact-card">
                      <span className="program-code-badge">SI</span>
                      <div className="program-compact-info">
                        <strong>S1 Sistem Informasi</strong>
                        <span>Enterprise Systems & Data Intelligence</span>
                      </div>
                    </div>
                    <div className="program-compact-card">
                      <span className="program-code-badge">IF</span>
                      <div className="program-compact-info">
                        <strong>S1 Teknik Informatika</strong>
                        <span>Artificial Intelligence & Software Engineering</span>
                      </div>
                    </div>
                    <div className="program-compact-card">
                      <span className="program-code-badge">TI</span>
                      <div className="program-compact-info">
                        <strong>S1 Teknik Industri</strong>
                        <span>Manufacturing Automation & Supply Chain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN GUBERNUR & WAKIL GUBERNUR (Editorial Leadership) */}
      <section className="section leaders-section">
        <div className="container">
          <div className="section-header-editorial">
            <div className="section-meta-label">LEMBARAN KEPEMIMPINAN</div>
            <h2 className="section-heading-editorial">
              Arah Gerak & Komitmen Presidium Kabinet
            </h2>
            <p className="section-subtext-editorial">
              Kepemimpinan yang berakar pada empati mahasiswa, ketegasan berprinsip, dan komitmen membawa nama baik FTII ke kancah nasional.
            </p>
          </div>

          <div className="leaders-grid-editorial">
            {leaders.map((leader) => (
              <article key={leader.id} className="leader-card-editorial">
                <div className="leader-profile-aside">
                  <img src={leader.foto_url} alt={leader.nama} className="leader-portrait" />
                  <div className="leader-meta-box">
                    <span className="leader-role-tag">{leader.jabatan}</span>
                    <span className="leader-prodi-text">{leader.prodi} ({leader.angkatan})</span>
                  </div>
                </div>

                <div className="leader-speech-column">
                  <Quote size={32} className="leader-quote-symbol" />
                  <blockquote className="leader-quote-statement">
                    "{leader.bio || 'Mewujudkan BEM FTII sebagai akselerator gerakan mahasiswa yang berintelektual, tangguh, dan berdaya saing global demi kemajuan bangsa.'}"
                  </blockquote>
                  <div className="leader-signature-row">
                    <strong className="leader-name-text">{leader.nama}</strong>
                    <span className="leader-title-text">{leader.jabatan} BEM FTII 2026</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DIREKTORI 7 DIVISI STRATEGIS KABINET */}
      <section className="section divisi-section">
        <div className="container">
          <div className="section-header-editorial">
            <div className="section-meta-label">STRUKTUR KOORDINASI</div>
            <h2 className="section-heading-editorial">
              Direktori 7 Divisi Strategis Kabinet
            </h2>
            <p className="section-subtext-editorial">
              Seluruh pilar departemen fungsional bekerja secara terpadu untuk mengeksekusi visi pembangunan fakultas.
            </p>
          </div>

          <div className="divisi-grid-editorial">
            {divisiCatalog.map((div) => (
              <Link to={div.link} key={div.no} className="divisi-card-editorial">
                <div className="divisi-card-header">
                  <span className="divisi-card-num">{div.no}</span>
                  <span className="divisi-card-bidang">{div.bidang}</span>
                </div>
                <h3 className="divisi-card-name">{div.name}</h3>
                <p className="divisi-card-desc">{div.desc}</p>
                <div className="divisi-card-link-text">
                  <span>Lihat Fungsionaris & Proker</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AGENDA PROGRAM KERJA TERPILIH */}
      <section className="section proker-section-home">
        <div className="container">
          <div className="proker-home-header">
            <div>
              <div className="section-meta-label">AGENDA PRIORITAS</div>
              <h2 className="section-heading-editorial">Program Kerja Terpilih</h2>
              <p className="section-subtext-editorial">
                Inisiatif nyata yang sedang dan akan dilaksanakan oleh fungsionaris kabinet.
              </p>
            </div>
            <Link to="/proker" className="btn btn-secondary">
              <span>Buka Katalog Lengkap</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="proker-home-grid">
            {prokers.map((p) => (
              <article key={p.id} className="proker-home-card">
                <div className="proker-home-media">
                  <img
                    src={p.poster_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                    alt={p.judul}
                  />
                  <div className="proker-home-media-badge">
                    <span className="proker-divisi-pill-clean">{p.divisi}</span>
                  </div>
                </div>
                <div className="proker-home-content">
                  <div className="proker-date-row">
                    <Calendar size={14} />
                    <span>{p.tanggal_mulai || 'Periode 2026/2027'}</span>
                  </div>
                  <h3 className="proker-home-title">{p.judul}</h3>
                  <p className="proker-home-desc">{p.deskripsi}</p>
                  <Link to="/proker" className="proker-home-cta">
                    <span>Detail Agenda</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL CALL TO ACTION BANNER */}
      <section className="section cta-section-wrap">
        <div className="container">
          <div className="cta-gazette-box">
            <div className="cta-gazette-content">
              <span className="cta-gazette-kicker">KEDAULATAN SUARA MAHASISWA</span>
              <h2 className="cta-gazette-headline">
                Menghadapi Kendala Fasilitas atau Finansial Kampus?
              </h2>
              <p className="cta-gazette-desc">
                Divisi Advokasi BEM FTII siap mengawal keluhan Anda. Sampaikan laporan secara tertutup dengan jaminan kerahasiaan identitas dan pemantauan status tiket transparan.
              </p>
            </div>
            <div className="cta-gazette-actions">
              <Link to="/aspirasi" className="btn-cta-white">
                <span>Sampaikan Aspirasi Anda</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/aspirasi" className="btn-cta-outline-white">
                <span>Lacak Status Tiket</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
