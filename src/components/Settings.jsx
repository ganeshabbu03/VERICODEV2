import React, { useState, useEffect } from 'react';

export default function Settings({ user, onNavigate }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [theme, setTheme] = useState('dark');
  const [defaultLang, setDefaultLang] = useState('Javascript');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
    // Load OpenRouter key from localStorage
    const savedKey = localStorage.getItem('VITE_OPENROUTER_API_KEY') || '';
    setOpenRouterKey(savedKey);

    // Load preferences
    const savedTheme = localStorage.getItem('pref_theme') || 'dark';
    const savedLang = localStorage.getItem('pref_lang') || 'Javascript';
    const savedSound = localStorage.getItem('pref_sound') !== 'false';
    setTheme(savedTheme);
    setDefaultLang(savedLang);
    setSoundEnabled(savedSound);
  }, [user]);

  const triggerNotification = (msg) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Simulate saving profile details
    if (user) {
      user.name = name;
      user.email = email;
      // If mock user, update mock user object in localStorage
      const mockUser = JSON.parse(localStorage.getItem('mock_user') || '{}');
      mockUser.name = name;
      mockUser.email = email;
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
    }
    triggerNotification('Profile details updated successfully!');
  };

  const handleSaveAPIKey = (e) => {
    e.preventDefault();
    localStorage.setItem('VITE_OPENROUTER_API_KEY', openRouterKey.trim());
    triggerNotification('OpenRouter API key saved successfully!');
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    localStorage.setItem('pref_theme', theme);
    localStorage.setItem('pref_lang', defaultLang);
    localStorage.setItem('pref_sound', soundEnabled.toString());
    triggerNotification('Platform preferences updated!');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '32px', color: '#fff', overflowY: 'auto' }}>
      
      {/* Toast Notification */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'rgba(10, 10, 10, 0.9)',
          border: '1px solid rgba(0, 230, 118, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 230, 118, 0.15)',
          padding: '16px 24px',
          borderRadius: '12px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e676', boxShadow: '0 0 8px #00e676' }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>{notificationMsg}</span>
        </div>
      )}

      {/* Header section */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Account Settings</h2>
        <p style={{ fontSize: 14, color: '#a3a3a3', marginTop: 4 }}>Manage your profile credentials, platform integrations, and preferences.</p>
      </div>

      <div style={{ display: 'flex', gap: 32, flex: 1, minHeight: 0 }}>
        {/* Left Side: Settings Navigation */}
        <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { id: 'profile', name: 'User Profile', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> },
            { id: 'api-keys', name: 'API Keys & LLM', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-2-4h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg> },
            { id: 'preferences', name: 'Preferences', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                border: 'none',
                color: activeTab === tab.id ? '#fff' : '#a3a3a3',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: 14,
                fontWeight: 500,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent'; }}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Right Side: Active Settings Panel */}
        <div style={{
          flex: 1,
          background: 'rgba(15, 15, 15, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20,
          padding: 40,
          backdropFilter: 'blur(20px)',
          maxWidth: 680
        }}>
          {/* USER PROFILE TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 12 }}>
                <div style={{
                  width: 72, height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #00e676 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 700, color: '#fff',
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.2)'
                }}>
                  {name.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{name || 'User Profile'}</h4>
                  <p style={{ fontSize: 13, color: '#a3a3a3', margin: '4px 0 0 0' }}>{email || 'No email set'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#a3a3a3', fontWeight: 500 }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 14
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#a3a3a3', fontWeight: 500 }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 14
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 24px',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: 'fit-content',
                  marginTop: 8,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                Save Changes
              </button>
            </form>
          )}

          {/* API KEYS TAB */}
          {activeTab === 'api-keys' && (
            <form onSubmit={handleSaveAPIKey} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 6px 0' }}>OpenRouter Integrations</h3>
                <p style={{ fontSize: 13, color: '#a3a3a3', margin: 0, lineHeight: 1.5 }}>
                  Configure your OpenRouter API Key to hook the AI assistant up to live models (e.g. Gemini 2.5). The key is stored locally in your browser workspace.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#a3a3a3', fontWeight: 500 }}>OpenRouter API Key</label>
                <input
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={openRouterKey}
                  onChange={e => setOpenRouterKey(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 14,
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              <div style={{
                background: 'rgba(37,99,235,0.05)',
                border: '1px solid rgba(37,99,235,0.15)',
                borderRadius: 12,
                padding: 16,
                fontSize: 13,
                color: '#60a5fa',
                lineHeight: 1.5
              }}>
                <strong>💡 Tip:</strong> You can acquire an API Key at <a href="https://openrouter.ai" target="_blank" rel="noreferrer" style={{ color: '#00e676', textDecoration: 'underline' }}>openrouter.ai</a>.
              </div>

              <button
                type="submit"
                style={{
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 24px',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                Save API Key
              </button>
            </form>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <form onSubmit={handleSavePreferences} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#a3a3a3', fontWeight: 500 }}>Default Sandbox Language</label>
                <select
                  value={defaultLang}
                  onChange={e => setDefaultLang(e.target.value)}
                  style={{
                    background: '#131313',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 14,
                    cursor: 'pointer'
                  }}
                >
                  {['Javascript', 'Python', 'C', 'NodeJS'].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#a3a3a3', fontWeight: 500 }}>Interface Theme</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['dark', 'dim', 'light'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      style={{
                        flex: 1,
                        background: theme === t ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.03)',
                        border: theme === t ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(255,255,255,0.06)',
                        color: theme === t ? '#60a5fa' : '#a3a3a3',
                        padding: '12px 16px',
                        borderRadius: 12,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all 0.2s'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Interface Sound Effects</h4>
                  <p style={{ fontSize: 12, color: '#737373', margin: '2px 0 0 0' }}>Play confirmation sounds when compiling and running tests.</p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={e => setSoundEnabled(e.target.checked)}
                  style={{
                    width: 20, height: 20,
                    accentColor: '#2563eb',
                    cursor: 'pointer'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 24px',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: 'fit-content',
                  marginTop: 8,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
              >
                Save Preferences
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
