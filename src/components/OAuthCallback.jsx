import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Robust extraction of token from HashRouter URL
    let token = null;

    // Method 1: Check standard search params
    const searchParams = new URLSearchParams(location.search);
    token = searchParams.get('token');

    // Method 2: Check hash query parameters (HashRouter style)
    if (!token) {
      const hash = window.location.hash || location.hash;
      const queryIdx = hash.indexOf('?');
      if (queryIdx !== -1) {
        const queryParams = new URLSearchParams(hash.substring(queryIdx));
        token = queryParams.get('token');
      }
    }

    if (token) {
      localStorage.setItem('token', token);
      console.log('[OAUTH] Successful social authentication. Token saved.');
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      console.error('[OAUTH] Social authentication failed: token not found in callback URI');
      navigate('/login?error=Authentication failed. Please try again.');
    }
  }, [location, navigate]);

  return (
    <div style={{
      backgroundColor: 'var(--color-black, #000)',
      color: 'var(--color-white, #fff)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'var(--font-body, sans-serif)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Loading Spinner */}
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTop: '3px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <h3 style={{ fontSize: '18px', fontWeight: '500', margin: 0, letterSpacing: '0.05em' }}>
          AUTHENTICATING...
        </h3>
        <p style={{ color: 'var(--color-gray-500, #888)', fontSize: '14px', margin: 0 }}>
          Securing your Vericode workspace
        </p>
      </div>
    </div>
  );
}

export default OAuthCallback;
