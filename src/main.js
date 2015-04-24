var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(18.5, 960/600, 0.1, 50);
camera.position.z = 10;
camera.position.y = -0.2;

var renderer = new THREE.CanvasRenderer({alpha: true, canvas: document.getElementById('bigbang') });
renderer.setPixelRatio(window.devicePixelRatio);

var width = $('section.bigbang').width();
var scaleRatio = width / 960;
renderer.setSize(width, 600 * scaleRatio);
$('section.bigbang div.pins').css('transform',         'scale(' + scaleRatio + ')');
$('section.bigbang div.pins').css('-webkit-transform', 'scale(' + scaleRatio + ')');
$('section.bigbang div.pins').css('transform-origin',         '0 0');
$('section.bigbang div.pins').css('-webkit-transform-origin', '0 0');

var spriteMaterial = new THREE.SpriteMaterial({ color: 0xE2DAC7 });
var sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(0.001, 0.001, 0.001);

var loader = new THREE.JSONLoader();
var mesh, stars, starGroup;
var group = new THREE.Object3D();
group.rotation.x = 0.4;
group.position.y = 0.4;
scene.add(group);

var vector = new THREE.Vector3();
var projector = new THREE.Projector();

var projects = [
  { name: 'grandbruit', starIndex: 11 },
  { name: 'apollo11',   starIndex: 17 },
  { name: 'detroit',    starIndex: 7  },
  { name: 'doudou',     starIndex: 85 },
];

loader.load('js/model.js', function(geometry) {
  mesh = new THREE.Mesh(geometry);
  
  mesh.visible = false;
  
  var edgesHelper = new THREE.EdgesHelper(mesh, 0xEB3A0A, 0.01);
  
  var pixelRatio = typeof window.devicePixelRatio == 'undefined' ? 1 : window.devicePixelRatio;
  edgesHelper.material.linewidth = 0.35 * pixelRatio;
  scene.add(edgesHelper);
  
  group.add(mesh);
});

loader.load('js/stars.js', function(geometry) {
  stars = new THREE.Mesh(geometry);
  starGroup = new THREE.Object3D();

  for (var i = 0; i < stars.geometry.vertices.length; i++) {
    var star = sprite.clone();
    var scale = Math.max(0.001, Math.random() / 125);
    star.scale.set(scale, scale, scale);
    star.position.copy(stars.geometry.vertices[i]);
    starGroup.add(star);
  }

  group.add(starGroup);
  $('div.pin').addClass('visible');
});

var render = function() {
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;

  if (typeof mesh !== 'undefined') {
    mesh.rotation.y += 0.0007;
  }

  if (typeof starGroup !== 'undefined') {
    starGroup.rotation.y -= 0.0025;
    for (var i = 0; i < projects.length; i++) {
      var thumbnail = $('#pin-' + projects[i]['name']);
      vector.setFromMatrixPosition(starGroup.children[projects[i]['starIndex']].matrixWorld);
      vector.project(camera);
      vector.x = (vector.x * 480) + 480;
      vector.y = - (vector.y * 300) + 300;
      thumbnail.css('z-index', Math.round(vector.y));
      thumbnail.css('left', vector.x + 'px');
      thumbnail.css('top',  vector.y + 'px');
    }
  }
  
  group.rotation.x = 0.4 - (document.body.scrollTop * 0.0004)
  group.position.y = 0.4 + (document.body.scrollTop * 0.0004)
	renderer.render(scene, camera);
  
  if ($('section#grandbruit').offset()['top'] < 30) {
    $('#scroll-top').css('opacity', 1);
  } else {
    $('#scroll-top').css('opacity', 0);
  }
};

window.addEventListener('resize', function () {
	camera.updateProjectionMatrix();
}, false);

render();

smoothScroll.init();