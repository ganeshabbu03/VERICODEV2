import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import whiteMeshUrl from '../white_mesh.glb?url';

let scene, camera, renderer;
let centralCore, satellites = [], orbitLines = [];
let syncBeams = [];
let particles;
let container;
let isInitialized = false;
let animationFrameId;

// Interaction state
let mouseX = 0, mouseY = 0;
let targetCameraX = 0, targetCameraY = 0;
let scrollProgress = 0;

// Integration details mapping to orbit indices
const integrationConfig = [
  { id: 'chatgpt', color: 0xaa66ff, type: 'octahedron' },      // Node 0: ChatGPT (purple octahedron)
  { id: 'leetcode', color: 0xff7733, type: 'torus' },         // Node 1: LeetCode (orange torus)
  { id: 'geeksforgeeks', color: 0x33cc88, type: 'cone' }      // Node 2: GeeksforGeeks (green cone)
];

function fitModelToCore(object, targetSize = 2.4) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxAxis = Math.max(size.x, size.y, size.z);
  if (!Number.isFinite(maxAxis) || maxAxis === 0) return;

  object.position.sub(center);
  object.scale.setScalar(targetSize / maxAxis);
}

function loadWhiteMeshModel(target) {
  const loader = new GLTFLoader();

  loader.load(
    whiteMeshUrl,
    (gltf) => {
      const model = gltf.scene;
      fitModelToCore(model);
      model.rotation.set(0, 0, 0);

      model.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) child.material.needsUpdate = true;
      });

      target.clear();
      target.add(model);
    },
    undefined,
    (error) => {
      console.warn('Unable to load white mesh model:', error);
    }
  );
}

export function initThreeScene(containerEl) {
  if (isInitialized) return;
  container = containerEl;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Scene
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 10;
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  
  const pointLight1 = new THREE.PointLight(0xffffff, 2, 20);
  pointLight1.position.set(-5, 3, 2);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 15);
  pointLight2.position.set(0, -3, 3);
  scene.add(pointLight2);
  
  // 1. Central Core - Sleek Iridescent Glass Torus Knot (Vibrant Shifting Colors)
  const coreGeo = new THREE.TorusKnotGeometry(0.9, 0.35, 120, 16);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.7, // glass transparency
    thickness: 1.2,    // refraction
    iridescence: 1.0,  // rainbow colors shifting in light
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [100, 400],
    flatShading: false
  });
  const fallbackCore = new THREE.Mesh(coreGeo, coreMat);
  centralCore = new THREE.Group();
  centralCore.add(fallbackCore);
  scene.add(centralCore);
  loadWhiteMeshModel(centralCore);
  
  // 2. Orbiting Satellite Nodes
  const orbitRadii = [3.2, 4.2, 5.2];
  const orbitSpeeds = [0.8, -0.6, 0.4];
  
  integrationConfig.forEach((cfg, index) => {
    let nodeGeo;
    let nodeMat;
    
    if (cfg.type === 'octahedron') {
      nodeGeo = new THREE.OctahedronGeometry(0.35, 0);
      nodeMat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.3,
        thickness: 0.5
      });
    } else if (cfg.type === 'torus') {
      nodeGeo = new THREE.TorusGeometry(0.24, 0.09, 12, 24);
      nodeMat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.3,
        thickness: 0.5
      });
    } else { // cone
      nodeGeo = new THREE.ConeGeometry(0.25, 0.5, 4);
      nodeMat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.3,
        thickness: 0.5
      });
    }
    
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    
    // Save metadata
    node.userData = {
      id: cfg.id,
      radius: orbitRadii[index],
      speed: orbitSpeeds[index],
      angle: Math.random() * Math.PI * 2,
      baseScale: 1
    };
    
    scene.add(node);
    satellites.push(node);
    
    // Orbit line (thin, semi-transparent circle)
    const lineGeo = new THREE.RingGeometry(orbitRadii[index] - 0.01, orbitRadii[index] + 0.01, 64);
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const orbitLine = new THREE.Mesh(lineGeo, lineMat);
    orbitLine.rotation.x = Math.PI / 2;
    scene.add(orbitLine);
    orbitLines.push(orbitLine);

    // Create dynamic connection sync beam line
    const beamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ]);
    const beamMat = new THREE.LineBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.0
    });
    const syncBeam = new THREE.Line(beamGeo, beamMat);
    scene.add(syncBeam);
    syncBeams.push(syncBeam);
  });
  
  // 3. Background Floating Particles
  const particleCount = 600;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Distribute randomly in a cube
    particlePositions[i] = (Math.random() - 0.5) * 25;     // X
    particlePositions[i + 1] = (Math.random() - 0.5) * 25; // Y
    particlePositions[i + 2] = (Math.random() - 0.5) * 20; // Z
  }
  
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  
  const particleMat = new THREE.PointsMaterial({
    color: 0xbbbbbb,
    size: 0.04,
    transparent: true,
    opacity: 0.5
  });
  
  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);
  
  isInitialized = true;
  animate(0);
}

// Camera/Scene Parallax
export function onMouseMove(x, y) {
  mouseX = x;
  mouseY = y;
}

// Scroll Morphing function driven by GSAP
export function onScrollProgress(progress) {
  scrollProgress = progress;
}

// Animation loop
let lastTime = 0;

function animate(time) {
  animationFrameId = requestAnimationFrame(animate);
  if (!isInitialized) return;
  
  const delta = (time - lastTime) * 0.001;
  lastTime = time;
  
  // 1. Core rotation & iridescence shift
  if (centralCore) {
    centralCore.rotation.y += 0.005;
    centralCore.rotation.x = 0;
    // Tweak iridescence params dynamically to create a shifting rainbow surface
    const fallbackMaterial = centralCore.children[0]?.material;
    if (fallbackMaterial?.iridescenceIOR !== undefined) {
      fallbackMaterial.iridescenceIOR = 1.6 + 0.4 * Math.sin(time * 0.001);
    }
  }
  // 2. Parallax Camera movement interpolation
  targetCameraX = mouseX * 2.0;
  targetCameraY = -mouseY * 1.5;
  
  // Move camera slightly based on mouse, but lock it more during IDE stage
  const lockFactor = scrollProgress > 0.5 ? (1.0 - (scrollProgress - 0.5) * 2) : 1.0;
  camera.position.x += (targetCameraX * lockFactor - camera.position.x) * 0.05;
  camera.position.y += (targetCameraY * lockFactor - camera.position.y) * 0.05;
  camera.lookAt(0, 0, 0);
  
  // 3. Scroll Morph Logic
  // Progress ranges:
  // [0.0 to 0.4]: Satellites spiral in to central core, core stays active.
  // [0.4 to 1.0]: Satellites stay hidden while the central mesh remains as the visual anchor.
  
  if (scrollProgress <= 0.4) {
    // --- STAGE 1: Orbiting ---
    const t = scrollProgress / 0.4; // 0 to 1
    
    // Satellites orbiting and spiraling
    satellites.forEach((sat, index) => {
      // Base angle increments normally over time
      sat.userData.angle += sat.userData.speed * delta;
      
      // Interpolate radius from original to 0
      const currentRadius = THREE.MathUtils.lerp(sat.userData.radius, 0.0, t);
      
      sat.position.x = Math.cos(sat.userData.angle) * currentRadius;
      sat.position.z = Math.sin(sat.userData.angle) * currentRadius;
      
      // Slowly rotate individual nodes
      sat.rotation.y += 0.01;
      sat.rotation.x += 0.005;
      
      // Shrink scales slightly as they spiral in
      const scale = THREE.MathUtils.lerp(sat.userData.baseScale, 0.01, t);
      sat.scale.set(scale, scale, scale);
      
      // Fade out orbit lines
      if (orbitLines[index]) {
        orbitLines[index].material.opacity = (1 - t) * 0.15;
        orbitLines[index].scale.set(1 - t, 1 - t, 1 - t);
      }

      // Update sync line beam endpoint vertices
      const beam = syncBeams[index];
      if (beam) {
        const posAttr = beam.geometry.attributes.position;
        posAttr.setXYZ(0, 0, 0, 0);
        posAttr.setXYZ(1, sat.position.x, sat.position.y, sat.position.z);
        posAttr.needsUpdate = true;
        // Fade in beams as scroll starts, pulse with time, and fade out at spiral end
        const proximityOpacity = (1.0 - t) * 0.45;
        beam.material.opacity = proximityOpacity * (0.6 + 0.4 * Math.sin(time * 0.01 + index * 2.0));
      }
    });
    
    // Central core normal size and position
    centralCore.scale.set(1, 1, 1);
    centralCore.position.y = 0;
    centralCore.visible = true;
  } else if (scrollProgress > 0.4 && scrollProgress <= 0.65) {
    // --- STAGE 2: Feature Focus ---
    const t = (scrollProgress - 0.4) / 0.25; // 0 to 1
    
    // Hide satellites and beams
    satellites.forEach(sat => sat.scale.set(0.001, 0.001, 0.001));
    orbitLines.forEach(line => line.material.opacity = 0);
    syncBeams.forEach(beam => beam.material.opacity = 0);
    
    centralCore.visible = true;
    const coreScale = THREE.MathUtils.lerp(1.0, 1.16, t);
    centralCore.scale.set(coreScale, coreScale, coreScale);
    centralCore.position.y = THREE.MathUtils.lerp(0, -0.25, t);
    
  } else {
    // --- STAGE 3: Mesh Showcase ---
    const t = (scrollProgress - 0.65) / 0.35; // 0 to 1
    
    // Ensure satellites are hidden
    centralCore.visible = true;
    satellites.forEach(sat => sat.scale.set(0.001, 0.001, 0.001));
    syncBeams.forEach(beam => beam.material.opacity = 0);

    const coreScale = 1.16 + 0.04 * Math.sin(time * 0.0015);
    centralCore.scale.set(coreScale, coreScale, coreScale);
    centralCore.position.y = -0.25 + Math.sin(time * 0.001) * 0.08;
  }
  
  // Drift particles
  if (particles) {
    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0003;
  }
  
  renderer.render(scene, camera);
}

// Window resizing handler
export function resizeThreeScene() {
  if (!isInitialized || !container) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

export function destroyThreeScene() {
  if (!isInitialized) return;
  cancelAnimationFrame(animationFrameId);
  if (renderer && renderer.domElement && renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
  scene.traverse(object => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(m => m.dispose());
      } else {
        object.material.dispose();
      }
    }
  });
  renderer.dispose();
  isInitialized = false;
  satellites = [];
  orbitLines = [];
  syncBeams = [];
}
