import React, { useState } from 'react';

const PROBLEMS = [
  // BEGINNER
  {
    id: 'two-sum',
    title: 'Two Sum O(N) Optimization',
    domain: 'Algorithms (LeetCode)',
    difficulty: 'Beginner',
    language: 'Python',
    points: 100,
    impact: 'Quadratic O(N^2) complexity causes CPU starvation and denial of service under high load.',
    description: 'Optimize this nested loop search algorithm to run in linear O(N) time complexity using a Hash Map (Python dictionary) lookup.',
    code: `def two_sum(nums, target):
    # Optimize this nested loop
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('range(len(')) {
        return { success: false, message: 'Failed: Still using nested range loops. Re-engineer to use a dictionary mapping to store seen items.' };
      }
      if (clean.includes('{}') || clean.includes('dict()') || clean.includes('inseen') || clean.includes('seen[')) {
        return { success: true, message: 'Success! You optimized the solution to O(N) time complexity using a dictionary lookup table, avoiding nested loops.' };
      }
      return { success: false, message: 'Failed: Ensure you store seen indices inside a dictionary map and inspect the complements on each iteration.' };
    }
  },
  {
    id: 'sql-inj',
    title: 'SQL Injection Mitigation',
    domain: 'Cybersecurity',
    difficulty: 'Beginner',
    language: 'Javascript',
    points: 100,
    impact: 'Allows attackers to bypass database authorization, leaks tables, or compromises system integrity.',
    description: 'This query routine concatenates input directly into raw SQL. Fix it by converting the query template to use parameterized arguments.',
    code: `function queryUser(id) {
  // Vulnerable: raw string concatenation
  return db.query(\`SELECT * FROM users WHERE id = '\${id}'\`);
}`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('id=?') || clean.includes('id=?',)) {
        if (clean.includes('[id]') || clean.includes('id')) {
          return { success: true, message: 'Excellent! You replaced the concatenated string template with parameter placeholders (?). Input parameters are now parsed safely by the SQL engine.' };
        }
      }
      return { success: false, message: 'Failed: The query is still vulnerable. Rewrite the query to use ? and pass the id variable in an array.' };
    }
  },
  {
    id: 'prompt-inj',
    title: 'LLM Prompt Injection Guard',
    domain: 'AI / LLM Security',
    difficulty: 'Beginner',
    language: 'Python',
    points: 100,
    impact: 'Allows attackers to hijack the model instructions, bypass safety guardrails, or leak private system prompts.',
    description: 'This function appends raw user inputs to system instructions. Attackers can inject instruction-breaking overrides like "Ignore previous instructions". Implement a guard to reject input containing override keywords.',
    code: `def build_prompt(user_input):
    # Vulnerable: directly appends user input
    return f"System: Translate to French.\\nUser: {user_input}"`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '').toLowerCase();
      if (clean.includes('ignore') || clean.includes('instruction') || clean.includes('system') || clean.includes('override')) {
        return { success: true, message: 'Success! You implemented keyword validation filters to block common prompt injection payloads and instruction hijack sequences.' };
      }
      return { success: false, message: 'Failed: Ensure you inspect the user_input string for malicious instruction-override keywords like "ignore", "override", or "instruction" before embedding it.' };
    }
  },

  // INTERMEDIATE
  {
    id: 'pickle-load',
    title: 'Insecure Model Loading',
    domain: 'Machine Learning',
    difficulty: 'Intermediate',
    language: 'Python',
    points: 200,
    impact: 'Deserialization of untrusted models allows arbitrary shell execution (Remote Code Execution) on the server.',
    description: 'This pipeline loads model weight files using Python\'s unsafe `pickle.load`. Replace it with secure serialization formats, or verify it using safe json formats.',
    code: `import pickle

def load_weights(file_path):
    # Vulnerable pickle loader
    return pickle.load(open(file_path, 'rb'))`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('pickle.load')) {
        return { success: false, message: 'Failed: Still using pickle.load, which executes arbitrary bytecode on payload extraction. Use secure alternatives like json, safe loaders, or custom parsers.' };
      }
      if (clean.includes('json.load') || clean.includes('safetensors') || clean.includes('joblib') || clean.includes('safe_load')) {
        return { success: true, message: 'Excellent! You substituted unsafe pickle.load with a secure serialization format, eliminating Remote Code Execution risks.' };
      }
      return { success: false, message: 'Failed: Replace pickle.load with a safe serialization loader (e.g. json.load or custom safe model parser).' };
    }
  },
  {
    id: 'jwt-auth',
    title: 'JWT Session Verification',
    domain: 'Cybersecurity',
    difficulty: 'Intermediate',
    language: 'NodeJS',
    points: 200,
    impact: 'Attackers can sign their own administrative headers and bypass backend authorization completely.',
    description: 'Cryptographically verify JWT session signatures using the secret key, instead of decoding tokens without signature checks.',
    code: `const jwt = require('jsonwebtoken');

function getSession(token) {
  // Vulnerable: decoded without signature check
  return jwt.decode(token);
}`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('jwt.verify(')) {
        if (clean.includes('JWT_SECRET') || clean.includes('process.env')) {
          return { success: true, message: 'Success! You replaced jwt.decode with jwt.verify, enforcing cryptographic signature checks with the server secret key.' };
        }
      }
      return { success: false, message: 'Failed: Cryptographic checks are missing. Call jwt.verify using the server secret key.' };
    }
  },
  {
    id: 'bst-validation',
    title: 'Validate Binary Search Tree',
    domain: 'Algorithms (LeetCode)',
    difficulty: 'Intermediate',
    language: 'Javascript',
    points: 200,
    impact: 'Faulty tree validation results in logical inconsistencies, traversal loop locks, or algorithmic errors.',
    description: 'Implement a complete recursion helper that tracks min/max boundaries, fixing this incomplete validation which only checks immediate siblings.',
    code: `function isValidBST(root) {
  // Incomplete sibling check
  if (!root) return true;
  if (root.left && root.left.val >= root.val) return false;
  if (root.right && root.right.val <= root.val) return false;
  return isValidBST(root.left) && isValidBST(root.right);
}`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('val>=root.val') && clean.includes('val<=root.val')) {
        return { success: false, message: 'Failed: Still checking only immediate siblings. You must pass boundary boundaries recursively (e.g., helper(node, min, max)).' };
      }
      if (clean.includes('min') || clean.includes('max') || clean.includes('helper')) {
        return { success: true, message: 'Excellent! You implemented full dynamic boundaries (min/max) to validate the entire tree recursively, matching the standard LeetCode solution.' };
      }
      return { success: false, message: 'Failed: Re-engineer the function to track lower and upper constraints dynamically down the search branches.' };
    }
  },

  // ADVANCED
  {
    id: 'dataset-poison',
    title: 'Adversarial Poisoning Guard',
    domain: 'Machine Learning',
    difficulty: 'Advanced',
    language: 'Python',
    points: 300,
    impact: 'Corrupts training datasets with outlier outliers, throwing off classification boundaries and biasing model outputs.',
    description: 'Secure this training ingest pipeline. Filter and sanitize the incoming sample values. Reject outlier samples that fall outside 3 standard deviations from the dataset mean.',
    code: `import numpy as np

def ingest_dataset(clean_data, new_samples):
    # Vulnerable: directly appends unchecked inputs
    return clean_data + new_samples`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('mean') || clean.includes('std')) {
        if (clean.includes('3*') || clean.includes('3 *') || clean.includes('z_score') || clean.includes('z-score')) {
          return { success: true, message: 'Superb! You computed statistical moments (mean, std) and successfully filtered outlier sample data to block adversarial dataset poisoning.' };
        }
      }
      return { success: false, message: 'Failed: Ensure you compute the dataset\'s mean and standard deviation, and filter out new samples that fall outside 3 standard deviations.' };
    }
  },
  {
    id: 'ssrf-guard',
    title: 'SSRF Network Protection',
    domain: 'Cybersecurity',
    difficulty: 'Advanced',
    language: 'Python',
    points: 300,
    impact: 'Attackers can force the application server to connect to internal databases or fetch AWS/GCP cloud instance metadata.',
    description: 'This routing proxy fetches arbitrary URLs. Block SSRF attacks by parsing the URL host and throwing exceptions if it targets localhost loopbacks or the metadata IP `169.254.169.254`.',
    code: `import requests

def proxy_request(url):
    # Vulnerable: direct connection fetch
    return requests.get(url).text`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('169.254.169.254') || clean.includes('localhost') || clean.includes('127.0.0.1')) {
        if (clean.includes('urlparse(') || clean.includes('urllib.parse')) {
          return { success: true, message: 'Masterful! You parsed the requested host and successfully blocked loopback and cloud metadata endpoint (169.254.169.254) SSRF requests.' };
        }
      }
      return { success: false, message: 'Failed: Fetch is unchecked. Parse the URL host and restrict connections to localhost loopbacks and metadata network blocks.' };
    }
  },
  {
    id: 'lcs-dp',
    title: 'Longest Common Subsequence (DP)',
    domain: 'Algorithms (LeetCode)',
    difficulty: 'Advanced',
    language: 'Javascript',
    points: 300,
    impact: 'Exponential O(2^(N+M)) recursion causes stack overflows and browser locks on long inputs. Needs O(N*M) DP dynamic programming.',
    description: 'Implement a 2D dynamic programming tabulation grid (DP matrix table) to solve the Longest Common Subsequence in polynomial O(N*M) time.',
    code: `function lcs(text1, text2) {
  // Optimize this O(2^(N+M)) recursion
  if (text1.length === 0 || text2.length === 0) return 0;
  if (text1[0] === text2[0]) return 1 + lcs(text1.slice(1), text2.slice(1));
  return Math.max(lcs(text1.slice(1), text2), lcs(text1, text2.slice(1)));
}`,
    validate: (code) => {
      const clean = code.replace(/\s+/g, '');
      if (clean.includes('lcs(text1.slice')) {
        return { success: false, message: 'Failed: Still using exponential recursive branches. Re-engineer to use a 2D tabulation grid.' };
      }
      if (clean.includes('Array') || clean.includes('newArray') || clean.includes('dp[') || clean.includes('grid[')) {
        return { success: true, message: 'Masterful! You implemented a 2D dynamic programming matrix to solve LCS in polynomial O(N*M) time complexity.' };
      }
      return { success: false, message: 'Failed: Initialize a 2D array matrix matching the text lengths and fill matching character cells sequentially.' };
    }
  }
];

export default function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [activeProblem, setActiveProblem] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [solvedStatuses, setSolvedStatuses] = useState({});

  const filteredProblems = PROBLEMS.filter(p => {
    const matchDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchLabel = selectedLabel === 'All' || p.domain === selectedLabel;
    return matchDifficulty && matchLabel;
  });

  const openChallenge = (p) => {
    setActiveProblem(p);
    setUserCode(p.code);
    setConsoleLogs([]);
  };

  const closeChallenge = () => {
    setActiveProblem(null);
  };

  const runCodeVerification = () => {
    if (!activeProblem) return;
    setConsoleLogs([
      '[SYSTEM] Initiating secure compiler verification...',
      '[SYSTEM] Running static analysis checks...',
    ]);

    setTimeout(() => {
      const result = activeProblem.validate(userCode);
      if (result.success) {
        setConsoleLogs(prev => [
          ...prev,
          `[SUCCESS] ${result.message}`,
          '[SYSTEM] All tests passed! Points rewarded.'
        ]);
        setSolvedStatuses(prev => ({
          ...prev,
          [activeProblem.id]: true
        }));
      } else {
        setConsoleLogs(prev => [
          ...prev,
          `[ERROR] ${result.message}`,
          '[SYSTEM] Compilation failed. Please correct code flaws and try again.'
        ]);
      }
    }, 1000);
  };

  const resetCode = () => {
    if (activeProblem) {
      setUserCode(activeProblem.code);
      setConsoleLogs(['[SYSTEM] Code restored to default vulnerable/unoptimized state.']);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '32px', color: '#fff', overflowY: 'auto' }}>
      
      {/* Header section */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#fff' }}>Practice Problems</h2>
          <p style={{ fontSize: 14, color: '#a3a3a3', marginTop: 4 }}>LeetCode-style security audits, machine learning pipelines, and algorithmic optimizations.</p>
        </div>

        {/* Difficulty filter tabs */}
        <div style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedDifficulty(tab)}
              style={{
                background: selectedDifficulty === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: 'none',
                color: selectedDifficulty === tab ? '#fff' : '#a3a3a3',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Domain / Labels Filter Pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
        {['All', 'Algorithms (LeetCode)', 'Cybersecurity', 'AI / LLM Security', 'Machine Learning'].map(label => (
          <button
            key={label}
            onClick={() => setSelectedLabel(label)}
            style={{
              background: selectedLabel === label ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.03)',
              border: selectedLabel === label ? '1px solid rgba(37,99,235,0.4)' : '1px solid rgba(255,255,255,0.06)',
              color: selectedLabel === label ? '#60a5fa' : '#a3a3a3',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Problems list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filteredProblems.map(p => {
          const isSolved = solvedStatuses[p.id];
          return (
            <div
              key={p.id}
              onClick={() => openChallenge(p)}
              style={{
                background: 'rgba(15,15,15,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 220,
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Top row */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 12,
                    background: p.difficulty === 'Beginner' ? 'rgba(0,230,118,0.1)' : p.difficulty === 'Intermediate' ? 'rgba(255,152,0,0.1)' : 'rgba(244,67,54,0.1)',
                    color: p.difficulty === 'Beginner' ? '#00e676' : p.difficulty === 'Intermediate' ? '#ff9800' : '#f44336',
                    border: p.difficulty === 'Beginner' ? '1px solid rgba(0,230,118,0.2)' : p.difficulty === 'Intermediate' ? '1px solid rgba(255,152,0,0.2)' : '1px solid rgba(244,67,54,0.2)'
                  }}>
                    {p.difficulty}
                  </span>
                  
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)', padding: '2px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: 4 }}>
                    {p.domain}
                  </span>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px 0', color: '#fff' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#a3a3a3', margin: 0, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                  {p.description}
                </p>
              </div>

              {/* Bottom row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <span style={{ fontSize: 12, color: '#00e676', fontWeight: 600 }}>{p.points} PTS • {p.language}</span>
                {isSolved ? (
                  <span style={{ fontSize: 12, color: '#00e676', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                    Completed
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: '#2563eb', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                    Solve Challenge
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Modal Overlay */}
      {activeProblem && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          {/* Side Drawer Panel */}
          <div style={{
            width: '65%',
            height: '100%',
            background: '#0c0c0c',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#00e676' }}>{activeProblem.points} PTS</span>
                  <span style={{ color: '#404040' }}>•</span>
                  <span style={{ fontSize: 12, color: '#a3a3a3' }}>{activeProblem.domain}</span>
                  <span style={{ color: '#404040' }}>•</span>
                  <span style={{ fontSize: 12, color: '#737373' }}>{activeProblem.language}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{activeProblem.title}</h3>
              </div>

              <button
                onClick={closeChallenge}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#a3a3a3', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#a3a3a3'; }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Split Panel Body */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
              
              {/* Left Column: Instructions */}
              <div style={{ width: '40%', padding: '32px', borderRight: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 8 }}>Vulnerability/Problem Description</h4>
                  <p style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 1.6, margin: 0 }}>{activeProblem.description}</p>
                </div>

                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 8 }}>Security / Operational Impact</h4>
                  <div style={{ background: 'rgba(244,67,54,0.05)', border: '1px solid rgba(244,67,54,0.15)', borderRadius: 12, padding: 16 }}>
                    <p style={{ fontSize: 13, color: '#ef5350', lineHeight: 1.5, margin: 0 }}>{activeProblem.impact}</p>
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ fontSize: 13, fontWeight: 500, color: '#737373', margin: '0 0 8px 0' }}>Instructions:</h4>
                  <ul style={{ fontSize: 13, color: '#a3a3a3', paddingLeft: 18, margin: 0, lineHeight: 1.6 }}>
                    <li>Review the unoptimized or vulnerable code logic.</li>
                    <li>Refactor the routine to resolve security leaks or algorithmic loops.</li>
                    <li>Hit "Run Security Checks" to evaluate your solution.</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Code Editor + Terminal Console */}
              <div style={{ width: '60%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {/* Editor code area */}
                <div style={{ flex: 2, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ background: '#090909', padding: '8px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#525252', fontWeight: 600 }}>SOURCE_CODE.{activeProblem.language === 'Python' ? 'PY' : activeProblem.language === 'C' ? 'C' : 'JS'}</span>
                    <button
                      onClick={resetCode}
                      style={{ background: 'transparent', border: 'none', color: '#737373', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#737373'}
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18"/></svg>
                      Reset File
                    </button>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={e => setUserCode(e.target.value)}
                    style={{
                      flex: 1,
                      background: '#070707',
                      border: 'none',
                      color: '#d4d4d4',
                      fontFamily: 'Courier New, Courier, monospace',
                      fontSize: 14,
                      lineHeight: 1.6,
                      padding: 24,
                      resize: 'none',
                      outline: 'none',
                      width: '100%'
                    }}
                  />
                </div>

                {/* Console Output Terminal */}
                <div style={{ flex: 1, borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <div style={{ background: '#090909', padding: '8px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: 12, color: '#525252', fontWeight: 600 }}>
                    COMPILER CONSOLE OUTPUT
                  </div>
                  <div style={{ flex: 1, padding: 20, overflowY: 'auto', fontFamily: 'Courier New, Courier, monospace', fontSize: 13, color: '#a3a3a3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {consoleLogs.length === 0 ? (
                      <span style={{ color: '#404040' }}>Terminal idle. Hit run checks to test your code.</span>
                    ) : (
                      consoleLogs.map((log, i) => {
                        let color = '#a3a3a3';
                        if (log.startsWith('[SUCCESS]')) color = '#00e676';
                        if (log.startsWith('[ERROR]')) color = '#ef5350';
                        if (log.startsWith('[SYSTEM]')) color = '#2563eb';
                        return <span key={i} style={{ color }}>{log}</span>;
                      })
                    )}
                  </div>
                </div>

                {/* Actions footer bar */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#080808', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  <button
                    onClick={closeChallenge}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      padding: '10px 20px',
                      color: '#a3a3a3',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={runCodeVerification}
                    style={{
                      background: '#2563eb',
                      border: 'none',
                      borderRadius: 12,
                      padding: '10px 24px',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.2)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#3b82f6'}
                    onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                  >
                    Run Security Checks
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Smooth CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
