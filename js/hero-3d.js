/* ============================================================
   FUEL GUARD X — Hero 3D Visualization
   hero-3d.js  (Three.js ES module, loaded via type="module")
============================================================ */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

document.addEventListener('DOMContentLoaded', initHero3D);

function initHero3D() {
  const container = document.getElementById('hero-3d-container');
  if (!container) return;

  /* WebGL support check */
  const probe = document.createElement('canvas');
  if (!probe.getContext('webgl2') && !probe.getContext('webgl')) {
    container.classList.add('hero-3d-fallback');
    return;
  }

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(2.0, 1.0, 5.5);
  camera.lookAt(0, 0.3, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace  = THREE.SRGBColorSpace;
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);
  resize();

  /* ── Lights ─────────────────────────────────────────────── */
  scene.add(new THREE.AmbientLight(0x0a1525, 2.2));

  const key = new THREE.DirectionalLight(0x5599ff, 2.8);
  key.position.set(-3, 6, 5);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x0033bb, 2.0);
  rim.position.set(4, -1, -5);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0x00ccff, 0.8);
  fill.position.set(4, 2, 3);
  scene.add(fill);

  const fuelPt = new THREE.PointLight(0xffaa00, 2.2, 9);
  fuelPt.position.set(0, -2.8, 1.2);
  scene.add(fuelPt);

  /* ── Logo canvas texture ────────────────────────────────── */
  const lc  = document.createElement('canvas');
  lc.width  = 512;
  lc.height = 682;
  const lx  = lc.getContext('2d');

  lx.fillStyle = '#060e1c';
  lx.fillRect(0, 0, 512, 682);

  /* subtle grid */
  lx.strokeStyle = 'rgba(0,100,255,0.07)';
  lx.lineWidth   = 1;
  for (let x = 0; x < 512; x += 32) { lx.beginPath(); lx.moveTo(x, 0); lx.lineTo(x, 682); lx.stroke(); }
  for (let y = 0; y < 682; y += 32) { lx.beginPath(); lx.moveTo(0, y); lx.lineTo(512, y); lx.stroke(); }

  /* shield */
  lx.save();
  lx.translate(256, 255);
  const shield = new Path2D();
  shield.moveTo(0, -120);
  shield.lineTo(105, -70);
  shield.lineTo(105, 30);
  shield.quadraticCurveTo(105, 120, 0, 155);
  shield.quadraticCurveTo(-105, 120, -105, 30);
  shield.lineTo(-105, -70);
  shield.closePath();
  const sg = lx.createRadialGradient(0, 0, 10, 0, 0, 125);
  sg.addColorStop(0, 'rgba(0,120,255,0.22)');
  sg.addColorStop(1, 'rgba(0,50,180,0.04)');
  lx.fillStyle   = sg;
  lx.fill(shield);
  lx.shadowColor = '#0077ff';
  lx.shadowBlur  = 14;
  lx.strokeStyle = '#0088ff';
  lx.lineWidth   = 3.5;
  lx.stroke(shield);
  lx.shadowBlur  = 0;
  lx.fillStyle   = '#00aaff';
  lx.shadowColor = '#0088ff';
  lx.shadowBlur  = 16;
  lx.font         = 'bold 100px Arial';
  lx.textAlign    = 'center';
  lx.textBaseline = 'middle';
  lx.fillText('F', 0, 22);
  lx.shadowBlur   = 0;
  lx.restore();

  /* text */
  lx.fillStyle    = 'rgba(255,255,255,0.92)';
  lx.font         = 'bold 36px Arial';
  lx.textAlign    = 'center';
  lx.textBaseline = 'alphabetic';
  lx.fillText('FUEL GUARD X', 256, 488);

  lx.strokeStyle = 'rgba(0,136,255,0.3)';
  lx.lineWidth   = 1;
  lx.beginPath(); lx.moveTo(90, 504); lx.lineTo(422, 504); lx.stroke();

  lx.fillStyle    = 'rgba(0,220,100,0.85)';
  lx.font         = '500 22px Arial';
  lx.textBaseline = 'alphabetic';
  lx.fillText('● SYSTEM ACTIVE', 256, 548);

  const logoTex = new THREE.CanvasTexture(lc);

  /* ── Materials ──────────────────────────────────────────── */
  const mBody  = new THREE.MeshStandardMaterial({ color: 0x0b131f, roughness: 0.25, metalness: 0.88 });
  const mEdge  = new THREE.MeshStandardMaterial({ color: 0x18293c, roughness: 0.35, metalness: 0.92 });
  const mScrew = new THREE.MeshStandardMaterial({ color: 0x2a3c50, roughness: 0.40, metalness: 0.95 });
  const mCable = new THREE.MeshStandardMaterial({ color: 0x080a0c, roughness: 0.90, metalness: 0.05 });
  const mLogo  = new THREE.MeshStandardMaterial({
    map: logoTex, roughness: 0.55, metalness: 0.1,
    emissiveMap: logoTex, emissive: new THREE.Color(0x001133), emissiveIntensity: 0.7,
  });

  /* ── Device Group ───────────────────────────────────────── */
  const dg = new THREE.Group();
  scene.add(dg);

  /* main body */
  dg.add(new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.86, 0.55), mBody));

  /* top clip */
  const topClip = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.13, 0.58), mEdge);
  topClip.position.y = 0.995;
  dg.add(topClip);

  /* bottom mount */
  const botMount = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.18, 0.58), mEdge);
  botMount.position.y = -0.945;
  dg.add(botMount);

  /* front panel with logo */
  const logoMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 1.70), mLogo);
  logoMesh.position.z = 0.28;
  dg.add(logoMesh);

  /* corner screws */
  const screwGeo = new THREE.CylinderGeometry(0.044, 0.044, 0.06, 6);
  screwGeo.rotateZ(Math.PI / 2);
  [[-0.59, 0.80], [0.59, 0.80], [-0.59, -0.80], [0.59, -0.80]].forEach(([x, y]) => {
    const s = new THREE.Mesh(screwGeo, mScrew);
    s.position.set(x, y, 0.295);
    dg.add(s);
  });

  /* edge bevel lines (thin strips) */
  const bevelMat = new THREE.MeshStandardMaterial({ color: 0x2255aa, roughness: 0.4, metalness: 0.9, emissive: 0x112244, emissiveIntensity: 0.5 });
  const bevelV = new THREE.BoxGeometry(0.018, 1.86, 0.015);
  [-0.705, 0.705].forEach(x => {
    const b = new THREE.Mesh(bevelV, bevelMat);
    b.position.set(x, 0, 0.28);
    dg.add(b);
  });
  const bevelH = new THREE.BoxGeometry(1.41, 0.018, 0.015);
  [-0.93, 0.93].forEach(y => {
    const b = new THREE.Mesh(bevelH, bevelMat);
    b.position.set(0, y, 0.28);
    dg.add(b);
  });

  /* LEDs */
  const ledMats = [];
  for (let i = 0; i < 5; i++) {
    const isOn = i < 3;
    const m = new THREE.MeshStandardMaterial(isOn
      ? { color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 2.5, roughness: 0.1 }
      : { color: 0x002211, emissive: 0x004422, emissiveIntensity: 0.3 }
    );
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), m);
    led.position.set(-0.3 + i * 0.15, -0.80, 0.285);
    dg.add(led);
    if (isOn) ledMats.push(m);
  }

  /* cable going down */
  const cabCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0,    -1.04,  0.10),
    new THREE.Vector3(0.18, -1.55,  0.00),
    new THREE.Vector3(0.35, -2.15, -0.15),
  ]);
  dg.add(new THREE.Mesh(new THREE.TubeGeometry(cabCurve, 20, 0.028, 8, false), mCable));

  /* side port details */
  const portGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.06, 8);
  portGeo.rotateZ(Math.PI / 2);
  const mPort = new THREE.MeshStandardMaterial({ color: 0x090c10, roughness: 0.9 });
  [-0.2, 0.18].forEach(y => {
    const p = new THREE.Mesh(portGeo, mPort);
    p.position.set(0.724, y, 0.08);
    dg.add(p);
  });

  dg.rotation.y = -0.28;
  dg.rotation.x =  0.04;

  /* ── Halo Rings ─────────────────────────────────────────── */
  function makeHalo(radius, tube, rotX, color, opacity) {
    const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 4, 80), mat);
    mesh.rotation.x = rotX;
    scene.add(mesh);
    return { mesh, mat };
  }

  const r1 = makeHalo(2.25, 0.014,  Math.PI / 2,  0x0066ff, 0.45);
  const r2 = makeHalo(1.82, 0.010,  Math.PI / 4,  0x0044bb, 0.32);
  const r3 = makeHalo(1.50, 0.007, -Math.PI / 6,  0x00aaff, 0.28);

  /* bright node dots on outer ring — rotate with it */
  const dotMat = new THREE.MeshBasicMaterial({ color: 0x22aaff });
  for (let i = 0; i < 4; i++) {
    const a   = (i / 4) * Math.PI * 2;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), dotMat);
    dot.position.set(2.25 * Math.cos(a), 0, 2.25 * Math.sin(a));
    r1.mesh.add(dot);
  }

  /* ── Feature nodes + connection lines ──────────────────── */
  const nodePts = [
    new THREE.Vector3(-2.1,  2.5, -0.4),
    new THREE.Vector3(-0.85, 3.1, -0.5),
    new THREE.Vector3( 0.85, 3.1, -0.5),
    new THREE.Vector3( 2.1,  2.5, -0.4),
  ];

  const lineMat = new THREE.LineBasicMaterial({ color: 0x0055bb, transparent: true, opacity: 0.28 });
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x0088ff });

  const featureGlows = [];
  nodePts.forEach(p => {
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([p, new THREE.Vector3(0, 1.0, 0)]),
      lineMat
    ));
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), nodeMat.clone());
    sphere.position.copy(p);
    scene.add(sphere);
    featureGlows.push(sphere);
  });

  /* ── Particles ──────────────────────────────────────────── */
  function mkPts(n, sx, sy, sz, yo, col, pSize, op) {
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i*3]   = (Math.random() - 0.5) * sx;
      pos[i*3+1] = yo + (Math.random() - 0.5) * sy;
      pos[i*3+2] = (Math.random() - 0.5) * sz - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({
      color: col, size: pSize, transparent: true, opacity: op, sizeAttenuation: true,
    }));
  }

  scene.add(mkPts(200, 14, 10, 8,  0.0,  0x0055ff, 0.022, 0.50));
  scene.add(mkPts( 80,  5,  4, 4, -2.5,  0xffaa00, 0.038, 0.65));

  /* ── Fuel disc glow ─────────────────────────────────────── */
  const fuelDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.5, 32),
    new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.06, side: THREE.DoubleSide })
  );
  fuelDisc.rotation.x = -Math.PI / 2;
  fuelDisc.position.y = -2.4;
  scene.add(fuelDisc);

  /* ── Resize ─────────────────────────────────────────────── */
  new ResizeObserver(resize).observe(container);

  function resize() {
    const w = container.clientWidth  || 400;
    const h = container.clientHeight || 300;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  /* ── Animate ────────────────────────────────────────────── */
  const clock = new THREE.Clock();

  (function loop() {
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    /* device gentle float + sway */
    dg.position.y = Math.sin(t * 0.55) * 0.10;
    dg.rotation.y = -0.28 + Math.sin(t * 0.18) * 0.12;

    /* rings spin */
    r1.mesh.rotation.y += 0.0014;
    r2.mesh.rotation.z += 0.0020;
    r3.mesh.rotation.x += 0.0026;

    /* ring opacity pulse */
    r1.mat.opacity = 0.40 + Math.sin(t * 1.1) * 0.10;
    r2.mat.opacity = 0.28 + Math.sin(t * 1.4 + 1) * 0.08;
    r3.mat.opacity = 0.24 + Math.sin(t * 1.7 + 2) * 0.07;

    /* LED pulse */
    ledMats.forEach((m, i) => {
      m.emissiveIntensity = 1.8 + Math.sin(t * 2.2 + i * 1.5) * 0.9;
    });

    /* feature node glow pulse */
    featureGlows.forEach((s, i) => {
      s.material.opacity = 0.75 + Math.sin(t * 1.8 + i * 1.3) * 0.25;
    });

    /* fuel glow pulse */
    fuelPt.intensity = 1.5 + Math.sin(t * 1.3) * 0.8;
    fuelDisc.material.opacity = 0.055 + Math.sin(t * 1.3) * 0.035;

    renderer.render(scene, camera);
  })();
}
