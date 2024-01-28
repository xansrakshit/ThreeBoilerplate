import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// let z;
// const zfinal = 14;

// window.addEventListener("keydown", ()=> {
//     z = camera.position.z;
// })
window.addEventListener("keypress", () => {
  gsap
    .to(camera.position, {
      z: 20,
      duration: 2.5,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    })
    .to(camera.position, {
      y: 10,
      duration: 2.5,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    })
    .to(camera.position, {
      x: 10,
      y: 5,
      z: 3,
      duration: 2.5,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });
});

function animate() {
  // z += 0.1;
  // if (z < zfinal)
  //     camera.position.z = z;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
