import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import { fetchProkerList } from '../lib/supabase';
import type { Proker, DivisiType, StatusProker } from '../types/database';
import '../styles/proker.css';

export const ProkerPage: React.FC = () => {
  const [selectedDivisi, setSelectedDivisi] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [prokers, setProkers] = useState<Proker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const divisiOptions = [
    'Semua',
    'Gubernur',
    'Wakil Gubernur',
    'Bendahara',
    'Sekretaris',
    'Kominfo',
    'Inteks',
    'Advokasi'
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchProkerList(
          selectedDivisi === 'Semua' ? undefined : (selectedDivisi as DivisiType),
          selectedStatus === 'Semua' ? undefined : selectedStatus
        );
        setProkers(data);
      } catch (err) {
        console.error('Failed fetching prokers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedDivisi, selectedStatus]);

  const getStatusBadge = (status: StatusProker) => {
    switch (status) {
      case 'selesai':
        return (
          <span className="status-badge selesai">
            <CheckCircle2 size={12} />
            Terlaksana
          </span>
        );
      case 'sedang_berjalan':
        return (
          <span className="status-badge sedang_berjalan">
            <Clock size={12} />
            Sedang Berjalan
          </span>
        );
      case 'akan_datang':
      default:
        return (
          <span className="status-badge akan_datang">
            <Calendar size={12} />
            Akan Datang
          </span>
        );
    }
  };

  return (
    <main className="proker-page">
      {/* Editorial Page Header */}
      <section className="page-header-editorial">
        <div className="container">
          <div className="page-header-inner">
            <div className="page-kicker">
              <span className="page-kicker-line"></span>
              <span className="page-kicker-text">KATALOG AGENDA & CAPAIAN · KABINET 2026</span>
            </div>
            <h1 className="page-headline-editorial">
              Direktori Program Kerja & Agenda Strategis
            </h1>
            <p className="page-subtext-editorial">
              Transparansi rencana dan pelaksanaan agenda kerja, sasaran capaian, jadwal registrasi, dan laporan pertanggungjawaban di lingkungan BEM FTII.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="section">
        <div className="container">
          {/* Filter Bar */}
          <div className="proker-filter-bar">
            <div className="filter-group">
              <span className="filter-label">Filter Divisi:</span>
              <select
                className="filter-select"
                value={selectedDivisi}
                onChange={(e) => setSelectedDivisi(e.target.value)}
              >
                {divisiOptions.map((div) => (
                  <option key={div} value={div}>
                    {div === 'Semua' ? 'Semua Divisi' : `Divisi ${div}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Status Proker:</span>
              <select
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Semua">Semua Status</option>
                <option value="sedang_berjalan">Sedang Berjalan</option>
                <option value="akan_datang">Akan Datang</option>
                <option value="selesai">Terlaksana (Selesai)</option>
              </select>
            </div>
          </div>

          {/* Catalog Content */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              Memuat daftar program kerja...
            </div>
          ) : prokers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              Tidak ditemukan program kerja untuk filter yang dipilih.
            </div>
          ) : (
            <div className="proker-catalog-grid">
              {prokers.map((proker) => (
                <div key={proker.id} className="proker-item-card">
                  <div className="proker-item-media">
                    <img
                      src={proker.poster_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                      alt={proker.judul}
                      loading="lazy"
                    />
                    <div className="proker-media-status">
                      {getStatusBadge(proker.status)}
                    </div>
                  </div>

                  <div className="proker-item-content">
                    <div>
                      <div className="proker-card-category">
                        <span className="proker-divisi-tag">Divisi {proker.divisi}</span>
                      </div>
                      <h3 className="proker-item-title">{proker.judul}</h3>
                      <p className="proker-item-desc">{proker.deskripsi}</p>

                      <div className="proker-meta-grid">
                        <div className="proker-meta-item">
                          <Calendar size={16} />
                          <span>
                            {proker.tanggal_mulai ? new Date(proker.tanggal_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Jadwal Ditentukan'}
                          </span>
                        </div>
                        <div className="proker-meta-item">
                          <MapPin size={16} />
                          <span>{proker.lokasi || 'Kampus FTII'}</span>
                        </div>
                        <div className="proker-meta-item">
                          <Users size={16} />
                          <span>{proker.sasaran || 'Mahasiswa FTII'}</span>
                        </div>
                        <div className="proker-meta-item">
                          <Target size={16} />
                          <span>
                            {proker.tujuan || 'Pengembangan Mahasiswa'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="proker-footer-action">
                      <div className="proker-footer-status">
                        <span className={`proker-status-dot ${proker.status}`}></span>
                        <span className="proker-status-label">
                          {proker.status === 'sedang_berjalan' ? 'Sedang Berlangsung' : proker.status === 'selesai' ? 'Agenda Terlaksana' : 'Akan Datang'}
                        </span>
                      </div>

                      {proker.link_pendaftaran && proker.status !== 'selesai' ? (
                        <a
                          href={proker.link_pendaftaran}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          <span>Daftar / Info</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : proker.lpj_url ? (
                        <a
                          href={proker.lpj_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary"
                        >
                          <FileText size={14} />
                          <span>Rekap & LPJ</span>
                        </a>
                      ) : (
                        <span className="proker-status-muted">
                          Terjadwal di Kalender
                        </span>
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
