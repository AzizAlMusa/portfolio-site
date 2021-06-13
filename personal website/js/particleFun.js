//forcing this script file to have local scope
const glslify = require("glslify");
var scene = new THREE.Scene({ color: 0x000000 });
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const viewerName = "universe-viewer";
var portWidth = $("#" + viewerName).width();
var portHeight = $("#" + viewerName).height();
renderer.setSize(portWidth, portHeight);
camera.aspect = portWidth / portHeight;
camera.updateProjectionMatrix();
document.getElementById(viewerName).appendChild(renderer.domElement);

let width, height, numPoints, texture;
const loader = new THREE.TextureLoader()
loader.load('img/golfball.jpg', (loadedTexture) => {
  console.log(loadedTexture);
  texture = loadedTexture;
  width = texture.image.width;
  height = texture.image.height;
  numPoints = width*height;
});
/*

*/


const controls = new THREE.OrbitControls(camera, renderer.domElement);

//CUSTOM CODE STARTS HERE
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

const uniforms = {
	uTime: { value: 0 },
	uRandom: { value: 1.0 },
	uDepth: { value: 2.0 },
	uSize: { value: 0.0 },
	uTextureSize: { value: new THREE.Vector2(width, height) },
	uTexture: { value: texture },
	uTouch: { value: null }
};

//var src = glslify.file('./')
console.log(glslify);
const material = new THREE.RawShaderMaterial({
	uniforms,
	//vertexShader: glslify(require('/texture/particle.vert')),
	//fragmentShader: glslify(require('/texture/particle.frag')),
	depthTest: false,
	transparent: true
});


var animate = function (time) {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  animate();
};