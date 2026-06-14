import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', initProductViewer);

function initProductViewer() {
  const canvas = document.getElementById('product-canvas');
  if (!canvas) return;

  if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) {
    showFallback(canvas);
    return;
  }

  const wrap = canvas.closest('.model-canvas-wrap');

  /* ── Scene & Camera ────────────────────────────────────── */
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    38,
    wrap.clientWidth / wrap.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.2, 7.0);
  camera.lookAt(0, 0.1, 0);

  /* ── Renderer ───────────────────────────────────────────── */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  /* ── Lighting ───────────────────────────────────────────── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 9, 7);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Orange rim from behind-right
  const rimLight = new THREE.DirectionalLight(0xD96515, 1.4);
  rimLight.position.set(-6, 1, -5);
  scene.add(rimLight);

  // Cool blue fill from left
  const fillLight = new THREE.DirectionalLight(0x7090d0, 0.7);
  fillLight.position.set(-4, 3, 4);
  scene.add(fillLight);

  // Subtle warm bounce from below
  const bounceLight = new THREE.PointLight(0xffcc88, 0.6, 12);
  bounceLight.position.set(0, -4, 3);
  scene.add(bounceLight);

  // Small orange spot to illuminate slot interiors
  const slotLight = new THREE.PointLight(0xD96515, 0.5, 6);
  slotLight.position.set(0, 0, 3);
  scene.add(slotLight);

  /* ── Materials ──────────────────────────────────────────── */
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.18,
    metalness: 0.96,
  });

  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0xb4b4b4,
    roughness: 0.42,
    metalness: 0.90,
  });

  const knurledMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b8,
    roughness: 0.58,
    metalness: 0.82,
  });

  const darkPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x141414,
    roughness: 0.72,
    metalness: 0.05,
  });

  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x0e0e0e,
    roughness: 0.90,
    metalness: 0.0,
  });

  const innerVoidMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    roughness: 0.95,
    metalness: 0.0,
    side: THREE.BackSide,
  });

  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x00ff55,
    emissive: 0x00cc44,
    emissiveIntensity: 1.2,
    roughness: 0.1,
    metalness: 0.0,
  });

  /* ── Device Group ───────────────────────────────────────── */
  const device = new THREE.Group();
  scene.add(device);

  // ── 1. Stem / probe (dark plastic, narrow cylinder) ──────
  const stemGeo = new THREE.CylinderGeometry(0.36, 0.34, 1.55, 48);
  const stem = new THREE.Mesh(stemGeo, darkPlasticMat);
  stem.position.y = -0.48 - 1.55 / 2;   // bottom of stem sits well below body
  stem.castShadow = true;
  device.add(stem);

  // Thread suggestion: 5 thin rings on the upper portion of the stem
  for (let i = 0; i < 5; i++) {
    const tGeo = new THREE.TorusGeometry(0.365, 0.016, 8, 40);
    const t = new THREE.Mesh(tGeo, darkPlasticMat);
    t.position.y = -0.52 - i * 0.22;
    device.add(t);
  }

  // ── 2. Gasket / seal ring (black rubber, wide flat disc) ─
  const gasketGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.10, 48);
  const gasket = new THREE.Mesh(gasketGeo, rubberMat);
  gasket.position.y = -0.43;
  device.add(gasket);

  // ── 3. Inner void fill (dark cylinder inside slot ring) ──
  const innerGeo = new THREE.CylinderGeometry(0.80, 0.80, 0.62, 48);
  const innerFill = new THREE.Mesh(innerGeo, innerVoidMat);
  innerFill.position.y = 0.0;
  device.add(innerFill);

  // ── 4. Slotted body ring (main silver housing, 4 slots) ──
  const bodyGroup = buildSlottedRing({
    outerR:      1.18,
    innerR:      0.82,
    height:      0.62,
    numSlots:    4,
    slotFrac:    0.55,   // 55% of each 90° segment is open slot
    ribSegments: 14,
    material:    brushedMat,
  });
  bodyGroup.position.y = 0.0;   // ring spans Y = -0.31 to +0.31
  device.add(bodyGroup);

  // ── 5. Bottom lip (thin solid ring below slotted section) ─
  const bLipGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.07, 48);
  const bLip = new THREE.Mesh(bLipGeo, silverMat);
  bLip.position.y = -0.345;
  device.add(bLip);

  // ── 6. Top flange (slight step at top of body → cap junction) ─
  const tFlangeGeo = new THREE.CylinderGeometry(1.12, 1.18, 0.07, 48);
  const tFlange = new THREE.Mesh(tFlangeGeo, silverMat);
  tFlange.position.y = 0.345;
  device.add(tFlange);

  // ── 7. Top cap (solid flat disc) ─────────────────────────
  const capGeo = new THREE.CylinderGeometry(1.08, 1.12, 0.14, 64);
  const cap = new THREE.Mesh(capGeo, silverMat);
  cap.position.y = 0.45;
  device.add(cap);

  // ── 8. Knurled grip (textured disc on very top) ───────────
  const knurlCapGeo = new THREE.CylinderGeometry(0.84, 0.90, 0.22, 64);
  const knurlCap = new THREE.Mesh(knurlCapGeo, knurledMat);
  knurlCap.position.y = 0.63;
  device.add(knurlCap);

  // Knurl detail: horizontal groove rings around the grip cylinder
  for (let i = 0; i < 9; i++) {
    const gGeo = new THREE.TorusGeometry(0.87, 0.013, 8, 44);
    const g = new THREE.Mesh(gGeo, knurledMat);
    g.position.y = 0.525 + i * 0.024;
    device.add(g);
  }

  // Top face of knurl (flat disc cap)
  const topFaceGeo = new THREE.CylinderGeometry(0.84, 0.84, 0.025, 64);
  const topFace = new THREE.Mesh(topFaceGeo, silverMat);
  topFace.position.y = 0.755;
  device.add(topFace);

  // ── 9. Small side pin (lock/tamper bolt) ─────────────────
  const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.14, 12);
  const pin = new THREE.Mesh(pinGeo, silverMat);
  pin.rotation.z = Math.PI / 2;
  pin.position.set(1.26, 0.12, 0.0);
  device.add(pin);

  // Pin head (hex screw face)
  const pinHeadGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.025, 6);
  const pinHead = new THREE.Mesh(pinHeadGeo, brushedMat);
  pinHead.rotation.z = Math.PI / 2;
  pinHead.position.set(1.34, 0.12, 0.0);
  device.add(pinHead);

  // ── 10. LED status indicator ──────────────────────────────
  const ledGeo = new THREE.SphereGeometry(0.055, 16, 16);
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0.65, 0.39, 1.14);   // on top cap surface, slightly elevated
  device.add(led);

  // Small LED light source
  const ledPt = new THREE.PointLight(0x00ff55, 0.4, 1.5);
  ledPt.position.copy(led.position);
  device.add(ledPt);

  // ── Shadow catcher plane ──────────────────────────────────
  const shadowGeo = new THREE.PlaneGeometry(8, 8);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.8;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  /* ── Ambient Particles ──────────────────────────────────── */
  const particleCount = 110;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xD96515,
    size: 0.04,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(pGeo, pMat));

  /* ── OrbitControls ──────────────────────────────────────── */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.1, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableZoom = true;
  controls.minDistance = 3.5;
  controls.maxDistance = 14;
  controls.minPolarAngle = Math.PI * 0.08;
  controls.maxPolarAngle = Math.PI * 0.80;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.3;
  controls.enablePan = false;

  let autoRotateTimer;
  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    clearTimeout(autoRotateTimer);
    hideHint();
  });
  controls.addEventListener('end', () => {
    autoRotateTimer = setTimeout(() => { controls.autoRotate = true; }, 2800);
  });

  function hideHint() {
    const el = document.querySelector('.model-canvas-hint');
    if (el) el.style.opacity = '0';
  }

  /* ── Resize ─────────────────────────────────────────────── */
  function onResize() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  new ResizeObserver(onResize).observe(wrap);
  onResize();

  /* ── Animate ────────────────────────────────────────────── */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    // Subtle floating motion
    device.position.y = Math.sin(t * 0.65) * 0.09;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

/* ── Helper: build slotted ring from rib segments ────────────
   Creates a cylinder ring with numSlots rectangular openings.
   Uses ExtrudeGeometry arcs so the slots are actual geometry gaps.
──────────────────────────────────────────────────────────── */
function buildSlottedRing({ outerR, innerR, height, numSlots, slotFrac, ribSegments, material }) {
  const group = new THREE.Group();
  const segAngle  = (Math.PI * 2) / numSlots;
  const slotAngle = segAngle * slotFrac;
  const ribAngle  = segAngle - slotAngle;

  for (let i = 0; i < numSlots; i++) {
    const ribStart = i * segAngle + slotAngle / 2;
    const ribEnd   = ribStart + ribAngle;

    const shape = new THREE.Shape();

    // Outer arc of this rib
    shape.moveTo(
      outerR * Math.cos(ribStart),
      outerR * Math.sin(ribStart)
    );
    for (let s = 1; s <= ribSegments; s++) {
      const a = ribStart + (ribEnd - ribStart) * s / ribSegments;
      shape.lineTo(outerR * Math.cos(a), outerR * Math.sin(a));
    }

    // Radial line inward at ribEnd
    shape.lineTo(innerR * Math.cos(ribEnd), innerR * Math.sin(ribEnd));

    // Inner arc back (reverse direction)
    for (let s = ribSegments - 1; s >= 0; s--) {
      const a = ribStart + (ribEnd - ribStart) * s / ribSegments;
      shape.lineTo(innerR * Math.cos(a), innerR * Math.sin(a));
    }

    // closePath draws the radial line at ribStart (inner→outer)
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
    });

    // ExtrudeGeometry extrudes along +Z; rotate so it stands vertically (along Y)
    // rotateX(-PI/2): X→X, Y→-Z, Z→+Y  ⟹ ring lies in XZ plane, height goes upward
    geo.rotateX(-Math.PI / 2);

    // After rotation the ring goes from Y=0 to Y=height; centre it
    geo.translate(0, -height / 2, 0);

    const mesh = new THREE.Mesh(geo, material);
    group.add(mesh);
  }

  return group;
}

/* ── WebGL not available ─────────────────────────────────── */
function showFallback(canvas) {
  const wrap = canvas.closest('.model-canvas-wrap');
  canvas.style.display = 'none';
  const fb = document.createElement('div');
  fb.className = 'model-canvas-fallback';
  const img = document.createElement('img');
  img.src = 'assets/device pic.jpeg';
  img.alt = 'Fuel Guard X Device';
  fb.appendChild(img);
  wrap.appendChild(fb);
}
