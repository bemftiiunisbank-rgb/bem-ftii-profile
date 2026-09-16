import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, X } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '../components/SocialIcons';
import { fetchAnggotaList } from '../lib/supabase';
import type { Anggota, DivisiType } from '../types/database';
import '../styles/struktur.css';

type FilterCategory = 'Semua' | 'Presidium' | 'Sekretariat' | 'Keuangan' | 'Kominfo' | 'Inteks' | 'Advokasi';

interface FilterTab {
  id: FilterCategory;
  label: string;
}

export const Struktur: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDivisiParam = searchParams.get('divisi');
  const initialAngkatanParam = searchParams.get('angkatan');

  const filterTabs: FilterTab[] = [
    { id: 'Semua', label: 'Semua Bidang' },
    { id: 'Presidium', label: 'Presidium' },
    { id: 'Sekretariat', label: 'Sekretariat' },
    { id: 'Keuangan', label: 'Keuangan' },
    { id: 'Kominfo', label: 'Kominfo' },
    { id: 'Inteks', label: 'Inteks' },
    { id: 'Advokasi', label: 'Advokasi' },
  ];

  const resolveInitialCategory = (param: string | null): FilterCategory => {
    if (!param) return 'Semua';
    const lower = param.toLowerCase();
    if (lower === 'gubernur' || lower === 'wakil gubernur' || lower === 'presidium') return 'Presidium';
    if (lower === 'sekretaris' || lower === 'sekretariat') return 'Sekretariat';
    if (lower === 'bendahara' || lower === 'keuangan') return 'Keuangan';
    if (lower === 'kominfo') return 'Kominfo';
    if (lower === 'inteks') return 'Inteks';
    if (lower === 'advokasi') return 'Advokasi';
    return 'Semua';
  };

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(() => resolveInitialCategory(initialDivisiParam));
  const [selectedAngkatan, setSelectedAngkatan] = useState<string>(() => initialAngkatanParam || 'Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const urlDivisi = searchParams.get('divisi');
    const urlAngkatan = searchParams.get('angkatan');
    setSelectedCategory(resolveInitialCategory(urlDivisi));
    setSelectedAngkatan(urlAngkatan || 'Semua');
  }, [searchParams]);

  useEffect(() => {
    async function loadAnggota() {
      setLoading(true);
      try {
        const data = await fetchAnggotaList();
        setAnggotaList(data);
      } catch (err) {
        console.error('Failed to load anggota:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnggota();
  }, []);

  // Dynamically extract unique sorted angkatan list
  const angkatanList = useMemo(() => {
    const years = Array.from(new Set(anggotaList.map((m) => m.angkatan).filter(Boolean))).sort();
    return ['Semua', ...years];
  }, [anggotaList]);

  const handleSelectCategory = (catId: FilterCategory) => {
    setSelectedCategory(catId);
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'Semua') {
      nextParams.delete('divisi');
    } else {
      nextParams.set('divisi', catId);
    }
    setSearchParams(nextParams);
  };

  const handleSelectAngkatan = (year: string) => {
    setSelectedAngkatan(year);
    const nextParams = new URLSearchParams(searchParams);
    if (year === 'Semua') {
      nextParams.delete('angkatan');
    } else {
      nextParams.set('angkatan', year);
    }
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('Semua');
    setSelectedAngkatan('Semua');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'Semua' || selectedAngkatan !== 'Semua' || searchQuery.trim() !== '';

  const getCategoryCount = (tabId: FilterCategory): number => {
    let list = anggotaList;
    if (selectedAngkatan !== 'Semua') {
      list = list.filter((m) => m.angkatan === selectedAngkatan);
    }
    if (tabId === 'Semua') return list.length;
    if (tabId === 'Presidium') return list.filter((m) => m.divisi === 'Gubernur' || m.divisi === 'Wakil Gubernur').length;
    if (tabId === 'Sekretariat') return list.filter((m) => m.divisi === 'Sekretaris').length;
    if (tabId === 'Keuangan') return list.filter((m) => m.divisi === 'Bendahara').length;
    if (tabId === 'Kominfo') return list.filter((m) => m.divisi === 'Kominfo').length;
    if (tabId === 'Inteks') return list.filter((m) => m.divisi === 'Inteks').length;
    if (tabId === 'Advokasi') return list.filter((m) => m.divisi === 'Advokasi').length;
    return 0;
  };

  const getAngkatanCount = (year: string): number => {
    let list = anggotaList;
    if (selectedCategory === 'Presidium') {
      list = list.filter((m) => m.divisi === 'Gubernur' || m.divisi === 'Wakil Gubernur');
    } else if (selectedCategory === 'Sekretariat') {
      list = list.filter((m) => m.divisi === 'Sekretaris');
    } else if (selectedCategory === 'Keuangan') {
      list = list.filter((m) => m.divisi === 'Bendahara');
    } else if (selectedCategory === 'Kominfo') {
      list = list.filter((m) => m.divisi === 'Kominfo');
    } else if (selectedCategory === 'Inteks') {
      list = list.filter((m) => m.divisi === 'Inteks');
    } else if (selectedCategory === 'Advokasi') {
      list = list.filter((m) => m.divisi === 'Advokasi');
    }
    if (year === 'Semua') return list.length;
    return list.filter((m) => m.angkatan === year).length;
  };

  const getBadgeLabel = (divisi: DivisiType): string => {
    switch (divisi) {
      case 'Gubernur':
      case 'Wakil Gubernur':
        return 'PRESIDIUM EKSEKUTIF';
      case 'Sekretaris':
        return 'BIRO SEKRETARIAT';
      case 'Bendahara':
        return 'BIRO KEUANGAN';
      case 'Kominfo':
        return 'DIVISI KOMINFO';
      case 'Inteks':
        return 'DIVISI INTEKS';
      case 'Advokasi':
        return 'DIVISI ADVOKASI';
      default:
        return divisi;
    }
  };

  const getProdiCode = (prodi: string): string => {
    if (prodi.toLowerCase().includes('sistem')) return 'SI';
    if (prodi.toLowerCase().includes('informatika')) return 'IF';
    if (prodi.toLowerCase().includes('industri')) return 'TI';
    return 'FTII';
  };

  const filteredAnggota = useMemo(() => {
    return anggotaList.filter((m) => {
      let matchesCategory = true;
      if (selectedCategory === 'Presidium') {
        matchesCategory = m.divisi === 'Gubernur' || m.divisi === 'Wakil Gubernur';
      } else if (selectedCategory === 'Sekretariat') {
        matchesCategory = m.divisi === 'Sekretaris';
      } else if (selectedCategory === 'Keuangan') {
        matchesCategory = m.divisi === 'Bendahara';
      } else if (selectedCategory === 'Kominfo') {
        matchesCategory = m.divisi === 'Kominfo';
      } else if (selectedCategory === 'Inteks') {
        matchesCategory = m.divisi === 'Inteks';
      } else if (selectedCategory === 'Advokasi') {
        matchesCategory = m.divisi === 'Advokasi';
      }

      let matchesAngkatan = true;
      if (selectedAngkatan !== 'Semua') {
        matchesAngkatan = m.angkatan === selectedAngkatan;
      }

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        m.nama.toLowerCase().includes(q) ||
        m.jabatan.toLowerCase().includes(q) ||
        m.prodi.toLowerCase().includes(q) ||
        (m.angkatan && m.angkatan.toLowerCase().includes(q)) ||
        (m.nim && m.nim.toLowerCase().includes(q));

      return matchesCategory && matchesAngkatan && matchesQuery;
    });
  }, [anggotaList, selectedCategory, selectedAngkatan, searchQuery]);

  return (
    <main className="struktur-page">
      {/* Editorial Page Header */}
      <section className="page-header-editorial">
        <div className="container">
          <div className="page-header-inner">
            <div className="page-kicker">
              <span className="page-kicker-line"></span>
              <span className="page-kicker-text">FUNGSIONARIS & AMANAH · KABINET 2026/2027</span>
            </div>
            <h1 className="page-headline-editorial">
              Struktur Organisasi & Direktori Fungsionaris
            </h1>
            <p className="page-subtext-editorial">
              Mengenal fungsionaris yang menggerakkan roda pergerakan, advokasi, dan pelayanan mahasiswa BEM FTII Universitas Stikubank Semarang di bawah Kabinet Sinergi Nyata.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Governance Architecture Deck */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="governance-matrix-deck">
            <div className="governance-deck-header">
              <span className="governance-kicker">ARSITEKTUR KEPEMIMPINAN</span>
              <h2 className="governance-title">Bagan Hierarki & Garis Koordinasi Kabinet</h2>
              <p className="governance-subtitle">
                Alur pertanggungjawaban komando dan mandat pelayanan mahasiswa BEM FTII Unisbank Periode 2026/2027
              </p>
            </div>

            <div className="governance-tier-wrap">
              {/* Tier 1: Presidium Eksekutif */}
              <div className="governance-tier">
                <div className="tier-tag-badge">
                  <span>TIER 01 · LEMBAGA PRESIDIUM EKSEKUTIF</span>
                </div>
                <div className="tier-nodes-row tier-2-grid">
                  <div className="gov-card gov-presidium">
                    <div className="gov-card-badge">PIMPINAN TERTINGGI</div>
                    <h4 className="gov-card-title">Gubernur Mahasiswa</h4>
                    <p className="gov-card-sub">Ketua Eksekutif BEM FTII Unisbank</p>
                    <p className="gov-card-desc">
                      Pemegang mandat tertinggi pergerakan organisasi, penentu arah kebijakan strategis fakultas, dan representasi resmi seluruh civitas akademika FTII.
                    </p>
                  </div>
                  <div className="gov-card gov-presidium">
                    <div className="gov-card-badge">PIMPINAN INTERNAL</div>
                    <h4 className="gov-card-title">Wakil Gubernur Mahasiswa</h4>
                    <p className="gov-card-sub">Koordinator Harmonisasi Internal</p>
                    <p className="gov-card-desc">
                      Pengawas operasional antar-biro/divisi, penjamin mutu pelaksanaan program kerja, dan penggerak soliditas fungsionaris kabinet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Bar */}
              <div className="governance-connector">
                <span className="connector-line"></span>
                <span className="connector-label">GARIS KOORDINASI ADMINISTRASI & KEUANGAN</span>
                <span className="connector-line"></span>
              </div>

              {/* Tier 2: Badan Pengurus Harian (BPH) */}
              <div className="governance-tier">
                <div className="tier-tag-badge">
                  <span>TIER 02 · BADAN PENGURUS HARIAN (BPH)</span>
                </div>
                <div className="tier-nodes-row tier-2-grid">
                  <div className="gov-card gov-bph">
                    <div className="gov-card-badge">ADMINISTRASI & ARSIP</div>
                    <h4 className="gov-card-title">Biro Sekretariat Jenderal</h4>
                    <p className="gov-card-sub">Administrasi, Tata Persuratan & Rumah Tangga</p>
                    <p className="gov-card-desc">
                      Mengelola standarisasi administrasi persuratan, inventaris sekretariat ormawa di Gedung Student Center Lt. 2, dan digitalisasi kearsipan kabinet.
                    </p>
                  </div>
                  <div className="gov-card gov-bph">
                    <div className="gov-card-badge">KEUANGAN & AKUNTANSI</div>
                    <h4 className="gov-card-title">Biro Perbendaharaan Umum</h4>
                    <p className="gov-card-sub">Manajemen Kas, Anggaran & Dana Usaha</p>
                    <p className="gov-card-desc">
                      Menjaga transparansi dan akuntabilitas sirkulasi keuangan ormawa, audit anggaran program kerja, serta inisiatif kemandirian dana kabinet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Bar */}
              <div className="governance-connector">
                <span className="connector-line"></span>
                <span className="connector-label">GARIS EKSEKUSI PROGRAM & PELAYANAN MAHASISWA</span>
                <span className="connector-line"></span>
              </div>

              {/* Tier 3: 3 Divisi Pelaksana Program Strategis */}
              <div className="governance-tier">
                <div className="tier-tag-badge">
                  <span>TIER 03 · DEPARTEMEN & DIVISI STRATEGIS</span>
                </div>
                <div className="tier-nodes-row tier-3-grid">
                  <div className="gov-card gov-divisi">
                    <div className="gov-card-badge">MEDIA & TEKNOLOGI</div>
                    <h4 className="gov-card-title">Divisi Kominfo</h4>
                    <p className="gov-card-sub">Media Publikasi, IT & Desain Kreatif</p>
                    <p className="gov-card-desc">
                      Pengembangan portal web resmi BEM FTII, branding visual kabinet, dokumentasi multimedia, dan diseminasi informasi publik.
                    </p>
                  </div>
                  <div className="gov-card gov-divisi">
                    <div className="gov-card-badge">RELASI & MITRA</div>
                    <h4 className="gov-card-title">Divisi Inteks</h4>
                    <p className="gov-card-sub">Internal, Eksternal & Industri</p>
                    <p className="gov-card-desc">
                      Kemitraan industri nasional, company visit, jejaring alumni, studi banding antar-kampus, dan harmonisasi 3 HMJ fakultas.
                    </p>
                  </div>
                  <div className="gov-card gov-divisi">
                    <div className="gov-card-badge">ADVOKASI & KESEJAHTERAAN</div>
                    <h4 className="gov-card-title">Divisi Advokasi</h4>
                    <p className="gov-card-sub">Advokesma & Pendampingan Mahasiswa</p>
                    <p className="gov-card-desc">
                      Pendampingan banding UKT, advokasi fasilitas lab komputer & studio riset, hearing dekanat, serta perlindungan hak mahasiswa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Filter Dossier Console (Huashu Design / Swiss Modernism) */}
          <div className="filter-dossier-console">
            {/* Header Console Bar */}
            <div className="console-header-bar">
              <div className="console-title-group">
                <div className="console-kicker">
                  <span className="console-kicker-dot"></span>
                  <span>ARSIP DIREKTORI & INDEKS FUNGSIONARIS</span>
                </div>
                <h3 className="console-title">Direktori Lengkap Pengurus Kabinet</h3>
              </div>

              <div className="console-header-actions">
                <div className="console-count-display">
                  <span className="console-count-label">TERFILTER:</span>
                  <span className="console-count-val">
                    <strong>{filteredAnggota.length}</strong> / {anggotaList.length}
                  </span>
                  <span className="console-count-unit">PENGURUS</span>
                </div>

                {hasActiveFilters && (
                  <button 
                    className="console-reset-btn" 
                    onClick={handleResetFilters}
                    title="Reset semua filter pencarian"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Filter</span>
                  </button>
                )}
              </div>
            </div>

            {/* Architectural Search Row */}
            <div className="console-search-row">
              <div className="console-search-box">
                <Search size={16} className="console-search-icon" />
                <input
                  type="text"
                  placeholder="Cari nama fungsionaris, jabatan, program studi, atau angkatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="console-search-input"
                />
                {searchQuery && (
                  <button 
                    className="console-search-clear" 
                    onClick={() => setSearchQuery('')}
                    title="Hapus kata kunci pencarian"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Matrix (Dual-Axis Filtration) */}
            <div className="console-filter-matrix">
              {/* Row 1: Struktur & Unit */}
              <div className="matrix-row">
                <div className="matrix-axis-label">
                  <span className="axis-num">01</span>
                  <span className="axis-divider">/</span>
                  <span className="axis-title">STRUKTUR BIDANG</span>
                </div>
                <div className="matrix-tabs-track">
                  {filterTabs.map((tab) => {
                    const count = getCategoryCount(tab.id);
                    const isActive = selectedCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        className={`matrix-tab-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectCategory(tab.id)}
                      >
                        <span className="tab-label">{tab.label}</span>
                        <span className="tab-mono-badge">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Tahun Angkatan */}
              <div className="matrix-row">
                <div className="matrix-axis-label">
                  <span className="axis-num">02</span>
                  <span className="axis-divider">/</span>
                  <span className="axis-title">TAHUN ANGKATAN</span>
                </div>
                <div className="matrix-tabs-track">
                  {angkatanList.map((year) => {
                    const count = getAngkatanCount(year);
                    const isActive = selectedAngkatan === year;
                    const displayLabel = year === 'Semua' ? 'Semua Angkatan' : `Angkatan ${year}`;
                    return (
                      <button
                        key={year}
                        className={`matrix-tab-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectAngkatan(year)}
                      >
                        <span className="tab-label">{displayLabel}</span>
                        <span className="tab-mono-badge">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Filters Trail / Footnote (if any filter is selected) */}
            {hasActiveFilters && (
              <div className="console-active-trail">
                <div className="trail-chips">
                  <span className="trail-label">Filter Aktif:</span>
                  {selectedCategory !== 'Semua' && (
                    <span className="trail-chip">
                      Bidang: <strong>{selectedCategory}</strong>
                      <button onClick={() => handleSelectCategory('Semua')} title="Hapus filter bidang">✕</button>
                    </span>
                  )}
                  {selectedAngkatan !== 'Semua' && (
                    <span className="trail-chip">
                      Angkatan: <strong>{selectedAngkatan}</strong>
                      <button onClick={() => handleSelectAngkatan('Semua')} title="Hapus filter angkatan">✕</button>
                    </span>
                  )}
                  {searchQuery.trim() && (
                    <span className="trail-chip">
                      Kata kunci: “<strong>{searchQuery}</strong>”
                      <button onClick={() => setSearchQuery('')} title="Hapus kata kunci">✕</button>
                    </span>
                  )}
                </div>
                <div className="trail-count">
                  Ditemukan <strong>{filteredAnggota.length}</strong> fungsionaris
                </div>
              </div>
            )}
          </div>

          {/* Members Grid */}
          {loading ? (
            <div className="members-loading-box">
              Memuat profil fungsionaris kabinet...
            </div>
          ) : filteredAnggota.length === 0 ? (
            <div className="members-empty-box">
              <div className="empty-box-icon">
                <Search size={32} />
              </div>
              <h4 className="empty-box-title">Tidak Ditemukan Fungsionaris</h4>
              <p className="empty-box-desc">
                Tidak ada data pengurus yang sesuai dengan kombinasi kriteria pencarian dan filter yang dipilih.
              </p>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: '1rem', padding: '0.45rem 1.15rem' }}
                onClick={handleResetFilters}
              >
                <RotateCcw size={13} style={{ marginRight: '6px' }} />
                Pulihkan Semua Filter
              </button>
            </div>
          ) : (
            <div className="anggota-grid">
              {filteredAnggota.map((anggota) => (
                <div key={anggota.id} className="member-card">
                  <div className="member-photo-container">
                    <img
                      src={anggota.foto_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                      alt={anggota.nama}
                      className="member-photo"
                      loading="lazy"
                    />
                    <div className="member-badge-divisi">
                      {getBadgeLabel(anggota.divisi)}
                    </div>
                  </div>

                  <div className="member-info">
                    <div>
                      <h3 className="member-name">{anggota.nama}</h3>
                      <p className="member-jabatan">{anggota.jabatan}</p>
                      
                      <div className="member-academic-tag">
                        <span className="prodi-code-pill">{getProdiCode(anggota.prodi)}</span>
                        <span>{anggota.prodi} · Angkatan {anggota.angkatan}</span>
                      </div>

                      {anggota.bio && (
                        <p className="member-bio">“{anggota.bio}”</p>
                      )}
                    </div>

                    <div className="member-socials">
                      {anggota.instagram && (
                        <a
                          href={`https://instagram.com/${anggota.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="member-social-btn"
                          title={`Kunjungi Instagram ${anggota.nama}`}
                        >
                          <InstagramIcon size={13} />
                          <span>{anggota.instagram}</span>
                        </a>
                      )}
                      {anggota.linkedin && (
                        <a
                          href={`https://${anggota.linkedin}`}
                          target="_blank"
                          rel="noreferrer"
                          className="member-social-btn"
                          title={`Kunjungi LinkedIn ${anggota.nama}`}
                        >
                          <LinkedinIcon size={13} />
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
