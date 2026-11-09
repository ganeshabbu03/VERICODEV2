import React, { useEffect } from 'react';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react';
import { Link } from 'react-router-dom';
import { initLandingPage, destroyLandingPage } from '../main.js';
import { companyData } from '../company-data.js';

function TeamCard({ member, featured }) {
  return (
    <article className={`team-card${featured ? ' featured' : ''}`} data-tilt>
      <div className="team-card-inner">
        <div className="team-card-glow" aria-hidden="true"></div>
        <div className="team-avatar">
          {member.photo
            ? <img src={member.photo} alt={member.name} className="team-avatar-img" />
            : <span className="team-avatar-monogram">{member.initials}</span>}
          <span className="team-avatar-ring" aria-hidden="true"></span>
        </div>
        <div className="team-role-tag">{member.role}</div>
        <h3 className="team-name">{member.name}</h3>
        <span className="team-tenure">{member.tenure}</span>
        <p className="team-bio">{member.bio}</p>
        <div className="team-links">
          <a href={member.links.linkedin} className="team-link" aria-label={`${member.name} on LinkedIn`}>in</a>
          <a href={member.links.x} className="team-link" aria-label={`${member.name} on X`}>X</a>
          <a href={member.links.email} className="team-link" aria-label={`Email ${member.name}`}>@</a>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 800);
    }

    initLandingPage();
    return () => {
      destroyLandingPage();
    };
  }, []);

  const closeMobileMenu = () => {
    document.getElementById('mobile-menu-btn')?.classList.remove('open');
    document.getElementById('mobile-nav-overlay')?.classList.remove('active');
    document.querySelector('.nav-menu')?.classList.remove('open');
  };

  return (
    <div className="home-container">
      <div className="adaptive-cursor" id="adaptive-cursor" aria-hidden="true"></div>

      {/* Page Loading Preloader Animation */}
      <div id="preloader" className="preloader">
        <div className="preloader-content">
          <img src="/logo_white.jpg" alt="Vericode AI Symbol" className="preloader-logo" style={{ mixBlendMode: 'screen' }} />
          <div className="preloader-bar-wrap">
            <div className="preloader-bar" id="preloader-bar"></div>
          </div>
          <span className="preloader-text">INITIALIZING VERICODE AI...</span>
        </div>
      </div>

      {/* Mobile nav overlay */}
      <div id="mobile-nav-overlay" onClick={closeMobileMenu}></div>

      {/* 1. Header & Navigation */}
      <header id="main-header" className="animate-in fade-in slide-in-from-top duration-300">
        <a href="#" className="logo-container" title="Vericode AI">
          <img src="/logo_white.jpg" alt="Vericode AI Logo" className="logo-img" style={{ mixBlendMode: 'screen' }} />
          <span className="logo-text">VERICODE AI</span>
        </a>
        
        <nav>
          <ul className="nav-menu">
            <li><a href="#hero" className="nav-link" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#features" className="nav-link" onClick={closeMobileMenu}>Features</a></li>
            <li><a href="#roadmap-sec" className="nav-link" onClick={closeMobileMenu}>Secure IDE</a></li>
            <li><a href="#team-sec" className="nav-link" onClick={closeMobileMenu}>Team</a></li>
            <li><a href="#audience" className="nav-link" onClick={closeMobileMenu}>Audience</a></li>
            {!isLoaded ? null : isSignedIn ? (
              <>
                <li><Link to="/dashboard" className="nav-link" onClick={closeMobileMenu}>Dashboard</Link></li>
                <li><UserButton afterSignOutUrl="/" /></li>
              </>
            ) : (
              <>
                <li>
                  <SignInButton mode="modal">
                    <button type="button" className="nav-link" onClick={closeMobileMenu}>Sign In</button>
                  </SignInButton>
                </li>
                <li>
                  <SignUpButton mode="modal">
                    <button type="button" className="cta-button secondary" onClick={closeMobileMenu}>Get Started</button>
                  </SignUpButton>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile hamburger button */}
        <button id="mobile-menu-btn" onClick={() => {
          const btn = document.getElementById('mobile-menu-btn');
          const overlay = document.getElementById('mobile-nav-overlay');
          const menu = document.querySelector('.nav-menu');
          btn?.classList.toggle('open');
          overlay?.classList.toggle('active');
          menu?.classList.toggle('open');
        }}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="scroll-indicator-wrap">
          <div className="scroll-indicator-bar" id="scroll-indicator"></div>
        </div>
      </header>

      {/* 2. Hero Section (Diagonal Split) */}
      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-badge animate-in fade-in slide-in-from-bottom duration-500 delay-100">
            <span>Built for how developers actually work</span>
          </div>
          <h1 className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
            Learn, practice,<br />and build better<br />ideas<br />
            <span className="text-gradient">from one place.</span>
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
            Vericode AI brings learning content, coding practice, idea posting, and an AI assistant into one workspace. Learn a topic, solve problems, post a project idea, and discuss how it could work in the real world without jumping between tools.
          </p>
          <div className="hero-buttons animate-in fade-in slide-in-from-bottom duration-500 delay-400">
            {!isLoaded ? null : isSignedIn ? (
              <Link to="/dashboard" className="cta-button primary">Go to Dashboard</Link>
            ) : (
              <SignUpButton mode="modal">
                <button type="button" className="cta-button primary">Register for early access</button>
              </SignUpButton>
            )}
            <a href="#roadmap-sec" className="cta-button secondary">Where we are headed</a>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="veo-container animate-in fade-in zoom-in-95 duration-500 delay-300">
            <div className="veo-prompt-overlay">Slow walkthrough - each feature with a real example</div>
            <canvas id="veo-intro-canvas" className="veo-canvas"></canvas>
            <div className="veo-controls">
              <button className="veo-play-btn" id="veo-play-button" aria-label="Play/Pause Video">
                <svg className="icon-md" fill="currentColor" viewBox="0 0 24 24" id="veo-play-icon">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <div className="veo-progress-container" id="veo-progress-container">
                <div className="veo-progress-bar" id="veo-progress-bar" style={{ width: '0%' }}></div>
              </div>
              <span className="veo-prompt-label">Vericode AI Feature Demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Immersive 3D Orbit Section */}
      <section className="scene-section" id="integrations-sec">
        <div className="scene-feature-panel" id="features">
          <div className="section-intro">
            <div className="feature-eyebrow">What you can do inside Vericode AI</div>
            <h2>Different tools for every stage of building</h2>
            <p>Move from learning to practice to idea discussion without losing context. Each feature supports a different part of the same workflow.</p>
          </div>

          <div className="feature-card-grid">
            <article className="feature-card">
              <img src="/features/learning.png" alt="Guided concept learning workspace" className="feature-card-image" />
              <div className="feature-card-icon">
                <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V5a2 2 0 0 1 2-2h12"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 17h12a2 2 0 0 1 2 2v1H6a2 2 0 0 1 0-4z"/>
                </svg>
              </div>
              <span className="feature-card-kicker">Learning</span>
              <h3>Guided concept learning</h3>
              <p>Study topics with clear explanations, examples, and short paths through data structures, algorithms, web development, and security basics.</p>
              <div className="feature-example">Example: Learn authentication by seeing login, sessions, password reset, and route protection in one flow.</div>
            </article>

            <article className="feature-card">
              <img src="/features/practice.png" alt="Coding practice workspace with tests" className="feature-card-image" />
              <div className="feature-card-icon">
                <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 9l3 3-3 3"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l-4 14"/>
                </svg>
              </div>
              <span className="feature-card-kicker">Practice</span>
              <h3>Coding practice workspace</h3>
              <p>Solve problems, run code, compare approaches, and understand time and space complexity with feedback beside the editor.</p>
              <div className="feature-example">Example: Solve two-sum, then compare nested loops with a hash map solution.</div>
            </article>

            <article className="feature-card">
              <img src="/features/ideas.png" alt="Idea posting board with project planning cards" className="feature-card-image" />
              <div className="feature-card-icon">
                <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14v16H5z"/>
                </svg>
              </div>
              <span className="feature-card-kicker">Ideas</span>
              <h3>Idea posting</h3>
              <p>Post product ideas with goals, users, features, and open questions so they can be discussed and improved before implementation.</p>
              <div className="feature-example">Example: Post a campus marketplace idea and collect features like listings, chat, payments, and safety checks.</div>
            </article>

            <article className="feature-card">
              <img src="/features/ai-assistant.png" alt="AI assistant discussion interface" className="feature-card-image" />
              <div className="feature-card-icon">
                <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
                </svg>
              </div>
              <span className="feature-card-kicker">AI Assistant</span>
              <h3>Ask, discuss, and refine</h3>
              <p>Use the assistant to explain code, generate practice prompts, discuss an idea, identify missing features, and break work into milestones.</p>
              <div className="feature-example">Example: Ask what database tables a food-delivery MVP needs and why.</div>
            </article>

            <article className="feature-card feature-card-wide">
              <img src="/features/real-world.png" alt="Real-world software modules connected in a system map" className="feature-card-image" />
              <div className="feature-card-icon">
                <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-5"/>
                </svg>
              </div>
              <span className="feature-card-kicker">Real-world examples</span>
              <h3>Connect learning to real products</h3>
              <p>Every topic can be tied back to a practical build: a chat app, student portal, marketplace, dashboard, secure API, or interview problem.</p>
              <div className="feature-example">Example: Learn queues through order processing, notifications, and background jobs in an ecommerce app.</div>
            </article>
          </div>
        </div>

        <div className="three-fixed-container" id="canvas-container">
          <div id="three-target" className="three-canvas-target"></div>
        </div>
        
        <div className="scroll-overlays">
          <div className="overlay-trigger-panel" id="panel-chatgpt">
            <div className="glass-info-card" id="card-chatgpt">
              <div className="card-badge">AI Learning Assistant</div>
              <h3>Learn with examples that fit the topic</h3>
              <p>
                Ask the assistant to explain a concept, walk through code, or turn a hard article into a simple lesson. If you are learning authentication, it can show how login, sessions, and password reset work in a real student portal.
              </p>
              <ul>
                <li>Plain-language explanations for algorithms, web apps, and security</li>
                <li>Real-world examples before you move into code</li>
                <li>Debugging help that teaches the reason behind the fix</li>
              </ul>
            </div>
          </div>
          
          <div className="overlay-trigger-panel right-align" id="panel-leetcode">
            <div className="glass-info-card" id="card-leetcode">
              <div className="card-badge">Practice Workspace</div>
              <h3>Practice until the patterns stick</h3>
              <p>
                Work through coding problems, run your solution, and ask for hints when you are stuck. For example, practice arrays by solving a two-sum problem, then ask why a hash map is faster than nested loops.
              </p>
              <ul>
                <li>Practice problems tied to the topic you are learning</li>
                <li>Hints, test cases, and complexity feedback in one place</li>
                <li>Cleaner reference solutions after you finish</li>
              </ul>
            </div>
          </div>
          
          <div className="overlay-trigger-panel" id="panel-geeksforgeeks">
            <div className="glass-info-card" id="card-geeksforgeeks">
              <div className="card-badge">Ideas & Discussion</div>
              <h3>Post ideas and pressure-test them</h3>
              <p>
                Share a project idea, describe the problem, and discuss the feature set with AI and peers. A campus marketplace idea can become user stories, database tables, security checks, and a first MVP plan.
              </p>
              <ul>
                <li>Idea posts with goals, audience, and expected users</li>
                <li>AI discussion that turns rough ideas into buildable plans</li>
                <li>Real-world examples for features, risks, and launch steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Secure IDE Roadmap */}
      <section className="roadmap-section" id="roadmap-sec">
        <div className="roadmap-grid">
          <div className="roadmap-left">
            <div className="logo-container" title="Vericode AI" style={{ marginBottom: '24px' }}>
              <img src="/logo_white.jpg" alt="Vericode Symbol" style={{ height: '30px', mixBlendMode: 'screen' }} />
              <span className="logo-text" style={{ fontSize: '16px' }}>SECURE IDE ROADMAP</span>
            </div>
            <h2>Where secure coding goes next</h2>
            <p>
              Studying and practising get you the fundamentals. Shipping real code asks for more: guardrails that catch mistakes before they reach users. Here is how the workspace grows into a full desktop IDE from here.
            </p>
            
            <div className="roadmap-timeline">
              <div className="roadmap-step active" id="step-1">
                <div className="step-marker">01</div>
                <div className="step-content">
                  <h4>Phase 1: One web dashboard</h4>
                  <p>Learning, practice, idea posting, and AI discussion sitting side by side in a layout that works on any screen. (Live now)</p>
                </div>
              </div>
              <div className="roadmap-step" id="step-2">
                <div className="step-marker">02</div>
                <div className="step-content">
                  <h4>Phase 2: Ideas into projects</h4>
                  <p>Shared idea rooms, AI-guided planning, peer discussion, and coding spaces where a concept can become an MVP. (Being built)</p>
                </div>
              </div>
              <div className="roadmap-step" id="step-3">
                <div className="step-marker">03</div>
                <div className="step-content">
                  <h4>Phase 3: The Vericode Secure IDE</h4>
                  <p>A lightweight editor that checks for common weaknesses in the background (OWASP Top 10) and offers a fix on the spot. (Planned)</p>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="team-section" id="team-sec">
        <div className="section-intro">
          <div className="team-eyebrow">The people behind the work</div>
          <h2>Who builds Vericode AI</h2>
          <p>A small group carrying the whole thing — from the first line of the product strategy down to the last query that keeps it running. Here is who does what.</p>
        </div>

        <div className="team-tier-label">
          <span className="team-tier-line" aria-hidden="true"></span>
          <span>Leadership</span>
          <span className="team-tier-line" aria-hidden="true"></span>
        </div>
        <div className="team-grid team-grid-leadership">
          {companyData.team.leadership.map(member => (
            <TeamCard key={member.id} member={member} featured />
          ))}
        </div>

        <div className="team-tier-label">
          <span className="team-tier-line" aria-hidden="true"></span>
          <span>Engineering</span>
          <span className="team-tier-line" aria-hidden="true"></span>
        </div>
        <div className="team-grid team-grid-engineering">
          {companyData.team.engineering.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* 6. Audience Section */}
      <section className="audience-section" id="audience">
        <div className="section-intro">
          <h2>Made for learners, builders, and small teams</h2>
          <p>One workspace for understanding concepts, practicing skills, sharing ideas, and turning the strongest ones into working software.</p>
        </div>
        
        <div className="cards-container">
          <div className="audience-card">
            <div className="card-icon">
              <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3>For students</h3>
            <p>Fewer tabs, fewer detours. Learn a topic, ask the AI assistant for a real-world explanation, and practice until the idea becomes clear.</p>
            <ul>
              <li>A clear path through core data structures and algorithms</li>
              <li>Examples like login systems, payment flows, and chat apps</li>
              <li>Practice problems with hints, tests, and feedback</li>
            </ul>
          </div>
          
          <div className="audience-card">
            <div className="card-icon">
              <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10H7z"/>
              </svg>
            </div>
            <h3>For idea builders</h3>
            <p>Post an idea, discuss it with the AI assistant, and shape it into a real product plan before writing code.</p>
            <ul>
              <li>Turn a rough idea into features, user flows, and milestones</li>
              <li>Discuss real-world examples, risks, and target users</li>
              <li>Move from idea post to practice tasks and implementation</li>
            </ul>
          </div>
          
          <div className="audience-card">
            <div className="card-icon">
              <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3>For small teams</h3>
            <p>Move quickly without losing the learning loop. Discuss product decisions, practice the hard parts, and use the assistant to review the plan before you build.</p>
            <ul>
              <li>Shared context for ideas, code, and discussions</li>
              <li>AI review for architecture, edge cases, and security</li>
              <li>A light sandbox to test code without extra setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo-container" title="Vericode AI" style={{ marginBottom: '10px' }}>
              <img src="/logo_white.jpg" alt="Vericode Logo" style={{ height: '32px', mixBlendMode: 'screen' }} />
              <span className="logo-text">VERICODE AI</span>
            </a>
            <p>Bringing the tools developers rely on into one place, so writing safe code feels like the default rather than the hard path.</p>
          </div>
          
          <div className="footer-links-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#roadmap-sec">Roadmap</a></li>
              <li><a href="#team-sec">The team</a></li>
              <li><a href="#audience">Who it is for</a></li>
            </ul>
          </div>
          
          <div className="footer-links-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#hero">About Us</a></li>
              <li><a href="/logo_split.jpg" target="_blank">Brand Assets</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Vericode AI. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
