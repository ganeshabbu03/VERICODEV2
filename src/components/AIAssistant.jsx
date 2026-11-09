import React, { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  { emoji: '🛡️', text: 'Scan login handler for OWASP security flaws' },
  { emoji: '⚡', text: 'Optimize Two Sum using Hash Map' },
  { emoji: '🔍', text: 'Explain DP recursion vs memoization' },
];

const REPLIES = {
  security: `I scanned the project repository.\n\n\`\`\`javascript\n// Securing auth-handler.js\nconst argon2 = require('argon2');\nasync function login(user, pass) {\n  const hash = await db.getUserHash(user);\n  return await argon2.verify(hash, pass);\n}\n\`\`\`\nMitigation applied: Upgraded PBKDF2 to **Argon2id** and verified parameterized queries are used.`,
  python: `To solve Two Sum in Python in O(N) time complexity, use a Hash Map:\n\n\`\`\`python\ndef twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\`\`\``,
  dp: `In Dynamic Programming:\n- **Recursion (Top-Down)**: Solves subproblems recursively and stores results in a memo table.\n- **Tabulation (Bottom-Up)**: Fills a table iteratively from base cases up to the target state.\n\nUse memoization when only a subset of subproblems need solving; use tabulation when all subproblems must be visited.`,
  hello: `Hello! I'm your Vericode AI Copilot. I can scan files for vulnerabilities, write unit tests, explain algorithms, or help debug complex code. What would you like to work on?`,
};

function getReply(query) {
  const q = query.toLowerCase();
  if (/security|audit|vulnerability|scan|owasp/i.test(q)) return REPLIES.security;
  if (/python|two\s*sum|2\s*sum/i.test(q)) return REPLIES.python;
  if (/recursion|dynamic|memoization/i.test(q)) return REPLIES.dp;
  if (/hello|hi|hey/i.test(q)) return REPLIES.hello;
  return `I recommend auditing this block for edge cases, optimizing time complexity, and ensuring input validation. Ask me something specific — I can scan for vulnerabilities, write tests, or explain algorithms.`;
}

function formatMsg(text) {
  return text
    // Replace code blocks and ignore the language tag if present
    .replace(/```(?:\w+)?\n([\s\S]*?)```/g, '<pre style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:14px;margin:10px 0;font-size:13px;overflow-x:auto"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;font-size:13px">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#00e676">$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [planMode, setPlanMode] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(true);
  const threadRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      const timer = setTimeout(() => {
        threadRef.current.scrollTo({
          top: threadRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video autoPlay prevented: ', e));
    }
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: 'user', text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const apiKey = localStorage.getItem('VITE_OPENROUTER_API_KEY') || import.meta.env.VITE_OPENROUTER_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Vericode AI"
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: "You are Vericode AI Copilot, a helpful coding assistant specialized in security audits, code optimization, and explaining algorithms. Keep your answers clear and concise." },
              ...updatedMessages.map(m => ({
                role: m.role === 'ai' ? 'assistant' : 'user',
                content: m.text
              }))
            ],
            max_tokens: 1000
          })
        });

        if (!response.ok) {
          let errorMsg = response.statusText;
          try {
            const errData = await response.json();
            errorMsg = errData.error?.message || JSON.stringify(errData) || errorMsg;
          } catch (_) {}
          throw new Error(errorMsg);
        }

        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || "No response received.";
        setMessages(prev => [...prev, { role: 'ai', text: replyText }]);
      } catch (err) {
        console.error("OpenRouter API error: ", err);
        const reply = getReply(text);
        setMessages(prev => [...prev, { role: 'ai', text: `${reply}\n\n*(API Error: ${err.message || 'fallback active'}*)` }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      setTimeout(() => {
        const reply = getReply(text);
        setMessages(prev => [...prev, { role: 'ai', text: reply }]);
        setIsTyping(false);
      }, 1200);
    }
  };

  const useSuggestion = (text) => {
    setInput(text);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className={`ai-assistant-container ${hasMessages ? 'active-chat' : ''}`} style={{ height: '100%', minHeight: '0', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
      {/* Wave Video Loop background overlay */}
      <video
        ref={videoRef}
        src="/A_close_up_shot_of_a_single_wa.mp4"
        loop
        muted
        playsInline
        className="ai-bg-video"
      />

      {/* Landing Interface (shown in initial state) */}
      {!hasMessages && (
        <div className="ai-landing-wrapper" style={{ marginTop: 'auto' }}>
          <h1 className="ai-hero-title">Build something Secure</h1>
          <p className="ai-hero-subtitle">Create secure apps and optimize algorithms by chatting with AI</p>
        </div>
      )}

      {/* Message history (shown in active chat state) */}
      <div ref={threadRef} className="ai-chat-thread-container" style={{ display: hasMessages ? 'flex' : 'none', flex: '1 1 0%', minHeight: 0, width: '100%', maxWidth: '100%', paddingBottom: 24, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: '720px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`ai-message-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
              <div className={`ai-message-avatar ${msg.role === 'ai' ? 'ai' : 'user'}`}>
                {msg.role === 'ai' ? 'V' : 'U'}
              </div>
              <div className="ai-message-content" dangerouslySetInnerHTML={{ __html: formatMsg(msg.text) }} />
            </div>
          ))}

          {isTyping && (
            <div className="ai-message-bubble ai thinking">
              <div className="ai-message-avatar ai">V</div>
              <div className="ai-message-content">
                Vericode Copilot is thinking...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Box Area */}
      <div className="ai-input-container" style={{ width: '100%', maxWidth: '720px', flexShrink: 0, marginTop: hasMessages ? '0' : '20px', marginBottom: hasMessages ? '20px' : '0' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Ask Vericode to audit, optimize, or write code..."
          rows={1}
          className="ai-chat-textarea"
          style={{ caretColor: 'auto' }} // Ensure text cursor shows normally in input
        />
        
        <div className="ai-input-actions">
          <div className="ai-input-left">
            <button className="ai-action-btn" type="button" title="Add files or code">
              <svg className="icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
          
          <div className="ai-input-right">
            <div
              className={`ai-plan-selector ${planMode ? 'active' : ''}`}
              onClick={() => setPlanMode(p => !p)}
            >
              <span>Plan</span>
              <svg className="icon-chevron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
            </div>
            
            <button className="ai-action-btn" type="button" title="Voice Input">
              <svg className="icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
              </svg>
            </button>
            
            <button
              className={`ai-action-btn animated-volume-btn ${speechMuted ? 'muted' : ''}`}
              onClick={() => setSpeechMuted(m => !m)}
              type="button"
              title={speechMuted ? 'Enable Speech Output' : 'Mute Speech Output'}
            >
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'currentColor' }}>
                <path stroke="none" d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                {!speechMuted && (
                  <g style={{ stroke: 'currentColor', strokeWidth: '2.2', strokeLinecap: 'round', fill: 'none' }}>
                    <path d="M16 9a5 5 0 0 1 0 6" />
                    <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                  </g>
                )}
              </svg>
            </button>

            <button
              onClick={send}
              disabled={!input.trim()}
              className="ai-send-btn"
              type="button"
            >
              <svg className="icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Cards */}
      {!hasMessages && (
        <div className="ai-suggestions-list" style={{ marginBottom: 'auto' }}>
          {SUGGESTIONS.map((s, i) => (
            <div
              key={i}
              className="ai-suggestion-card"
              onClick={() => useSuggestion(s.text)}
            >
              <span className="ai-suggest-icon">{s.emoji}</span>
              <div className="ai-suggest-text">{s.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
