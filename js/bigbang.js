var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 50);
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader(); // init the loader util
var mesh;

loader.load('js/model.js', function (geometry) {
  var material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xEB3A0A
  });
  
  mesh = new THREE.Mesh(
    geometry,
    material
  );

  scene.add(mesh);
});

var render = function() {
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;
	renderer.render(scene, camera);
};

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

render();
