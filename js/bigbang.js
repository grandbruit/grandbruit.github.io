var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 50);
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );

var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );

generateVertexColors( geometry );

var prevFog = false;

var loader = new THREE.JSONLoader(); // init the loader util
var mesh;

// init loading
loader.load('js/model.js', function (geometry) {
  // create a new material
  var material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xEB3A0A
  });
  
  // create a mesh with models geometry and material
  mesh = new THREE.Mesh(
    geometry,
    material
  );
  
  // mesh.scale.set(0.09, 0.09, 1);
  
  mesh.rotation.y = -Math.PI/5;
  
  scene.add(mesh);
});

var render = function () {
	requestAnimationFrame( render );

	var time = Date.now() * 0.001;

	if ( prevFog !== scene.fog ) {
		prevFog = scene.fog;
	}
	
	renderer.render( scene, camera );
};

window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

render();
