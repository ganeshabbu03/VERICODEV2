import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Extract token from query params
    const searchParams = new URLSearchParams(location.search);
    const tok = searchParams.get('token');
    if (tok) {
      setToken(tok);
    } else {
      setError('Invalid reset link: reset token is missing.');
    }
  }, [location]);

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

    const cleanPassword = enableSmoothCaret('password', 'password-caret');
    const cleanConfirmPassword = enableSmoothCaret('confirm-password', 'confirm-password-caret');
    return () => {
      if (cleanPassword) cleanPassword();
      if (cleanConfirmPassword) cleanConfirmPassword();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Cannot submit: reset token is missing.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.error || 'Failed to reset password. The link may have expired.');
      }
    } catch (err) {
      setError('Connection to auth server failed. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-body-wrapper">
      <style>{`
        .login-page-body-wrapper {
          background-color: var(--color-black);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
          box-sizing: border-box;
          font-family: var(--font-body);
        }
        
        .login-container {
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
        
        .login-panel-info {
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        
        .login-panel-info::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, transparent 45%, rgba(255, 255, 255, 0.03) 50%, transparent 55%);
          pointer-events: none;
        }
        
        .login-info-header .logo-container {
          margin-bottom: 40px;
        }
        
        .login-panel-info h2 {
          font-size: 38px;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        
        .login-panel-info p {
          font-size: 15px;
          color: var(--color-gray-400);
          line-height: 1.6;
          max-width: 380px;
        }
        
        .login-info-footer {
          font-size: 12px;
          color: var(--color-gray-600);
        }
        
        .login-panel-form {
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
        
        .login-form {
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
          margin-top: 10px;
        }
        
        .submit-btn:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
        
        @media (max-width: 900px) {
          .login-container {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .login-panel-info {
            display: none;
          }
          .login-panel-form {
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

      <div className="login-container animate-in fade-in zoom-in-95 duration-500">
        {/* Left panel (branded) */}
        <div className="login-panel-info">
          <div className="login-info-header">
            <Link to="/" className="logo-container" title="Vericode AI" style={{ textDecoration: 'none' }}>
              <img src="/logo_white.jpg" alt="Vericode AI Logo" className="logo-img" style={{ mixBlendMode: 'screen', height: '32px' }} />
              <span className="logo-text" style={{ color: 'var(--color-white)' }}>VERICODE AI</span>
            </Link>
            <h2 style={{ marginTop: '40px' }}>Choose a strong password.</h2>
            <p style={{ marginTop: '16px' }}>
              Make sure to use a mix of letters, numbers, and symbols to keep your Vericode spaces and LeetCode run state safe.
            </p>
          </div>

          <div className="login-info-footer">
            <span>&copy; 2026 Vericode AI. Made for people who build.</span>
          </div>
        </div>

        {/* Right panel (form) */}
        <div className="login-panel-form">
          <div className="form-header">
            <h3>Reset Password</h3>
            <p>Please enter your new password below</p>
          </div>

          {message && <div className="alert-success">{message} Redirecting to login...</div>}
          {error && <div className="alert-error">{error}</div>}
          
          {!message && token && (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
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

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                  <input 
                    type="password" 
                    id="confirm-password" 
                    className="form-input" 
                    style={{ width: '100%' }} 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    disabled={isLoading}
                  />
                  <div id="confirm-password-caret" className="custom-caret"></div>
                </div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          )}
          
          <div className="login-redirect-link">
            Remember your password? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
