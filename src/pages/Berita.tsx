import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchBeritaList } from '../lib/supabase';
import type { Berita } from '../types/database';
import '../styles/berita.css';

export const BeritaPage: React.FC = () => {
  const [beritas, setBeritas] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBeritaList();
        setBeritas(data);
      } catch (err) {
        console.error('Failed loading berita:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="berita-page">
      {/* Editorial Page Header */}
      <section className="page-header-editorial">
        <div className="container">
          <div className="page-header-inner">
            <div className="page-kicker">
              <span className="page-kicker-line"></span>
              <span className="page-kicker-text">WARTA RESMI & SIKAP ORMAWA · KABINET 2026</span>
            </div>
            <h1 className="page-headline-editorial">
              Warta & Rilis Pers BEM FTII
            </h1>
            <p className="page-subtext-editorial">
              Dokumentasi terpercaya mengenai agenda ormawa, hearing dekanat, kerjasama korporasi teknologi, dan rilis pernyataan sikap mahasiswa FTII.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              Memuat warta berita...
            </div>
          ) : beritas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              Belum ada artikel berita yang dipublikasikan.
            </div>
          ) : (
            <div className="berita-grid">
              {beritas.map((item) => (
                <article key={item.id} className="berita-card">
                  <div className="berita-img-wrapper">
                    <img
                      src={item.gambar_url || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80'}
                      alt={item.judul}
                      loading="lazy"
                    />
                    <span className="berita-cat-tag">{item.kategori}</span>
                  </div>

                  <div className="berita-card-body">
                    <div>
                      <div className="berita-date">
                        <Calendar size={14} />
                        <span>
                          {new Date(item.published_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <h2 className="berita-title">{item.judul}</h2>
                      <p className="berita-summary">{item.ringkasan}</p>
                    </div>

                    <Link
                      to={`/berita/${item.slug}`}
                      className="btn btn-outline-red"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', width: 'fit-content' }}
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
