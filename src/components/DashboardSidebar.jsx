import React, { useState, useCallback } from 'react';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const Icons = {
  Dashboard: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
  Learning: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
  ),
  Practice: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
    </svg>
  ),
  Projects: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  ),
  AI: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
    </svg>
  ),
  Leaderboard: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 013.138-3.138z"/>
    </svg>
  ),
  Community: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
  ),
  Settings: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Sun: () => (
    <svg id="theme-icon" className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ),
  SignOut: () => (
    <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
    </svg>
  ),
};

// ─── Navigation items ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',     Icon: Icons.Dashboard },
  { id: 'learning',    label: 'Learning',      Icon: Icons.Learning },
  { id: 'practice',    label: 'Practice',      Icon: Icons.Practice },
  { id: 'projects',    label: 'Project Ideas', Icon: Icons.Projects },
  { id: 'ai-assistant', label: 'AI Assistant', Icon: Icons.AI },
  { id: 'leaderboard', label: 'Leaderboard',   Icon: Icons.Leaderboard },
  { id: 'community',   label: 'Community',      Icon: Icons.Community },
  { id: 'settings',   label: 'Settings',       Icon: Icons.Settings },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export default function DashboardSidebar({ activeView, onNavigate, collapsed, onToggleCollapse, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = useCallback((viewId) => {
    onNavigate(viewId);
    setMobileOpen(false);
  }, [onNavigate]);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="dash-sidebar-overlay"
          style={{
            position: 'fixed', inset: 0, zIndex: 102,
            background: 'rgba(0,0,0,0.6)',
            display: 'block'
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`dash-sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}
        style={{
          background: '#0f0f0f',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 0',
          width: collapsed ? '68px' : '240px',
          minHeight: '100vh',
          transition: 'width 0.25s ease',
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ padding: '0 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', overflow: 'hidden' }}>
            <img src="/logo_white.jpg" alt="Vericode AI" style={{ mixBlendMode: 'screen', height: 28, flexShrink: 0 }} />
            {!collapsed && (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                VERICODE AI
              </span>
            )}
          </a>
          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#737373', padding: 4, display: 'flex' }}
              title="Collapse sidebar"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
              </svg>
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className={`sidebar-link${activeView === id ? ' active' : ''}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: collapsed ? '12px 0' : '12px 16px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    background: activeView === id ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: 'none',
                    borderLeft: activeView === id ? '2px solid #00e676' : '2px solid transparent',
                    color: activeView === id ? '#fff' : '#737373',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => { if (activeView !== id) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
                  onMouseLeave={e => { if (activeView !== id) { e.currentTarget.style.color = '#737373'; e.currentTarget.style.background = 'transparent'; } }}
                  title={collapsed ? label : undefined}
                >
                  <Icon />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16, paddingLeft: collapsed ? 0 : 16, paddingRight: collapsed ? 0 : 16 }}>
          <button
            style={{
              width: collapsed ? '100%' : 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: 'transparent',
              border: 'none',
              color: '#737373',
              cursor: 'pointer',
              fontSize: 13,
              padding: '10px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#737373'}
          >
            <Icons.Sun />
            {!collapsed && <span>Light Mode</span>}
          </button>

          <button
            onClick={onLogout}
            style={{
              width: collapsed ? '100%' : 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: 'transparent',
              border: 'none',
              color: '#737373',
              cursor: 'pointer',
              fontSize: 13,
              padding: '10px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#737373'}
          >
            <Icons.SignOut />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
