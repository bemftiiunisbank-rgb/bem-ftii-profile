import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  Check 
} from 'lucide-react';
import { 
  fetchProkerList, 
  createProker, 
  updateProker, 
  deleteProker 
} from '../../lib/supabase';
import type { Proker, DivisiType, StatusProker } from '../../types/database';

export const AdminProker: React.FC = () => {
  const [prokerList, setProkerList] = useState<Proker[]>([]);
  const [selectedDivisi, setSelectedDivisi] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Proker, 'id'>>({
    judul: '',
    divisi: 'Kominfo',
    deskripsi: '',
    tujuan: '',
    sasaran: '',
    status: 'akan_datang',
    tanggal_mulai: '',
    tanggal_selesai: '',
    lokasi: '',
    poster_url: '',
    link_pendaftaran: '',
    lpj_url: ''
  });

  const divisiOptions: DivisiType[] = [
    'Gubernur',
    'Wakil Gubernur',
    'Bendahara',
    'Sekretaris',
    'Kominfo',
    'Inteks',
    'Advokasi'
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchProkerList();
      setProkerList(data);
    } catch (err) {
      console.error('Failed loading prokers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingId(null);
    setFormData({
      judul: '',
      divisi: 'Kominfo',
      deskripsi: '',
      tujuan: '',
      sasaran: 'Seluruh Mahasiswa FTII',
      status: 'akan_datang',
      tanggal_mulai: '',
      tanggal_selesai: '',
      lokasi: 'Kampus FTII',
      poster_url: '',
      link_pendaftaran: '',
      lpj_url: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Proker) => {
    setModalMode('edit');
    setEditingId(p.id);
    setFormData({
      judul: p.judul,
      divisi: p.divisi,
      deskripsi: p.deskripsi,
      tujuan: p.tujuan || '',
      sasaran: p.sasaran || '',
      status: p.status,
      tanggal_mulai: p.tanggal_mulai || '',
      tanggal_selesai: p.tanggal_selesai || '',
      lokasi: p.lokasi || '',
      poster_url: p.poster_url || '',
      link_pendaftaran: p.link_pendaftaran || '',
      lpj_url: p.lpj_url || ''
    });
    setIsModalOpen(true);
  };

  const handleQuickStatusChange = async (id: string, newStatus: StatusProker) => {
    await updateProker(id, { status: newStatus });
    loadData();
  };

  const handleDelete = async (id: string, judul: string) => {
    if (window.confirm(`Hapus program kerja "${judul}"?`)) {
      await deleteProker(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul || !formData.deskripsi) {
      alert('Judul dan deskripsi proker wajib diisi!');
      return;
    }

    if (modalMode === 'create') {
      await createProker(formData);
    } else if (editingId) {
      await updateProker(editingId, formData);
    }

    setIsModalOpen(false);
    loadData();
  };

  const filtered = prokerList.filter((p) => {
    const matchDiv = selectedDivisi === 'Semua' || p.divisi === selectedDivisi;
    const matchStatus = selectedStatus === 'Semua' || p.status === selectedStatus;
    const matchQuery = 
      p.judul.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(search.toLowerCase());
    return matchDiv && matchStatus && matchQuery;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Manajemen Program Kerja (Proker)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Kelola agenda kerja, status pelaksanaan, pendaftaran, dan laporan pertanggungjawaban
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
          <Plus size={18} />
          <span>Tambah Program Kerja</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="admin-card">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, minWidth: '260px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              className="form-control"
              placeholder="Cari program kerja..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Divisi:</span>
              <select
                className="form-control"
                style={{ width: 'auto' }}
                value={selectedDivisi}
                onChange={(e) => setSelectedDivisi(e.target.value)}
              >
                <option value="Semua">Semua Divisi</option>
                {divisiOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status:</span>
              <select
                className="form-control"
                style={{ width: 'auto' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Semua">Semua Status</option>
                <option value="akan_datang">Akan Datang</option>
                <option value="sedang_berjalan">Sedang Berjalan</option>
                <option value="selesai">Terlaksana</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Daftar Program Kerja Kabinet
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Menampilkan {filtered.length} dari {prokerList.length} total agenda kerja terdaftar
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="stat-pill-neutral" style={{ background: 'rgba(180, 83, 9, 0.1)', color: '#b45309' }}>
              {prokerList.filter(p => p.status === 'sedang_berjalan').length} Berjalan
            </span>
            <span className="stat-pill-neutral" style={{ background: 'rgba(29, 78, 216, 0.08)', color: '#1d4ed8' }}>
              {prokerList.filter(p => p.status === 'akan_datang').length} Akan Datang
            </span>
            <span className="stat-pill-neutral" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#047857' }}>
              {prokerList.filter(p => p.status === 'selesai').length} Terlaksana
            </span>
          </div>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Memuat daftar program kerja...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Tidak ada proker yang cocok dengan kriteria.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="col-banner">Poster</th>
                  <th className="col-proker-judul">Program Kerja</th>
                  <th className="col-divisi">Divisi</th>
                  <th className="col-jadwal">Jadwal Agenda</th>
                  <th className="col-status-select" style={{ textAlign: 'center' }}>Status Pelaksanaan</th>
                  <th className="col-aksi">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const isPresidium = ['Gubernur', 'Wakil Gubernur', 'Sekretaris', 'Bendahara'].includes(p.divisi);
                  return (
                    <tr key={p.id}>
                      <td className="col-banner">
                        <img
                          src={p.poster_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                          alt={p.judul}
                          className="cell-poster-thumb"
                        />
                      </td>
                      <td className="col-proker-judul">
                        <div className="cell-name-title">{p.judul}</div>
                        {p.deskripsi && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '3px' }}>
                            {p.deskripsi}
                          </div>
                        )}
                        <div className="proker-table-meta-row">
                          {p.sasaran && (
                            <span className="proker-meta-tag">
                              Sasaran: {p.sasaran}
                            </span>
                          )}
                          {p.link_pendaftaran && p.status !== 'selesai' && (
                            <span className="proker-meta-tag active-link">
                              Registrasi Aktif
                            </span>
                          )}
                          {p.lpj_url && (
                            <span className="proker-meta-tag lpj">
                              LPJ Tersedia
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="col-divisi">
                        <span className={`admin-badge-divisi ${isPresidium ? 'presidium' : ''}`}>
                          {p.divisi}
                        </span>
                      </td>
                      <td className="col-jadwal">
                        <div className="cell-date-main">
                          {p.tanggal_mulai ? new Date(p.tanggal_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Belum Ditentukan'}
                        </div>
                        {p.tanggal_selesai && p.tanggal_selesai !== p.tanggal_mulai && (
                          <div className="cell-date-end">
                            s/d {new Date(p.tanggal_selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        )}
                      </td>
                      <td className="col-status-select" style={{ textAlign: 'center' }}>
                        <select
                          className={`admin-status-dropdown ${p.status}`}
                          value={p.status}
                          onChange={(e) => handleQuickStatusChange(p.id, e.target.value as StatusProker)}
                          title="Klik untuk mengubah status agenda"
                        >
                          <option value="akan_datang">Akan Datang</option>
                          <option value="sedang_berjalan">Sedang Berjalan</option>
                          <option value="selesai">Terlaksana</option>
                        </select>
                      </td>
                      <td className="col-aksi">
                        <div className="table-actions" style={{ justifyContent: 'center' }}>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="btn-icon edit"
                            title="Edit Proker"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.judul)}
                            className="btn-icon delete"
                            title="Hapus Proker"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">
                {modalMode === 'create' ? 'Tambah Program Kerja Baru' : 'Edit Program Kerja'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nama / Judul Program Kerja *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    placeholder="Contoh: FTII Tech & Industry Expo 2026"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Divisi Penanggung Jawab *</label>
                    <select
                      className="form-control"
                      value={formData.divisi}
                      onChange={(e) => setFormData({ ...formData, divisi: e.target.value as DivisiType })}
                    >
                      {divisiOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status Pelaksanaan</label>
                    <select
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusProker })}
                    >
                      <option value="akan_datang">Akan Datang</option>
                      <option value="sedang_berjalan">Sedang Berjalan</option>
                      <option value="selesai">Terlaksana (Selesai)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Deskripsi Lengkap *</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    placeholder="Jelaskan gambaran umum kegiatan..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tujuan Kegiatan</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.tujuan}
                      onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
                      placeholder="Indikator target capaian..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Sasaran Peserta</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.sasaran}
                      onChange={(e) => setFormData({ ...formData, sasaran: e.target.value })}
                      placeholder="Contoh: Mahasiswa FTII & Umum"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tanggal Mulai</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.tanggal_mulai}
                      onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tanggal Selesai</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.tanggal_selesai}
                      onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Lokasi Pelaksanaan</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      placeholder="Auditorium / Zoom / Lab"
                    />
                  </div>
                  <div className="form-group">
                    <label>URL Poster Banner</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.poster_url}
                      onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                      placeholder="https://example.com/poster.jpg"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Link Pendaftaran / Registrasi</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.link_pendaftaran}
                      onChange={(e) => setFormData({ ...formData, link_pendaftaran: e.target.value })}
                      placeholder="https://linktr.ee/..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Link LPJ / Dokumentasi</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lpj_url}
                      onChange={(e) => setFormData({ ...formData, lpj_url: e.target.value })}
                      placeholder="https://drive.google.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.2rem' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.5rem' }}
                >
                  <Check size={16} />
                  <span>{modalMode === 'create' ? 'Simpan Proker' : 'Perbarui Proker'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
