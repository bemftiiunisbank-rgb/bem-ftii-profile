import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  Lock
} from 'lucide-react';
import { 
  fetchAllAspirasi, 
  updateAspirasiStatus, 
  deleteAspirasi 
} from '../../lib/supabase';
import type { Aspirasi, StatusAspirasi } from '../../types/database';

export const AdminAspirasi: React.FC = () => {
  const [aspirasiList, setAspirasiList] = useState<Aspirasi[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAspirasi, setActiveAspirasi] = useState<Aspirasi | null>(null);
  const [newStatus, setNewStatus] = useState<StatusAspirasi>('diproses');
  const [catatanAdvokasi, setCatatanAdvokasi] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllAspirasi();
      setAspirasiList(data);
    } catch (err) {
      console.error('Failed loading aspirasi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenUpdate = (asp: Aspirasi) => {
    setActiveAspirasi(asp);
    setNewStatus(asp.status);
    setCatatanAdvokasi(asp.catatan_advokasi || '');
    setIsModalOpen(true);
  };

  const handleSaveUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAspirasi) return;

    await updateAspirasiStatus(activeAspirasi.id, newStatus, catatanAdvokasi);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string, code: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tiket aspirasi "${code}"?`)) {
      await deleteAspirasi(id);
      loadData();
    }
  };

  const filtered = aspirasiList.filter((a) => {
    const matchStatus = selectedStatus === 'Semua' || a.status === selectedStatus;
    const matchQuery = 
      a.ticket_code.toLowerCase().includes(search.toLowerCase()) ||
      a.judul_aspirasi.toLowerCase().includes(search.toLowerCase()) ||
      (a.nama && a.nama.toLowerCase().includes(search.toLowerCase())) ||
      (a.nim && a.nim.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchQuery;
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Meja Kerja Advokasi & Layanan Mahasiswa
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Kelola tindak lanjut aspirasi, ubah status penanganan, dan berikan catatan resmi yang dapat dilacak mahasiswa
        </p>
      </div>

      {/* Filter & Search */}
      <div className="admin-card">
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, minWidth: '260px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              className="form-control"
              placeholder="Cari kode tiket (FTII-...), judul, atau nama pengirim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
            <select
              className="form-control"
              style={{ width: 'auto' }}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="diterima">Diterima</option>
              <option value="diproses">Diproses</option>
              <option value="disampaikan">Disampaikan ke Dekanat</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        {loading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Memuat daftar aspirasi...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Tidak ada tiket aspirasi yang cocok.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="col-tiket">Kode Tiket</th>
                  <th className="col-pengirim">Pengirim & Prodi</th>
                  <th className="col-kategori">Kategori</th>
                  <th className="col-masalah">Pokok Masalah</th>
                  <th className="col-status-badge">Status Penanganan</th>
                  <th className="col-catatan">Catatan Advokasi</th>
                  <th className="col-aksi">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((asp) => (
                  <tr key={asp.id}>
                    <td className="col-tiket">
                      <span className="admin-ticket-code">
                        #{asp.ticket_code}
                      </span>
                      <div className="cell-nim-sub" style={{ marginTop: '3px' }}>
                        {new Date(asp.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                    </td>
                    <td className="col-pengirim">
                      {asp.is_anonim ? (
                        <span style={{ fontStyle: 'italic', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.84rem' }}>
                          <Lock size={13} />
                          <span>Anonim</span>
                        </span>
                      ) : (
                        <div>
                          <div className="cell-name-title">{asp.nama}</div>
                          <div className="cell-nim-sub">{asp.nim} • {asp.prodi}</div>
                        </div>
                      )}
                    </td>
                    <td className="col-kategori">
                      <span className="admin-badge-kategori">{asp.kategori}</span>
                    </td>
                    <td className="col-masalah">
                      <div className="cell-name-title">{asp.judul_aspirasi}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                        {asp.isi_aspirasi}
                      </div>
                    </td>
                    <td className="col-status-badge">
                      <span className={`status-badge ${asp.status}`}>
                        {asp.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="col-catatan">
                      {asp.catatan_advokasi ? (
                        <div className="cell-advocacy-note">
                          ✓ {asp.catatan_advokasi}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontStyle: 'italic' }}>
                          Belum ada catatan
                        </span>
                      )}
                    </td>
                    <td className="col-aksi">
                      <div className="table-actions" style={{ justifyContent: 'center' }}>
                        <button
                          onClick={() => handleOpenUpdate(asp)}
                          className="btn-icon edit"
                          title="Tindak Lanjuti Aspirasi"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(asp.id, asp.ticket_code)}
                          className="btn-icon delete"
                          title="Hapus Tiket"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Tindak Lanjut Aspirasi */}
      {isModalOpen && activeAspirasi && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">
                Tindak Lanjut Tiket: {activeAspirasi.ticket_code}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveUpdate}>
              <div className="modal-body">
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    Pengirim: {activeAspirasi.is_anonim ? 'Mahasiswa (Anonim)' : `${activeAspirasi.nama} (${activeAspirasi.nim || '-'}) - ${activeAspirasi.prodi || '-'}`}
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {activeAspirasi.judul_aspirasi}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{activeAspirasi.isi_aspirasi}"
                  </p>
                </div>

                <div className="form-group">
                  <label>Perbarui Status Penanganan *</label>
                  <select
                    className="form-control"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as StatusAspirasi)}
                  >
                    <option value="diterima">1. Diterima (Masuk antrean advokasi)</option>
                    <option value="diproses">2. Diproses (Kajian internal & verifikasi berkas)</option>
                    <option value="disampaikan">3. Disampaikan ke Dekanat / Pihak Fakultas</option>
                    <option value="selesai">4. Selesai (Solusi telah terlaksana)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Catatan Resmi Tim Advokasi FTII (Akan Tampil di Live Tracker Mahasiswa)</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={catatanAdvokasi}
                    onChange={(e) => setCatatanAdvokasi(e.target.value)}
                    placeholder="Contoh: Tim advokasi telah menggelar hearing bersama Wadek II dan perbaikan AC disetujui..."
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                    Catatan ini dapat langsung dibaca oleh mahasiswa saat memasukkan kode tiket di menu publik.
                  </span>
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
                  <span>Simpan Tindak Lanjut</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
