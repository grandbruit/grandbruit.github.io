var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 50);
camera.position.z = 10;

var renderer = new THREE.CanvasRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader(); // init the loader util
var mesh;

loader.load('js/model.js', function (geometry) {
  var material = new THREE.MeshBasicMaterial({ color: 'black'});
  mesh = new THREE.Mesh(geometry, material);
  
  mesh.rotation.x = 0.3;
  mesh.visible = false;
  
  var egh = new THREE.EdgesHelper(mesh, 0xEB3A0A, 0.01);
  egh.material.linewidth = 0.7;
  scene.add(egh);
  
  scene.add(mesh);
});

var render = function() {
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;
	renderer.render(scene, camera);
  if (typeof mesh !== 'undefined') {
    mesh.rotation.y += 0.001;
  }
};

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

render();
