import React from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  Newspaper, 
  ExternalLink, 
  LogOut, 
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageInfo = (path: string) => {
    if (path === '/admin') return { title: 'Dashboard Eksekutif', subtitle: 'Ikhtisar statistik dan pembaruan sistem kabinet' };
    if (path.startsWith('/admin/anggota')) return { title: 'Manajemen Pengurus & Anggota', subtitle: 'Kelola data fungsionaris, presidium, dan divisi kabinet' };
    if (path.startsWith('/admin/proker')) return { title: 'Direktori Program Kerja', subtitle: 'Kelola agenda kerja, status pelaksanaan, registrasi, dan LPJ' };
    if (path.startsWith('/admin/aspirasi')) return { title: 'Pusat Aspirasi Mahasiswa', subtitle: 'Moderasi dan tanggapi tiket advokasi mahasiswa FTII' };
    if (path.startsWith('/admin/berita')) return { title: 'Publikasi Warta & Berita', subtitle: 'Tulis dan kelola artikel pers, liputan, dan rilis resmi' };
    return { title: 'Panel Admin', subtitle: 'Sistem Pengelolaan Terpadu BEM FTII' };
  };

  const currentInfo = getPageInfo(location.pathname);

  const navGroups = [
    {
      group: 'NAVIGASI UTAMA',
      items: [
        { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={17} />, end: true },
        { label: 'Pengurus & Anggota', path: '/admin/anggota', icon: <Users size={17} /> },
        { label: 'Program Kerja', path: '/admin/proker', icon: <Calendar size={17} /> },
      ]
    },
    {
      group: 'LAYANAN & MEDIA',
      items: [
        { label: 'Aspirasi Mahasiswa', path: '/admin/aspirasi', icon: <MessageSquare size={17} /> },
        { label: 'Berita & Warta', path: '/admin/berita', icon: <Newspaper size={17} /> },
      ]
    }
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Institutional Header */}
        <div className="admin-sidebar-header">
          <div className="admin-brand-emblem">
            <img 
              src="/img/logo-bem-ftii.png" 
              alt="Logo BEM FTII Unisbank" 
              className="admin-brand-logo-img" 
            />
          </div>
          <div className="admin-brand-info">
            <div className="admin-brand-title">PORTAL EKSEKUTIF</div>
            <div className="admin-brand-tagline">BEM FTII UNISBANK · 2026</div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="admin-nav">
          {navGroups.map((group, idx) => (
            <div key={idx} className="admin-nav-group">
              <div className="admin-nav-group-label">{group.group}</div>
              <div className="admin-nav-group-items">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span className="admin-nav-icon">{item.icon}</span>
                    <span className="admin-nav-label">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <div className="admin-user-avatar">
              {user?.nama ? user.nama.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="admin-user-meta">
              <div className="admin-user-name">
                {user?.nama || 'Administrator Kabinet'}
              </div>
              <div className="admin-user-email">
                {user?.email || 'admin@bemftii.id'}
              </div>
            </div>
          </div>

          <div className="admin-footer-actions">
            <Link to="/" target="_blank" rel="noreferrer" className="admin-footer-link">
              <ExternalLink size={14} />
              <span>Lihat Web Publik</span>
            </Link>
            <button onClick={handleLogout} className="admin-footer-link logout">
              <LogOut size={14} />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-breadcrumb">
            <span className="breadcrumb-root">Portal Admin</span>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{currentInfo.title}</span>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-system-status">
              <span className="status-indicator-dot"></span>
              <span className="status-indicator-text">Sistem Online · Database Terhubung</span>
            </div>
            <Link to="/" target="_blank" rel="noreferrer" className="btn btn-secondary admin-btn-preview">
              <span>Buka Web Publik</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
