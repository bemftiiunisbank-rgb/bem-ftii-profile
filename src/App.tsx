import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public Pages
import { Home } from './pages/Home';
import { Tentang } from './pages/Tentang';
import { Struktur } from './pages/Struktur';
import { ProkerPage } from './pages/Proker';
import { AspirasiPage } from './pages/Aspirasi';
import { BeritaPage } from './pages/Berita';
import { BeritaDetail } from './pages/BeritaDetail';
import { KontakPage } from './pages/Kontak';

// Admin Pages & Layout
import { AdminLayout } from './components/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAnggota } from './pages/admin/AdminAnggota';
import { AdminProker } from './pages/admin/AdminProker';
import { AdminAspirasi } from './pages/admin/AdminAspirasi';
import { AdminBerita } from './pages/admin/AdminBerita';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app-layout">
    <Navbar />
    <div className="main-content">
      {children}
    </div>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="anggota" element={<AdminAnggota />} />
            <Route path="proker" element={<AdminProker />} />
            <Route path="aspirasi" element={<AdminAspirasi />} />
            <Route path="berita" element={<AdminBerita />} />
          </Route>
        </Route>

        {/* Public / Guest Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/tentang" element={<PublicLayout><Tentang /></PublicLayout>} />
        <Route path="/struktur" element={<PublicLayout><Struktur /></PublicLayout>} />
        <Route path="/proker" element={<PublicLayout><ProkerPage /></PublicLayout>} />
        <Route path="/aspirasi" element={<PublicLayout><AspirasiPage /></PublicLayout>} />
        <Route path="/berita" element={<PublicLayout><BeritaPage /></PublicLayout>} />
        <Route path="/berita/:slug" element={<PublicLayout><BeritaDetail /></PublicLayout>} />
        <Route path="/kontak" element={<PublicLayout><KontakPage /></PublicLayout>} />

        {/* Fallback */}
        <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
