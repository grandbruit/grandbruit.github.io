var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(18.5, 960/600, 0.1, 50);
camera.position.z = 10;

var renderer = new THREE.CanvasRenderer({alpha: true, canvas: document.getElementById('bigbang') });
renderer.setSize(960, 600);

var loader = new THREE.JSONLoader(); // init the loader util
var mesh;

loader.load('js/model.js', function (geometry) {
  var material = new THREE.MeshBasicMaterial({ color: 'black'});
  mesh = new THREE.Mesh(geometry, material);
  
  mesh.rotation.x = 0.36;
  mesh.position.y = 0.4;
  mesh.visible = false;
  
  var egh = new THREE.EdgesHelper(mesh, 0xEB3A0A, 0.01);
  egh.material.linewidth = 0.6;
  scene.add(egh);
  
  scene.add(mesh);
});

var render = function() {
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;
	renderer.render(scene, camera);
  if (typeof mesh !== 'undefined') {
    mesh.rotation.y += 0.0007;
  }
};

window.addEventListener('resize', function () {
	camera.updateProjectionMatrix();
}, false);

render();
