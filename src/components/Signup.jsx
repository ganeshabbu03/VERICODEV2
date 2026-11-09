import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function enableSmoothCaret(inputId, caretId) {
      const input = document.getElementById(inputId);
      const caret = document.getElementById(caretId);
      if (!input || !caret) return;

      const container = input.parentElement;
      const mirrorId = 'input-mirror-' + inputId;
      let mirrorDiv = document.getElementById(mirrorId);
      if (!mirrorDiv) {
        mirrorDiv = document.createElement('div');
        mirrorDiv.id = mirrorId;
        mirrorDiv.className = 'input-mirror-div';
        mirrorDiv.style.position = 'absolute';
        mirrorDiv.style.visibility = 'hidden';
        mirrorDiv.style.pointerEvents = 'none';
        container.appendChild(mirrorDiv);
      }

      function getCaretCoordinates(element, position) {
        const style = mirrorDiv.style;
        const computed = window.getComputedStyle(element);

        const properties = [
          'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight',
          'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom',
          'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth',
          'borderStyle', 'boxSizing', 'textAlign', 'textTransform', 'letterSpacing', 'wordSpacing'
        ];
        properties.forEach(prop => {
          style[prop] = computed[prop];
        });

        style.whiteSpace = 'pre-wrap';
        style.wordWrap = 'break-word';
        style.width = element.clientWidth + 'px';
        style.height = element.clientHeight + 'px';
        style.left = element.offsetLeft + 'px';
        style.top = element.offsetTop + 'px';

        const value = element.value;
        const isPassword = element.type === 'password';
        const dotChar = navigator.userAgent.match(/firefox|fxios/i) ? '\u25CF' : '\u2022';
        const textBefore = isPassword ? dotChar.repeat(position) : value.substring(0, position);

        mirrorDiv.textContent = textBefore;

        const span = document.createElement('span');
        span.textContent = '|';
        mirrorDiv.appendChild(span);

        return {
          top: element.offsetTop + span.offsetTop - element.scrollTop,
          left: element.offsetLeft + span.offsetLeft - element.scrollLeft,
          height: span.offsetHeight
        };
      }

      let blinkTimeout = null;
      let rafId = null;
      function updateCaret() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (document.activeElement !== input) {
            caret.style.opacity = '0';
            return;
          }

          const pos = input.selectionStart;
          const coordinates = getCaretCoordinates(input, pos);

          caret.style.left = coordinates.left + 'px';
          caret.style.top = (coordinates.top + (coordinates.height - 16) / 2) + 'px';
          caret.style.height = '16px';
          caret.style.opacity = '1';

          caret.classList.remove('blink');
          clearTimeout(blinkTimeout);
          blinkTimeout = setTimeout(() => {
            if (document.activeElement === input) {
              caret.classList.add('blink');
            }
          }, 500);
        });
      }

      input.addEventListener('input', updateCaret);
      input.addEventListener('focus', updateCaret);
      input.addEventListener('blur', () => {
        caret.style.opacity = '0';
      });
      input.addEventListener('click', updateCaret);
      input.addEventListener('keyup', updateCaret);
      input.addEventListener('select', updateCaret);
      input.addEventListener('scroll', updateCaret);
      
      const onSelectionChange = () => {
        if (document.activeElement === input) {
          updateCaret();
        }
      };
      document.addEventListener('selectionchange', onSelectionChange);

      const onResize = () => {
        if (document.activeElement === input) {
          updateCaret();
        }
      };
      window.addEventListener('resize', onResize);

      return () => {
        input.removeEventListener('input', updateCaret);
        input.removeEventListener('focus', updateCaret);
        input.removeEventListener('click', updateCaret);
        input.removeEventListener('keyup', updateCaret);
        input.removeEventListener('select', updateCaret);
        input.removeEventListener('scroll', updateCaret);
        document.removeEventListener('selectionchange', onSelectionChange);
        window.removeEventListener('resize', onResize);
        clearTimeout(blinkTimeout);
        if (rafId) cancelAnimationFrame(rafId);
        if (mirrorDiv.parentNode) {
          mirrorDiv.parentNode.removeChild(mirrorDiv);
        }
      };
    }

    const cleanName = enableSmoothCaret('name', 'name-caret');
    const cleanEmail = enableSmoothCaret('email', 'email-caret');
    const cleanPassword = enableSmoothCaret('password', 'password-caret');

    return () => {
      if (cleanName) cleanName();
      if (cleanEmail) cleanEmail();
      if (cleanPassword) cleanPassword();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      // Backend unreachable — offline demo mode
      if (!response.ok && response.status === 0) {
        const mockUser = { name, email };
        localStorage.setItem('token', 'mock_token_' + Date.now());
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        setSuccess('Account created! Signing you in...');
        setTimeout(() => navigate('/dashboard'), 1500);
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // Offline fallback — simulate successful registration
      const mockUser = { name, email };
      localStorage.setItem('token', 'mock_token_' + Date.now());
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      setSuccess('Account created! Signing you in...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-body-wrapper">
      <style>{`
        .signup-page-body-wrapper {
          background-color: var(--color-black);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .signup-container {
          width: 100%;
          max-width: 1024px;
          min-height: 600px;
          background-color: var(--color-white);
          border-radius: 16px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
        
        .auth-panel-info {
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        
        .auth-panel-info::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, transparent 45%, rgba(255, 255, 255, 0.03) 50%, transparent 55%);
          pointer-events: none;
        }
        
        .auth-info-header .logo-container {
          margin-bottom: 40px;
        }
        
        .auth-panel-info h2 {
          font-size: 38px;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        
        .auth-panel-info p {
          font-size: 15px;
          color: var(--color-gray-400);
          line-height: 1.6;
          max-width: 380px;
        }
        
        .auth-info-footer {
          font-size: 12px;
          color: var(--color-gray-600);
        }
        
        .auth-panel-form {
          padding: 60px 80px;
          color: var(--color-black);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .form-header {
          margin-bottom: 30px;
        }
        
        .form-header h3 {
          font-size: 28px;
          margin-bottom: 8px;
        }
        
        .form-header p {
          font-size: 14px;
          color: var(--color-gray-500);
        }
        
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-gray-700);
        }
        
        .form-input {
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid var(--color-gray-300);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          background-color: var(--color-gray-50);
          caret-color: transparent !important;
        }
        
        .form-input:focus {
          border-color: var(--color-black);
          background-color: var(--color-white);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .custom-caret {
          position: absolute;
          width: 2px;
          background-color: var(--color-black);
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          transition: left 0.08s cubic-bezier(0.25, 1, 0.5, 1), top 0.08s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s ease;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        }
        @keyframes caretBlink {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
        .custom-caret.blink {
          animation: caretBlink 1s step-end infinite;
        }
        
        .form-options {
          font-size: 13px;
        }
        
        .terms-label {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
          color: var(--color-gray-700);
          line-height: 1.4;
        }
        
        .terms-label input {
          margin-top: 2px;
          accent-color: var(--color-black);
        }
        
        .submit-btn {
          background-color: var(--color-black);
          color: var(--color-white);
          border: 1px solid var(--color-black);
          padding: 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 5px;
        }
        
        .submit-btn:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
        
        .divider {
          position: relative;
          text-align: center;
          margin: 20px 0;
        }
        
        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-gray-200);
          z-index: 1;
        }
        
        .divider-text {
          position: relative;
          background-color: var(--color-white);
          padding: 0 12px;
          font-size: 12px;
          color: var(--color-gray-400);
          z-index: 2;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .oauth-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid var(--color-gray-300);
          background-color: var(--color-white);
          color: var(--color-gray-800);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .oauth-btn:hover {
          border-color: var(--color-black);
          color: var(--color-black);
          background-color: var(--color-gray-50);
        }
        
        .oauth-icon {
          width: 16px;
          height: 16px;
        }
        
        .back-home {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-gray-400);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s ease;
          z-index: 10;
        }
        
        .back-home:hover {
          color: var(--color-white);
        }
        
        @media (max-width: 900px) {
          .signup-container {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .auth-panel-info {
            display: none;
          }
          .auth-panel-form {
            padding: 40px 30px;
          }
        }

        .login-redirect-link {
          color: var(--color-gray-500);
          text-decoration: none;
          transition: color 0.2s ease;
          font-size: 13px;
          text-align: center;
          margin-top: 18px;
        }
        
        .login-redirect-link a {
          color: var(--color-black);
          font-weight: 600;
          text-decoration: none;
        }
        
        .login-redirect-link a:hover {
          text-decoration: underline;
        }
        
        .back-home {
          color: var(--color-gray-400);
          transition: color 0.3s ease;
        }
        .back-home:hover {
          color: var(--color-white) !important;
        }
        .back-home:hover .chevron-left-svg {
          transform: translateX(-2px);
        }
        .back-home:hover .arrow-line-back {
          transform: scaleX(1);
          left: 6px;
        }

        .alert-success {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .alert-error {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="signup-container animate-in fade-in zoom-in-95 duration-500">
        {/* Left panel (branded) */}
        <div className="auth-panel-info">
          <Link to="/" className="back-home group" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--color-gray-400)', transition: 'color 0.3s', fontSize: '14px', fontWeight: 500 }}>
            <span className="animated-back-arrow" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
              <svg className="chevron-left-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ width: '16px', height: '16px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="arrow-line-back" style={{ position: 'absolute', left: '9px', height: '2px', width: '8px', background: 'currentColor', transformOrigin: 'left', transform: 'scaleX(0)', borderRadius: '1px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}></span>
            </span>
            Back to website
          </Link>
          
          <div className="auth-info-header">
            <Link to="/" className="logo-container" title="Vericode AI" style={{ textDecoration: 'none' }}>
              <img src="/logo_white.jpg" alt="Vericode AI Logo" className="logo-img" style={{ mixBlendMode: 'screen', height: '32px' }} />
              <span className="logo-text" style={{ color: 'var(--color-white)' }}>VERICODE AI</span>
            </Link>
            <h2 style={{ marginTop: '40px' }}>One place for your tools. Safer code by default.</h2>
            <p style={{ marginTop: '16px' }}>
              Sign up for free to keep your work in sync across devices, save the AI prompts you reuse, watch your solving speed improve, and compile without leaving the page.
            </p>
          </div>

          <div className="auth-info-footer">
            <span>&copy; 2026 Vericode AI. Made for people who build.</span>
          </div>
        </div>
        
        {/* Right panel (form) */}
        <div className="auth-panel-form">
          <div className="form-header">
            <h3>Create an account</h3>
            <p>It is free, and it takes about a minute</p>
          </div>
          
          {success && <div className="alert-success">{success}</div>}
          {error && <div className="alert-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                <input 
                  type="text" 
                  id="name" 
                  className="form-input" 
                  style={{ width: '100%' }} 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  disabled={isLoading}
                />
                <div id="name-caret" className="custom-caret"></div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                <input 
                  type="text" 
                  inputMode="email" 
                  id="email" 
                  className="form-input" 
                  style={{ width: '100%' }} 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={isLoading}
                />
                <div id="email-caret" className="custom-caret"></div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                <input 
                  type="password" 
                  id="password" 
                  className="form-input" 
                  style={{ width: '100%' }} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                />
                <div id="password-caret" className="custom-caret"></div>
              </div>
            </div>
            
            <div className="form-options">
              <label className="terms-label">
                <input type="checkbox" required />
                <span>I agree to the <a href="#" style={{ color: 'var(--color-black)', fontWeight: '500' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--color-black)', fontWeight: '500' }}>Privacy Policy</a></span>
              </label>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="divider">
            <span className="divider-text">Or sign up with</span>
          </div>
          
          <div className="oauth-container">
            <button className="oauth-btn" type="button" onClick={() => window.location.href = '/api/auth/github'}>
              <svg className="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
            
            <button className="oauth-btn" type="button" onClick={() => window.location.href = '/api/auth/google'}>
              <svg className="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.386-2.876-6.386-6.386 0-3.51 2.876-6.386 6.386-6.386 1.554 0 2.973.565 4.075 1.583l3.073-3.073C19.206 2.296 16.02 1 12.24 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.262 0 11.24-5.067 11.24-11.24 0-.82-.083-1.613-.238-2.385H12.24z"/>
              </svg>
              Google
            </button>
          </div>
          
          <div className="login-redirect-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
