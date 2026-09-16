import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Tunggu pengecekan sesi (termasuk redirect dari Google OAuth)
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        backgroundImage: 'var(--pattern-batik)',
        backgroundRepeat: 'repeat',
        backgroundSize: '160px 160px',
        color: 'var(--text-primary)',
        gap: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid rgba(185, 28, 28, 0.2)',
          borderTopColor: 'var(--color-primary)',
          animation: 'spin 0.8s linear infinite'
        }}></div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500 }}>
          Memverifikasi sesi akun Google BEM FTII...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
