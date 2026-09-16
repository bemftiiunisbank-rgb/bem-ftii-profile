import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import { isSupabaseConfigured } from '../lib/supabase';
import '../styles/footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="footer-emblem-wrap">
                <img 
                  src="/img/logo-bem-ftii.png" 
                  alt="Logo BEM FTII Unisbank" 
                  className="footer-logo-img" 
                />
              </div>
              <div className="footer-brand-title-wrap">
                <span className="footer-brand-main">BEM FTII UNISBANK</span>
                <span className="footer-brand-sub">(Universitas Stikubank Semarang)</span>
              </div>
            </div>
            <p className="footer-desc">
              Badan Eksekutif Mahasiswa Fakultas Teknologi Informasi dan Industri, Universitas Stikubank Semarang. Wadah aspirasi mahasiswa, riset teknologi terapan, dan pergerakan intelektual berjiwa kewirausahaan digital.
            </p>

            <a 
              href="https://www.unisbank.ac.id" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-unisbank-badge"
              title="Kunjungi Portal Resmi Universitas Stikubank Semarang"
            >
              <img 
                src="/img/logo-unisbank.png" 
                alt="Universitas Stikubank Semarang - Digital Youth Entrepreneurial University" 
                className="footer-unisbank-img"
              />
            </a>

            <div className="footer-system-status">
              <span className="system-status-indicator"></span>
              <span>
                {isSupabaseConfigured 
                  ? 'Basis Data Ormawa: Terhubung Cloud (Supabase)' 
                  : 'Basis Data Ormawa: Mode Hibrida (Lokal / Supabase Siap)'}
              </span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigasi Utama</h4>
            <ul className="footer-links">
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/tentang">Profil & Visi Misi</Link></li>
              <li><Link to="/struktur">Struktur 7 Divisi</Link></li>
              <li><Link to="/proker">Katalog Program Kerja</Link></li>
              <li><Link to="/aspirasi">Kanal Aspirasi Mahasiswa</Link></li>
              <li><Link to="/berita">Warta & Rilis Pers</Link></li>
              <li><Link to="/kontak">Kontak Sekretariat</Link></li>
            </ul>
          </div>

          {/* 7 Divisi */}
          <div className="footer-col">
            <h4 className="footer-col-title">7 Divisi Kabinet</h4>
            <ul className="footer-links">
              <li><Link to="/struktur?divisi=Gubernur">01. Presidium Eksekutif</Link></li>
              <li><Link to="/struktur?divisi=Sekretaris">02. Sekretariat Jenderal</Link></li>
              <li><Link to="/struktur?divisi=Bendahara">03. Bendahara Umum</Link></li>
              <li><Link to="/struktur?divisi=Kominfo">04. Divisi Kominfo</Link></li>
              <li><Link to="/struktur?divisi=Inteks">05. Divisi Inteks</Link></li>
              <li><Link to="/struktur?divisi=Advokasi">06. Divisi Advokasi</Link></li>
            </ul>
          </div>

          {/* Kontak & Sekretariat */}
          <div className="footer-col">
            <h4 className="footer-col-title">Kantor Sekretariat</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>
                  <strong>Kampus Kendeng (Pusat FTII):</strong><br />
                  Gedung Student Center Lt. 2, Jl. Kendeng I, Bendan Ngisor, Semarang 50233
                </span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>
                  <strong>Kampus Mugas:</strong><br />
                  Jl. Tri Lomba Juang No. 1, Semarang 50241
                </span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>bemftii@edu.unisbank.ac.id</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>
                  <strong>Hotline Resmi:</strong><br />
                  <a href="https://wa.me/628993083311" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+62 899-3083-311</a> (Gubernur)<br />
                  <a href="https://wa.me/6282113449785" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+62 821-1344-9785</a> (Advokasi)
                </span>
              </div>
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                  <InstagramIcon size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                  <LinkedinIcon size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                  <YoutubeIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BEM FTII Universitas Stikubank Semarang — Kabinet Sinergi Nyata. Seluruh hak cipta dilindungi.</p>
          <div className="footer-tech-meta">
            <span>Universitas Stikubank Semarang · Digital Youth Entrepreneurial University</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
