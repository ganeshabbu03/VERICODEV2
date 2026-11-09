import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initThreeScene, onMouseMove, onScrollProgress, resizeThreeScene, destroyThreeScene } from './three-scene.js';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

let scrollTrigger1, scrollTrigger2, cardTriggers = [], stepTriggers = [], teamTriggers = [];
let teamTiltCleanups = [];
let veoAnimationId;
let listeners = {};
let cursorTouchTimeout;

// Keep Veo player variables bound local to landing lifecycle
let isPlaying = true;
let videoProgress = 0;
let t = 0;

export function initLandingPage() {
  // Reset local state variables
  isPlaying = true;
  videoProgress = 0;
  t = 0;

  // 1. Initialize Three.js Scene
  const threeTarget = document.getElementById('three-target');
  const canvasContainer = document.getElementById('canvas-container');

  if (threeTarget) {
    initThreeScene(threeTarget);
  }

  // 2. Scroll-Linked 3D Scene Controls
  scrollTrigger1 = ScrollTrigger.create({
    trigger: "#integrations-sec",
    start: "top bottom",
    endTrigger: "#roadmap-sec",
    end: "bottom top",
    onToggle: self => {
      if (canvasContainer) {
        if (self.isActive) {
          canvasContainer.classList.add('active');
        } else {
          canvasContainer.classList.remove('active');
        }
      }
    }
  });

  scrollTrigger2 = gsap.to({}, {
    scrollTrigger: {
      trigger: "#integrations-sec",
      start: "top top",
      endTrigger: "#roadmap-sec",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: self => {
        onScrollProgress(self.progress);
      }
    }
  });

  // 3. Integration Glass Cards
  const cards = ['chatgpt', 'leetcode', 'geeksforgeeks'];
  cards.forEach(id => {
    let trg = ScrollTrigger.create({
      trigger: `#panel-${id}`,
      start: "top center+=100",
      end: "bottom center-=100",
      onToggle: self => {
        const card = document.getElementById(`card-${id}`);
        if (card) {
          if (self.isActive) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        }
      }
    });
    cardTriggers.push(trg);
  });

  // 4. Roadmap Steps
  const steps = [1, 2, 3];
  steps.forEach(num => {
    let trg = ScrollTrigger.create({
      trigger: `#step-${num}`,
      start: "top center+=150",
      end: "bottom center-=50",
      onToggle: self => {
        const stepEl = document.getElementById(`step-${num}`);
        if (stepEl) {
          if (self.isActive) {
            stepEl.classList.add('active');
          } else {
            stepEl.classList.remove('active');
          }
        }
      }
    });
    stepTriggers.push(trg);
  });

  // 5. Parallax Mouse Move
  listeners.mousemove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    onMouseMove(x, y);
  };
  window.addEventListener('mousemove', listeners.mousemove);

  // 6. Header scroll effect
  const header = document.getElementById('main-header');
  listeners.scroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };
  window.addEventListener('scroll', listeners.scroll);

  // 7. Handle Resizing
  listeners.resize = () => {
    resizeThreeScene();
  };
  window.addEventListener('resize', listeners.resize);

  // 8. Custom Generative Veo Video Player
  initVeoPlayer();

  // 9. Update page scroll progress indicator
  listeners.scrollProgress = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const scrollPercent = (window.scrollY / totalScroll) * 100;
      const progressIndicator = document.getElementById('scroll-indicator');
      if (progressIndicator) {
        progressIndicator.style.width = `${scrollPercent}%`;
      }
    }
  };
  window.addEventListener('scroll', listeners.scrollProgress);

  // 10. Card Spotlights
  initCardSpotlights();

  // 11. Team section: staggered reveal + 3D tilt + glow
  initTeamInteractions();

  // 12. Adaptive cursor/touch ring
  initAdaptiveCursor();
}

function initVeoPlayer() {
  const veoCanvas = document.getElementById('veo-intro-canvas');
  const veoPlayBtn = document.getElementById('veo-play-button');
  const veoPlayIcon = document.getElementById('veo-play-icon');
  const veoProgressBar = document.getElementById('veo-progress-bar');
  const veoProgressContainer = document.getElementById('veo-progress-container');

  if (!veoCanvas) return;

  const ctx = veoCanvas.getContext('2d');
  
  const resizeCanvas = () => {
    veoCanvas.width = veoCanvas.clientWidth * window.devicePixelRatio;
    veoCanvas.height = veoCanvas.clientHeight * window.devicePixelRatio;
  };
  resizeCanvas();
  listeners.veoresize = resizeCanvas;
  window.addEventListener('resize', listeners.veoresize);

  const featureScenes = [
    {
      kicker: 'Learning',
      title: 'Feature 1: Learning',
      body: 'Learn concepts with simple explanations before you write code.',
      example: 'Real example: authentication explained with login, sessions, password reset, and protected routes.',
      accent: '#ffffff',
      panels: ['Concept', 'Example', 'Checkpoint']
    },
    {
      kicker: 'Practice',
      title: 'Feature 2: Practice',
      body: 'Solve coding problems, run tests, and understand why one solution is better than another.',
      example: 'Real example: solve two-sum, then compare nested loops with a hash map approach.',
      accent: '#7ee787',
      panels: ['Problem', 'Editor', 'Tests']
    },
    {
      kicker: 'Ideas',
      title: 'Feature 3: Idea posting',
      body: 'Post a product idea with goals, users, features, and open questions.',
      example: 'Real example: a campus marketplace becomes listings, chat, payments, safety checks, and MVP tasks.',
      accent: '#ffbd5a',
      panels: ['Audience', 'Features', 'MVP']
    },
    {
      kicker: 'AI Assistant',
      title: 'Feature 4: AI Assistant',
      body: 'Discuss what you are learning, ask for hints, review code, and refine your idea.',
      example: 'Real example: ask what database tables a food-delivery MVP needs and why.',
      accent: '#d8f3ff',
      panels: ['Question', 'Answer', 'Plan']
    },
    {
      kicker: 'Real world',
      title: 'Feature 5: Real-world examples',
      body: 'Connect each topic to products people actually build and use.',
      example: 'Real example: learn queues through order processing, notifications, and background jobs.',
      accent: '#d6d6d6',
      panels: ['API', 'Jobs', 'Dashboard']
    }
  ];

  const drawRoundedRect = (x, y, width, height, radius) => {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const drawTextBlock = (text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    words.forEach(word => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, currentY);
        line = word;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    });

    if (line) ctx.fillText(line, x, currentY);
  };

  const drawUiLines = (x, y, width, count, activeIndex, accent) => {
    for (let i = 0; i < count; i++) {
      const lineWidth = width * (0.35 + ((i * 17) % 45) / 100);
      const lineY = y + i * 18;
      ctx.fillStyle = i === activeIndex ? accent : 'rgba(255,255,255,0.28)';
      drawRoundedRect(x, lineY, lineWidth, 5, 3);
      ctx.fill();
    }
  };

  const drawFeatureDemo = (scene, sceneProgress, sceneIndex) => {
    const w = veoCanvas.width;
    const h = veoCanvas.height;
    const pad = Math.max(20, w * 0.04);
    const stageX = pad;
    const stageY = pad * 1.25;
    const stageW = w - pad * 2;
    const stageH = h - pad * 2.2;

    const easedProgress = Math.min(1, Math.max(0, sceneProgress));
    const pulse = 0.55 + 0.45 * Math.sin(easedProgress * Math.PI * 2);

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    const gradient = ctx.createRadialGradient(w * 0.55, h * 0.1, 10, w * 0.55, h * 0.2, w * 0.85);
    gradient.addColorStop(0, `${scene.accent}20`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 11; i++) {
      const x = (i / 10) * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + Math.sin(t * 0.012 + i) * 18, h);
      ctx.stroke();
    }

    drawRoundedRect(stageX, stageY, stageW, stageH, 18);
    ctx.fillStyle = 'rgba(17,17,17,0.92)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.stroke();

    const headerH = Math.max(34, h * 0.09);
    ctx.fillStyle = 'rgba(255,255,255,0.045)';
    drawRoundedRect(stageX + 1, stageY + 1, stageW - 2, headerH, 17);
    ctx.fill();

    ctx.fillStyle = scene.accent;
    ctx.beginPath();
    ctx.arc(stageX + 24, stageY + headerH / 2, 4 + pulse * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    ctx.font = `700 ${Math.max(11, w * 0.018)}px Inter, sans-serif`;
    ctx.fillText(scene.kicker, stageX + 42, stageY + headerH / 2 + 5);

    const progressLabel = `${sceneIndex + 1} / ${featureScenes.length}`;
    ctx.font = `700 ${Math.max(10, w * 0.014)}px Inter, sans-serif`;
    const progressLabelWidth = ctx.measureText(progressLabel).width + 28;
    drawRoundedRect(stageX + stageW - progressLabelWidth - 18, stageY + headerH / 2 - 13, progressLabelWidth, 26, 13);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.fillText(progressLabel, stageX + stageW - progressLabelWidth - 4, stageY + headerH / 2 + 5);

    const leftW = stageW * 0.36;
    const mainX = stageX + leftW + 24;
    const contentY = stageY + headerH + 26;

    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = `800 ${Math.max(22, w * 0.042)}px Outfit, sans-serif`;
    drawTextBlock(scene.title, stageX + 26, contentY + 4, leftW - 32, Math.max(28, w * 0.047));

    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.font = `600 ${Math.max(12, w * 0.018)}px Inter, sans-serif`;
    drawTextBlock(scene.body, stageX + 26, contentY + h * 0.18, leftW - 32, Math.max(17, w * 0.026));

    ctx.fillStyle = 'rgba(255,255,255,0.48)';
    ctx.font = `500 ${Math.max(10, w * 0.015)}px Inter, sans-serif`;
    drawTextBlock(scene.example, stageX + 26, contentY + h * 0.34, leftW - 32, Math.max(15, w * 0.022));

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.moveTo(stageX + leftW, stageY + headerH + 16);
    ctx.lineTo(stageX + leftW, stageY + stageH - 22);
    ctx.stroke();

    const panelW = (stageW - leftW - 58) / 2;
    const panelH = (stageH - headerH - 64) / 2;
    scene.panels.forEach((panel, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = mainX + col * (panelW + 16);
      const y = contentY + row * (panelH + 18);
      const active = Math.floor(easedProgress * scene.panels.length) === index;

      drawRoundedRect(x, y, panelW, panelH, 14);
      ctx.fillStyle = active ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.055)';
      ctx.fill();
      ctx.strokeStyle = active ? `${scene.accent}aa` : 'rgba(255,255,255,0.11)';
      ctx.stroke();

      ctx.fillStyle = active ? scene.accent : 'rgba(255,255,255,0.82)';
      ctx.font = `800 ${Math.max(11, w * 0.015)}px Inter, sans-serif`;
      ctx.fillText(panel, x + 16, y + 26);

      drawUiLines(x + 16, y + 46, panelW - 34, 5, active ? index % 5 : -1, scene.accent);
    });

    const connectorY = stageY + stageH - 34;
    ctx.strokeStyle = `${scene.accent}88`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(stageX + 30, connectorY);
    ctx.bezierCurveTo(w * 0.33, connectorY - 42, w * 0.66, connectorY + 24, stageX + stageW - 30, connectorY - 10);
    ctx.stroke();

    for (let i = 0; i < 5; i++) {
      const x = stageX + 30 + (stageW - 60) * (i / 4);
      const y = connectorY + Math.sin(sceneProgress * Math.PI * 2 + i) * 10;
      ctx.fillStyle = i / 4 <= easedProgress ? scene.accent : 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const renderVeoVideo = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, veoCanvas.width, veoCanvas.height);

    const sceneFloat = (videoProgress / 100) * featureScenes.length;
    const sceneIndex = Math.min(featureScenes.length - 1, Math.floor(sceneFloat));
    const sceneProgress = sceneFloat - sceneIndex;
    drawFeatureDemo(featureScenes[sceneIndex], sceneProgress, sceneIndex);
    
    if (isPlaying) {
      t += 1;
      videoProgress += 0.045;
      if (videoProgress >= 100) {
        videoProgress = 0;
      }
      if (veoProgressBar) veoProgressBar.style.width = `${videoProgress}%`;
    }
    
    veoAnimationId = requestAnimationFrame(renderVeoVideo);
  };

  const togglePlay = () => {
    isPlaying = !isPlaying;
    if (veoPlayIcon) {
      if (isPlaying) {
        veoPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
      } else {
        veoPlayIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
      }
    }
  };

  listeners.veoplayclick = togglePlay;
  veoPlayBtn.addEventListener('click', listeners.veoplayclick);
  
  listeners.veoprogressclick = (e) => {
    const rect = veoProgressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    videoProgress = (clickX / width) * 100;
    if (veoProgressBar) veoProgressBar.style.width = `${videoProgress}%`;
  };
  veoProgressContainer.addEventListener('click', listeners.veoprogressclick);

  renderVeoVideo();
  
  isPlaying = false;
  togglePlay();
}

function initCardSpotlights() {
  const targetCards = document.querySelectorAll('.glass-info-card, .audience-card');
  targetCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initTeamInteractions() {
  const cards = Array.from(document.querySelectorAll('.team-card'));
  if (!cards.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach((card, index) => {
    // Staggered scroll reveal
    const trg = ScrollTrigger.create({
      trigger: card,
      start: "top bottom-=80",
      onEnter: () => {
        setTimeout(() => card.classList.add('reveal'), (index % 4) * 90);
      },
      once: true
    });
    teamTriggers.push(trg);

    if (prefersReduced) return;

    const inner = card.querySelector('.team-card-inner');
    const glow = card.querySelector('.team-card-glow');
    const MAX_TILT = 9;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * (MAX_TILT * 2);
      const rotX = (0.5 - py) * (MAX_TILT * 2);
      card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if (glow) {
        glow.style.setProperty('--mouse-x', `${px * 100}%`);
        glow.style.setProperty('--mouse-y', `${py * 100}%`);
      }
    };
    const onLeave = () => {
      card.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    teamTiltCleanups.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  });
}

function initAdaptiveCursor() {
  const cursor = document.getElementById('adaptive-cursor');
  if (!cursor) return;

  const moveCursor = (clientX, clientY) => {
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
  };

  listeners.cursorpointermove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    moveCursor(e.clientX, e.clientY);
    cursor.classList.add('active');
    cursor.classList.remove('touching');
  };

  listeners.cursorpointerdown = (e) => {
    moveCursor(e.clientX, e.clientY);
    cursor.classList.add('active', 'pressed');
  };

  listeners.cursorpointerup = () => {
    cursor.classList.remove('pressed');
  };

  listeners.cursorpointerleave = () => {
    cursor.classList.remove('active', 'pressed');
  };

  listeners.cursortouchstart = (e) => {
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    if (!touch) return;
    moveCursor(touch.clientX, touch.clientY);
    cursor.classList.remove('pressed');
    cursor.classList.add('active', 'touching');
    window.clearTimeout(cursorTouchTimeout);
    cursorTouchTimeout = window.setTimeout(() => {
      cursor.classList.remove('active', 'touching');
    }, 650);
  };

  window.addEventListener('pointermove', listeners.cursorpointermove);
  window.addEventListener('pointerdown', listeners.cursorpointerdown);
  window.addEventListener('pointerup', listeners.cursorpointerup);
  document.addEventListener('mouseleave', listeners.cursorpointerleave);
  window.addEventListener('touchstart', listeners.cursortouchstart, { passive: true });
}

export function destroyLandingPage() {
  // Clean up animation loops
  cancelAnimationFrame(veoAnimationId);
  destroyThreeScene();

  // Clean up GSAP and ScrollTriggers
  if (scrollTrigger1) scrollTrigger1.kill();
  if (scrollTrigger2) scrollTrigger2.kill();
  cardTriggers.forEach(t => t.kill());
  stepTriggers.forEach(t => t.kill());
  teamTriggers.forEach(t => t.kill());
  teamTiltCleanups.forEach(fn => fn());
  window.clearTimeout(cursorTouchTimeout);
  cardTriggers = [];
  stepTriggers = [];
  teamTriggers = [];
  teamTiltCleanups = [];

  // Remove event listeners
  window.removeEventListener('mousemove', listeners.mousemove);
  window.removeEventListener('scroll', listeners.scroll);
  window.removeEventListener('resize', listeners.resize);
  window.removeEventListener('scroll', listeners.scrollProgress);
  window.removeEventListener('resize', listeners.veoresize);
  window.removeEventListener('pointermove', listeners.cursorpointermove);
  window.removeEventListener('pointerdown', listeners.cursorpointerdown);
  window.removeEventListener('pointerup', listeners.cursorpointerup);
  document.removeEventListener('mouseleave', listeners.cursorpointerleave);
  window.removeEventListener('touchstart', listeners.cursortouchstart);

  const veoPlayBtn = document.getElementById('veo-play-button');
  if (veoPlayBtn && listeners.veoplayclick) {
    veoPlayBtn.removeEventListener('click', listeners.veoplayclick);
  }

  const veoProgressContainer = document.getElementById('veo-progress-container');
  if (veoProgressContainer && listeners.veoprogressclick) {
    veoProgressContainer.removeEventListener('click', listeners.veoprogressclick);
  }

  listeners = {};
}
