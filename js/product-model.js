import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', initEmbeddedViewer);

function initEmbeddedViewer() {
  const canvas = document.getElementById('product-canvas');
  if (!canvas) return;

  if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) {
    showFallback();
    return;
  }

  const wrap = document.getElementById('product-3d-wrap');
  const interactBtn = document.getElementById('product-interact-btn');

  /* ── Scene & Camera ── */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
  camera.position.set(0, 1.2, 7.0);
  camera.lookAt(0, 0.1, 0);

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 9, 7);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xD96515, 1.4);
  rimLight.position.set(-6, 1, -5);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0x7090d0, 0.7);
  fillLight.position.set(-4, 3, 4);
  scene.add(fillLight);

  const bounceLight = new THREE.PointLight(0xffcc88, 0.6, 12);
  bounceLight.position.set(0, -4, 3);
  scene.add(bounceLight);

  const slotLight = new THREE.PointLight(0xD96515, 0.5, 6);
  slotLight.position.set(0, 0, 3);
  scene.add(slotLight);

  /* ── Materials ── */
  const silverMat  = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.18, metalness: 0.96 });
  const brushedMat = new THREE.MeshStandardMaterial({ color: 0xb4b4b4, roughness: 0.42, metalness: 0.90 });
  const knurledMat = new THREE.MeshStandardMaterial({ color: 0xb8b8b8, roughness: 0.58, metalness: 0.82 });
  const darkMat    = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.72, metalness: 0.05 });
  const rubberMat  = new THREE.MeshStandardMaterial({ color: 0x0e0e0e, roughness: 0.90, metalness: 0.0 });
  const voidMat    = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.95, metalness: 0.0, side: THREE.BackSide });
  const ledMat     = new THREE.MeshStandardMaterial({ color: 0x00ff55, emissive: 0x00cc44, emissiveIntensity: 1.2, roughness: 0.1, metalness: 0.0 });

  /* ── Device Group ── */
  const device = new THREE.Group();
  scene.add(device);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.34, 1.55, 48), darkMat);
  stem.position.y = -0.48 - 1.55 / 2;
  stem.castShadow = true;
  device.add(stem);

  for (let i = 0; i < 5; i++) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.365, 0.016, 8, 40), darkMat);
    t.position.y = -0.52 - i * 0.22;
    device.add(t);
  }

  const gasket = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.10, 48), rubberMat);
  gasket.position.y = -0.43;
  device.add(gasket);

  const innerFill = new THREE.Mesh(new THREE.CylinderGeometry(0.80, 0.80, 0.62, 48), voidMat);
  innerFill.position.y = 0.0;
  device.add(innerFill);

  const bodyGroup = buildSlottedRing({ outerR: 1.18, innerR: 0.82, height: 0.62, numSlots: 4, slotFrac: 0.55, ribSegments: 14, material: brushedMat });
  bodyGroup.position.y = 0.0;
  device.add(bodyGroup);

  const bLip = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.07, 48), silverMat);
  bLip.position.y = -0.345;
  device.add(bLip);

  const tFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.18, 0.07, 48), silverMat);
  tFlange.position.y = 0.345;
  device.add(tFlange);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.12, 0.14, 64), silverMat);
  cap.position.y = 0.45;
  device.add(cap);

  const knurlCap = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.90, 0.22, 64), knurledMat);
  knurlCap.position.y = 0.63;
  device.add(knurlCap);

  for (let i = 0; i < 9; i++) {
    const g = new THREE.Mesh(new THREE.TorusGeometry(0.87, 0.013, 8, 44), knurledMat);
    g.position.y = 0.525 + i * 0.024;
    device.add(g);
  }

  const topFace = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.84, 0.025, 64), silverMat);
  topFace.position.y = 0.755;
  device.add(topFace);

  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.14, 12), silverMat);
  pin.rotation.z = Math.PI / 2;
  pin.position.set(1.26, 0.12, 0.0);
  device.add(pin);

  const pinHead = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.025, 6), brushedMat);
  pinHead.rotation.z = Math.PI / 2;
  pinHead.position.set(1.34, 0.12, 0.0);
  device.add(pinHead);

  const led = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), ledMat);
  led.position.set(0.65, 0.39, 1.14);
  device.add(led);

  const ledPt = new THREE.PointLight(0x00ff55, 0.4, 1.5);
  ledPt.position.copy(led.position);
  device.add(ledPt);

  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.25 }));
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.8;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  /* ── Particles ── */
  const pCount = 80;
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 18;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xD96515, size: 0.04, transparent: true, opacity: 0.35, sizeAttenuation: true })));

  /* ── OrbitControls — locked by default, interact-button unlocks ── */
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
  controls.enabled = false;

  /* ── Interact toggle ── */
  let interactActive = false;

  const iconInteract = interactBtn && interactBtn.querySelector('.icon-interact');
  const iconExit     = interactBtn && interactBtn.querySelector('.icon-exit');
  const btnLabel     = interactBtn && interactBtn.querySelector('.btn-label');

  function enableInteract() {
    interactActive = true;
    controls.enabled = true;
    controls.autoRotate = false;
    wrap.classList.add('interact-active');
    if (iconInteract) iconInteract.style.display = 'none';
    if (iconExit)     iconExit.style.display = '';
    if (btnLabel)     btnLabel.textContent = 'Exit Interact';
  }

  function disableInteract() {
    interactActive = false;
    controls.enabled = false;
    controls.autoRotate = true;
    wrap.classList.remove('interact-active');
    if (iconInteract) iconInteract.style.display = '';
    if (iconExit)     iconExit.style.display = 'none';
    if (btnLabel)     btnLabel.textContent = 'Interact';
  }

  if (interactBtn) {
    interactBtn.addEventListener('click', e => {
      e.stopPropagation();
      interactActive ? disableInteract() : enableInteract();
    });
  }

  window.addEventListener('scroll', () => {
    if (interactActive) disableInteract();
  }, { passive: true });

  document.addEventListener('click', e => {
    if (interactActive && !wrap.contains(e.target)) disableInteract();
  });

  document.addEventListener('touchstart', e => {
    if (interactActive && !wrap.contains(e.target)) disableInteract();
  }, { passive: true });

  /* ── Resize ── */
  function onResize() {
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
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
    device.position.y = Math.sin(clock.getElapsedTime() * 0.65) * 0.09;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

function buildSlottedRing({ outerR, innerR, height, numSlots, slotFrac, ribSegments, material }) {
  const group    = new THREE.Group();
  const segAngle  = (Math.PI * 2) / numSlots;
  const slotAngle = segAngle * slotFrac;
  const ribAngle  = segAngle - slotAngle;

  for (let i = 0; i < numSlots; i++) {
    const ribStart = i * segAngle + slotAngle / 2;
    const ribEnd   = ribStart + ribAngle;

    const shape = new THREE.Shape();
    shape.moveTo(outerR * Math.cos(ribStart), outerR * Math.sin(ribStart));
    for (let s = 1; s <= ribSegments; s++) {
      const a = ribStart + (ribEnd - ribStart) * s / ribSegments;
      shape.lineTo(outerR * Math.cos(a), outerR * Math.sin(a));
    }
    shape.lineTo(innerR * Math.cos(ribEnd), innerR * Math.sin(ribEnd));
    for (let s = ribSegments - 1; s >= 0; s--) {
      const a = ribStart + (ribEnd - ribStart) * s / ribSegments;
      shape.lineTo(innerR * Math.cos(a), innerR * Math.sin(a));
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -height / 2, 0);
    group.add(new THREE.Mesh(geo, material));
  }
  return group;
}

function showFallback() {
  const canvas = document.getElementById('product-canvas');
  if (canvas) canvas.style.display = 'none';
  const wrap = document.getElementById('product-3d-wrap');
  if (!wrap) return;
  const img = document.createElement('img');
  img.src = 'assets/device pic.jpeg';
  img.alt = 'Fuel Guard X Device';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
  wrap.appendChild(img);
}
