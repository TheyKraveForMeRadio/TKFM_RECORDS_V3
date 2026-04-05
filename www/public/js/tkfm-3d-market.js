import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// 🌍 3D MARKET GLOBE
export function init3DMarket(){

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias:true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 🌐 SPHERE (MARKET)
  const geometry = new THREE.SphereGeometry(3, 64, 64);
  const material = new THREE.MeshBasicMaterial({
    wireframe:true,
    color:0xfacc15
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 6;

  function animate(){
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();

  return scene;
}

// 📊 ADD SONG NODE
export function addSongNode(scene, price=1){

  const geometry = new THREE.SphereGeometry(0.1,16,16);
  const material = new THREE.MeshBasicMaterial({
    color: price > 1 ? 0x00ff00 : 0xff0000
  });

  const node = new THREE.Mesh(geometry, material);

  node.position.set(
    (Math.random()-0.5)*5,
    (Math.random()-0.5)*5,
    (Math.random()-0.5)*5
  );

  scene.add(node);

}
