///universe declarations
var scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0x000000);
var stars;
var sprite;
var starMaterial;
var starGeo;
var velocity = 0;
var acceleration = 0.05;
var camera2 = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera2.position.z = 1;
camera2.rotation.x = Math.PI / 2;

//setup renderer
var renderer2 = new THREE.WebGLRenderer();

var portWidth2 = $("#universe-viewer").width();
var portHeight2 = $("#universe-viewer").height();
renderer2.setSize(portWidth2, portHeight2);
camera2.aspect = portWidth2 / portHeight2;
camera2.updateProjectionMatrix();
document.getElementById("universe-viewer").appendChild(renderer2.domElement);

// UNIVERSE STUFF
starGeo = new THREE.BufferGeometry();
const MAX_POINTS = 10000;
var positions = new Float32Array(MAX_POINTS * 3);
var velocities = new Float32Array(MAX_POINTS);
var accelerations = new Float32Array(MAX_POINTS);

starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
starGeo.setAttribute("velocity", new THREE.BufferAttribute(positions, 1));
for (let i = 0; i < 6000; i++) {
  let x = Math.random() * 600 - 300;
  let y = Math.random() * 600 - 300;
  let z = Math.random() * 600 - 300;

  starGeo.attributes.position.setXYZ(i, x, y, z);

  velocities[i] = velocity;
}

console.log(starGeo.attributes.velocity);

sprite = new THREE.TextureLoader().load(
  "texture/star 3.png"
);

starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.9,
  map: sprite,
  transparent: true
});

starGeo.attributes.position.needsUpdate = true;

stars = new THREE.Points(starGeo, starMaterial);
scene2.add(stars);

function galacticTravel() {
  for (i = 0; i < starGeo.attributes.position.count; i++) {
    var p = starGeo.attributes.position.getY(i);

    if (velocities[i] <= 15) velocities[i] += acceleration;

    starGeo.attributes.position.setY(i, p - velocities[i]);

    if (p < -100) {
      starGeo.attributes.position.setY(i, 200);
    }
  }
  starGeo.attributes.position.needsUpdate = true;
}

var animate = function (time) {
  requestAnimationFrame(animate);

  stars.rotation.y += 0.0005;
  stars.rotation.x += 0.0005;

  renderer2.render(scene2, camera2);
};

animate();
