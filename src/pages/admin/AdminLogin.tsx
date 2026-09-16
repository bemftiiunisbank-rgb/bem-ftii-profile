import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  AlertCircle, 
  ArrowLeft, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  // Jika sudah terautentikasi, alihkan langsung ke dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.error || 'Email atau kata sandi tidak sesuai.');
      }
    } catch (err: any) {
      setErrorMsg('Gagal terhubung ke gateway autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await loginWithGoogle();
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.error || 'Otentikasi Google tidak berhasil diselesaikan.');
      }
    } catch (err: any) {
      setErrorMsg('Terjadi kendala pada gateway Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('admin@bemftii.id');
    setPassword('adminftii2026');
    setErrorMsg(null);
  };

  return (
    <div className="admin-login-viewport">
      {/* Kolom Kiri: Institutional Hero & Brand Statement (huashu-design) */}
      <section className="admin-login-hero">
        <div className="admin-login-hero-header">
          <div className="admin-login-brand-group">
            <div className="admin-login-logo-container">
              <img 
                src="/img/logo-bem-ftii.png" 
                alt="Logo Resmi BEM FTII Unisbank" 
                className="admin-login-logo-img" 
              />
            </div>
            <img 
              src="/img/logo-unisbank.png" 
              alt="Universitas Stikubank" 
              className="admin-login-univ-logo" 
            />
          </div>
          <div className="admin-login-brand-meta">
            <span className="admin-login-brand-label">ORMAWA EKSEKUTIF</span>
            <span className="admin-login-brand-org">BEM FTII UNISBANK</span>
          </div>
        </div>

        <div className="admin-login-hero-body">
          <div className="admin-login-hero-badge">
            <ShieldCheck size={14} />
            <span>KONSOL EKSEKUTIF · SINERGI NYATA 2026</span>
          </div>

          <h1 className="admin-login-hero-title">
            Sistem Informasi & Konsol Pengurus
          </h1>

          <p className="admin-login-hero-desc">
            Portal operasional terpadu Badan Eksekutif Mahasiswa Fakultas Teknologi Informasi dan Industri Universitas Stikubank Semarang.
          </p>

          <div className="admin-login-features">
            <div className="admin-login-feat-item">
              <span className="admin-login-feat-index">01</span>
              <div className="admin-login-feat-text">
                <strong>Pengendali Agenda 7 Divisi</strong>
                <span>Presidium, Sekretariat, Keuangan, Kominfo, Inteks, Advokasi, dan Humas.</span>
              </div>
            </div>

            <div className="admin-login-feat-item">
              <span className="admin-login-feat-index">02</span>
              <div className="admin-login-feat-text">
                <strong>Verifikasi Aspirasi Terpadu</strong>
                <span>Moderasi tiket pengaduan & advokasi mahasiswa Kampus Kendeng dan Mugas.</span>
              </div>
            </div>

            <div className="admin-login-feat-item">
              <span className="admin-login-feat-index">03</span>
              <div className="admin-login-feat-text">
                <strong>Penerbitan Berita & Siaran Pers</strong>
                <span>Publikasi rilisan resmi pers ormawa langsung ke web publik dan portal sivitas.</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="admin-login-hero-footer">
          <span>UNIVERSITAS STIKUBANK (UNISBANK) SEMARANG</span>
          <span>SYS.ID // FTII-EXEC-2026</span>
        </footer>
      </section>

      {/* Kolom Kanan: Gateway Autentikasi Pengurus */}
      <main className="admin-login-pane">
        <div className="admin-login-box">
          <div className="admin-login-pane-header">
            <div className="admin-login-status-indicator">
              <span className="admin-login-pulse-dot"></span>
              <span>GATEWAY AKTIF // SECURE GATE</span>
            </div>
            <h2 className="admin-login-pane-title">Masuk ke Konsol</h2>
            <p className="admin-login-pane-sub">
              Pilih metode autentikasi terverifikasi untuk melanjutkan akses.
            </p>
          </div>

          {errorMsg && (
            <div 
              style={{ 
                background: '#fef2f2', 
                border: '1px solid #fecaca', 
                padding: '0.85rem 1rem', 
                borderRadius: '8px', 
                marginBottom: '1.5rem', 
                color: '#b91c1c', 
                fontSize: '0.85rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.65rem' 
              }}
            >
              <AlertCircle size={17} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tombol Masuk dengan Google */}
          <button
            type="button"
            className="admin-google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Menghubungkan Akun...' : 'Masuk dengan Akun Google'}</span>
          </button>

          {/* Divider */}
          <div className="admin-auth-divider">
            <span className="admin-auth-divider-line"></span>
            <span className="admin-auth-divider-text">atau gunakan kredensial</span>
            <span className="admin-auth-divider-line"></span>
          </div>

          {/* Form Kredensial Email & Password */}
          <form onSubmit={handleLogin}>
            <div className="admin-field-group">
              <label className="admin-field-label">
                <span>Email Pengurus</span>
                <span className="admin-field-label-tag">[01]</span>
              </label>
              <div className="admin-input-shell">
                <Mail size={16} className="field-icon" />
                <input
                  type="email"
                  className="admin-input-control"
                  placeholder="admin@bemftii.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">
                <span>Kata Sandi</span>
                <span className="admin-field-label-tag">[02]</span>
              </label>
              <div className="admin-input-shell">
                <Lock size={16} className="field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="admin-input-control"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Tombol Cepat Akun Demo / Evaluasi */}
            <div className="admin-quick-fill-box">
              <div className="admin-quick-fill-info">
                <Sparkles size={14} color="#b91c1c" />
                <span>Akun Pengurus Tersedia</span>
              </div>
              <button
                type="button"
                className="admin-quick-fill-btn"
                onClick={handleQuickDemo}
              >
                Isi Otomatis
              </button>
            </div>

            <button
              type="submit"
              className="admin-submit-btn"
              disabled={loading}
            >
              <span>{loading ? 'Memverifikasi Akses...' : 'Masuk ke Konsol Eksekutif'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={15} />
              <span>Kembali ke Halaman Publik BEM FTII</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

