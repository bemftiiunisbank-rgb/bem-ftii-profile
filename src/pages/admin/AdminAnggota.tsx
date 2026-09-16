import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  Check,
  UploadCloud,
  Upload,
  AlertCircle
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

  // Upload State
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setUploadError(null);
    setUploadLoading(false);
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
    setUploadError(null);
    setUploadLoading(false);
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

  const processImageFile = (file: File) => {
    // Validasi ukuran: mendukung hingga 25 MB (melebihi batas minimal 20 MB yang diminta)
    const maxSizeBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError('Ukuran file melebihi batas maksimal 25 MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Format file tidak didukung. Harap unggah gambar (JPG, PNG, atau WEBP).');
      return;
    }

    setUploadError(null);
    setUploadLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Otomatis optimasi kanvas resolusi tajam (1200px) agar cepat dimuat di web
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const isPng = file.type === 'image/png';
          const optimizedDataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', 0.9);
          setFormData((prev) => ({ ...prev, foto_url: optimizedDataUrl }));
        } else {
          setFormData((prev) => ({ ...prev, foto_url: event.target?.result as string }));
        }
        setUploadLoading(false);
      };
      img.onerror = () => {
        setUploadError('Gagal memproses file gambar.');
        setUploadLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setUploadError('Gagal membaca file dari penyimpanan perangkat.');
      setUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
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

                {/* Upload Foto Profil (Mendukung hingga 25 MB) */}
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Foto Profil Pengurus</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Maksimal 25 MB</span>
                  </label>

                  {/* Hidden Input File */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    style={{ display: 'none' }}
                  />

                  {formData.foto_url ? (
                    <div className="admin-upload-preview-box">
                      <div className="admin-upload-thumb-wrap">
                        <img 
                          src={formData.foto_url} 
                          alt="Pratinjau Foto Profil" 
                          className="admin-upload-thumb-img" 
                        />
                      </div>
                      <div className="admin-upload-preview-info">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803d', fontSize: '0.85rem', fontWeight: 700 }}>
                          <Check size={16} />
                          <span>Foto Berhasil Diunggah</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          File foto siap dipublikasikan ke struktur dan profil.
                        </span>
                        <div className="admin-upload-preview-actions">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadLoading}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem' }}
                          >
                            <Upload size={13} />
                            <span>Ganti File</span>
                          </button>
                          <button
                            type="button"
                            className="btn-icon delete"
                            onClick={() => setFormData(prev => ({ ...prev, foto_url: '' }))}
                            title="Hapus Foto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`admin-upload-dropzone ${uploadLoading ? 'loading' : ''}`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <div className="admin-upload-dropzone-content">
                        <div className="admin-upload-icon-circle">
                          <UploadCloud size={24} color="#b91c1c" />
                        </div>
                        <div className="admin-upload-dropzone-text">
                          <strong>{uploadLoading ? 'Memproses dan mengoptimasi gambar...' : 'Klik untuk Unggah Foto atau Tarik File ke Sini'}</strong>
                          <span>Mendukung file kamera & desain hingga 25 MB (JPG, PNG, WEBP)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {uploadError && (
                    <div style={{ color: '#b91c1c', fontSize: '0.78rem', marginTop: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertCircle size={14} />
                      <span>{uploadError}</span>
                    </div>
                  )}
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
