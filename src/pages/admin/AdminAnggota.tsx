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
  fetchAnggotaList, 
  createAnggota, 
  updateAnggota, 
  deleteAnggota 
} from '../../lib/supabase';
import type { Anggota, DivisiType } from '../../types/database';

export const AdminAnggota: React.FC = () => {
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([]);
  const [selectedDivisi, setSelectedDivisi] = useState<string>('Semua');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Anggota, 'id'>>({
    nama: '',
    nim: '',
    divisi: 'Kominfo',
    jabatan: '',
    prodi: 'Teknik Informatika',
    angkatan: '2023',
    foto_url: '',
    bio: '',
    instagram: '',
    linkedin: '',
    urutan: 10
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
      const data = await fetchAnggotaList();
      setAnggotaList(data);
    } catch (err) {
      console.error('Failed loading anggota:', err);
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
      nama: '',
      nim: '',
      divisi: 'Kominfo',
      jabatan: '',
      prodi: 'Teknik Informatika',
      angkatan: '2023',
      foto_url: '',
      bio: '',
      instagram: '',
      linkedin: '',
      urutan: anggotaList.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (anggota: Anggota) => {
    setModalMode('edit');
    setEditingId(anggota.id);
    setFormData({
      nama: anggota.nama,
      nim: anggota.nim || '',
      divisi: anggota.divisi,
      jabatan: anggota.jabatan,
      prodi: anggota.prodi,
      angkatan: anggota.angkatan,
      foto_url: anggota.foto_url || '',
      bio: anggota.bio || '',
      instagram: anggota.instagram || '',
      linkedin: anggota.linkedin || '',
      urutan: anggota.urutan || 10
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus fungsionaris "${nama}"?`)) {
      await deleteAnggota(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.jabatan) {
      alert('Nama dan jabatan wajib diisi!');
      return;
    }

    if (modalMode === 'create') {
      await createAnggota(formData);
    } else if (editingId) {
      await updateAnggota(editingId, formData);
    }

    setIsModalOpen(false);
    loadData();
  };

  const filtered = anggotaList.filter((a) => {
    const matchDiv = selectedDivisi === 'Semua' || a.divisi === selectedDivisi;
    const matchQuery = 
      a.nama.toLowerCase().includes(search.toLowerCase()) ||
      a.jabatan.toLowerCase().includes(search.toLowerCase()) ||
      a.prodi.toLowerCase().includes(search.toLowerCase());
    return matchDiv && matchQuery;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Manajemen Pengurus & Anggota
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Kelola data fungsionaris BEM FTII di seluruh 7 divisi kabinet
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
          <Plus size={18} />
          <span>Tambah Pengurus Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-card">
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, minWidth: '260px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              className="form-control"
              placeholder="Cari nama, jabatan, atau program studi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Divisi:</span>
            <select
              className="form-control"
              style={{ width: 'auto' }}
              value={selectedDivisi}
              onChange={(e) => setSelectedDivisi(e.target.value)}
            >
              <option value="Semua">Semua 7 Divisi</option>
              {divisiOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table List */}
      <div className="admin-card">
        {loading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Memuat data pengurus...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Tidak ada pengurus ditemukan.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="col-urutan">No</th>
                  <th className="col-foto">Foto</th>
                  <th className="col-nama">Fungsionaris</th>
                  <th className="col-divisi">Divisi</th>
                  <th className="col-jabatan">Jabatan Struktural</th>
                  <th className="col-prodi">Program Studi</th>
                  <th className="col-aksi">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const isPresidium = ['Gubernur', 'Wakil Gubernur', 'Sekretaris', 'Bendahara'].includes(a.divisi);
                  return (
                    <tr key={a.id}>
                      <td className="col-urutan">
                        <span className="cell-order-num">#{a.urutan}</span>
                      </td>
                      <td className="col-foto">
                        <img
                          src={a.foto_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                          alt={a.nama}
                          className="cell-avatar-wrap"
                        />
                      </td>
                      <td className="col-nama">
                        <div className="cell-name-title">{a.nama}</div>
                        <div className="cell-nim-sub">NIM: {a.nim || '-'}</div>
                      </td>
                      <td className="col-divisi">
                        <span className={`admin-badge-divisi ${isPresidium ? 'presidium' : ''}`}>
                          {a.divisi}
                        </span>
                      </td>
                      <td className="col-jabatan">
                        <span className={`cell-jabatan-text ${a.jabatan.includes('Gubernur') ? 'presidium-lead' : ''}`}>
                          {a.jabatan}
                        </span>
                      </td>
                      <td className="col-prodi">
                        <div className="cell-prodi-text">{a.prodi}</div>
                        <div className="cell-prodi-angkatan">Angkatan {a.angkatan}</div>
                      </td>
                      <td className="col-aksi">
                        <div className="table-actions" style={{ justifyContent: 'center' }}>
                          <button
                            onClick={() => handleOpenEdit(a)}
                            className="btn-icon edit"
                            title="Edit Pengurus"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id, a.nama)}
                            className="btn-icon delete"
                            title="Hapus Pengurus"
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
                {modalMode === 'create' ? 'Tambah Pengurus Baru' : 'Edit Data Pengurus'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nama Lengkap *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      placeholder="Nama lengkap pengurus"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>NIM</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.nim}
                      onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                      placeholder="Nomor Induk Mahasiswa"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Divisi *</label>
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
                    <label>Jabatan *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.jabatan}
                      onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                      placeholder="Contoh: Kepala Divisi Kominfo"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Program Studi</label>
                    <select
                      className="form-control"
                      value={formData.prodi}
                      onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                    >
                      <option value="Teknik Informatika">Teknik Informatika</option>
                      <option value="Sistem Informasi">Sistem Informasi</option>
                      <option value="Teknik Industri">Teknik Industri</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Angkatan</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.angkatan}
                      onChange={(e) => setFormData({ ...formData, angkatan: e.target.value })}
                      placeholder="Contoh: 2023"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>URL Foto Profil</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.foto_url}
                    onChange={(e) => setFormData({ ...formData, foto_url: e.target.value })}
                    placeholder="https://example.com/foto.jpg (atau tautan Unsplash/drive)"
                  />
                </div>

                <div className="form-group">
                  <label>Bio / Quotes Singkat</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Kutipan visi atau moto kepengurusan..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="@username"
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Nomor Urutan Tampilan (Hierarki)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 10 })}
                  />
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
                  <span>{modalMode === 'create' ? 'Simpan Pengurus' : 'Perbarui Perubahan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
