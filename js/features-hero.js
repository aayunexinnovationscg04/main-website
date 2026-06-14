import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', initFeaturesHero);

function initFeaturesHero() {
  const canvas = document.getElementById('features-hero-canvas');
  if (!canvas) return;
  if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) return;

  const wrap = document.getElementById('features-3d-wrap');
  const interactBtn = document.getElementById('features-interact-btn');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 0.5, 8.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(5, 8, 6);
  scene.add(keyLight);

  const orangeLight = new THREE.DirectionalLight(0xD96515, 1.2);
  orangeLight.position.set(-5, -2, -4);
  scene.add(orangeLight);

  const blueLight = new THREE.DirectionalLight(0x4488ff, 0.6);
  blueLight.position.set(2, -4, 3);
  scene.add(blueLight);

  /* ── Main group ── */
  const group = new THREE.Group();
  scene.add(group);

  /* Node data: [x, y, z, hexColor, sphereRadius, emissiveIntensity, label] */
  const nodeData = [
    [  0.00,  0.00,  0.00, 0xD96515, 0.20, 0.9,  'Hub'           ],
    [  1.05,  0.35,  0.35, 0xD96515, 0.10, 0.7,  'Monitoring'    ],
    [ -0.95,  0.70, -0.30, 0xD96515, 0.10, 0.7,  'GPS Tracking'  ],
    [  0.20, -1.05,  0.60, 0x4488ff, 0.10, 0.6,  'Theft Detection'],
    [ -0.30,  1.00, -0.75, 0x4488ff, 0.10, 0.6,  'Smart Alerts'  ],
    [  1.80,  0.65,  0.50, 0xff8844, 0.12, 0.65, 'AI Analytics'  ],
    [ -1.75,  0.25,  0.90, 0xff8844, 0.12, 0.65, 'Fleet Mgmt'    ],
    [  0.45, -1.80,  0.80, 0x4488ff, 0.11, 0.55, 'Lock System'   ],
    [ -0.60,  1.85, -0.55, 0x4488ff, 0.11, 0.55, 'Edge AI'       ],
    [  1.30, -1.35, -0.70, 0xD96515, 0.11, 0.65, 'Mobile App'    ],
    [ -1.50, -1.10,  0.60, 0xff8844, 0.11, 0.60, 'Auto Reports'  ],
    [  0.65,  1.40, -1.70, 0xaac4ff, 0.10, 0.55, 'Encryption'    ],
    [ -0.80, -0.75,  1.90, 0xaac4ff, 0.10, 0.50, 'Predictive'    ]
  ];

  const nodes = [];
  nodeData.forEach(([x, y, z, color, r, ei]) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 16, 16),
      new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: ei, roughness: 0.15, metalness: 0.6
      })
    );
    mesh.position.set(x, y, z);
    group.add(mesh);
    nodes.push(mesh);
  });

  /* Center glow */
  const centerLight = new THREE.PointLight(0xD96515, 1.4, 5.5);
  group.add(centerLight);

  /* ── Connection lines ── */
  const connections = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
    [1,5],[1,9],[2,6],[2,10],[3,7],[4,8],[5,11],[6,10],[7,12],[9,11],[10,12]
  ];

  const lineMats = [];
  connections.forEach(([a, b]) => {
    const pts = [new THREE.Vector3(...nodeData[a]), new THREE.Vector3(...nodeData[b])];
    const mat = new THREE.LineBasicMaterial({ color: 0xD96515, transparent: true, opacity: 0.18 });
    lineMats.push(mat);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  });

  /* ── Outer wireframe ── */
  const outerWire = new THREE.Mesh(
    new THREE.DodecahedronGeometry(2.9, 0),
    new THREE.MeshBasicMaterial({ color: 0x2244aa, wireframe: true, transparent: true, opacity: 0.06 })
  );
  group.add(outerWire);

  /* ── Particles ── */
  const pCount = 85;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 20;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0xD96515, size: 0.04, transparent: true, opacity: 0.30, sizeAttenuation: true
  })));

  /* ── HTML Label overlay ── */
  const labelContainer = document.createElement('div');
  labelContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
  wrap.appendChild(labelContainer);

  const labelEls = nodeData.map(([,,,,,, label], i) => {
    const el = document.createElement('span');
    el.textContent = label;
    el.style.cssText = [
      'position:absolute',
      'transform:translate(-50%,-50%)',
      'font-size:0.58rem',
      'font-weight:700',
      'letter-spacing:0.05em',
      'text-transform:uppercase',
      'color:rgba(255,255,255,0.82)',
      'background:rgba(6,12,24,0.62)',
      'padding:0.18rem 0.52rem',
      'border-radius:4px',
      'border:1px solid rgba(217,101,21,0.35)',
      'white-space:nowrap',
      'pointer-events:none',
      'backdrop-filter:blur(6px)',
      '-webkit-backdrop-filter:blur(6px)',
      'transition:opacity 0.25s',
    ].join(';');
    if (i === 0) el.style.display = 'none'; /* hide center hub label */
    labelContainer.appendChild(el);
    return el;
  });

  /* ── OrbitControls ── */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableZoom = true;
  controls.minDistance = 4;
  controls.maxDistance = 14;
  controls.minPolarAngle = Math.PI * 0.1;
  controls.maxPolarAngle = Math.PI * 0.9;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.9;
  controls.enablePan = false;
  controls.enabled = false;

  /* ── Interact toggle ── */
  let interactActive = false;
  const iconInteract = interactBtn && interactBtn.querySelector('.icon-interact');
  const iconExit     = interactBtn && interactBtn.querySelector('.icon-exit');
  const btnLabel     = interactBtn && interactBtn.querySelector('.btn-label');

  function enableInteract() {
    interactActive = true; controls.enabled = true; controls.autoRotate = false;
    wrap.classList.add('interact-active');
    if (iconInteract) iconInteract.style.display = 'none';
    if (iconExit)     iconExit.style.display = '';
    if (btnLabel)     btnLabel.textContent = 'Exit Interact';
  }
  function disableInteract() {
    interactActive = false; controls.enabled = false; controls.autoRotate = true;
    wrap.classList.remove('interact-active');
    if (iconInteract) iconInteract.style.display = '';
    if (iconExit)     iconExit.style.display = 'none';
    if (btnLabel)     btnLabel.textContent = 'Interact';
  }

  if (interactBtn) interactBtn.addEventListener('click', e => { e.stopPropagation(); interactActive ? disableInteract() : enableInteract(); });
  window.addEventListener('scroll', () => { if (interactActive) disableInteract(); }, { passive: true });
  document.addEventListener('click', e => { if (interactActive && !wrap.contains(e.target)) disableInteract(); });
  document.addEventListener('touchstart', e => { if (interactActive && !wrap.contains(e.target)) disableInteract(); }, { passive: true });

  /* ── Resize ── */
  function onResize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  new ResizeObserver(onResize).observe(wrap);
  onResize();

  /* ── Animate ── */
  const clock = new THREE.Clock();
  const _v = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    /* Float */
    group.position.y = Math.sin(t * 0.5) * 0.08;

    /* Node breathe */
    nodes.forEach((nd, i) => {
      nd.scale.setScalar(1 + Math.sin(t * 1.4 + i * 0.72) * 0.09);
    });

    /* Line pulse */
    lineMats.forEach((mat, i) => {
      mat.opacity = 0.10 + Math.sin(t * 1.2 + i * 0.55) * 0.10;
    });

    /* Outer wireframe drift */
    outerWire.rotation.y = t * 0.07;
    outerWire.rotation.x = t * 0.04;

    /* Center glow pulse */
    centerLight.intensity = 1.4 + Math.sin(t * 2.2) * 0.5;

    /* ── Project node positions → 2D screen for labels ── */
    const cw = wrap.clientWidth;
    const ch = wrap.clientHeight;

    nodes.forEach((nd, i) => {
      if (i === 0) return;
      nd.getWorldPosition(_v);
      _v.project(camera);
      const sx = (_v.x * 0.5 + 0.5) * cw;
      const sy = (-_v.y * 0.5 + 0.5) * ch;
      const behind = _v.z > 1;
      labelEls[i].style.opacity = behind ? '0' : '1';
      if (!behind) {
        /* Offset label slightly below + to the right of the node */
        labelEls[i].style.left = (sx + 10) + 'px';
        labelEls[i].style.top  = (sy + 14) + 'px';
      }
    });

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
