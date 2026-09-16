import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Newspaper, 
  ArrowUpRight, 
  ArrowRight
} from 'lucide-react';
import { 
  fetchAnggotaList, 
  fetchProkerList, 
  fetchAllAspirasi, 
  fetchBeritaList 
} from '../../lib/supabase';
import type { Aspirasi } from '../../types/database';

export const AdminDashboard: React.FC = () => {
  const [totalAnggota, setTotalAnggota] = useState(0);
  const [totalProker, setTotalProker] = useState(0);
  const [aspirasiList, setAspirasiList] = useState<Aspirasi[]>([]);
  const [totalBerita, setTotalBerita] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [anggota, proker, aspirasi, berita] = await Promise.all([
          fetchAnggotaList(),
          fetchProkerList(),
          fetchAllAspirasi(),
          fetchBeritaList()
        ]);
        setTotalAnggota(anggota.length);
        setTotalProker(proker.length);
        setAspirasiList(aspirasi);
        setTotalBerita(berita.length);
      } catch (err) {
        console.error('Failed loading admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const pendingAspirasi = aspirasiList.filter(a => a.status === 'diterima' || a.status === 'diproses');

  return (
    <div className="admin-dashboard-view">
      {/* Executive Welcome Header */}
      <div className="admin-page-hero">
        <div className="admin-hero-kicker">
          <span className="admin-kicker-bar"></span>
          <span>PUSAT KENDALI EKSEKUTIF · KABINET BEM FTII 2026</span>
        </div>
        <h1 className="admin-hero-title">
          Ringkasan Operasional & Kontrol Data
        </h1>
        <p className="admin-hero-subtext">
          Pantau status fungsionaris organisasi, capaian program kerja, moderasi tiket advokasi mahasiswa, dan publikasi warta kampus secara tersentralisasi.
        </p>
      </div>

      {/* Modern High-End Metric Cards */}
      <div className="admin-stat-grid">
        {/* Card 1: Fungsionaris */}
        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">TOTAL FUNGSIONARIS</span>
            <div className="stat-card-icon-box">
              <Users size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalAnggota}</div>
          <div className="stat-card-footer">
            <span className="stat-pill-neutral">7 Divisi Aktif</span>
            <span className="stat-card-caption">Presidium, biro, & departemen</span>
          </div>
        </div>

        {/* Card 2: Program Kerja */}
        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">PROGRAM KERJA</span>
            <div className="stat-card-icon-box">
              <Calendar size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalProker}</div>
          <div className="stat-card-footer">
            <span className="stat-pill-neutral">Agenda 2026</span>
            <span className="stat-card-caption">Capaian & kalender terdaftar</span>
          </div>
        </div>

        {/* Card 3: Aspirasi */}
        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">ASPIRASI MAHASISWA</span>
            <div className="stat-card-icon-box">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="stat-card-value">{pendingAspirasi.length}</div>
          <div className="stat-card-footer">
            <span className={pendingAspirasi.length > 0 ? "stat-pill-warning" : "stat-pill-neutral"}>
              {pendingAspirasi.length > 0 ? "Butuh Tindak Lanjut" : "Semua Ditangani"}
            </span>
            <span className="stat-card-caption">Tiket audiensi & advokasi</span>
          </div>
        </div>

        {/* Card 4: Warta */}
        <div className="admin-stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">WARTA & RILIS PERS</span>
            <div className="stat-card-icon-box">
              <Newspaper size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalBerita}</div>
          <div className="stat-card-footer">
            <span className="stat-pill-neutral">Publikasi Resmi</span>
            <span className="stat-card-caption">Liputan & rilis pers aktif</span>
          </div>
        </div>
      </div>

      {/* Structured Quick Command Grid */}
      <div className="admin-section-block">
        <div className="admin-section-header">
          <div>
            <h2 className="admin-section-title">Modul Akses Cepat</h2>
            <p className="admin-section-desc">Pintasan navigasi langsung ke direktori pengelolaan data kabinet</p>
          </div>
        </div>

        <div className="admin-action-grid">
          <Link to="/admin/anggota" className="admin-action-card">
            <div className="action-card-header">
              <div className="action-card-icon">
                <Users size={20} />
              </div>
              <ArrowRight size={16} className="action-arrow" />
            </div>
            <div className="action-card-content">
              <div className="action-card-title">Manajemen Fungsionaris</div>
              <div className="action-card-desc">Kelola struktur presidium, staf biro, dan data anggota 7 divisi</div>
            </div>
          </Link>

          <Link to="/admin/proker" className="admin-action-card">
            <div className="action-card-header">
              <div className="action-card-icon">
                <Calendar size={20} />
              </div>
              <ArrowRight size={16} className="action-arrow" />
            </div>
            <div className="action-card-content">
              <div className="action-card-title">Direktori Program Kerja</div>
              <div className="action-card-desc">Input agenda kegiatan baru, perbarui status capaian, registrasi, & LPJ</div>
            </div>
          </Link>

          <Link to="/admin/aspirasi" className="admin-action-card">
            <div className="action-card-header">
              <div className="action-card-icon">
                <MessageSquare size={20} />
              </div>
              <ArrowRight size={16} className="action-arrow" />
            </div>
            <div className="action-card-content">
              <div className="action-card-title">Pusat Advokasi Aspirasi</div>
              <div className="action-card-desc">Moderasi suara mahasiswa, proses hearing, dan update progres tiket</div>
            </div>
          </Link>

          <Link to="/admin/berita" className="admin-action-card">
            <div className="action-card-header">
              <div className="action-card-icon">
                <Newspaper size={20} />
              </div>
              <ArrowRight size={16} className="action-arrow" />
            </div>
            <div className="action-card-content">
              <div className="action-card-title">Publikasi Warta Pers</div>
              <div className="action-card-desc">Tulis artikel warta, upload liputan foto kegiatan, dan siaran pers resmi</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Pending Aspirasi Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-section-title">
              Tiket Aspirasi Mahasiswa Terbaru
            </h2>
            <p className="admin-section-desc">
              Memerlukan tindak lanjut dan respon resmi dari Divisi Advokasi
            </p>
          </div>
          <Link to="/admin/aspirasi" className="btn btn-secondary admin-btn-sm">
            <span>Lihat Semua Aspirasi</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="admin-table-loading">Memuat data aspirasi...</div>
        ) : aspirasiList.length === 0 ? (
          <div className="admin-table-empty">Belum ada aspirasi mahasiswa yang masuk ke sistem.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="col-tiket">Kode Tiket</th>
                  <th className="col-pengirim">Pengirim</th>
                  <th className="col-kategori">Kategori</th>
                  <th className="col-masalah">Subjek Aspirasi</th>
                  <th className="col-status-badge">Status Penanganan</th>
                  <th className="col-tgl">Tanggal Masuk</th>
                </tr>
              </thead>
              <tbody>
                {aspirasiList.slice(0, 5).map((asp) => (
                  <tr key={asp.id}>
                    <td className="col-tiket">
                      <span className="admin-ticket-code">
                        #{asp.ticket_code}
                      </span>
                    </td>
                    <td className="col-pengirim">
                      {asp.is_anonim ? (
                        <span className="table-text-muted">Anonim (Mahasiswa FTII)</span>
                      ) : (
                        <div>
                          <div className="cell-name-title">{asp.nama || 'Mahasiswa'}</div>
                          {asp.nim && <div className="cell-nim-sub">NIM: {asp.nim}</div>}
                        </div>
                      )}
                    </td>
                    <td className="col-kategori">
                      <span className="admin-badge-kategori">{asp.kategori}</span>
                    </td>
                    <td className="col-masalah">
                      <div className="cell-name-title">{asp.judul_aspirasi}</div>
                    </td>
                    <td className="col-status-badge">
                      <span className={`status-badge ${asp.status}`}>
                        {asp.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="col-tgl">
                      <span className="table-date-cell">
                        {new Date(asp.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
