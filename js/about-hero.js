import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', initAboutHero);

/* ── Simplified truck mesh (cab + cargo box + wheels) ── */
function buildTruck(bodyMat, darkMat, glowMat) {
  const g = new THREE.Group();

  /* Cargo body */
  const cargo = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.36, 0.50), bodyMat);
  cargo.position.set(-0.14, 0, 0);
  g.add(cargo);

  /* Cab */
  const cab = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.30, 0.50), bodyMat);
  cab.position.set(0.51, 0.03, 0);
  g.add(cab);

  /* Windshield */
  const ws = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.17, 0.38), darkMat);
  ws.position.set(0.685, 0.07, 0);
  g.add(ws);

  /* Wheels */
  [[-0.30, -0.22, 0.29], [-0.30, -0.22, -0.29], [0.36, -0.22, 0.29], [0.36, -0.22, -0.29]].forEach(([x, y, z]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.07, 12), darkMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, y, z);
    g.add(w);
  });

  /* Headlights */
  [0.25, -0.25].forEach(z => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.07), glowMat);
    hl.position.set(0.69, 0.01, z);
    g.add(hl);
  });

  return g;
}

function initAboutHero() {
  const canvas = document.getElementById('about-hero-canvas');
  if (!canvas) return;
  if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) return;

  const wrap = document.getElementById('about-3d-wrap');
  const interactBtn = document.getElementById('about-interact-btn');

  const scene = new THREE.Scene();
  /* Angled camera — overhead perspective showing the fleet orbiting the sensor */
  const camera = new THREE.PerspectiveCamera(42, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 5.2, 7.5);
  camera.lookAt(0, 0.6, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 10, 7);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xD96515, 1.3);
  rimLight.position.set(-6, 1, -4);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0x4488ff, 0.55);
  fillLight.position.set(3, -4, 4);
  scene.add(fillLight);

  /* ── Materials ── */
  const truckMat   = new THREE.MeshStandardMaterial({ color: 0xD96515, roughness: 0.3, metalness: 0.45, emissive: 0xD96515, emissiveIntensity: 0.08 });
  const darkMat    = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.82, metalness: 0.1 });
  const hlMat      = new THREE.MeshStandardMaterial({ color: 0xffee88, emissive: 0xffcc44, emissiveIntensity: 1.4, roughness: 0.1 });
  const silverMat  = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, roughness: 0.18, metalness: 0.95 });
  const sensorMat  = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.45, metalness: 0.75 });
  const orangeGlow = new THREE.MeshStandardMaterial({ color: 0xD96515, emissive: 0xD96515, emissiveIntensity: 0.85, roughness: 0.1, metalness: 0.3 });
  const cloudMat   = new THREE.MeshStandardMaterial({ color: 0x4488ff, emissive: 0x2255cc, emissiveIntensity: 0.75, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.88 });
  const ledMat     = new THREE.MeshStandardMaterial({ color: 0x00ff55, emissive: 0x00cc44, emissiveIntensity: 1.6, roughness: 0.1 });

  /* ── Scene group ── */
  const group = new THREE.Group();
  scene.add(group);

  /* ── Orbit guide rings (like a fleet tracking map) ── */
  const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0xD96515, transparent: true, opacity: 0.14 });
  const outerOrbitRing = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.022, 8, 80), orbitRingMat);
  outerOrbitRing.rotation.x = Math.PI / 2;
  group.add(outerOrbitRing);

  /* Inner dotted-style ring */
  const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.10 });
  const innerOrbitRing = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.016, 8, 60), innerRingMat);
  innerOrbitRing.rotation.x = Math.PI / 2;
  group.add(innerOrbitRing);

  /* ── Fuel Guard X sensor (center) ── */
  const sensor = new THREE.Group();
  group.add(sensor);

  /* Base platform */
  const baseDisk = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.78, 0.06, 32), silverMat);
  baseDisk.position.y = -0.03;
  sensor.add(baseDisk);

  /* Base glow ring */
  const baseGlowRing = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 8, 44), orangeGlow.clone());
  sensor.add(baseGlowRing);

  /* Sensor body cylinder */
  const sensorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.24, 1.55, 24), sensorMat);
  sensorBody.position.y = 0.82;
  sensor.add(sensorBody);

  /* Decorative bands */
  for (let i = 0; i < 4; i++) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.014, 8, 30), silverMat.clone());
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.28 + i * 0.34;
    sensor.add(band);
  }

  /* Sensor dome / cap */
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.23, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2), orangeGlow.clone());
  dome.position.y = 1.60;
  sensor.add(dome);

  /* LED indicator */
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), ledMat);
  led.position.y = 1.86;
  sensor.add(led);

  const ledPt = new THREE.PointLight(0x00ff55, 0.4, 1.5);
  ledPt.position.y = 1.86;
  sensor.add(ledPt);

  /* Sensor light source */
  const sensorPt = new THREE.PointLight(0xD96515, 1.3, 5);
  sensorPt.position.y = 0.8;
  sensor.add(sensorPt);

  /* ── Cloud / AI node (above sensor) ── */
  const cloudGrp = new THREE.Group();
  cloudGrp.position.y = 3.1;
  group.add(cloudGrp);

  cloudGrp.add(new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 18), cloudMat));

  const cloudRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.02, 8, 40),
    new THREE.MeshStandardMaterial({ color: 0x4488ff, emissive: 0x4488ff, emissiveIntensity: 0.55, roughness: 0.2, transparent: true, opacity: 0.65 })
  );
  cloudGrp.add(cloudRing);

  const cloudPt = new THREE.PointLight(0x4488ff, 0.9, 3.5);
  cloudGrp.add(cloudPt);

  /* Beam: sensor → cloud */
  const beamGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 1.86, 0), new THREE.Vector3(0, 3.1, 0)]);
  group.add(new THREE.Line(beamGeo, new THREE.LineBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.45 })));

  /* ── Sonar / radar ping rings ── */
  const radarRings = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.015, 8, 56),
      new THREE.MeshBasicMaterial({ color: 0xD96515, transparent: true, opacity: 0 })
    );
    r.rotation.x = Math.PI / 2;
    group.add(r);
    radarRings.push({ mesh: r, phase: i / 3 });
  }

  /* ── Fleet trucks (3 vehicles orbiting the sensor) ── */
  const truckDefs = [
    { phase: 0,               radius: 2.45, speed: 0.12 },
    { phase: Math.PI * 2 / 3, radius: 2.45, speed: 0.12 },
    { phase: Math.PI * 4 / 3, radius: 2.45, speed: 0.12 }
  ];

  const trucks = [];
  const dataLineGeos = [];

  truckDefs.forEach(def => {
    const t = buildTruck(truckMat, darkMat, hlMat);
    t.scale.setScalar(0.58);
    group.add(t);
    trucks.push({ mesh: t, ...def });

    /* Data line: truck → sensor dome */
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xD96515, transparent: true, opacity: 0.28 });
    group.add(new THREE.Line(geo, lineMat));
    dataLineGeos.push({ geo, mat: lineMat });
  });

  /* ── Data particles streaming truck → sensor ── */
  const dpCount = 54;
  const dpPhases = Array.from({ length: dpCount }, () => Math.random());
  const dpPos = new Float32Array(dpCount * 3);
  const dpGeo = new THREE.BufferGeometry();
  dpGeo.setAttribute('position', new THREE.BufferAttribute(dpPos, 3));
  group.add(new THREE.Points(dpGeo, new THREE.PointsMaterial({
    color: 0xD96515, size: 0.055, transparent: true, opacity: 0.60, sizeAttenuation: true
  })));

  /* ── Background particles ── */
  const pCount = 70;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 20;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0xD96515, size: 0.035, transparent: true, opacity: 0.27, sizeAttenuation: true
  })));

  /* ── OrbitControls ── */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableZoom = true;
  controls.minDistance = 4.5;
  controls.maxDistance = 16;
  controls.minPolarAngle = Math.PI * 0.05;
  controls.maxPolarAngle = Math.PI * 0.65;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.55;
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

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    /* Sensor animations */
    sensorPt.intensity = 1.3 + Math.sin(t * 2.0) * 0.45;
    led.material.emissiveIntensity = 1.4 + Math.sin(t * 3.5) * 0.6;
    ledPt.intensity = 0.4 + Math.sin(t * 3.5) * 0.18;
    dome.material.emissiveIntensity = 0.75 + Math.sin(t * 1.5) * 0.28;
    baseGlowRing.material.emissiveIntensity = 0.75 + Math.sin(t * 2.2) * 0.25;

    /* Cloud float + spin */
    cloudGrp.position.y = 3.1 + Math.sin(t * 0.75) * 0.14;
    cloudGrp.rotation.y = t * 0.45;
    cloudRing.rotation.z = t * 0.55;
    cloudPt.intensity = 0.9 + Math.sin(t * 1.8) * 0.35;

    /* Radar sonar pings */
    radarRings.forEach(r => {
      const cycle = ((t * 0.36 + r.phase) % 1);
      r.mesh.scale.setScalar(0.4 + cycle * 4.0);
      r.mesh.material.opacity = (1 - cycle) * 0.35;
    });

    /* Trucks orbit + face direction of travel */
    trucks.forEach((td, i) => {
      const angle = t * td.speed + td.phase;
      const x = Math.cos(angle) * td.radius;
      const z = Math.sin(angle) * td.radius;
      td.mesh.position.set(x, 0, z);
      td.mesh.rotation.y = -angle - Math.PI / 2;

      /* Update data line */
      const pts = dataLineGeos[i].geo.attributes.position;
      pts.setXYZ(0, x, 0, z);
      pts.setXYZ(1, 0, 1.60, 0);
      pts.needsUpdate = true;

      /* Pulse line opacity */
      dataLineGeos[i].mat.opacity = 0.18 + Math.sin(t * 1.4 + i * 1.2) * 0.14;
    });

    /* Data particles stream from trucks to sensor */
    const posAttr = dpGeo.attributes.position;
    for (let i = 0; i < dpCount; i++) {
      dpPhases[i] = (dpPhases[i] + 0.0028) % 1;
      const truckIdx = i % 3;
      const td = trucks[truckIdx];
      const angle = t * td.speed + td.phase;
      const tx = Math.cos(angle) * td.radius;
      const tz = Math.sin(angle) * td.radius;
      const p = dpPhases[i];
      posAttr.setXYZ(i, tx * (1 - p), p * 1.60, tz * (1 - p));
    }
    posAttr.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
