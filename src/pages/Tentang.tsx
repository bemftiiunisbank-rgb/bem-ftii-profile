import React from 'react';
import { 
  Target, 
  Compass, 
  Zap, 
  ShieldCheck,
  BookOpen,
  MapPin,
  ExternalLink,
  Globe,
  Star,
  Layers
} from 'lucide-react';
import '../styles/tentang.css';

export const Tentang: React.FC = () => {
  const maknaLambang = [
    {
      title: 'Garuda Emas Almamater (Unisbank Semarang)',
      desc: 'Melambangkan martabat luhur, keteguhan visi, dan kebanggaan sivitas akademika Universitas Stikubank dalam membina generasi pemuda mandiri yang menjunjung tinggi keunggulan ilmu pengetahuan.',
      icon: <ShieldCheck size={18} />
    },
    {
      title: 'Bola Dunia & Garis Khatulistiwa (Wawasan Global)',
      desc: 'Mencerminkan orientasi internasional mahasiswa FTII Unisbank, kesiapan berkompetisi di kancah global, dan komputasi jaringan yang terhubung tanpa batas teritorial.',
      icon: <Globe size={18} />
    },
    {
      title: 'Busur Dinamis & Identitas Tri-Warna (Merah, Biru, Emas)',
      desc: 'Perpaduan nilai Tri Dharma Perguruan Tinggi, ketangguhan teknologi, inovasi industri, dan semangat kewirausahaan digital (Digital Youth Entrepreneurial University).',
      icon: <Zap size={18} />
    },
    {
      title: 'Bintang Emas (Keunggulan Akademik FTII)',
      desc: 'Simbol sinergi harmonis 3 program studi di FTII Unisbank: S1 Sistem Informasi, S1 Teknik Informatika, dan S1 Teknik Industri yang berlandaskan integritas moral, riset aplikatif, dan inovasi industri.',
      icon: <Star size={18} />
    },
    {
      title: 'Lingkaran Konsentris BEM FTII',
      desc: 'Wadah persatuan kokoh dan proteksi konstitusional terhadap kedaulatan hak, integritas moral, dan ruang aspirasi seluruh mahasiswa FTII Universitas Stikubank Semarang.',
      icon: <BookOpen size={18} />
    }
  ];

  const prodiFTII = [
    {
      kode: 'SI',
      nama: 'S1 Sistem Informasi',
      fokus: 'Enterprise System, Business Intelligence, Big Data Analytics, & Technopreneurship.',
      profil: 'Menjembatani kebutuhan strategi korporasi dengan solusi arsitektur informasi terintegrasi berdaya saing global.'
    },
    {
      kode: 'IF',
      nama: 'S1 Teknik Informatika',
      fokus: 'Kecerdasan Buatan (AI), Rekayasa Perangkat Lunak, Keamanan Siber, & Cloud Computing.',
      profil: 'Mencetak perekayasa piranti lunak tangguh, inovator kecerdasan buatan, dan peneliti komputasi terdepan.'
    },
    {
      kode: 'TI',
      nama: 'S1 Teknik Industri',
      fokus: 'Optimasi Sistem Manufaktur, Supply Chain Management, Ergonomi Industri, & Quality Assurance.',
      profil: 'Melahirkan profesional pengelola sistem terintegrasi manusia, mesin, material, dan manajemen energi.'
    }
  ];

  const kampusList = [
    {
      nama: 'Kampus Kendeng (Pusat Pembelajaran FTII)',
      alamat: 'Jl. Kendeng I, Bendan Ngisor, Kec. Gajahmungkur, Kota Semarang, Jawa Tengah 50233',
      peran: 'Homebase utama Fakultas Teknologi Informasi dan Industri (FTII). Pusat laboratorium komputasi terpadu, studio rekayasa, ruang kerja Ormawa BEM FTII di Student Center Lt. 2, dan dekanat.'
    },
    {
      nama: 'Kampus Mugas (Kampus Pusat Kota)',
      alamat: 'Jl. Tri Lomba Juang No. 1, Mugassari, Kec. Semarang Selatan, Kota Semarang, Jawa Tengah 50241',
      peran: 'Kampus strategis di jantung kota Semarang yang mendukung kegiatan akademik, pusat administrasi universitas, dan fasilitas representatif civitas akademika Unisbank.'
    }
  ];

  const misiList = [
    {
      no: '01',
      text: 'Membangun iklim internal kepengurusan BEM FTII Unisbank yang inklusif, profesional, berintegritas tinggi, dan berasaskan musyawarah mufakat.'
    },
    {
      no: '02',
      text: 'Mengoptimalkan pelayanan advokasi yang tanggap, transparan, dan berorientasi solusi terhadap setiap problematika akademik serta pembiayaan UKT.'
    },
    {
      no: '03',
      text: 'Memfasilitasi pengembangan riset inovatif teknologi, rekayasa industri, serta pembinaan delegasi kompetisi agar mahasiswa Unisbank berdaya saing nasional.'
    },
    {
      no: '04',
      text: 'Memperluas jejaring kemitraan strategis dengan korporasi teknologi, sektor industri manufaktur, jejaring alumni Unisbank, dan ormawa nasional.'
    },
    {
      no: '05',
      text: 'Menggalakkan pengabdian masyarakat berbasis teknologi tepat guna yang memberi dampak nyata bagi pembangunan Kota Semarang dan Jawa Tengah.'
    },
    {
      no: '06',
      text: 'Mewujudkan tata kelola organisasi yang transparan dengan memanfaatkan sistem informasi digital dalam administrasi dan keuangan ormawa.'
    }
  ];

  const values = [
    {
      title: 'Inovatif',
      desc: 'Senantiasa berani melahirkan terobosan baru dan memanfaatkan rekayasa teknologi mutakhir.',
      icon: <Zap size={22} />
    },
    {
      title: 'Sinergis',
      desc: 'Mengedepankan kolaborasi aktif antar-himpunan 3 prodi, dekanat Unisbank, dan mitra industri.',
      icon: <Compass size={22} />
    },
    {
      title: 'Solutif',
      desc: 'Fokus pada penyelesaian konkret dan terukur terhadap setiap kendala dan aspirasi mahasiswa.',
      icon: <Target size={22} />
    },
    {
      title: 'Berintegritas',
      desc: 'Menjunjung tinggi etika moral kepemimpinan, transparansi anggaran kas, dan kejujuran berorganisasi.',
      icon: <ShieldCheck size={22} />
    }
  ];

  return (
    <main className="tentang-page">
      {/* Editorial Page Header */}
      <section className="page-header-editorial">
        <div className="container">
          <div className="page-header-inner">
            <div className="page-kicker">
              <span className="page-kicker-line"></span>
              <span className="page-kicker-text">IDENTITAS ORGANISASI · KABINET 2026/2027</span>
            </div>
            <h1 className="page-headline-editorial">
              Profil & Landasan Haluan Perjuangan Kabinet
            </h1>
            <p className="page-subtext-editorial">
              Mengenal lebih dekat identitas resmi, makna lambang, nilai almamater Universitas Stikubank (Unisbank) Semarang, dan arah gerak Badan Eksekutif Mahasiswa FTII.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Filosofi & Lambang Resmi */}
      <section className="section">
        <div className="container">
          <div className="section-header-editorial">
            <div className="section-meta-label">IDENTITAS VISUAL RESMI</div>
            <h2 className="section-heading-editorial">
              Makna Lambang BEM FTII Unisbank
            </h2>
            <p className="section-subtext-editorial">
              Lambang resmi memadukan keagungan almamater Universitas Stikubank Semarang dengan keteguhan riset teknologi dan integritas pergerakan mahasiswa.
            </p>
          </div>

          <div className="filosofi-grid">
            <div className="logo-display-card">
              <div className="logo-crest-wrap">
                <img 
                  src="/img/logo-bem-ftii.png" 
                  alt="Lambang Resmi BEM FTII Unisbank Semarang" 
                  className="logo-crest-img"
                />
              </div>
              <h3 className="logo-card-title">
                BEM FTII UNISBANK
              </h3>
              <p className="logo-card-sub">
                Universitas Stikubank Semarang
              </p>
              <div className="logo-card-badge">
                Kabinet Sinergi Nyata 2026/2027
              </div>
              <p className="logo-card-desc">
                Lambang resmi Badan Eksekutif Mahasiswa Fakultas Teknologi Informasi dan Industri Universitas Stikubank Semarang.
              </p>
            </div>

            <div className="makna-list">
              {maknaLambang.map((item, idx) => (
                <div key={idx} className="makna-item">
                  <div className="makna-icon">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="makna-title">{item.title}</h4>
                    <p className="makna-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mengenal Almamater: Universitas Stikubank (Unisbank) Semarang */}
      <section className="section almamater-section">
        <div className="container">
          <div className="section-header-editorial">
            <div className="section-meta-label">RUMAH KELAHIRAN & ALMAMATER</div>
            <h2 className="section-heading-editorial">
              Universitas Stikubank (Unisbank) Semarang
            </h2>
            <p className="section-subtext-editorial">
              Perguruan tinggi swasta pelopor di Jawa Tengah dengan moto <em>"Digital Youth Entrepreneurial University"</em> — membentuk sarjana yang kompeten di bidang teknologi sekaligus mandiri berjiwa wirausaha.
            </p>
          </div>

          {/* Unisbank Identity Hero Card */}
          <div className="unisbank-banner-card">
            <div className="unisbank-banner-left">
              <div className="unisbank-logo-box">
                <img 
                  src="/img/logo-unisbank.png" 
                  alt="Logo Universitas Stikubank Semarang" 
                  className="unisbank-banner-logo"
                />
              </div>
              <span className="unisbank-tagline-text">
                Digital Youth Entrepreneurial University
              </span>
            </div>
            <div className="unisbank-banner-right">
              <h3 className="unisbank-card-heading">
                Fakultas Teknologi Informasi dan Industri (FTII)
              </h3>
              <p className="unisbank-card-desc">
                FTII Unisbank merupakan fakultas terdepan yang mengintegrasikan disiplin ilmu komputasi perangkat lunak, sistem informasi bisnis, rekayasa otomasi industri, dan teknologi terdistribusi. Mahasiswa dididik dengan kurikulum adaptif industri dan bimbingan dosen berpengalaman.
              </p>
              <div className="unisbank-action-row">
                <a 
                  href="https://www.unisbank.ac.id" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary"
                >
                  <span>Kunjungi Portal Resmi Unisbank</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Dual Campus Grid */}
          <div className="kampus-grid">
            {kampusList.map((k, i) => (
              <div key={i} className="kampus-card">
                <div className="kampus-header">
                  <div className="kampus-icon-wrap">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="kampus-name">{k.nama}</h4>
                    <p className="kampus-address">{k.alamat}</p>
                  </div>
                </div>
                <p className="kampus-role">{k.peran}</p>
              </div>
            ))}
          </div>

          {/* 3 Program Studi FTII */}
          <div className="prodi-section-wrap">
            <div className="prodi-intro-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Layers size={20} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>3 Program Studi Unggulan FTII Unisbank</h3>
              </div>
              <span className="prodi-subtag">Basis Keilmuan Mahasiswa Fakultas</span>
            </div>

            <div className="prodi-grid">
              {prodiFTII.map((p) => (
                <div key={p.kode} className="prodi-card">
                  <div className="prodi-top">
                    <span className="prodi-badge-code">{p.kode}</span>
                    <span className="prodi-degree-tag">Jenjang Sarjana (S1)</span>
                  </div>
                  <h4 className="prodi-title">{p.nama}</h4>
                  <p className="prodi-focus"><strong>Konsentrasi:</strong> {p.fokus}</p>
                  <p className="prodi-profile">{p.profil}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="section" style={{ background: 'rgba(248, 250, 252, 0.75)', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="container">
          <div className="visi-box">
            <span className="visi-title">VISI STRATEGIS KABINET 2026/2027</span>
            <p className="visi-text">
              "Mewujudkan BEM FTII Universitas Stikubank Semarang sebagai akselerator pergerakan mahasiswa yang berintegritas, mandiri, adaptif terhadap kemajuan teknologi, dan berdaya saing tinggi dalam mengabdi kepada masyarakat."
            </p>
          </div>

          <div className="section-header-editorial" style={{ textAlign: 'left' }}>
            <div className="section-meta-label">MANIFIESTO KERJA</div>
            <h2 className="section-heading-editorial">Enam Misi Strategis Organisasi</h2>
          </div>

          <div className="misi-grid">
            {misiList.map((m) => (
              <div key={m.no} className="misi-card">
                <div className="misi-number">{m.no}</div>
                <p className="misi-text">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nilai Budaya Organisasi */}
      <section className="section">
        <div className="container">
          <div className="section-header-editorial">
            <div className="section-meta-label">NILAI UTAMA KABINET</div>
            <h2 className="section-heading-editorial">Empat Pilar Karakter Pengurus</h2>
            <p className="section-subtext-editorial">
              Prinsip integritas yang memandu fungsionaris dalam menjalankan amanah pergerakan dan pelayanan mahasiswa Unisbank.
            </p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon-box">
                  {v.icon}
                </div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
