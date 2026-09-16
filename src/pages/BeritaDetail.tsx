import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Check } from 'lucide-react';
import { fetchBeritaDetail } from '../lib/supabase';
import type { Berita } from '../types/database';
import '../styles/berita.css';

export const BeritaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function loadDetail() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await fetchBeritaDetail(slug);
        setBerita(data);
      } catch (err) {
        console.error('Failed fetching detail berita:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="detail-article-wrap" style={{ textAlign: 'center', paddingTop: '10rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Memuat artikel...</p>
      </main>
    );
  }

  if (!berita) {
    return (
      <main className="detail-article-wrap" style={{ textAlign: 'center', paddingTop: '10rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Artikel Tidak Ditemukan</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Artikel berita yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>
        <Link to="/berita" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Kembali ke Katalog Berita</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="detail-article-wrap">
      {/* Editorial Top Navigation */}
      <div className="detail-top-nav">
        <Link to="/berita" className="detail-back-btn">
          <ArrowLeft size={16} />
          <span>Kembali ke Berita</span>
        </Link>
        <span className="detail-nav-breadcrumb">Warta & Publikasi BEM FTII</span>
      </div>

      {/* Article Header */}
      <header className="detail-article-header">
        <div className="detail-cat-row">
          <span className="detail-cat-badge">{berita.kategori}</span>
        </div>
        <h1 className="detail-headline">{berita.judul}</h1>
      </header>

      <div className="detail-author-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={16} color="var(--color-primary-light)" />
            {berita.penulis}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} color="var(--color-primary-light)" />
            {new Date(berita.published_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>

        <button
          onClick={handleShare}
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
        >
          {copied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
          <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
        </button>
      </div>

      {berita.gambar_url && (
        <img
          src={berita.gambar_url}
          alt={berita.judul}
          className="detail-feature-img"
        />
      )}

      <div className="detail-body-text">
        {berita.konten}
      </div>

      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Ingin Menyampaikan Aspirasi Terkait Berita Ini?</h4>
        <Link to="/aspirasi" className="btn btn-primary">
          <span>Kunjungi Kanal Aspirasi</span>
        </Link>
      </div>
    </main>
  );
};
