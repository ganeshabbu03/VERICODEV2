// === JSX Part 1 ===
<body className="dashboard-body">

  {/* Sidebar overlay backdrop for mobile navigation */}
  <div className="dash-sidebar-overlay" onclick="toggleMobileSidebar()"></div>

  {/* Mobile sticky topbar */}
  <div className="mobile-topbar" style={{ "display": "none", "position": "sticky", "top": "0", "zIndex": "10300", "background": "rgba(18, 18, 18, 0.85)", "backdropFilter": "blur(12px)", "WebkitBackdropFilter": "blur(12px)", "borderBottom": "1px solid rgba(255,255,255,0.05)", "alignItems": "center", "justifyContent": "space-between", "padding": "12px 20px", "height": "56px", "boxSizing": "border-box" }}>
    <button onclick="toggleMobileSidebar()" style={{ "background": "transparent", "border": "none", "color": "var(--color-white)", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "outline": "none", "padding": "4px" }}>
      <svg style={{ "width": "24px", "height": "24px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <div style={{ "fontWeight": "700", "color": "var(--color-white)", "fontSize": "16px", "letterSpacing": "0.05em", "fontFamily": "var(--font-display)" }}>VERICODE AI</div>
    <div style={{ "width": "32px", "height": "32px", "borderRadius": "50%", "overflow": "hidden", "display": "flex", "alignItems": "center", "justifyContent": "center", "border": "1.5px solid rgba(255, 255, 255, 0.1)", "cursor": "pointer" }} onclick="switchView(null, 'profile')" id="mobile-topbar-avatar">
      {/* Synced user avatar svg */}
    </div>
  </div>

  <div className="dashboard-layout">
    {/* Sidebar nav */}
    <aside className="dash-sidebar">
      <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "20px", "width": "100%" }}>
        <a href="/" className="logo-container" id="sidebar-logo-container" title="Vericode AI" style={{ "textDecoration": "none", "display": "flex", "alignItems": "center", "gap": "8px" }}>
          <img src="/logo_white.jpg" alt="Vericode AI Logo" id="sidebar-logo" className="logo-img logo-dark-mode" style={{ "mixBlendMode": "screen", "height": "28px" }}>
          <img src="/logo_black.png" alt="Vericode AI Logo" className="logo-img logo-light-mode" style={{ "mixBlendMode": "multiply", "height": "28px" }}>
          <span className="logo-text" style={{ "fontSize": "16px", "color": "var(--color-white)", "whiteSpace": "nowrap", "transition": "opacity 0.2s" }}>VERICODE AI</span>
        </a>
        <button id="sidebar-collapse-btn" className="animated-menu-btn" style={{ "color": "var(--color-gray-400)", "transition": "color 0.2s" }} title="Toggle Sidebar">
          <span className="menu-bar bar-1"></span>
          <span className="menu-bar bar-2"></span>
          <span className="menu-bar bar-3"></span>
        </button>
      </div>  
        <ul className="sidebar-menu">
          <li>
            <a href="#" id="sidebar-dash-btn" className="sidebar-link active" title="Dashboard" onclick="switchView(event, 'dashboard')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" id="sidebar-learning-btn" className="sidebar-link" title="Learning" onclick="switchView(event, 'learning')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              <span>Learning</span>
            </a>
          </li>
          <li>
            <a href="#" id="sidebar-practice-btn" className="sidebar-link" title="Practice" onclick="switchView(event, 'practice')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              <span>Practice</span>
            </a>
          </li>
          <li>
            <a href="#" id="sidebar-projects-btn" className="sidebar-link" title="Project Ideas" onclick="switchView(event, 'projects')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              <span>Project Ideas</span>
            </a>
          </li>

          <li>
            <a href="#" id="sidebar-ai-btn" className="sidebar-link" title="AI Assistant" onclick="switchView(event, 'ai-assistant')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              <span>AI Assistant</span>
            </a>
          </li>
          <li>
            <a href="#" id="sidebar-leaderboard-btn" className="sidebar-link" title="Leaderboard" onclick="switchView(event, 'leaderboard')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
              <span>Leaderboard</span>
            </a>
          </li>
          <li>
            <a href="#" id="sidebar-community-btn" className="sidebar-link" title="Community" onclick="switchView(event, 'community')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <span>Community</span>
            </a>
          </li>

          <li>
            <a href="#" id="sidebar-settings-btn" className="sidebar-link" title="Settings" onclick="switchView(event, 'settings')">
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      
      <div style={{ "borderTop": "1px solid var(--color-gray-900)", "paddingTop": "16px" }}>
        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "position": "relative" }}>
          <button id="theme-toggle-btn" className="sidebar-link" title="Toggle Theme" style={{ "background": "transparent", "border": "none", "width": "calc(100% - 32px)", "textAlign": "left", "cursor": "pointer", "display": "flex", "alignItems": "center", "gap": "12px", "padding": "12px 0" }}>
            <svg id="theme-icon" className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <span id="theme-text">Light Mode</span>
          </button>
          <button id="theme-settings-btn" style={{ "background": "transparent", "border": "none", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "8px", "borderRadius": "8px", "color": "var(--color-gray-400)", "transition": "color 0.2s", "outline": "none" }} title="Theme Transition Options">
            <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ "width": "18px", "height": "18px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <a href="/" className="sidebar-link" title="Sign Out" style={{ "marginTop": "8px" }}>
          <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span>Sign Out</span>
        </a>
      </div>
    </aside>

    {/* Main Content */}
    <main className="dash-main">
      
      {/* VIEW 1: Dashboard View (Default) */}
      <div id="view-dashboard" className="dash-view-panel">
        <header className="dash-header">
          <div>
            <h2 style={{ "fontSize": "28px" }}>Dashboard</h2>
            <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Welcome back, <span id="dash-username-display" style={{ "fontWeight": "600", "color": "var(--color-white)" }}>ganeshabbu03</span>. Ready to start coding?</span>
          </div>
          
          <div className="dash-header-right">
            {/* Profile Dropdown Component */}
            <div className="profile-dropdown-container" id="profile-dropdown">
              <div className="profile-dropdown-group">
                <button className="profile-trigger-btn" type="button" id="profile-trigger">
                  <div className="profile-trigger-text">
                    <div className="profile-trigger-name">Eugene An</div>
                    <div className="profile-trigger-email">eugene@kokonutui.com</div>
                  </div>
                  <div className="profile-trigger-avatar-wrap">
                    <div className="profile-trigger-avatar-gradient">
                      <div className="profile-trigger-avatar-inner" id="profile-trigger-avatar-inner">
                        {/* Loaded dynamically */}
                      </div>
                    </div>
                  </div>
                </button>
                
                {/* Bending line indicator */}
                <div className="profile-bending-indicator" id="profile-bending-indicator">
                  <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 12 24" width="12">
                    <path d="M2 4C6 8 6 16 2 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                  </svg>
                </div>
                
                {/* Dropdown Menu Content */}
                <div className="profile-dropdown-content" id="profile-dropdown-content">
                  <div className="profile-menu-items">
                    <a className="profile-menu-item" href="#" onclick="switchView(event, 'profile')">
                      <div className="profile-item-left">
                        <svg className="profile-item-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span className="profile-item-label">Profile</span>
                      </div>
                    </a>
                    
                    <a className="profile-menu-item" href="#">
                      <div className="profile-item-left">
                        <svg className="profile-item-icon model-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a1 1 0 0 1 1 .83l.26 2.37A6.9 6.9 0 0 0 18.8 10.74l2.37.26a1 1 0 0 1 0 2l-2.37.26a6.9 6.9 0 0 0-5.54 5.54l-.26 2.37a1 1 0 0 1-2 0l-.26-2.37a6.9 6.9 0 0 0-5.54-5.54l-2.37-.26a1 1 0 0 1 0-2l2.37-.26A6.9 6.9 0 0 0 10.74 5.2l.26-2.37A1 1 0 0 1 12 2z"/></svg>
                        <span className="profile-item-label">Model</span>
                      </div>
                      <div className="profile-item-right">
                        <span className="profile-badge badge-model">Gemini 2.0 Flash</span>
                      </div>
                    </a>
                    
                    <a className="profile-menu-item" href="#">
                      <div className="profile-item-left">
                        <svg className="profile-item-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        <span className="profile-item-label">Subscription</span>
                      </div>
                      <div className="profile-item-right">
                        <span className="profile-badge badge-sub">PRO</span>
                      </div>
                    </a>
                    
                    <a className="profile-menu-item" href="#" onclick="switchView(event, 'settings')">
                      <div className="profile-item-left">
                        <svg className="profile-item-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
                        <span className="profile-item-label">Settings</span>
                      </div>
                    </a>
                    
                    <a className="profile-menu-item" href="#">
                      <div className="profile-item-left">
                        <svg className="profile-item-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        <span className="profile-item-label">Terms & Policies</span>
                      </div>
                    </a>
                  </div>
                  
                  <div className="profile-menu-separator"></div>
                  
                  <button className="profile-signout-btn" type="button" onclick="location.href='/'">
                    <svg className="profile-signout-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Top Metric Indicators Grid */}
        <div className="dash-metrics-grid" style={{ "marginTop": "24px" }}>
          {/* Problems Solved */}
          <div className="dash-card metric-card">
            <div className="metric-icon-wrap">
              <svg style={{ "width": "20px", "height": "20px", "color": "#3b82f6" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
            <div style={{ "display": "flex", "flexDirection": "column" }}>
              <span className="metric-value" style={{ "fontSize": "22px", "fontWeight": "700", "color": "var(--color-white)", "lineHeight": "1.1" }} id="dash-stat-solved">0</span>
              <span className="metric-label" style={{ "fontSize": "12px", "color": "var(--color-gray-500)", "marginTop": "4px" }}>Problems Solved</span>
            </div>
          </div>

          {/* Current Streak */}
          <div className="dash-card metric-card">
            <div className="metric-icon-wrap">
              <svg style={{ "width": "20px", "height": "20px", "color": "#ff6b00" }} fill="currentColor" viewBox="0 0 24 24"><path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.08-2.15-1.64-1.24-.98-2-2.43-2.03-4.04-.01-.41-.05-.85-.18-1.24-.16-.48-.55-.86-1.06-.94-.52-.08-1.04.14-1.34.57C8.62 5.3 7.8 7.37 7.8 9.5c0 .32.03.63.07.94-1.36-.61-2.18-1.89-2.28-3.34 0-.1-.08-.18-.18-.18h-.06c-.32.02-.64.15-.87.38-1.74 1.74-2.82 4.14-2.82 6.8 0 5.47 4.43 9.9 9.9 9.9 5.47 0 9.9-4.43 9.9-9.9 0-3.39-1.7-6.39-4.3-8.2z"/></svg>
            </div>
            <div style={{ "display": "flex", "flexDirection": "column" }}>
              <span className="metric-value" style={{ "fontSize": "22px", "fontWeight": "700", "color": "var(--color-white)", "lineHeight": "1.1" }} id="dash-stat-streak">0 days</span>
              <span className="metric-label" style={{ "fontSize": "12px", "color": "var(--color-gray-500)", "marginTop": "4px" }}>Current Streak</span>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="dash-card metric-card">
            <div className="metric-icon-wrap">
              <svg style={{ "width": "20px", "height": "20px", "color": "#ffd700" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 00-4 4v3H5V6a1 1 0 00-1-1H3a1 1 0 00-1 1v6a5 5 0 005 5h1v2H6v2h12v-2h-2v-2h1a5 5 0 005-5V6a1 1 0 00-1-1h-1a1 1 0 00-1 1v3h-3V6a4 4 0 00-4-4z"/></svg>
            </div>
            <div style={{ "display": "flex", "flexDirection": "column" }}>
              <span className="metric-value" style={{ "fontSize": "22px", "fontWeight": "700", "color": "var(--color-white)", "lineHeight": "1.1" }} id="dash-stat-badges">0</span>
              <span className="metric-label" style={{ "fontSize": "12px", "color": "var(--color-gray-500)", "marginTop": "4px" }}>Badges Earned</span>
            </div>
          </div>

          {/* Global Rank */}
          <div className="dash-card metric-card">
            <div className="metric-icon-wrap">
              <svg style={{ "width": "20px", "height": "20px", "color": "#10b981" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <div style={{ "display": "flex", "flexDirection": "column" }}>
              <span className="metric-value" style={{ "fontSize": "22px", "fontWeight": "700", "color": "var(--color-white)", "lineHeight": "1.1" }} id="dash-stat-rank">Unranked</span>
              <span className="metric-label" style={{ "fontSize": "12px", "color": "var(--color-gray-500)", "marginTop": "4px" }}>Global Rank</span>
            </div>
          </div>
        </div>

        {/* Middle Row Grid */}
        <div className="dash-grid">
          {/* Language Progress */}
          <section className="dash-card">
            <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ "width": "18px", "height": "18px" }}><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>
              Language Progress
            </h3>
            
            <div className="language-progress-list" style={{ "marginTop": "15px" }}>
              {/* Python */}
              <div className="lang-item">
                <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "14px", "color": "var(--color-gray-300)", "fontWeight": "600" }}>
                  <span>Python</span>
                  <span id="dash-lang-pct-python">0%</span>
                </div>
                <div className="progress-track" style={{ "height": "6px", "background": "rgba(255,255,255,0.03)", "borderRadius": "3px", "overflow": "hidden", "marginTop": "6px" }}>
                  <div className="progress-fill" id="dash-lang-fill-python" style={{ "width": "0%", "background": "#3b82f6", "height": "100%", "transition": "width 0.4s ease" }}></div>
                </div>
              </div>
              
              {/* JavaScript */}
              <div className="lang-item">
                <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "14px", "color": "var(--color-gray-300)", "fontWeight": "600" }}>
                  <span>JavaScript</span>
                  <span id="dash-lang-pct-javascript">0%</span>
                </div>
                <div className="progress-track" style={{ "height": "6px", "background": "rgba(255,255,255,0.03)", "borderRadius": "3px", "overflow": "hidden", "marginTop": "6px" }}>
                  <div className="progress-fill" id="dash-lang-fill-javascript" style={{ "width": "0%", "background": "#f59e0b", "height": "100%", "transition": "width 0.4s ease" }}></div>
                </div>
              </div>
              
              {/* Java */}
              <div className="lang-item">
                <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "14px", "color": "var(--color-gray-300)", "fontWeight": "600" }}>
                  <span>Java</span>
                  <span id="dash-lang-pct-java">0%</span>
                </div>
                <div className="progress-track" style={{ "height": "6px", "background": "rgba(255,255,255,0.03)", "borderRadius": "3px", "overflow": "hidden", "marginTop": "6px" }}>
                  <div className="progress-fill" id="dash-lang-fill-java" style={{ "width": "0%", "background": "#ef4444", "height": "100%", "transition": "width 0.4s ease" }}></div>
                </div>
              </div>
              
              {/* C++ */}
              <div className="lang-item">
                <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "14px", "color": "var(--color-gray-300)", "fontWeight": "600" }}>
                  <span>C++</span>
                  <span id="dash-lang-pct-cpp">0%</span>
                </div>
                <div className="progress-track" style={{ "height": "6px", "background": "rgba(255,255,255,0.03)", "borderRadius": "3px", "overflow": "hidden", "marginTop": "6px" }}>
                  <div className="progress-fill" id="dash-lang-fill-cpp" style={{ "width": "0%", "background": "#10b981", "height": "100%", "transition": "width 0.4s ease" }}></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Getting Started Checklist */}
          <section className="dash-card">
            <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ "width": "18px", "height": "18px" }}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              Getting Started
            </h3>
            
            <ul className="checklist-list">
              <li className="checklist-item" id="chk-item-practice" onclick="switchView(event, 'practice')">
                <div className="checkbox-circle" id="chk-circle-practice"></div>
                <span>Solve first practice problem</span>
              </li>
              <li className="checklist-item" id="chk-item-profile" onclick="switchView(event, 'profile')">
                <div className="checkbox-circle" id="chk-circle-profile"></div>
                <span>Setup your profile</span>
              </li>
              <li className="checklist-item" id="chk-item-learning" onclick="switchView(event, 'learning')">
                <div className="checkbox-circle" id="chk-circle-learning"></div>
                <span>Start a learning track</span>
              </li>
              <li className="checklist-item" id="chk-item-community" onclick="switchView(event, 'community')">
                <div className="checkbox-circle" id="chk-circle-community"></div>
                <span>Join the community</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom Row Grid */}
        <div className="dash-grid">
          {/* Recent Activity */}
          <section className="dash-card" style={{ "display": "flex", "flexDirection": "column", "minHeight": "200px" }}>
            <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>
              <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ "width": "18px", "height": "18px" }}><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Recent Activity
            </h3>
            
            <div id="dash-activity-container" style={{ "flexGrow": "1", "display": "flex", "flexDirection": "column" }}>
              {/* Populated dynamically or shows empty state */}
            </div>
          </section>
          
          {/* Right Column Widgets: Stacking Topic Coverage and To-Do List */}
          <div style={{ "display": "flex", "flexDirection": "column", "gap": "30px" }}>
            {/* Topic Coverage */}
            <section className="dash-card">
              <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>
                <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ "width": "18px", "height": "18px" }}><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>
                Topic Coverage
              </h3>
              
              <div className="topic-coverage-wrap">
                {/* Arrays */}
                <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "8px" }}>
                  <div className="circle-progress-container">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
                      <circle id="circle-arrays" cx="40" cy="40" r="32" stroke="#3b82f6" strokeWidth="6" fill="none"
                              stroke-dasharray="201" stroke-dashoffset="201" strokeLinecap="round" transform="rotate(-90 40 40)" style={{ "transition": "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "13px", "fontWeight": "700", "color": "var(--color-white)" }} id="text-arrays">0%</div>
                  </div>
                  <span style={{ "fontSize": "13px", "color": "var(--color-gray-400)", "fontWeight": "500" }}>Arrays</span>
                </div>

                {/* Strings */}
                <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "8px" }}>
                  <div className="circle-progress-container">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
                      <circle id="circle-strings" cx="40" cy="40" r="32" stroke="#8b5cf6" strokeWidth="6" fill="none"
                              stroke-dasharray="201" stroke-dashoffset="201" strokeLinecap="round" transform="rotate(-90 40 40)" style={{ "transition": "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "13px", "fontWeight": "700", "color": "var(--color-white)" }} id="text-strings">0%</div>
                  </div>
                  <span style={{ "fontSize": "13px", "color": "var(--color-gray-400)", "fontWeight": "500" }}>Strings</span>
                </div>

                {/* Trees */}
                <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "8px" }}>
                  <div className="circle-progress-container">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
                      <circle id="circle-trees" cx="40" cy="40" r="32" stroke="#10b981" strokeWidth="6" fill="none"
                              stroke-dasharray="201" stroke-dashoffset="201" strokeLinecap="round" transform="rotate(-90 40 40)" style={{ "transition": "stroke-dashoffset 0.6s ease" }} />
                    </svg>
                    <div style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "13px", "fontWeight": "700", "color": "var(--color-white)" }} id="text-trees">0%</div>
                  </div>
                  <span style={{ "fontSize": "13px", "color": "var(--color-gray-400)", "fontWeight": "500" }}>Trees</span>
                </div>
              </div>
            </section>

            {/* To-Do List Card */}
            <section className="dash-card">
              <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>
                <svg className="oauth-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ "width": "18px", "height": "18px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                To-Do List
              </h3>
              
              <div style={{ "display": "flex", "gap": "10px", "marginBottom": "16px" }}>
                <input type="text" id="todo-new-task" className="todo-input" style={{ "flex": "1", "boxSizing": "border-box", "padding": "10px 12px", "fontSize": "13.5px" }} placeholder="Add a new task...">
                <button id="todo-add-button" className="todo-add-btn" style={{ "padding": "10px 18px", "fontSize": "13px", "borderRadius": "6px", "cursor": "pointer" }}>Add</button>
              </div>
              
              <ul id="todo-list-container" className="todo-list" style={{ "padding": "0", "margin": "0" }}>
                {/* Dynamically populated */}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* VIEW 2: AI Assistant View (Hidden by default) */}
      <div id="view-ai-assistant" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <div className="ai-assistant-container" id="ai-container">
          {/* Wave Video Loop background overlay */}
          <video id="ai-bg-video" src="/A_close_up_shot_of_a_single_wa.mp4" loop muted playsinline className="ai-bg-video"></video>
          
          {/* Landing Interface (shown in initial state) */}
          <div className="ai-landing-wrapper" id="ai-landing">
            <h1 className="ai-hero-title">Build something Secure</h1>
            <p className="ai-hero-subtitle">Create secure apps and optimize algorithms by chatting with AI</p>
          </div>
          
          {/* Message history (shown in active chat state) */}
          <div className="ai-chat-thread-container" id="ai-messages">
            {/* Messages populated dynamically */}
          </div>
          
          {/* Input Box */}
          <div className="ai-input-container">
            <div id="ai-attachment-preview"></div>
            <textarea id="ai-chat-input" className="ai-chat-textarea" placeholder="Ask Vericode to audit, optimize, or write code..." rows="1"></textarea>
            <div id="ai-custom-caret" className="ai-custom-caret"></div>
            
            <div className="ai-input-actions">
              <div className="ai-input-left">
                <button className="ai-action-btn" title="Add files or code" onclick="triggerAttachment()">
                  <svg className="icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                </button>
                <input type="file" id="ai-file-input" style={{ "display": "none" }} onchange="handleFileSelected(event)">
              </div>
              
              <div className="ai-input-right">
                <div className="ai-plan-selector" id="ai-plan-mode-btn" onclick="togglePlanMode()">
                  <span>Plan</span>
                  <svg className="icon-chevron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                </div>
                
                <button className="ai-action-btn" id="ai-mic-btn" title="Voice Input" onclick="triggerSpeechInput()">
                  <svg className="icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                  </svg>
                </button>
                
                <button className="ai-action-btn animated-volume-btn muted" id="ai-speech-btn" title="Enable Speech Output" onclick="toggleSpeechOutput()">
                  <div className="volume-icon-wrapper" style={{ "position": "relative", "width": "16px", "height": "16px", "display": "flex", "alignItems": "center", "justifyContent": "center", "transformOrigin": "center" }}>
                    <svg viewBox="0 0 24 24" style={{ "width": "16px", "height": "16px", "fill": "currentColor" }}>
                      <path stroke="none" d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                      <g className="sound-waves" style={{ "stroke": "currentColor", "strokeWidth": "2.2", "strokeLinecap": "round", "strokeLinejoin": "round", "fill": "none", "transition": "opacity 0.2s ease" }}>
                        <path d="M16 9a5 5 0 0 1 0 6" className="wave-inner" />
                        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" className="wave-outer" />
                      </g>
                    </svg>
                    {/* Slash Strike-through */}
                    <div className="volume-slash-container" style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center", "transform": "rotate(-40deg)", "pointerEvents": "none" }}>
                      <div className="volume-slash-track" style={{ "height": "15px", "width": "3.5px", "borderRadius": "9999px", "background": "rgba(18, 18, 18, 0.95)", "display": "flex", "alignItems": "center", "justifyContent": "center", "transformOrigin": "top", "transform": "scaleY(0)", "transition": "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                        <div style={{ "height": "100%", "width": "1.5px", "background": "currentColor", "borderRadius": "9999px" }}></div>
                      </div>
                    </div>
                  </div>
                </button>

                <button className="ai-send-btn" id="ai-chat-send-btn">
                  <svg className="icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Suggestion Cards */}
          <div className="ai-suggestions-list" id="ai-suggestions">
            <div className="ai-suggestion-card" onclick="useSuggestion('🛡️ Scan login handler for OWASP security flaws')">
              <span className="ai-suggest-icon">🛡️</span>
              <div className="ai-suggest-text">Scan login handler for OWASP security flaws</div>
            </div>
            <div className="ai-suggestion-card" onclick="useSuggestion('⚡ Optimize Two Sum using Hash Map')">
              <span className="ai-suggest-icon">⚡</span>
              <div className="ai-suggest-text">Optimize Two Sum using Hash Map</div>
            </div>
            <div className="ai-suggestion-card" onclick="useSuggestion('🔍 Explain dynamic programming recursion vs memoization')">
              <span className="ai-suggest-icon">🔍</span>
              <div className="ai-suggest-text">Explain DP recursion vs memoization</div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 3: Code Sandbox View (Hidden by default) */}
      <div id="view-code-sandbox" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <header className="dash-header">
          <div>
            <h2 style={{ "fontSize": "28px" }}>Interactive Code Sandbox</h2>
            <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Compile and test secure algorithms in real-time</span>
          </div>
        </header>
        
        <div className="dash-card" style={{ "minHeight": "480px", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "background": "#0c0c0c", "border": "1px dashed var(--color-gray-800)", "borderRadius": "12px", "textAlign": "center", "padding": "40px", "marginTop": "20px" }}>
          <div style={{ "background": "rgba(255,255,255,0.03)", "border": "1px solid rgba(255,255,255,0.08)", "width": "80px", "height": "80px", "borderRadius": "50%", "display": "flex", "alignItems": "center", "justifyContent": "center", "marginBottom": "24px" }}>
            <svg className="oauth-icon" style={{ "width": "40px", "height": "40px", "color": "var(--color-gray-400)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <h3 style={{ "fontSize": "24px", "marginBottom": "12px", "color": "var(--color-white)" }}>Cloud Sandbox IDE</h3>
          <p style={{ "color": "var(--color-gray-400)", "maxWidth": "480px", "fontSize": "14px", "lineHeight": "1.6", "marginBottom": "30px" }}>
            Our upcoming Phase 2 secure sandbox compile environment is currently in development. Run automated scans and verify code snippets using the integrated <b>AI Assistant</b> in the menu.
          </p>
          <button className="todo-add-btn" onclick="switchView(event, 'ai-assistant')" style={{ "padding": "12px 24px", "borderRadius": "6px" }}>Go to AI Assistant</button>
        </div>
      </div>

      {/* VIEW 4: Learning View (Hidden by default) */}
      <div id="view-learning" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        {/* A. Course Catalog View */}
        <div id="learning-catalog" style={{ "display": "flex", "flexDirection": "column", "height": "100%", "overflowY": "auto" }}>
          <header className="dash-header">
            <div>
              <h2 style={{ "fontSize": "28px" }}>Learning Hub</h2>
              <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Master secure coding practices and algorithm design</span>
            </div>
          </header>
          
          <div className="dash-grid" style={{ "marginTop": "20px", "display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "24px" }}>
            <section className="dash-card">
              <h3>📖 Active Learning Path</h3>
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "20px", "marginTop": "15px" }}>
                <div>
                  <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "14px", "marginBottom": "8px" }}>
                    <span style={{ "fontWeight": "600", "color": "var(--color-white)" }}>OWASP Top 10 Security Mitigations</span>
                    <span>4/10 Lessons Completed</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ "width": "40%" }}></div>
                  </div>
                </div>
                <p style={{ "fontSize": "13px", "color": "var(--color-gray-400)", "lineHeight": "1.5" }}>
                  Current Lesson: <b>Mitigating Broken Object Level Authorization (BOLA)</b>. Learn how to validate that users only access resource identifiers belonging strictly to their account context.
                </p>
                <button className="todo-add-btn" style={{ "width": "fit-content", "padding": "10px 20px", "borderRadius": "6px" }} onclick="switchView(event, 'ai-assistant'); useSuggestion('🛡️ Scan login handler for OWASP security flaws')">Resume Lesson</button>
              </div>
            </section>
            
            <section className="dash-card">
              <h3>📘 Locked Courses</h3>
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "16px", "marginTop": "15px", "fontSize": "13px", "color": "var(--color-gray-400)" }}>
                <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "1px solid #1a1a1a", "paddingBottom": "8px" }}>
                  <span>🔒 Secure Session Management & JWT Signing</span>
                  <span style={{ "color": "var(--color-gray-600)" }}>Requires Path 1</span>
                </div>
                <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "1px solid #1a1a1a", "paddingBottom": "8px" }}>
                  <span>🔒 Buffer Overflow Audits in C/C++</span>
                  <span style={{ "color": "var(--color-gray-600)" }}>Requires Path 1</span>
                </div>
                <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
                  <span>🔒 Cryptographic Implementations (Argon2, AES)</span>
                  <span style={{ "color": "var(--color-gray-600)" }}>Requires Path 2</span>
                </div>
              </div>
            </section>
          </div>

          {/* B. Programming Languages Course Sections */}
          <div style={{ "marginTop": "40px", "marginBottom": "40px" }}>
            <h3 style={{ "fontSize": "20px", "fontFamily": "var(--font-display)", "marginBottom": "16px", "color": "var(--color-white)" }}>💻 Programming Language Courses</h3>
            <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(220px, 1fr))", "gap": "20px" }}>
              
              {/* Python Card */}
              <div className="dash-card audience-card" onclick="openLanguageCourse('python')" style={{ "cursor": "pointer", "display": "flex", "flexDirection": "column", "justifyContent": "space-between", "height": "160px", "padding": "24px", "transition": "all 0.3s ease", "position": "relative" }}>
                <div>
                  <span style={{ "fontSize": "24px", "display": "block", "marginBottom": "8px" }}>🐍</span>
                  <h4 style={{ "fontSize": "18px", "color": "var(--color-white)" }}>Python Course</h4>
                </div>
                <span style={{ "fontSize": "11px", "color": "var(--color-gray-500)" }}>3 Chapters • Basic to Advanced</span>
              </div>

              {/* JavaScript Card */}
              <div className="dash-card audience-card" onclick="openLanguageCourse('javascript')" style={{ "cursor": "pointer", "display": "flex", "flexDirection": "column", "justifyContent": "space-between", "height": "160px", "padding": "24px", "transition": "all 0.3s ease", "position": "relative" }}>
                <div>
                  <span style={{ "fontSize": "24px", "display": "block", "marginBottom": "8px" }}>🟨</span>
                  <h4 style={{ "fontSize": "18px", "color": "var(--color-white)" }}>JavaScript Course</h4>
                </div>
                <span style={{ "fontSize": "11px", "color": "var(--color-gray-500)" }}>3 Chapters • Basic to Advanced</span>
              </div>

              {/* C++ Card */}
              <div className="dash-card audience-card" onclick="openLanguageCourse('cpp')" style={{ "cursor": "pointer", "display": "flex", "flexDirection": "column", "justifyContent": "space-between", "height": "160px", "padding": "24px", "transition": "all 0.3s ease", "position": "relative" }}>
                <div>
                  <span style={{ "fontSize": "24px", "display": "block", "marginBottom": "8px" }}>🔵</span>
                  <h4 style={{ "fontSize": "18px", "color": "var(--color-white)" }}>C++ Course</h4>
                </div>
                <span style={{ "fontSize": "11px", "color": "var(--color-gray-500)" }}>3 Chapters • Basic to Advanced</span>
              </div>

              {/* Java Card */}
              <div className="dash-card audience-card" onclick="openLanguageCourse('java')" style={{ "cursor": "pointer", "display": "flex", "flexDirection": "column", "justifyContent": "space-between", "height": "160px", "padding": "24px", "transition": "all 0.3s ease", "position": "relative" }}>
                <div>
                  <span style={{ "fontSize": "24px", "display": "block", "marginBottom": "8px" }}>☕</span>
                  <h4 style={{ "fontSize": "18px", "color": "var(--color-white)" }}>Java Course</h4>
                </div>
                <span style={{ "fontSize": "11px", "color": "var(--color-gray-500)" }}>3 Chapters • Basic to Advanced</span>
              </div>

            </div>
          </div>
        </div>

        {/* C. Detailed Course Viewer (Hidden by default) */}
        <div id="learning-course-viewer" style={{ "display": "none", "flexDirection": "column", "height": "100%" }}>
          <header className="dash-header" style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "16px", "marginBottom": "10px" }}>
            <div style={{ "display": "flex", "alignItems": "center", "gap": "16px" }}>
              <button className="opt-btn" onclick="backToLearningCatalog()" style={{ "padding": "6px 12px", "fontWeight": "600", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px" }}>
                ← Back
              </button>
              <div>
                <h2 id="course-viewer-title" style={{ "fontSize": "24px" }}>Python Course</h2>
                <span id="course-viewer-subtitle" style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Full Syllabus • Basic to Advanced</span>
              </div>
            </div>
            <div className="progress-track" style={{ "width": "150px", "height": "6px" }}>
              <div id="course-viewer-progress-fill" className="progress-fill" style={{ "width": "0%" }}></div>
            </div>
          </header>

          <div className="learning-viewer-grid" style={{ "marginTop": "20px" }}>
            {/* Left panel: syllabus topic nodes */}
            <div className="learning-syllabus-panel" style={{ "background": "rgba(255,255,255,0.01)", "border": "1px solid rgba(255,255,255,0.05)", "borderRadius": "8px", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "12px" }}>
              <h4 style={{ "fontSize": "11px", "textTransform": "uppercase", "color": "var(--color-gray-500)", "letterSpacing": "0.1em", "marginBottom": "8px" }}>Syllabus</h4>
              <div id="course-syllabus-nodes" style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {/* Syllabus tabs rendered here */}
              </div>
            </div>

            {/* Right panel: detailed lesson display */}
            <div className="learning-lesson-panel" style={{ "background": "rgba(255,255,255,0.02)", "border": "1px solid rgba(255,255,255,0.05)", "borderRadius": "8px", "padding": "24px", "display": "flex", "flexDirection": "column", "gap": "20px" }}>
              <div id="lesson-content-pane">
                {/* Detailed lesson rendered here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 5: Practice View (Hidden by default) */}
      <div id="view-practice" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <header className="dash-header">
          <div>
            <h2 style={{ "fontSize": "28px" }}>Practice Problems</h2>
            <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Find security loopholes and write optimal algorithms</span>
          </div>
        </header>
        
        {/* Search & Filter Controls */}
        <div style={{ "display": "flex", "gap": "16px", "flexWrap": "wrap", "marginBottom": "24px", "alignItems": "center", "marginTop": "20px" }}>
          {/* Search Input */}
          <div style={{ "position": "relative", "flexGrow": "1", "maxWidth": "320px" }}>
            <input type="text" id="practice-search" className="todo-input" style={{ "paddingLeft": "36px", "width": "100%" }} placeholder="Search problems...">
            <svg className="oauth-icon" style={{ "position": "absolute", "left": "12px", "top": "12px", "width": "16px", "height": "16px", "color": "var(--color-gray-500)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Difficulty Filter Buttons */}
          <div style={{ "display": "flex", "gap": "6px" }} id="practice-difficulty-filters">
            <button className="opt-btn active" data-difficulty="all">All</button>
            <button className="opt-btn" data-difficulty="easy" style={{ "color": "#10b981", "borderColor": "rgba(16, 185, 129, 0.2)" }}>Easy</button>
            <button className="opt-btn" data-difficulty="medium" style={{ "color": "#f59e0b", "borderColor": "rgba(245, 158, 11, 0.2)" }}>Medium</button>
            <button className="opt-btn" data-difficulty="hard" style={{ "color": "#ef4444", "borderColor": "rgba(239, 68, 68, 0.2)" }}>Hard</button>
          </div>
          {/* Status Filter Buttons */}
          <div style={{ "display": "flex", "gap": "6px" }} id="practice-status-filters">
            <button className="opt-btn active" data-status="all">All Status</button>
            <button className="opt-btn" data-status="solved">Solved</button>
            <button className="opt-btn" data-status="todo">Todo</button>
          </div>
        </div>

        <div className="dash-card" style={{ "padding": "20px", "overflowX": "auto", "marginTop": "10px" }}>
          <table style={{ "width": "100%", "borderCollapse": "collapse", "fontSize": "14px", "textAlign": "left" }} id="practice-problems-table">
            <thead>
              <tr style={{ "borderBottom": "1px solid var(--color-gray-900)", "color": "var(--color-gray-500)", "fontWeight": "600" }}>
                <th style={{ "padding": "12px 16px", "width": "60px", "textAlign": "center" }}>Status</th>
                <th style={{ "padding": "12px 16px" }}>Title</th>
                <th style={{ "padding": "12px 16px" }}>Topics</th>
                <th style={{ "padding": "12px 16px", "width": "120px" }}>Acceptance</th>
                <th style={{ "padding": "12px 16px", "width": "120px" }}>Difficulty</th>
                <th style={{ "padding": "12px 16px", "width": "140px", "textAlign": "right" }}>Action</th>
              </tr>
            </thead>
            <tbody id="practice-problems-body">
              {/* Dynamically generated rows */}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW 5.5: LeetCode Problem Workspace View (Hidden by default) */}
      <div id="view-problem-workspace" className="dash-view-panel" style={{ "display": "none", "height": "100%", "padding": "0" }}>
        <div className="problem-workspace">
          {/* Header */}
          <div className="workspace-header">
            <div style={{ "display": "flex", "alignItems": "center", "gap": "12px" }}>
              <button className="todo-add-btn" onclick="exitProblemWorkspace()" style={{ "padding": "6px 12px", "fontSize": "13px", "display": "flex", "alignItems": "center", "gap": "6px", "background": "transparent", "borderColor": "rgba(255,255,255,0.15)", "color": "var(--color-white)", "borderRadius": "6px", "cursor": "pointer" }}>
                <svg style={{ "width": "14px", "height": "14px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                Back to Problems
              </button>
              <h3 id="workspace-title" style={{ "fontSize": "16px", "margin": "0", "color": "var(--color-white)", "fontWeight": "600", "fontFamily": "var(--font-display)" }}>1. Two Sum</h3>
              <span id="workspace-difficulty" className="diff-badge-easy">Easy</span>
            </div>
            
            <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
              <button className="todo-add-btn" id="workspace-run-btn" onclick="runWorkspaceCode()" style={{ "padding": "6px 14px", "fontSize": "13px", "background": "rgba(255,255,255,0.05)", "borderColor": "rgba(255,255,255,0.1)", "color": "var(--color-gray-300)", "borderRadius": "6px", "cursor": "pointer" }}>Run</button>
              <button className="todo-add-btn" id="workspace-submit-btn" onclick="submitWorkspaceCode()" style={{ "padding": "6px 14px", "fontSize": "13px", "background": "#10b981", "borderColor": "#10b981", "color": "white", "borderRadius": "6px", "cursor": "pointer" }}>Submit</button>
            </div>
          </div>
          
          {/* Workspace Body */}
          <div className="workspace-body">
            
            {/* Left Pane: Problem Details & Tabs */}
            <div className="workspace-pane">
              <div className="workspace-tabs">
                <button className="workspace-tab active" id="tab-btn-desc" onclick="switchWorkspaceTab('desc')">Description</button>
                <button className="workspace-tab" id="tab-btn-hints" onclick="switchWorkspaceTab('hints')">AI Help</button>
                <button className="workspace-tab" id="tab-btn-solutions" onclick="switchWorkspaceTab('solutions')">Solutions</button>
                <button className="workspace-tab" id="tab-btn-submissions" onclick="switchWorkspaceTab('submissions')">Submissions</button>
              </div>
              
              {/* Description Content */}
              <div id="workspace-tab-desc" className="workspace-content">
                <div style={{ "display": "flex", "gap": "8px", "alignItems": "center", "marginBottom": "16px", "fontSize": "13px", "color": "var(--color-gray-400)" }}>
                  <span>Acceptance Rate: <strong id="workspace-acceptance" style={{ "color": "var(--color-white)" }}>50.1%</strong></span>
                  <span>•</span>
                  <span>Topics: <span id="workspace-topics" style={{ "display": "inline-flex", "gap": "4px" }}></span></span>
                </div>
                <div id="workspace-description-text" style={{ "fontSize": "14px", "lineHeight": "1.6", "color": "var(--color-gray-200)", "marginBottom": "24px" }}>
                  {/* Dynamically populated */}
                </div>
                <div id="workspace-examples-container" style={{ "display": "flex", "flexDirection": "column", "gap": "16px", "marginBottom": "24px" }}>
                  {/* Example Case details */}
                </div>
                <div style={{ "borderTop": "1px solid rgba(255,255,255,0.06)", "paddingTop": "16px" }}>
                  <h4 style={{ "fontSize": "13px", "marginBottom": "8px", "color": "var(--color-white)" }}>Constraints</h4>
                  <ul id="workspace-constraints" style={{ "margin": "0", "paddingLeft": "20px", "fontSize": "13px", "lineHeight": "1.6", "color": "var(--color-gray-400)" }}>
                    {/* Constraints list */}
                  </ul>
                </div>
              </div>
              
              {/* AI Help Content */}
              <div id="workspace-tab-hints" className="workspace-content" style={{ "display": "none" }}>
                <div style={{ "background": "rgba(37, 99, 235, 0.05)", "border": "1px solid rgba(37, 99, 235, 0.2)", "padding": "14px", "borderRadius": "8px", "marginBottom": "20px" }}>
                  <h4 style={{ "fontSize": "14px", "marginBottom": "6px", "color": "#3b82f6", "display": "flex", "alignItems": "center", "gap": "6px", "fontFamily": "var(--font-display)" }}>
                    <svg style={{ "width": "16px", "height": "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                    Security & Optimization Advice
                  </h4>
                  <p style={{ "fontSize": "13px", "margin": "0", "lineHeight": "1.5", "color": "var(--color-gray-300)" }} id="workspace-security-hint">
                    Ensure memory safety checks or parameterized queries as necessary.
                  </p>
                </div>
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "12px" }}>
                  <button className="todo-add-btn" onclick="sendWorkspaceCodeToAI('explain')" style={{ "padding": "12px", "borderRadius": "6px", "justifyContent": "center", "display": "flex", "alignItems": "center", "gap": "6px", "cursor": "pointer", "width": "100%" }}>
                    Explain Code Logic
                  </button>
                  <button className="todo-add-btn" onclick="sendWorkspaceCodeToAI('audit')" style={{ "padding": "12px", "borderRadius": "6px", "justifyContent": "center", "display": "flex", "alignItems": "center", "gap": "6px", "borderColor": "rgba(239, 68, 68, 0.2)", "color": "#ef4444", "cursor": "pointer", "width": "100%" }}>
                    🛡️ Run Static Security Audit
                  </button>
                  <button className="todo-add-btn" onclick="sendWorkspaceCodeToAI('optimize')" style={{ "padding": "12px", "borderRadius": "6px", "justifyContent": "center", "display": "flex", "alignItems": "center", "gap": "6px", "borderColor": "rgba(245, 158, 11, 0.2)", "color": "#f59e0b", "cursor": "pointer", "width": "100%" }}>
                    Optimize Performance
                  </button>
                </div>
              </div>
              
              {/* Solutions Content */}
              <div id="workspace-tab-solutions" className="workspace-content" style={{ "display": "none" }}>
                <h4 style={{ "fontSize": "15px", "marginBottom": "10px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>Approach Explanation</h4>
                <div id="workspace-solution-explanation" style={{ "fontSize": "13.5px", "lineHeight": "1.6", "color": "var(--color-gray-300)", "marginBottom": "20px" }}>
                  {/* Solutions text */}
                </div>
                <h4 style={{ "fontSize": "14px", "marginBottom": "8px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>Reference Solution Code</h4>
                <pre style={{ "background": "rgba(0,0,0,0.25)", "padding": "14px", "borderRadius": "6px", "border": "1px solid rgba(255,255,255,0.05)", "fontFamily": "var(--font-code)", "fontSize": "12.5px", "color": "var(--color-gray-200)", "margin": "0", "overflowX": "auto" }} id="workspace-solution-snippet"></pre>
              </div>
              
              {/* Submissions Content */}
              <div id="workspace-tab-submissions" className="workspace-content" style={{ "display": "none" }}>
                <div id="workspace-submissions-list" style={{ "display": "flex", "flexDirection": "column", "gap": "10px" }}>
                  {/* Dynamically loaded submission logs */}
                </div>
              </div>
            </div>
            
            {/* Right Pane: Code Editor & Console */}
            <div className="workspace-pane" style={{ "flex": "1.25" }}>
              {/* Editor Header */}
              <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "padding": "6px 12px", "backgroundColor": "#151515", "borderBottom": "1px solid #2d2d2d", "flexShrink": "0", "height": "38px", "boxSizing": "border-box" }}>
                <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                  <select id="workspace-language-select" onchange="changeWorkspaceLanguage()" style={{ "backgroundColor": "#2a2a2a", "color": "#fff", "border": "1px solid #3d3d3d", "borderRadius": "4px", "padding": "2px 8px", "fontSize": "12px", "outline": "none", "cursor": "pointer", "fontFamily": "var(--font-body)" }}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>
                </div>
                <button onclick="resetWorkspaceCode()" style={{ "background": "transparent", "border": "none", "color": "var(--color-gray-400)", "cursor": "pointer", "fontSize": "11px", "display": "flex", "alignItems": "center", "gap": "4px" }} title="Reset template">
                  <svg style={{ "width": "12px", "height": "12px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18v3"/></svg>
                  Reset
                </button>
              </div>
              
              {/* Code Editor Gutter & Textarea */}
              <div className="workspace-editor-area">
                <div className="workspace-line-numbers" id="editor-line-numbers">
                  <div>1</div>
                </div>
                <div className="workspace-textarea-wrapper">
                  <textarea className="workspace-textarea" id="workspace-code-textarea" oninput="onWorkspaceCodeInput()" onscroll="onWorkspaceCodeScroll()" spellcheck="false" wrap="off"></textarea>
                </div>
              </div>
              
              {/* Collapsible Console Panel */}
              <div className="workspace-console" id="workspace-console-panel" style={{ "height": "180px" }}>
                <div className="workspace-console-header" onclick="toggleWorkspaceConsole()">
                  <span style={{ "fontSize": "12px", "fontWeight": "600", "display": "flex", "alignItems": "center", "gap": "6px" }}>
                    <svg style={{ "width": "14px", "height": "14px", "color": "var(--color-gray-400)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3"/></svg>
                    Console
                  </span>
                  <svg id="console-arrow-icon" style={{ "width": "14px", "height": "14px", "transition": "transform 0.2s", "transform": "rotate(0deg)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </div>
                <div className="workspace-console-body" id="workspace-console-body">
                  {/* Console Tabs */}
                  <div style={{ "display": "flex", "gap": "10px", "borderBottom": "1px solid rgba(255,255,255,0.06)", "paddingBottom": "6px", "marginBottom": "8px" }}>
                    <button id="console-tab-btn-tc" className="workspace-tab active" onclick="switchConsoleTab('tc')" style={{ "padding": "4px 8px", "fontSize": "11px" }}>Testcase</button>
                    <button id="console-tab-btn-res" className="workspace-tab" onclick="switchConsoleTab('res')" style={{ "padding": "4px 8px", "fontSize": "11px" }}>Run Result</button>
                  </div>
                  
                  {/* Console Test Case Input */}
                  <div id="console-tab-tc-content" style={{ "display": "flex", "flexDirection": "column", "flex": "1" }}>
                    <span style={{ "fontSize": "11px", "color": "var(--color-gray-400)" }}>Input Parameters:</span>
                    <textarea id="console-testcase-input" className="testcase-param" rows="3" placeholder="nums = [2,7,11,15], target = 9"></textarea>
                  </div>
                  
                  {/* Console Run Result */}
                  <div id="console-tab-res-content" style={{ "display": "none", "flexDirection": "column", "flex": "1", "gap": "8px" }}>
                    <div id="console-run-loader" style={{ "display": "none", "alignItems": "center", "justifyContent": "center", "padding": "20px", "flexDirection": "column", "gap": "10px" }}>
                      <div className="voice-mic-glow" style={{ "width": "32px", "height": "32px", "borderTop": "2px solid #2563eb", "borderRadius": "50%", "animation": "spin 1s linear infinite" }}></div>
                      <span style={{ "fontSize": "12px", "color": "var(--color-gray-400)" }}>Compiling & running tests...</span>
                    </div>
                    <div id="console-run-output" style={{ "fontSize": "12px", "lineHeight": "1.5", "flex": "1" }}>
                      <div style={{ "color": "var(--color-gray-400)", "textAlign": "center", "padding": "20px" }}>
                        Click "Run" to test your solution.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
        </div>
      </div>
    </div>

      {/* VIEW 7.5: Settings View (Hidden by default) */}
      <div id="view-settings" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <header className="dash-header">
          <div>
            <h2 style={{ "fontSize": "28px" }}>Settings</h2>
          </div>
        </header>

        <div className="settings-layout">
          {/* Left column: Sidebar navigation tabs */}
          <div className="settings-sidebar">
            <button className="settings-nav-btn active" onclick="switchSettingsTab(this, 'public-profile')">
              <svg style={{ "width": "16px", "height": "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              Public profile
            </button>
            <button className="settings-nav-btn" onclick="switchSettingsTab(this, 'badges')">
              <svg style={{ "width": "16px", "height": "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
              My Badges
            </button>
            <button className="settings-nav-btn" onclick="switchSettingsTab(this, 'privacy-security')">
              <svg style={{ "width": "16px", "height": "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Privacy & Security
            </button>
            <button className="settings-nav-btn" onclick="switchSettingsTab(this, 'appearance')">
              <svg style={{ "width": "16px", "height": "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3M9.7 9.3L14 5.1M12 12.7l4.3-4.2M14.3 16l4.2-4.1"/></svg>
              Appearance
            </button>
            <button className="settings-nav-btn" onclick="switchSettingsTab(this, 'notifications')">
              <svg style={{ "width": "16px", "height": "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              Notifications
            </button>
          </div>

          {/* Right column: Main Settings Content card */}
          <div style={{ "display": "flex", "flexDirection": "column", "gap": "24px", "overflowY": "auto", "height": "100%", "paddingBottom": "40px" }} id="settings-panes-container">
            
            {/* Breadcrumb path */}
            <div style={{ "fontSize": "13.5px", "color": "var(--color-gray-400)" }}>
              your account <span style={{ "color": "var(--color-gray-600)", "margin": "0 4px" }}>/</span> <span style={{ "color": "var(--color-white)", "fontWeight": "500" }}>Your personal account</span>
            </div>

            {/* Tab Pane 1: Public Profile */}
            <div id="settings-pane-public-profile" className="settings-tab-pane">
              {/* Part A: Form Card */}
              <section className="dash-card" style={{ "marginBottom": "24px" }}>
                <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>Public profile</h3>
                
                <form id="settings-profile-form" onsubmit="saveSettingsProfile(event)">
                  {/* First Name and Last Name side by side */}
                  <div className="settings-form-grid">
                    <div className="settings-input-group">
                      <label htmlFor="settings-first-name">First Name</label>
                      <input type="text" id="settings-first-name" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="First name">
                    </div>
                    <div className="settings-input-group">
                      <label htmlFor="settings-last-name">Last Name</label>
                      <input type="text" id="settings-last-name" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="Last name">
                    </div>
                  </div>
                  
                  <div style={{ "fontSize": "11.5px", "color": "var(--color-gray-500)", "marginTop": "-10px", "marginBottom": "16px" }}>
                    Your name may appear around VeriCode AI where you contribute or are mentioned.
                  </div>

                  {/* Username input */}
                  <div className="settings-input-group">
                    <label htmlFor="settings-username">Username</label>
                    <input type="text" id="settings-username" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="@username" required>
                  </div>

                  {/* Public email input */}
                  <div className="settings-input-group">
                    <label htmlFor="settings-email">Public email</label>
                    <div style={{ "display": "flex", "gap": "10px", "alignItems": "center" }}>
                      <input type="email" id="settings-email" className="todo-input" style={{ "padding": "10px 12px", "flex": "1" }} placeholder="you@example.com" required>
                      <button type="button" className="opt-btn" style={{ "color": "#ef4444", "borderColor": "rgba(239,68,68,0.2)", "background": "rgba(239,68,68,0.02)", "padding": "10px 14px" }} onclick="document.getElementById('settings-email').value = ''">× Remove</button>
                    </div>
                    <span className="input-desc">You can manage verified email addresses in your <a href="#" style={{ "color": "#8b5cf6", "textDecoration": "none" }}>email settings</a>.</span>
                  </div>

                  {/* Phone number input */}
                  <div className="settings-input-group">
                    <label htmlFor="settings-phone">Phone number</label>
                    <div style={{ "display": "flex", "gap": "10px", "alignItems": "center" }}>
                      <input type="text" id="settings-phone" className="todo-input" style={{ "padding": "10px 12px", "flex": "1" }} placeholder="+1 (US/CA)">
                      <div style={{ "width": "32px", "height": "32px", "borderRadius": "6px", "border": "1px solid rgba(255,255,255,0.06)", "background": "rgba(255,255,255,0.02)" }}></div>
                    </div>
                    <span className="input-desc">Your phone number is used for account recovery and important alerts. It will not be displayed publicly.</span>
                  </div>

                  {/* Bio input */}
                  <div className="settings-input-group">
                    <label htmlFor="settings-bio">Bio</label>
                    <textarea id="settings-bio" className="todo-input" style={{ "padding": "12px", "minHeight": "100px", "resize": "vertical" }} placeholder="Tell others about yourself..."></textarea>
                    <span className="input-desc">You can @mention other users and organizations to link to them.</span>
                  </div>

                  {/* Gender, Location, Birthday */}
                  <div className="settings-form-grid">
                    <div className="settings-input-group">
                      <label htmlFor="settings-gender">Gender</label>
                      <select id="settings-gender" className="todo-input" style={{ "padding": "10px 12px", "backgroundColor": "var(--color-gray-950)", "height": "38px", "color": "var(--color-white)", "border": "1px solid var(--color-gray-800)", "borderRadius": "6px", "width": "100%", "boxSizing": "border-box", "outline": "none" }}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="settings-input-group">
                      <label htmlFor="settings-location">Location</label>
                      <input type="text" id="settings-location" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="City, Country">
                    </div>
                  </div>

                  <div className="settings-input-group">
                    <label htmlFor="settings-birthday">Birthday</label>
                    <input type="date" id="settings-birthday" className="todo-input" style={{ "padding": "10px 12px", "color": "var(--color-white)", "height": "38px" }}>
                  </div>

                  {/* Professional Details */}
                  <div style={{ "marginTop": "24px", "marginBottom": "12px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingTop": "8px", "paddingBottom": "8px" }}>
                    <h4 style={{ "margin": "0", "fontSize": "15px", "color": "var(--color-white)", "fontFamily": "var(--font-display)", "border": "none", "padding": "0" }}>Professional Details</h4>
                  </div>
                  
                  <div className="settings-input-group">
                    <label htmlFor="settings-education">Education</label>
                    <textarea id="settings-education" className="todo-input" style={{ "padding": "12px", "minHeight": "80px", "resize": "vertical" }} placeholder="Institution - Degree - Years"></textarea>
                  </div>
                  
                  <div className="settings-input-group">
                    <label htmlFor="settings-skills">Skills (comma separated)</label>
                    <input type="text" id="settings-skills" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="Python, JavaScript, C++, Secure Coding">
                  </div>

                  {/* Websites & Social Links */}
                  <div style={{ "marginTop": "24px", "marginBottom": "12px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingTop": "8px", "paddingBottom": "8px" }}>
                    <h4 style={{ "margin": "0", "fontSize": "15px", "color": "var(--color-white)", "fontFamily": "var(--font-display)", "border": "none", "padding": "0" }}>Websites & Social Links</h4>
                  </div>

                  <div className="settings-form-grid">
                    <div className="settings-input-group">
                      <label htmlFor="settings-github">GitHub</label>
                      <input type="text" id="settings-github" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="https://github.com/username">
                    </div>
                    <div className="settings-input-group">
                      <label htmlFor="settings-linkedin">LinkedIn</label>
                      <input type="text" id="settings-linkedin" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="https://linkedin.com/in/username">
                    </div>
                  </div>

                  <div className="settings-form-grid">
                    <div className="settings-input-group">
                      <label htmlFor="settings-x">X (Twitter)</label>
                      <input type="text" id="settings-x" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="https://x.com/username">
                    </div>
                    <div className="settings-input-group">
                      <label htmlFor="settings-readme">ReadMe</label>
                      <input type="text" id="settings-readme" className="todo-input" style={{ "padding": "10px 12px" }} placeholder="https://readme.com/username">
                    </div>
                  </div>

                  <button type="submit" className="todo-add-btn" style={{ "background": "#7c3aed", "borderColor": "#7c3aed", "color": "var(--color-white)", "padding": "10px 20px", "borderRadius": "6px", "fontWeight": "600", "cursor": "pointer", "marginTop": "10px" }}>Update profile</button>
                </form>
              </section>

              {/* Part B: Profile Picture Card */}
              <section className="dash-card">
                <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>Profile picture</h3>
                
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "20px" }}>
                  <div style={{ "display": "flex", "alignItems": "center", "gap": "20px" }}>
                    <div className="avatar-initials-circle" id="settings-avatar-circle" style={{ "width": "64px", "height": "64px", "overflow": "hidden", "borderRadius": "50%", "display": "flex", "alignItems": "center", "justifyContent": "center", "background": "var(--color-gray-950)", "border": "1.5px solid rgba(255,255,255,0.08)" }}>U</div>
                    
                    <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                      <div style={{ "display": "flex", "gap": "8px", "flexWrap": "wrap" }}>
                        <button className="opt-btn" style={{ "padding": "8px 14px", "fontSize": "12.5px", "display": "inline-flex", "alignItems": "center", "gap": "6px" }} onclick="alert('3D Avatar Creator module loaded! (Mock Interface)')">
                          <svg style={{ "width": "14px", "height": "14px", "color": "#a78bfa" }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a1 1 0 0 1 1 .83l.26 2.37A6.9 6.9 0 0 0 18.8 10.74l2.37.26a1 1 0 0 1 0 2l-2.37.26a6.9 6.9 0 0 0-5.54 5.54l-.26 2.37a1 1 0 0 1-2 0l-.26-2.37a6.9 6.9 0 0 0-5.54-5.54l-2.37-.26a1 1 0 0 1 0-2l2.37-.26A6.9 6.9 0 0 0 10.74 5.2l.26-2.37A1 1 0 0 1 12 2z"/></svg>
                          Create 3D avatar
                        </button>
                        <button className="opt-btn" style={{ "padding": "8px 14px", "fontSize": "12.5px", "display": "inline-flex", "alignItems": "center", "gap": "6px" }} onclick="alert('Photo upload dialog opened! (Mock Interface)')">
                          <svg style={{ "width": "14px", "height": "14px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          Upload photo
                        </button>
                      </div>
                      <span style={{ "fontSize": "11.5px", "color": "var(--color-gray-500)" }}>Build a custom 3D avatar or upload JPG/PNG/GIF (max 5MB).</span>
                    </div>
                  </div>

                  <div style={{ "borderTop": "1px solid rgba(255,255,255,0.05)", "paddingTop": "16px" }}>
                    <label style={{ "color": "var(--color-gray-400)", "fontSize": "12.5px", "display": "block", "marginBottom": "12px", "fontWeight": "600" }}>Choose Avatar Preset</label>
                    <div style={{ "display": "flex", "gap": "12px" }} id="avatar-picker-strip">
                      <button type="button" className="avatar-select-btn" data-avatar-id="1" onclick="selectAvatarId(1)">
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ "width": "100%", "height": "100%" }}>
                          <mask id="av-mask-edit-1" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect fill="#FFFFFF" height="36" rx="72" width="36" /></mask>
                          <g mask="url(#av-mask-edit-1)">
                            <rect fill="#ff005b" height="36" width="36" />
                            <rect fill="#ffb238" height="36" rx="6" transform="translate(9 -5) rotate(219 18 18) scale(1)" width="36" x="0" y="0" />
                            <g transform="translate(4.5 -4) rotate(9 18 18)">
                              <path d="M15 19c2 1 4 1 6 0" fill="none" stroke="#000000" strokeLinecap="round" />
                              <rect fill="#000000" height="2" rx="1" stroke="none" width="1.5" x="10" y="14" />
                              <rect fill="#000000" height="2" rx="1" stroke="none" width="1.5" x="24" y="14" />
                            </g>
                          </g>
                        </svg>
                      </button>
                      <button type="button" className="avatar-select-btn" data-avatar-id="2" onclick="selectAvatarId(2)">
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ "width": "100%", "height": "100%" }}>
                          <mask id="av-mask-edit-2" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect fill="#FFFFFF" height="36" rx="72" width="36" /></mask>
                          <g mask="url(#av-mask-edit-2)">
                            <rect fill="#ff7d10" height="36" width="36" />
                            <rect fill="#0a0310" height="36" rx="6" transform="translate(5 -1) rotate(55 18 18) scale(1.1)" width="36" x="0" y="0" />
                            <g transform="translate(7 -6) rotate(-5 18 18)">
                              <path d="M15 20c2 1 4 1 6 0" fill="none" stroke="#FFFFFF" strokeLinecap="round" />
                              <rect fill="#FFFFFF" height="2" rx="1" stroke="none" width="1.5" x="14" y="14" />
                              <rect fill="#FFFFFF" height="2" rx="1" stroke="none" width="1.5" x="20" y="14" />
                            </g>
                          </g>
                        </svg>
                      </button>
                      <button type="button" className="avatar-select-btn" data-avatar-id="3" onclick="selectAvatarId(3)">
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ "width": "100%", "height": "100%" }}>
                          <mask id="av-mask-edit-3" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect fill="#FFFFFF" height="36" rx="72" width="36" /></mask>
                          <g mask="url(#av-mask-edit-3)">
                            <rect fill="#0a0310" height="36" width="36" />
                            <rect fill="#ff005b" height="36" rx="36" transform="translate(-3 7) rotate(227 18 18) scale(1.2)" width="36" x="0" y="0" />
                            <g transform="translate(-3 3.5) rotate(7 18 18)">
                              <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#FFFFFF" />
                              <rect fill="#FFFFFF" height="2" rx="1" stroke="none" width="1.5" x="12" y="14" />
                              <rect fill="#FFFFFF" height="2" rx="1" stroke="none" width="1.5" x="22" y="14" />
                            </g>
                          </g>
                        </svg>
                      </button>
                      <button type="button" className="avatar-select-btn" data-avatar-id="4" onclick="selectAvatarId(4)">
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ "width": "100%", "height": "100%" }}>
                          <mask id="av-mask-edit-4" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect fill="#FFFFFF" height="36" rx="72" width="36" /></mask>
                          <g mask="url(#av-mask-edit-4)">
                            <rect fill="#d8fcb3" height="36" width="36" />
                            <rect fill="#89fcb3" height="36" rx="6" transform="translate(9 -5) rotate(219 18 18) scale(1)" width="36" x="0" y="0" />
                            <g transform="translate(4.5 -4) rotate(9 18 18)">
                              <path d="M15 19c2 1 4 1 6 0" fill="none" stroke="#000000" strokeLinecap="round" />
                              <rect fill="#000000" height="2" rx="1" stroke="none" width="1.5" x="10" y="14" />
                              <rect fill="#000000" height="2" rx="1" stroke="none" width="1.5" x="24" y="14" />
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Tab Pane 1.5: My Badges */}
            <div id="settings-pane-badges" className="settings-tab-pane" style={{ "display": "none" }}>
              <section className="dash-card">
                <div style={{ "marginBottom": "20px", "borderBottom": "1px solid var(--color-gray-900)", "paddingBottom": "12px" }}>
                  <h3 style={{ "margin": "0", "border": "none", "padding": "0", "fontSize": "18px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>My Badges</h3>
                  <span style={{ "fontSize": "12px", "color": "var(--color-gray-500)" }}>Dynamic achievements unlocked by completing secure coding challenges.</span>
                </div>
                
                <div id="badges-container" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(220px, 1fr))", "gap": "16px" }}>
                  {/* Badges dynamically rendered by JS */}
                </div>
              </section>
            </div>

            {/* Tab Pane 2: Privacy & Security (Mock + Password Change) */}
            <div id="settings-pane-privacy-security" className="settings-tab-pane" style={{ "display": "none" }}>
              <section className="dash-card" style={{ "marginBottom": "24px" }}>
                <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>Privacy & Security</h3>
                <p style={{ "fontSize": "13.5px", "color": "var(--color-gray-400)", "lineHeight": "1.5", "marginBottom": "20px" }}>
                  Manage your account security configurations, two-factor authentication, and privacy settings.
                </p>
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "16px", "fontSize": "13px", "color": "var(--color-gray-300)" }}>
                  <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "12px" }}>
                    <div>
                      <div style={{ "fontWeight": "600", "color": "var(--color-white)" }}>Two-factor Authentication (2FA)</div>
                      <div style={{ "fontSize": "11.5px", "color": "var(--color-gray-500)", "marginTop": "2px" }}>Add an extra layer of security to your account.</div>
                    </div>
                    <button className="opt-btn" onclick="alert('Two-factor setup initialized!')">Configure</button>
                  </div>
                  <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "12px" }}>
                    <div>
                      <div style={{ "fontWeight": "600", "color": "var(--color-white)" }}>Security Log</div>
                      <div style={{ "fontSize": "11.5px", "color": "var(--color-gray-500)", "marginTop": "2px" }}>View audit history of active login sessions.</div>
                    </div>
                    <button className="opt-btn" onclick="alert('Security log audit fetched!')">View Log</button>
                  </div>
                </div>
              </section>

              {/* CARD: Change Password */}
              <section className="dash-card">
                <div style={{ "marginBottom": "20px", "borderBottom": "1px solid var(--color-gray-900)", "paddingBottom": "12px" }}>
                  <h3 style={{ "margin": "0", "border": "none", "padding": "0", "fontSize": "18px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>Change Password</h3>
                  <span style={{ "fontSize": "12px", "color": "var(--color-gray-500)" }}>Change your password and manage credentials.</span>
                </div>
                
                <form id="security-password-form" style={{ "display": "flex", "flexDirection": "column", "gap": "16px", "maxWidth": "400px" }} onsubmit="event.preventDefault(); changeUserPassword();">
                  <div>
                    <label style={{ "color": "var(--color-gray-400)", "fontSize": "12px", "display": "block", "marginBottom": "4px" }}>Current Password</label>
                    <input type="password" id="input-current-password" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} placeholder="••••••••" required>
                  </div>
                  <div>
                    <label style={{ "color": "var(--color-gray-400)", "fontSize": "12px", "display": "block", "marginBottom": "4px" }}>New Password</label>
                    <input type="password" id="input-new-password" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} placeholder="••••••••" required>
                  </div>
                  <div>
                    <label style={{ "color": "var(--color-gray-400)", "fontSize": "12px", "display": "block", "marginBottom": "4px" }}>Confirm New Password</label>
                    <input type="password" id="input-confirm-password" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} placeholder="••••••••" required>
                  </div>
                  <div id="password-change-feedback" style={{ "fontSize": "13px", "display": "none", "padding": "8px 12px", "borderRadius": "6px" }}></div>
                  <div>
                    <button type="submit" className="todo-add-btn" style={{ "padding": "8px 20px", "fontSize": "13px", "borderRadius": "6px", "cursor": "pointer" }}>Change Password</button>
                  </div>
                </form>
              </section>
            </div>

            {/* Tab Pane 3: Appearance (Mock) */}
            <div id="settings-pane-appearance" className="settings-tab-pane" style={{ "display": "none" }}>
              <section className="dash-card">
                <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>Appearance</h3>
                <p style={{ "fontSize": "13.5px", "color": "var(--color-gray-400)", "lineHeight": "1.5", "marginBottom": "20px" }}>
                  Customize the look and theme of the VeriCode AI dashboard environment.
                </p>
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "16px", "fontSize": "13px" }}>
                  <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "12px" }}>
                    <div>
                      <div style={{ "fontWeight": "600", "color": "var(--color-white)" }}>Theme Options</div>
                      <div style={{ "fontSize": "11.5px", "color": "var(--color-gray-500)", "marginTop": "2px" }}>Toggle between Dark, Light, and System preferences.</div>
                    </div>
                    <button className="opt-btn" onclick="document.getElementById('theme-toggle-btn').click();">Toggle Theme</button>
                  </div>
                </div>
              </section>
            </div>

            {/* Tab Pane 4: Notifications (Mock) */}
            <div id="settings-pane-notifications" className="settings-tab-pane" style={{ "display": "none" }}>
              <section className="dash-card">
                <h3 style={{ "fontSize": "18px", "marginBottom": "20px", "borderBottom": "1px solid rgba(255,255,255,0.05)", "paddingBottom": "10px" }}>Notifications</h3>
                <p style={{ "fontSize": "13.5px", "color": "var(--color-gray-400)", "lineHeight": "1.5", "marginBottom": "20px" }}>
                  Choose how and when you receive alerts from VeriCode AI.
                </p>
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "12px", "fontSize": "13px", "color": "var(--color-gray-300)" }}>
                  <label style={{ "display": "flex", "alignItems": "center", "gap": "10px", "cursor": "pointer" }}>
                    <input type="checkbox" checked style={{ "accentColor": "#7c3aed" }}>
                    <span>Email notifications for solved challenge audits</span>
                  </label>
                  <label style={{ "display": "flex", "alignItems": "center", "gap": "10px", "cursor": "pointer", "marginTop": "6px" }}>
                    <input type="checkbox" checked style={{ "accentColor": "#7c3aed" }}>
                    <span>Web push alerts on new community discussions</span>
                  </label>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>



      {/* VIEW 6: Leaderboard View (Hidden by default) */}
      <div id="view-leaderboard" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <style>
          #leaderboard-table tr:hover {
            background-color: rgba(255, 255, 255, 0.02) !important;
          }
          #leaderboard-table tr.active-row {
            background-color: rgba(59, 130, 246, 0.05) !important;
            border-left: 3px solid #3b82f6 !important;
          }
          #leaderboard-table th, #leaderboard-table td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          }
        </style>
        <header className="dash-header" style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "flexWrap": "wrap", "gap": "16px" }}>
          <div>
            <h2 style={{ "fontSize": "28px" }}>Global Leaderboard</h2>
            <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Top secure coding engineers and hackers</span>
          </div>
          {/* User quick stats summary */}
          <div style={{ "background": "rgba(59, 130, 246, 0.08)", "border": "1px solid rgba(59, 130, 246, 0.2)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "13px", "color": "var(--color-gray-300)" }} id="leaderboard-user-quick-stats">
            Your Rank: <strong style={{ "color": "var(--color-white)" }} id="user-quick-rank">#5</strong> | Score: <strong style={{ "color": "#3b82f6" }} id="user-quick-score">1,330</strong> pts | Rating: <strong style={{ "color": "#ffd700" }} id="user-quick-rating">1,742</strong>
          </div>
        </header>

        {/* Controls Bar */}
        <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginTop": "20px", "flexWrap": "wrap", "gap": "12px" }}>
          <div style={{ "display": "flex", "gap": "8px" }} id="leaderboard-filters">
            <button className="opt-btn active" data-filter="global" onclick="setLeaderboardFilter('global')">Global Ranking</button>
            <button className="opt-btn" data-filter="contest" onclick="setLeaderboardFilter('contest')">Contest Rating</button>
            <button className="opt-btn" data-filter="local" onclick="setLeaderboardFilter('local')">Local (IN)</button>
          </div>
          <div style={{ "position": "relative", "width": "260px" }}>
            <input type="text" id="leaderboard-search" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box", "paddingLeft": "36px" }} placeholder="Search user...">
            <svg style={{ "position": "absolute", "left": "12px", "top": "11px", "width": "14px", "height": "14px", "color": "var(--color-gray-500)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
        
        <div style={{ "display": "flex", "gap": "24px", "marginTop": "20px", "alignItems": "flex-start", "flexWrap": "wrap", "paddingBottom": "40px" }}>
          {/* Rankings Table Column */}
          <div className="dash-card" style={{ "flex": "2", "minWidth": "550px", "overflowX": "auto", "padding": "24px" }}>
            <table style={{ "width": "100%", "borderCollapse": "collapse", "fontSize": "14px", "textAlign": "left" }} id="leaderboard-table">
              <thead>
                <tr style={{ "borderBottom": "1px solid var(--color-gray-900)", "color": "var(--color-gray-400)", "fontSize": "12px", "textTransform": "uppercase", "letterSpacing": "0.05em" }}>
                  <th style={{ "padding": "12px 16px", "width": "80px" }}>Rank</th>
                  <th style={{ "padding": "12px 16px" }}>User</th>
                  <th style={{ "padding": "12px 16px", "width": "100px" }}>Score</th>
                  <th style={{ "padding": "12px 16px", "width": "150px" }}>Solved Breakdown</th>
                  <th style={{ "padding": "12px 16px", "width": "80px", "textAlign": "right" }}>Region</th>
                </tr>
              </thead>
              <tbody id="leaderboard-tbody">
                {/* Populated dynamically by JS */}
              </tbody>
            </table>
          </div>

          {/* User Detailed Stats Column */}
          <div className="dash-card" style={{ "flex": "1", "minWidth": "320px", "padding": "24px", "display": "flex", "flexDirection": "column", "gap": "20px" }} id="leaderboard-detail-panel">
            <div style={{ "borderBottom": "1px solid var(--color-gray-900)", "paddingBottom": "12px" }}>
              <h3 style={{ "margin": "0", "border": "none", "padding": "0", "fontSize": "18px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>Engineer Stats</h3>
              <span style={{ "fontSize": "12px", "color": "var(--color-gray-500)" }}>Select a user to view detailed profile statistics.</span>
            </div>
            
            {/* Dynamic profile card details */}
            <div id="leaderboard-detail-content" style={{ "display": "flex", "flexDirection": "column", "gap": "20px" }}>
              {/* Loaded dynamically on row clicks */}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 7: Community View (Hidden by default) */}
      <div id="view-community" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <header className="dash-header">
          <div>
            <h2 style={{ "fontSize": "28px" }}>Community Chat</h2>
            <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Discuss security, algorithms, and connect with other developers in real-time</span>
          </div>
        </header>
        
        <div className="chat-layout">
          {/* Channels Sidebar (Left Column) */}
          <div className="chat-channels-sidebar">
            <h4 style={{ "margin": "0 0 8px 0", "fontSize": "11px", "color": "var(--color-gray-500)", "textTransform": "uppercase", "letterSpacing": "0.05em", "fontFamily": "var(--font-display)" }}>📢 Channels</h4>
            <div id="chat-channels-list" style={{ "display": "flex", "flexDirection": "column", "gap": "4px" }}>
              {/* Populated dynamically by JS */}
            </div>
          </div>
          
          {/* Chat Pane (Right Column) */}
          <div className="chat-pane">
            {/* Header Bar */}
            <div className="chat-header-bar">
              <div>
                <h3 id="chat-active-channel-name" style={{ "margin": "0 0 4px 0", "border": "none", "padding": "0", "fontSize": "16px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>#general</h3>
                <span id="chat-active-channel-desc" style={{ "fontSize": "12px", "color": "var(--color-gray-500)" }}>Discuss anything and everything secure coding.</span>
              </div>
              <div style={{ "fontSize": "12px", "color": "#10b981", "fontWeight": "500", "display": "flex", "alignItems": "center", "gap": "6px", "background": "rgba(16, 185, 129, 0.08)", "padding": "4px 10px", "borderRadius": "20px", "border": "1px solid rgba(16, 185, 129, 0.15)" }}>
                <span style={{ "width": "6px", "height": "6px", "background": "#10b981", "borderRadius": "50%", "display": "inline-block", "animation": "pulse 2s infinite" }}></span>
                <span>148 online</span>
              </div>
            </div>
            
            {/* Messages Container */}
            <div id="chat-messages" className="chat-messages-container">
              {/* Populated dynamically by JS */}
            </div>
            
            {/* Input Bar */}
            <form id="chat-input-form" className="chat-input-bar-container" onsubmit="sendChatMessage(event)">
              <input type="text" id="chat-input-field" className="todo-input" style={{ "flex": "1", "boxSizing": "border-box", "padding": "10px 14px" }} placeholder="Type a message... (Press Enter to send)" required autoComplete="off">
              <button type="submit" className="todo-add-btn" style={{ "borderRadius": "6px", "padding": "10px 20px", "fontSize": "13.5px", "fontWeight": "500", "cursor": "pointer", "display": "flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap", "height": "38px" }}>
                Send ⚡
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* VIEW 9: Project Ideas View (Hidden by default) */}
      <div id="view-project-ideas" className="dash-view-panel" style={{ "display": "none", "height": "100%" }}>
        <header className="dash-header" style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "flexWrap": "wrap", "gap": "16px" }}>
          <div>
            <h2 style={{ "fontSize": "28px" }}>Fix My Itch: Security Edition</h2>
            <span style={{ "color": "var(--color-gray-500)", "fontSize": "13px" }}>Real frustrations scraped from developers. Scratch these security itches to build a robust portfolio.</span>
          </div>
        </header>

        {/* Controls Bar */}
        <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginTop": "20px", "flexWrap": "wrap", "gap": "12px" }}>
          <div style={{ "display": "flex", "gap": "8px" }} id="itch-filters">
            <button className="opt-btn active" data-filter="all" onclick="setItchFilter('all')">All Itches</button>
            <button className="opt-btn" data-filter="fintech" onclick="setItchFilter('fintech')">Fintech & Payments</button>
            <button className="opt-btn" data-filter="identity" onclick="setItchFilter('identity')">Identity & Auth</button>
            <button className="opt-btn" data-filter="crypto" onclick="setItchFilter('crypto')">Crypto & Hashing</button>
            <button className="opt-btn" data-filter="websec" onclick="setItchFilter('websec')">Web Security</button>
          </div>
          <div style={{ "display": "flex", "gap": "12px", "alignItems": "center" }}>
            <button className="todo-add-btn" onclick="openPublishItchModal()" style={{ "borderRadius": "6px", "padding": "8px 16px", "fontSize": "13px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap" }}>
              ➕ Publish an Itch
            </button>
            <div style={{ "position": "relative", "width": "260px" }}>
              <input type="text" id="itch-search" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box", "paddingLeft": "36px" }} placeholder="Search itches...">
              <svg style={{ "position": "absolute", "left": "12px", "top": "11px", "width": "14px", "height": "14px", "color": "var(--color-gray-500)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
        </div>
        
        {/* Grid of Itches */}
        <div id="itches-grid" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(360px, 1fr))", "gap": "24px", "marginTop": "20px", "paddingBottom": "40px" }}>
          {/* Populated dynamically by JS */}
        </div>
      </div>
    </main>
  </div>

  {/* Theme Transition Options Panel */}
  <div id="theme-settings-panel" className="theme-settings-panel" style={{ "display": "none", "right": "20px", "bottom": "80px" }}>
    {/* Drag Handle & Title */}
    <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "12px", "cursor": "grab" }} id="theme-settings-drag-handle">
      <div style={{ "display": "flex", "alignItems": "center", "gap": "6px", "userSelect": "none" }}>
        <svg style={{ "width": "14px", "height": "14px", "opacity": "0.6" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span style={{ "fontWeight": "600", "letterSpacing": "-0.01em" }}>Transition Settings</span>
      </div>
      <button id="theme-settings-close" style={{ "background": "transparent", "border": "none", "color": "var(--color-gray-400)", "cursor": "pointer", "fontSize": "18px", "lineHeight": "1", "padding": "0 4px", "outline": "none" }}>&times;</button>
    </div>

    {/* Variant Selection */}
    <div style={{ "marginBottom": "10px" }}>
      <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "4px" }}>
        <span style={{ "opacity": "0.6", "fontSize": "11px", "fontWeight": "500" }}>VARIANT</span>
      </div>
      <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "4px" }} id="opt-variant-group">
        <button className="opt-btn" data-variant="circle">circle</button>
        <button className="opt-btn" data-variant="rectangle">rectangle</button>
        <button className="opt-btn" data-variant="polygon">polygon</button>
        <button className="opt-btn" data-variant="circle-blur">circle-blur</button>
        <button className="opt-btn" data-variant="gif">gif</button>
      </div>
    </div>

    {/* Blur Option */}
    <div style={{ "marginBottom": "10px" }}>
      <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "4px" }}>
        <span style={{ "opacity": "0.6", "fontSize": "11px", "fontWeight": "500" }}>BLUR</span>
      </div>
      <div style={{ "display": "flex", "gap": "4px" }} id="opt-blur-group">
        <button className="opt-btn" data-blur="false">off</button>
        <button className="opt-btn" data-blur="true">on</button>
      </div>
    </div>

    {/* Start Option (Conditional) */}
    <div style={{ "marginBottom": "10px" }} id="opt-start-section">
      <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "4px" }}>
        <span style={{ "opacity": "0.6", "fontSize": "11px", "fontWeight": "500" }}>START POSITION</span>
      </div>
      <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "4px" }} id="opt-start-group">
        {/* Dynamic Buttons generated by JS */}
      </div>
    </div>

    {/* GIF Selection (Conditional) */}
    <div style={{ "marginBottom": "10px", "display": "none" }} id="opt-gif-section">
      <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "4px" }}>
        <span style={{ "opacity": "0.6", "fontSize": "11px", "fontWeight": "500" }}>GIF TYPE</span>
      </div>
      <div style={{ "display": "flex", "gap": "4px", "marginBottom": "6px" }} id="opt-giftype-group">
        <button className="opt-btn" data-giftype="1">1</button>
        <button className="opt-btn" data-giftype="2">2</button>
        <button className="opt-btn" data-giftype="3">3</button>
        <button className="opt-btn" data-giftype="custom">custom</button>
      </div>
      <div id="opt-gifurl-section" style={{ "display": "none" }}>
        <span style={{ "opacity": "0.6", "fontSize": "10px", "display": "block", "marginBottom": "4px" }}>GIF URL</span>
        <input type="text" id="opt-gifurl-input" style={{ "width": "100%", "background": "rgba(0,0,0,0.3)", "border": "1px solid rgba(255,255,255,0.1)", "borderRadius": "6px", "padding": "4px 8px", "color": "var(--color-white)", "fontSize": "11px", "outline": "none" }} placeholder="Enter custom GIF URL">
      </div>
    </div>
  </div>

  {/* Modal Overlay for Publishing an Itch */}
  <div id="publish-itch-modal" style={{ "display": "none", "position": "fixed", "top": "0", "left": "0", "width": "100%", "height": "100%", "background": "rgba(0, 0, 0, 0.6)", "backdropFilter": "blur(8px)", "zIndex": "11000", "alignItems": "center", "justifyContent": "center", "opacity": "0", "transition": "opacity 0.3s ease" }}>
    {/* Modal Content */}
    <div className="dash-card" style={{ "width": "500px", "maxWidth": "90%", "background": "rgba(18, 18, 18, 0.95)", "border": "1px solid rgba(255, 255, 255, 0.1)", "borderRadius": "16px", "padding": "24px", "boxShadow": "0 20px 40px rgba(0,0,0,0.6)", "position": "relative", "maxHeight": "90vh", "overflowY": "auto" }}>
      <h3 style={{ "marginTop": "0", "borderBottom": "1px solid rgba(255, 255, 255, 0.1)", "paddingBottom": "12px", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "color": "var(--color-white)" }}>
        <span>🔥 Publish a Security Itch</span>
        <button onclick="closePublishItchModal()" style={{ "background": "none", "border": "none", "color": "var(--color-gray-400)", "fontSize": "24px", "cursor": "pointer", "lineHeight": "1", "padding": "0" }}>&times;</button>
      </h3>
      <form id="publish-itch-form" onsubmit="submitPublishItch(event)">
        <div style={{ "marginBottom": "14px" }}>
          <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>Title</label>
          <input type="text" id="itch-new-title" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} placeholder="e.g., Secure JWT Auth Server" required>
        </div>
        <div style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "12px", "marginBottom": "14px" }}>
          <div>
            <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>Category</label>
            <select id="itch-new-category" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box", "height": "38px", "padding": "0 10px" }} required>
              <option value="identity">Identity & Auth</option>
              <option value="websec">Web Security</option>
              <option value="crypto">Crypto & Hashing</option>
              <option value="fintech">Fintech & Payments</option>
            </select>
          </div>
          <div>
            <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>Difficulty</label>
            <select id="itch-new-difficulty" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box", "height": "38px", "padding": "0 10px" }} required>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        <div style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "12px", "marginBottom": "14px" }}>
          <div>
            <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>Pain Score (1.0 - 10.0)</label>
            <input type="number" id="itch-new-pain" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} min="1" max="10" step="0.1" placeholder="e.g., 8.5" required>
          </div>
          <div>
            <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>Your Handle</label>
            <input type="text" id="itch-new-author" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} placeholder="e.g., @user_dev" required>
          </div>
        </div>
        <div style={{ "marginBottom": "14px" }}>
          <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>The Frustration (Developer's Itch)</label>
          <textarea id="itch-new-frustration" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box", "height": "80px", "resize": "vertical", "padding": "8px 12px" }} placeholder="What security pain are you facing? Describe the frustration..." required></textarea>
        </div>
        <div style={{ "marginBottom": "18px" }}>
          <label style={{ "display": "block", "fontSize": "12px", "color": "var(--color-gray-400)", "marginBottom": "6px", "fontWeight": "600" }}>Security Requirements (comma-separated)</label>
          <input type="text" id="itch-new-requirements" className="todo-input" style={{ "width": "100%", "boxSizing": "border-box" }} placeholder="Requirement 1, Requirement 2, Requirement 3" required>
        </div>
        <div style={{ "display": "flex", "justifyContent": "flex-end", "gap": "10px" }}>
          <button type="button" className="opt-btn" onclick="closePublishItchModal()" style={{ "padding": "8px 16px", "fontSize": "13px" }}>Cancel</button>
          <button type="submit" className="todo-add-btn" style={{ "borderRadius": "6px", "padding": "8px 16px", "fontSize": "13px", "fontWeight": "500", "cursor": "pointer" }}>Publish Itch</button>
        </div>
      </form>
    </div>
  </div>


// === JSX Part 2 ===

  {/* Slide-out Drawer for Problem Details */}
  <div id="problem-drawer" className="theme-settings-panel" style={{ "display": "none", "position": "fixed", "right": "0", "top": "0", "bottom": "0", "width": "420px", "height": "100vh", "borderRadius": "0", "border": "none", "borderLeft": "1px solid rgba(255,255,255,0.1)", "zIndex": "10100", "padding": "30px", "boxShadow": "-10px 0 40px rgba(0,0,0,0.6)", "overflowY": "auto" }}>
    <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "marginBottom": "24px", "borderBottom": "1px solid rgba(255,255,255,0.06)", "paddingBottom": "12px" }}>
      <h3 id="drawer-title" style={{ "fontSize": "20px", "color": "var(--color-white)", "fontFamily": "var(--font-display)" }}>Problem Details</h3>
      <button id="drawer-close" style={{ "background": "transparent", "border": "none", "color": "var(--color-gray-400)", "cursor": "pointer", "fontSize": "24px", "lineHeight": "1", "outline": "none" }}>&times;</button>
    </div>
    <div id="drawer-content" style={{ "fontSize": "13.5px", "lineHeight": "1.6", "color": "var(--color-gray-300)", "fontFamily": "var(--font-body)" }}>
      {/* Populated dynamically */}
    </div>
  </div>

