/*
The project is to save time by implementing necessary files.
All you have to do is to use this template and then run npm install.
This Template includes:

1. Scene
2. Camera
3. GUI
4. Background Image
5. Textures (Cube, Torus, PolyHedron)
6. Geometries (Cube, Torus, PolyHedron, Text)
7. Materials (Cube, Torus, PolyHedron)
8. Mesh (cube, torus, polyHedron)
9. Lights (Ambient, Point, RectLight)
10. Renderer
11. Orbit Controls
12. Grid Helper
13. Animation Function

Ordering from top to bottom.
Feel free to uncomment, playaround and debug the code.
Create your Own project Hassel free.
Happy Coding
*/

import "./style.css";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import brick from "./images/brick_texture.jpeg";
import water from "./images/water_texture.jpeg";
import paper from "./images/paper_texture.jpeg";
import back from "./images/background.jpeg";

/* Scene */
const scene = new THREE.Scene();

/* Camera */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;
camera.position.y = 50;

/* Debug with GUI */

const gui = new dat.GUI();

/* Background */
const background = new THREE.TextureLoader().load(back);
scene.background = background;

/* Textures */

// Cube
const cubeTexture = new THREE.TextureLoader().load(brick);

// Torus Knot
const torusTexture = new THREE.TextureLoader().load(water);

// Poly Hedron
const polyTexture = new THREE.TextureLoader().load(paper);

/* Geometries */

// Text
const loader = new THREE.FontLoader();

loader.load("./helvetiker_regular.typeface.json", (font = new THREE.Font()) => {
  const lorem = "Three.js Boiler Plate";

  const geometry = new THREE.TextGeometry(lorem, {
    font: font,
    size: 4,
    height: 1,
    curveSegments: 20,
  });
  const materials = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(geometry, materials);
  textMesh.position.x = -20;
  textMesh.position.y = 50;
  textMesh.position.z = 50;
  scene.add(textMesh);
});

// Poly Hedron

const verticesOfCube = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
];

const indicesOfFaces = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
];

const polyhedronGeometry = new THREE.PolyhedronGeometry(
  verticesOfCube,
  indicesOfFaces,
  10,
  4
);

// Cube
const cubeGeometry = new THREE.BoxGeometry(30, 30, 30);

// Torus
const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

/* Materials */

// Cube
const cubeMaterial = new THREE.MeshStandardMaterial({
  // color: 0x49ef4,
  emissive: 0x0,
  roughness: 1,
  metalness: 0,
  // vertexColors: true,
  // flatShading: true,
  // fog: true,
  map: cubeTexture,
});

// Torus
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0x49ef4,
  emissive: 0x0,
  roughness: 1,
  metalness: 0,
  // vertexColors: true,
  // flatShading: true,
  // fog: true,
  map: torusTexture,
});

// Poly Hedron
const polyhedronMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x49ef4,
  emissive: 0x0,
  roughness: 0,
  // metalness: 1,
  // clearcoat: 1,
  reflectivity: 1,
  // vertexColors: true,
  // flatShading: true,
  fog: true,
  map: polyTexture,
});

/* Mesh */

// Cube
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

cube.position.y = 20;

// Torus
const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torusKnot);

torusKnot.position.x = 60;
torusKnot.position.y = 20;

// Heart
const polyhedronMesh = new THREE.Mesh(polyhedronGeometry, polyhedronMaterial);
scene.add(polyhedronMesh);

polyhedronMesh.position.x = -60;
polyhedronMesh.position.y = 20;
polyhedronMesh.rotation.x = 4;

/* lights */

// Ambient Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// Point Lights
// 1
const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(0, 52, -20);
scene.add(pointLight1);

// gui.add(pointLight1.position, "x").min(-60).max(100);
// gui.add(pointLight1.position, "y").min(-60).max(100);
// gui.add(pointLight1.position, "z").min(-60).max(100);

// const pointlight1Helper = new THREE.PointLightHelper(pointLight1);
// scene.add(pointlight1Helper);

// 2
const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(60, 52, -20);
scene.add(pointLight2);

// const pointlight2Helper = new THREE.PointLightHelper(pointLight2);
// scene.add(pointlight2Helper);

// 3
const pointLight3 = new THREE.PointLight(0xffffff, 1);
pointLight3.position.set(-60, 52, -20);
scene.add(pointLight3);

// const pointlight3Helper = new THREE.PointLightHelper(pointLight3);
// scene.add(pointlight3Helper);

// 4
const pointLight4 = new THREE.PointLight(0xffffff, 1);
pointLight4.position.set(0, 52, 120);
scene.add(pointLight4);

// gui.add(pointLight4.position, "x").min(-60).max(100);
// gui.add(pointLight4.position, "y").min(-60).max(100);
// gui.add(pointLight4.position, "z").min(-60).max(100);

// const pointlight4Helper = new THREE.PointLightHelper(pointLight4);
// scene.add(pointlight4Helper);

// Rect Light
const width = 200;
const height = 200;
const intensity = 2;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.lookAt(0, 0, 0);
rectLight.position.set(0, 0, 0);
rectLight.rotation.set(1.571, 0, 0);
scene.add(rectLight);

// gui.add(rectLight.position, "x").min(-60).max(100);
// gui.add(rectLight.position, "y").min(-60).max(100);
// gui.add(rectLight.position, "z").min(-60).max(100);
// gui.add(rectLight.rotation, "x").min(-10).max(10);
// gui.add(rectLight.rotation, "y").min(-10).max(10);
// gui.add(rectLight.rotation, "z").min(-10).max(10);

// const rectLightHelper = new RectAreaLightHelper(rectLight);
// rectLight.add(rectLightHelper);

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

/* Orbit Controls */
const controls = new OrbitControls(camera, renderer.domElement);

/* Grid Helper */
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

/* Animation Function */

function animate() {
  requestAnimationFrame(animate);

  // Objects animation

  // Torus
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  torusKnot.rotation.z += 0.01;

  // Cube
  cube.rotation.x += -0.01;
  cube.rotation.y += -0.01;
  cube.rotation.z += 0.01;

  // Poly Hedron
  polyhedronMesh.rotation.x += 0.01;
  polyhedronMesh.rotation.y += 0.01;
  polyhedronMesh.rotation.z += 0.01;
  // Orbit Controls
  controls.update();
  controls.enabled = false; // delete this line to access the orbit controls

  // Renderer
  renderer.render(scene, camera);
}

animate();
