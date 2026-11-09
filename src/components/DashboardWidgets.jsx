import React, { useState } from 'react';

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({ icon, value, label, accent }) {
  return (
    <div style={{
      background: '#131313',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}>
      <div style={{ color: accent || '#737373' }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{value}</span>
        <span style={{ fontSize: 12, color: '#737373', marginTop: 4 }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Language Progress ────────────────────────────────────────────────────────

const LANGUAGES = [
  { id: 'python',    label: 'Python',      pct: 0, color: '#3b82f6' },
  { id: 'javascript',label: 'JavaScript',  pct: 0, color: '#f59e0b' },
  { id: 'java',      label: 'Java',        pct: 0, color: '#ef4444' },
  { id: 'cpp',       label: 'C++',         pct: 0, color: '#10b981' },
];

function LanguageProgress({ onNavigate }) {
  const stored = {};
  try {
    const raw = localStorage.getItem('vericode_learning_progress');
    if (raw) Object.assign(stored, JSON.parse(raw));
  } catch (_) {}

  return (
    <section style={{
      background: '#131313',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '24px',
      flex: 1,
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        Language Progress
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {LANGUAGES.map(lang => {
          const pct = stored[lang.id] || lang.pct;
          return (
            <div key={lang.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#d4d4d4', fontWeight: 600, marginBottom: 6 }}>
                <span>{lang.label}</span>
                <span style={{ color: '#737373' }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: `${pct}%`,
                  background: lang.color,
                  height: '100%',
                  transition: 'width 0.4s ease',
                  borderRadius: 3,
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Getting Started Checklist ─────────────────────────────────────────────────

const CHECKLIST = [
  { id: 'practice',  label: 'Solve first practice problem', view: 'practice' },
  { id: 'profile',   label: 'Set up your profile',          view: 'settings' },
  { id: 'learning',  label: 'Start a learning track',       view: 'learning' },
  { id: 'community', label: 'Join the community',           view: 'community' },
];

function Checklist({ onNavigate }) {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vericode_checklist') || '{}');
    } catch (_) { return {}; }
  });

  const toggle = (id) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem('vericode_checklist', JSON.stringify(next));
  };

  return (
    <section style={{
      background: '#131313',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '24px',
      flex: 1,
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        Getting Started
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CHECKLIST.map(item => (
          <li
            key={item.id}
            onClick={() => onNavigate(item.view)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.05)',
              background: completed[item.id] ? 'rgba(0,230,118,0.04)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = completed[item.id] ? 'rgba(0,230,118,0.04)' : 'transparent'}
          >
            <div style={{
              width: 18, height: 18,
              borderRadius: '50%',
              border: `1.5px solid ${completed[item.id] ? '#00e676' : '#404040'}`,
              background: completed[item.id] ? '#00e676' : 'transparent',
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {completed[item.id] && (
                <svg width="10" height="10" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              )}
            </div>
            <span style={{
              fontSize: 14,
              color: completed[item.id] ? '#737373' : '#d4d4d4',
              textDecoration: completed[item.id] ? 'line-through' : 'none',
              transition: 'all 0.2s',
            }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Topic Coverage Circles ────────────────────────────────────────────────────

function CircleProgress({ pct, color, label }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
          <circle cx="40" cy="40" r={r} stroke={color} strokeWidth="6" fill="none"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
          {pct}%
        </div>
      </div>
      <span style={{ fontSize: 13, color: '#737373', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ─── To-Do List ───────────────────────────────────────────────────────────────

const DEFAULT_TODOS = [
  { text: 'Audit Express routes for RCE loopholes', completed: true },
  { text: 'Solve 3 LeetCode DP questions in Python', completed: false },
  { text: 'Read GeeksforGeeks article on Red-Black Trees', completed: false },
  { text: 'Run automated security scan on landing page', completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('vericode_todos');
      return raw ? JSON.parse(raw) : DEFAULT_TODOS;
    } catch (_) { return DEFAULT_TODOS; }
  });
  const [input, setInput] = useState('');

  const save = (next) => {
    setTodos(next);
    localStorage.setItem('vericode_todos', JSON.stringify(next));
  };

  const add = () => {
    const text = input.trim();
    if (!text) return;
    save([...todos, { text, completed: false }]);
    setInput('');
  };

  const toggle = (i) => {
    const next = [...todos];
    next[i].completed = !next[i].completed;
    save(next);
  };

  const remove = (i) => {
    const next = todos.filter((_, idx) => idx !== i);
    save(next);
  };

  return (
    <section style={{
      background: '#131313',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '24px',
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        To-Do List
      </h3>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            padding: '10px 12px',
            fontSize: 13.5,
            color: '#fff',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={add}
          style={{
            padding: '10px 18px',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {todos.map((todo, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 6,
              background: todo.completed ? 'rgba(255,255,255,0.02)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggle(i)}
                style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#00e676', flexShrink: 0 }}
              />
              <span style={{
                fontSize: 13.5,
                color: todo.completed ? '#404040' : '#d4d4d4',
                textDecoration: todo.completed ? 'line-through' : 'none',
                wordBreak: 'break-word',
              }}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => remove(i)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#404040',
                cursor: 'pointer',
                padding: 2,
                display: 'flex',
                flexShrink: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
              onMouseLeave={e => e.currentTarget.style.color = '#404040'}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Main Dashboard Widgets Export ────────────────────────────────────────────

export function DashboardWidgets({ user, onNavigate }) {
  // Load practice stats from localStorage
  const storedStats = {};
  try {
    const raw = localStorage.getItem('vericode_stats');
    if (raw) Object.assign(storedStats, JSON.parse(raw));
  } catch (_) {}

  const solvedCount = storedStats.solvedCount || 0;
  const streak = storedStats.streak || 0;
  const badges = storedStats.badges || 0;
  const rank = solvedCount >= 8 ? '#1' : solvedCount >= 5 ? '#2' : solvedCount >= 3 ? '#3' : 'Unranked';

  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      {/* Welcome header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Dashboard</h2>
        <p style={{ fontSize: 13, color: '#737373' }}>
          Welcome back, <strong style={{ color: '#fff' }}>{user?.name || 'there'}</strong>. Ready to start coding?
        </p>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <MetricCard
          icon={
            <svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          }
          value={solvedCount}
          label="Problems Solved"
          accent="#3b82f6"
        />
        <MetricCard
          icon={
            <svg width="20" height="20" fill="#ff6b00" viewBox="0 0 24 24">
              <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.08-2.15-1.64-1.24-.98-2-2.43-2.03-4.04-.01-.41-.05-.85-.18-1.24-.16-.48-.55-.86-1.06-.94-.52-.08-1.04.14-1.34.57C8.62 5.3 7.8 7.37 7.8 9.5c0 .32.03.63.07.94-1.36-.61-2.18-1.89-2.28-3.34 0-.1-.08-.18-.18-.18h-.06c-.32.02-.64.15-.87.38-1.74 1.74-2.82 4.14-2.82 6.8 0 5.47 4.43 9.9 9.9 9.9 5.47 0 9.9-4.43 9.9-9.9 0-3.39-1.7-6.39-4.3-8.2z"/>
            </svg>
          }
          value={`${streak} day${streak !== 1 ? 's' : ''}`}
          label="Current Streak"
          accent="#ff6b00"
        />
        <MetricCard
          icon={
            <svg width="20" height="20" fill="none" stroke="#ffd700" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 00-4 4v3H5V6a1 1 0 00-1-1H3a1 1 0 00-1 1v6a5 5 0 005 5h1v2H6v2h12v-2h-2v-2h1a5 5 0 005-5V6a1 1 0 00-1-1h-1a1 1 0 00-1 1v3h-3V6a4 4 0 00-4-4z"/>
            </svg>
          }
          value={badges}
          label="Badges Earned"
          accent="#ffd700"
        />
        <MetricCard
          icon={
            <svg width="20" height="20" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          }
          value={rank}
          label="Global Rank"
          accent="#10b981"
        />
      </div>

      {/* Middle grid: Language Progress + Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <LanguageProgress onNavigate={onNavigate} />
        <Checklist onNavigate={onNavigate} />
      </div>

      {/* Bottom row: Recent Activity + Right column widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* Recent Activity */}
        <section style={{
          background: '#131313',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            Recent Activity
          </h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, color: '#737373' }}>
            <svg width="40" height="40" fill="none" stroke="#2a2a2a" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <span style={{ fontSize: 13.5 }}>No activity yet. Start solving problems!</span>
          </div>
        </section>

        {/* Right column: Topic Coverage + Todo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Topic Coverage */}
          <section style={{
            background: '#131313',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '24px',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              Topic Coverage
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <CircleProgress pct={0} color="#3b82f6" label="Arrays" />
              <CircleProgress pct={0} color="#8b5cf6" label="Strings" />
              <CircleProgress pct={0} color="#10b981" label="Trees" />
            </div>
          </section>

          <TodoList />
        </div>
      </div>
    </div>
  );
}
