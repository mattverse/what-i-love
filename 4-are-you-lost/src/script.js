import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let audioStarted = false;
let dataArray;
let particles;
let particlesGeometry;
let startParticleNum = 1000; 

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);

function updateWaveform() {
  analyser.getByteTimeDomainData(dataArray);
}

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const tick = () => {
  if (audioStarted) {
    updateWaveform();
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < startParticleNum; i++) {
      const i3 = i * 3;
      let value = dataArray[i] / 256.0;
      let y = value * 5;
      particles.geometry.attributes.position.array[i3 + 1] = y;
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    particles.rotation.y += 0.00025
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

function createParticles(newCount) {
  particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(newCount * 3);
  const colors = new Float32Array(newCount * 3);

  for (let i = 0; i < newCount * 3; i++) {
    if (i % 3 === 1) {
      positions[i] = 0;
    } else {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    colors[i] = Math.random();
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    alphaMap: new THREE.TextureLoader().load('/textures/particles/1.png'),
    transparent: true,
    alphaTest: 0.001,
    depthWrite: false,
    vertexColors: true,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
}

// Create initial particles
createParticles(startParticleNum);

function startAudioAndParticles() {
    camera.position.y = 3.5
    camera.position.z = 15;

  scene.remove(particles);
  startParticleNum = 30000;  // Set new startParticleNum
  createParticles(startParticleNum);


  // Your click event to start audio
  fetch('./sample.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      source.start();
      audioStarted = true;
    })
    .catch(error => console.error(error));
}


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.y = 3.5
camera.position.z = 15;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

document.addEventListener('mousemove', function init() {
  audioContext.resume().then(() => {
    document.removeEventListener('mousemove', init);
    startAudioAndParticles();
    audioStarted = true;
  });
});

tick();
