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
var width = 0;
var height, numPoints, texture;
const loader = new THREE.TextureLoader();
loader.load("img/golfball.jpg", loadedTexture => {
  console.log(loadedTexture);
  texture = loadedTexture;
  width = texture.image.width;
  height = texture.image.height;
  numPoints = width * height;

 
});


console.log(texture);

var test = 'start';

function end() {
    test = 'end';
    test = 'local';
}

end();
alert(test);




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

//let geometry = new THREE.BufferGeometry();
//geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
//var geometry = new THREE.SphereGeometry(1, 8, 8);

//console.log(geometry)


///////////////////////////////////////////
///////////// INJECTED CODE ///////////////
///////////////////////////////////////////

const geometry = new THREE.InstancedBufferGeometry();

// positions
const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
positions.setXYZ(0, -0.5, 0.5, 0.0);
positions.setXYZ(1, 0.5, 0.5, 0.0);
positions.setXYZ(2, -0.5, -0.5, 0.0);
positions.setXYZ(3, 0.5, -0.5, 0.0);
geometry.setAttribute("position", positions);

// uvs
const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
uvs.setXYZ(0, 0.0, 0.0);
uvs.setXYZ(1, 1.0, 0.0);
uvs.setXYZ(2, 0.0, 1.0);
uvs.setXYZ(3, 1.0, 1.0);
geometry.setAttribute("uv", uvs);

// index
geometry.setIndex(
  new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
);

const indices = new Uint16Array(numPoints);
const offsets = new Float32Array(numPoints * 3);
const angles = new Float32Array(numPoints);


for (let i = 0; i < numPoints; i++) {
  offsets[i * 3 + 0] = i % width;
  offsets[i * 3 + 1] = Math.floor(i / width); 

 
  indices[i] = i;

  angles[i] = Math.random() * Math.PI;
 
}



geometry.setAttribute(
  "pindex",
  new THREE.InstancedBufferAttribute(indices, 1, false)
);
geometry.setAttribute(
  "offset",
  new THREE.InstancedBufferAttribute(offsets, 3, false)
);
geometry.setAttribute(
  "angle",
  new THREE.InstancedBufferAttribute(angles, 1, false)
);



/////////////////////////////////////////////
/////////////////////////////////////////////
var customUniforms = {
	delta: {value: 0},
    uTexture: {value: texture},
    uTextureSize: {value: new THREE.Vector2(width, height)}
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
      vertexDisplacement[i] = 5*Math.sin(delta) * 0.25;
  }
  
  mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;
 
  renderer.render(scene, camera);
};

animate();
