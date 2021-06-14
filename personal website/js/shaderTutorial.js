var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
var objectMan = new THREE.Object3D();
var geometry = new THREE.SphereGeometry(1, 8, 8);
var material = new THREE.MeshBasicMaterial({ color: 0x0b0a7f});
var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x1786e2, wireframe: true});
var wireframeGeometry = new THREE.WireframeGeometry(geometry);

var wireSphere = new THREE.Mesh(geometry, wireframeMaterial);
var solidSphere = new THREE.Mesh(geometry, material);

//scene.add(sphere);
objectMan.add(wireSphere);
objectMan.add(solidSphere);

scene.add(objectMan)

var geom = new THREE.BufferGeometry();
geom.attributes.position
var triangle = new THREE.Triangle(createPoint(1,0,0), createPoint(-1,0,0), createPoint(0,2,0));


var geometry = new THREE.SphereGeometry(1, 8, 8);

var material = new THREE.MeshBasicMaterial({ color: 0x0b0a7f});
var sphere = new THREE.Mesh(triangle, material);
scene.add(sphere);


 sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
*/
camera.position.z = 10;
function createPoint(x, y, z){

    return new THREE.Vector3(x,y,z);
}

let a = createPoint(1,0,0); 
let b = createPoint(-1,0,0); 
let c = createPoint(0,2,0);

let vertices = new Float32Array([
 -1,  0, 0,
  1,  0, 0,
  0,  2, 0,
]);

let geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
console.log(geometry)
/////////////////////////////////////////////
/////////////////////////////////////////////
var customUniforms = {
	delta: {value: 0}
};

var shaderMat = new THREE.ShaderMaterial({
    uniforms: customUniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});

var vertexDisplacement = new Float32Array(geometry.attributes.position.count);



for (var i = 0; i < vertexDisplacement.length; i ++) {
	vertexDisplacement[i] = 0;
}


geometry.setAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1));


/////////////////////////////////////////////
/////////////////////////////////////////////
let material = new THREE.MeshBasicMaterial({color:0x2c2cff});
let mesh = new THREE.Mesh(geometry, shaderMat);

scene.add(mesh);
var delta = 0;
var animate = function () {
  requestAnimationFrame(animate);

  delta += 0.1;

  mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;
  
  for (var i = 0; i < vertexDisplacement.length; i ++) {
      //vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
  }
  
  mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;

  renderer.render(scene, camera);
};

animate();
