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
  fetchBeritaList, 
  createBerita, 
  updateBerita, 
  deleteBerita 
} from '../../lib/supabase';
import type { Berita } from '../../types/database';

export const AdminBerita: React.FC = () => {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Berita, 'id'>>({
    judul: '',
    slug: '',
    kategori: 'Kilas Kabinet',
    ringkasan: '',
    konten: '',
    penulis: 'Biro Media Kominfo BEM FTII',
    gambar_url: '',
    published_at: new Date().toISOString().split('T')[0]
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchBeritaList();
      setBeritaList(data);
    } catch (err) {
      console.error('Failed loading berita:', err);
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
      slug: '',
      kategori: 'Kilas Kabinet',
      ringkasan: '',
      konten: '',
      penulis: 'Biro Media Kominfo BEM FTII',
      gambar_url: '',
      published_at: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: Berita) => {
    setModalMode('edit');
    setEditingId(b.id);
    setFormData({
      judul: b.judul,
      slug: b.slug,
      kategori: b.kategori,
      ringkasan: b.ringkasan,
      konten: b.konten,
      penulis: b.penulis,
      gambar_url: b.gambar_url || '',
      published_at: b.published_at.split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    // Auto-generate slug from title if in create mode
    const autoSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData({
      ...formData,
      judul: newTitle,
      slug: modalMode === 'create' ? autoSlug : formData.slug
    });
  };

  const handleDelete = async (id: string, judul: string) => {
    if (window.confirm(`Hapus warta berita "${judul}"?`)) {
      await deleteBerita(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul || !formData.konten || !formData.slug) {
      alert('Judul, slug rute, dan konten artikel wajib diisi!');
      return;
    }

    if (modalMode === 'create') {
      await createBerita(formData);
    } else if (editingId) {
      await updateBerita(editingId, formData);
    }

    setIsModalOpen(false);
    loadData();
  };

  const filtered = beritaList.filter((b) => {
    return (
      b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.kategori.toLowerCase().includes(search.toLowerCase()) ||
      b.penulis.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Manajemen Warta & Rilis Pers
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Tulis, sunting, dan publikasikan rilis pers resmi serta warta kegiatan BEM FTII
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
          <Plus size={18} />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="admin-card">
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="form-control"
            placeholder="Cari judul berita, kategori, atau penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        {loading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Memuat daftar berita...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Tidak ada artikel ditemukan.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="col-banner">Thumbnail</th>
                  <th className="col-proker-judul">Judul Artikel & Slug</th>
                  <th className="col-kategori">Kategori</th>
                  <th className="col-pengirim">Penulis / Redaksi</th>
                  <th className="col-tgl">Tanggal Terbit</th>
                  <th className="col-aksi">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="col-banner">
                      <img
                        src={b.gambar_url || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80'}
                        alt={b.judul}
                        className="cell-thumb-img"
                      />
                    </td>
                    <td className="col-proker-judul">
                      <div className="cell-name-title">{b.judul}</div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-primary)', fontFamily: 'monospace' }}>
                        /berita/{b.slug}
                      </span>
                    </td>
                    <td className="col-kategori">
                      <span className="admin-badge-kategori">
                        {b.kategori}
                      </span>
                    </td>
                    <td className="col-pengirim">
                      <div className="cell-jabatan-text">{b.penulis}</div>
                    </td>
                    <td className="col-tgl">
                      <span className="table-date-cell">
                        {new Date(b.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="col-aksi">
                      <div className="table-actions" style={{ justifyContent: 'center' }}>
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="btn-icon edit"
                          title="Edit Artikel"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.judul)}
                          className="btn-icon delete"
                          title="Hapus Artikel"
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

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">
                {modalMode === 'create' ? 'Tulis Rilis Pers Baru' : 'Edit Artikel Warta'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Judul Berita *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.judul}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Judul rilis pers yang menarik..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Slug URL (Rute) *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="contoh-judul-berita"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Kategori Berita</label>
                    <select
                      className="form-control"
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    >
                      <option value="Kilas Kabinet">Kilas Kabinet</option>
                      <option value="Advokasi & Kebijakan">Advokasi & Kebijakan</option>
                      <option value="Kemitraan Industri">Kemitraan Industri</option>
                      <option value="Prestasi Mahasiswa">Prestasi Mahasiswa</option>
                      <option value="Pengumuman Resmi">Pengumuman Resmi</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Penulis / Redaksi</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.penulis}
                      onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                      placeholder="Biro Media Kominfo BEM FTII"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tanggal Publikasi</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.published_at}
                      onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>URL Gambar Utama (Cover)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.gambar_url}
                    onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="form-group">
                  <label>Ringkasan Singkat (Lead Paragraph) *</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={formData.ringkasan}
                    onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                    placeholder="Cuplikan singkat yang tampil di daftar artikel..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Konten Lengkap Artikel *</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    value={formData.konten}
                    onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                    placeholder="Tuliskan isi berita selengkapnya di sini..."
                    required
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
                  <span>{modalMode === 'create' ? 'Terbitkan Berita' : 'Simpan Perubahan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
