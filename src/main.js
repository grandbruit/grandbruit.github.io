var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(18.5, 960/600, 0.1, 50);
camera.position.z = 10;

var renderer = new THREE.CanvasRenderer({alpha: true, canvas: document.getElementById('bigbang') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(960, 600);

var spriteMaterial = new THREE.SpriteMaterial({ color: 0xE2DAC7 });
var sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(0.001, 0.001, 0.001);
// scene.add(sprite);

var loader = new THREE.JSONLoader(); // init the loader util
var mesh, stars, starGroup;

loader.load('js/model.js', function(geometry) {
  mesh = new THREE.Mesh(geometry);
  
  mesh.rotation.x = 0.36;
  mesh.position.y = 0.4;
  mesh.visible = false;
  
  var edgesHelper = new THREE.EdgesHelper(mesh, 0xEB3A0A, 0.01);
  
  edgesHelper.material.linewidth = 0.35 * window.devicePixelRatio;
  scene.add(edgesHelper);
  
  scene.add(mesh);
});

loader.load('js/stars.js', function(geometry) {
  stars = new THREE.Mesh(geometry);
  
  stars.rotation.x = 0.36;
  stars.position.y = 0.4;
  
  starGroup = new THREE.Object3D();
  
  for (var i = 0; i < stars.geometry.vertices.length; i++) {
    var star = sprite.clone();
    var scale = Math.max(0.001, Math.random() / 125);
    star.scale.set(scale, scale, scale);
    star.position.copy(stars.geometry.vertices[i]);
    starGroup.add(star);
  }
  
  starGroup.rotation.x = 0.36;
  starGroup.position.y = 0.4;
  
  scene.add(starGroup);
});

var render = function() {
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;
	renderer.render(scene, camera);
  if (typeof mesh !== 'undefined') {
    mesh.rotation.y += 0.0007;
    starGroup.rotation.y -= 0.0007;
  }
};

window.addEventListener('resize', function () {
	camera.updateProjectionMatrix();
}, false);

render();
