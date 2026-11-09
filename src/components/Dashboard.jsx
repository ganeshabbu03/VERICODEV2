import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/react';
import DashboardSidebar from './DashboardSidebar.jsx';
import { DashboardWidgets } from './DashboardWidgets.jsx';
import AIAssistant from './AIAssistant.jsx';
import Practice from './Practice.jsx';
import Settings from './Settings.jsx';
import '../dashboard.css';

// ─── Placeholder views for other sections ───────────────────────────────────

function PlaceholderView({ title, subtitle, icon }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      gap: 16,
      color: '#737373',
      padding: 60,
      textAlign: 'center',
    }}>
      <div style={{
        width: 72, height: 72,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 8,
      }}>
        {icon}
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{title}</h2>
      <p style={{ fontSize: 14, maxWidth: 380, lineHeight: 1.6 }}>{subtitle}</p>
    </div>
  );
}

const VIEWS = {
  dashboard: {
    title: 'Dashboard',
    render: ({ user, onNavigate }) => <DashboardWidgets user={user} onNavigate={onNavigate} />,
  },
  learning: {
    render: () => (
      <PlaceholderView
        title="Learning Hub"
        subtitle="Structured courses for secure coding and algorithm design. Coming soon — OWASP Top 10, language courses, and more."
        icon={<svg width="32" height="32" fill="none" stroke="#404040" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
      />
    ),
  },
  practice: {
    render: () => <Practice />,
  },
  projects: {
    render: () => (
      <PlaceholderView
        title="Project Ideas"
        subtitle="Curated real-world projects to build your portfolio, with secure-coding guardrails baked in. Launching with Phase 2."
        icon={<svg width="32" height="32" fill="none" stroke="#404040" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
      />
    ),
  },
  'ai-assistant': {
    title: 'AI Assistant',
    render: () => <AIAssistant />,
  },
  leaderboard: {
    render: () => (
      <PlaceholderView
        title="Leaderboard"
        subtitle="Compete globally with rankings based on problems solved and security challenges completed. Full leaderboard coming soon."
        icon={<svg width="32" height="32" fill="none" stroke="#404040" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>}
      />
    ),
  },
  community: {
    render: () => (
      <PlaceholderView
        title="Community"
        subtitle="Connect with fellow learners, share solutions, and review code together. Community spaces launching with Phase 2."
        icon={<svg width="32" height="32" fill="none" stroke="#404040" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>}
      />
    ),
  },
  settings: {
    render: ({ user, onNavigate }) => <Settings user={user} onNavigate={onNavigate} />,
  },
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoaded: isClerkLoaded, isSignedIn: isClerkSignedIn, signOut } = useAuth();
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState(null);
  const [isValidating, setIsValidating] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // If Clerk is loaded, prioritize Clerk session check
    if (isClerkLoaded) {
      if (isClerkSignedIn && clerkUser) {
        setUser({
          name: clerkUser.fullName || clerkUser.firstName || 'Clerk User',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
        });
        setIsValidating(false);
        return;
      }
    }

    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if Clerk is loaded and user is not signed in
      if (isClerkLoaded && !isClerkSignedIn) {
        navigate('/login');
      }
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Backend unreachable — use mock user from localStorage
        if (!response.ok && response.status === 0) {
          try {
            const mockUser = JSON.parse(localStorage.getItem('mock_user') || '{}');
            setUser(mockUser.name ? mockUser : { name: 'Demo User', email: 'demo@vericode.ai' });
          } catch (_) {
            setUser({ name: 'Demo User', email: 'demo@vericode.ai' });
          }
          setIsValidating(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('mock_user');
          navigate('/login');
        }
      } catch (err) {
        // Network failure — use mock user from localStorage
        try {
          const mockUser = JSON.parse(localStorage.getItem('mock_user') || '{}');
          setUser(mockUser.name ? mockUser : { name: 'Demo User', email: 'demo@vericode.ai' });
        } catch (_) {
          setUser({ name: 'Demo User', email: 'demo@vericode.ai' });
        }
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [navigate, isClerkLoaded, isClerkSignedIn, clerkUser]);

  const handleLogout = async () => {
    if (isClerkSignedIn) {
      await signOut();
    }
    localStorage.removeItem('token');
    localStorage.removeItem('mock_user');
    navigate('/login');
  };

  const handleNavigate = (viewId) => {
    setActiveView(viewId);
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isValidating) {
    return (
      <div style={{
        backgroundColor: '#0a0a0a',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        gap: 20,
      }}>
        <div style={{
          width: 40, height: 40,
          border: '3px solid rgba(255,255,255,0.05)',
          borderTop: '3px solid #fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <span style={{ fontSize: 13, letterSpacing: '0.08em', color: '#737373' }}>SECURE LOGIN INITIALIZING...</span>
      </div>
    );
  }

  const currentView = VIEWS[activeView] || VIEWS.dashboard;
  const viewTitle = currentView.title || activeView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const isFullHeight = activeView === 'ai-assistant';

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0a0a',
    }}>
      {/* ── Top navigation bar ─────────────────────────────────────────── */}
      <header style={{
        height: 56,
        backgroundColor: '#0f0f0f',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        color: '#fff',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
        zIndex: 100,
        flexShrink: 0,
      }}>
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarCollapsed(c => !c)}
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            padding: 6,
            cursor: 'pointer',
            color: '#fff',
          }}
          className="mobile-sidebar-toggle"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        {/* Left: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo_white.jpg" alt="Vericode AI" style={{ mixBlendMode: 'screen', height: 24, borderRadius: 4 }} />
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', color: '#fff' }}>VERICODE AI</span>
          <span style={{
            fontSize: 10,
            backgroundColor: 'rgba(0,230,118,0.08)',
            border: '1px solid rgba(0,230,118,0.2)',
            color: '#00e676',
            padding: '2px 8px',
            borderRadius: 20,
            fontWeight: 600,
          }}>
            SECURE SESSION
          </span>
        </div>

        {/* Right: User + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderRight: '1px solid #262626', paddingRight: 16 }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: '50%',
                backgroundColor: '#fff',
                color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13,
              }}>
                {getInitials(user.name)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{user.name}</span>
                <span style={{ fontSize: 11, color: '#737373' }}>{user.email}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              color: '#a3a3a3',
              border: '1px solid #262626',
              padding: '6px 14px',
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#a3a3a3'; e.currentTarget.style.borderColor = '#262626'; }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Body: Sidebar + Content ──────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <DashboardSidebar
          activeView={activeView}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(c => !c)}
          onLogout={handleLogout}
        />

        {/* View panel */}
        <main style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
        }}>
          {/* View header */}
          {!isFullHeight && (
            <div style={{
              padding: '16px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{viewTitle}</h2>
            </div>
          )}

          {/* View content */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {currentView.render({ user, onNavigate: handleNavigate })}
          </div>
        </main>
      </div>

      {/* Mobile sidebar toggle CSS */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-sidebar-toggle { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
