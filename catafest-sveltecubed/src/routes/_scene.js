import * as THREE from 'three';

export function renderScene(element) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('papayawhip');
  const camera = new THREE.PerspectiveCamera(
    45, element.clientWidth / element.clientHeight, 0.1,2000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(element.clientWidth, element.clientHeight);
  element.appendChild(renderer.domElement);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({color: 0xff3e00})

  const box = new THREE.Mesh(geometry, material)
  box.castShadow = true;
  scene.add(box)
  
  const group = new THREE.Group();
  group.position.set(0, -0.5, 0);

  const floorGeometry = new THREE.PlaneGeometry(50,50)
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 'burlywood'});
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.set(-Math.PI /2, 0,0);
  floor.receiveShadow = true;

  const primitive = new THREE.Object3D();
  primitive.add(new THREE.GridHelper(50,50, 0x444444, 0x555555));
  primitive.position.set(0, -0.001, 0);

  group.add(floor);
  group.add(primitive);
  group.add(group);

  const light = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight();
  directionalLight.color.set(0xffffff);
  directionalLight.intensity = 0.6;
  directionalLight.position.set(-2, 3, 2);
  directionalLight.target.position.set(0,0,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(new THREE.Vector3(0,0,0));
  let spin = 0 ;
  function loop() {
    spin += 0.01 ;
    box.rotation.set(0, spin, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop) // need to use two requestAnimationFrame in this source code form 
} 