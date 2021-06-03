(function () {
  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  var scan;
  var mesh;
  var scan;
  var points;
  var pivot;
  var tower;
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var portWidth = $("#kfupm-viewer").width();
  var portHeight = $("#kfupm-viewer").height();
  renderer.setSize(portWidth, portHeight);
  camera.aspect = portWidth / portHeight;
  camera.updateProjectionMatrix();
  document.getElementById("kfupm-viewer").appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 0.2);

  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xc7b7fe, 2);
  directionalLight.castShadows = true;
  directionalLight.position.z = 0;
  directionalLight.position.y = 0;
  directionalLight.position.x = -30;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xf0ea76, 1, 200);
  pointLight.position.set(0, -5, 5);
  //scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x0000ff, 5, 200);
  pointLight2.position.set(-20, 20, 5);
  //scene.add(pointLight2);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  ///////////////////MODEL/////////////////////////////

  var loader = new THREE.GLTFLoader();
  //url + "model/kfupm/kfupm_tower.gltf"
  loader.load("model/kfupm/kfupm_tower.gltf", function (gltf) {
    console.log(gltf);
    tower = gltf.scene.children[0].children[0];
    tower.position.y -= 30;
    tower.position.z -= 20;
    tower.position.x = 20;
    console.log(tower);
    tower.children[0].children[13].material.color.setHex(0xffcccb); //fffdd1
    scene.add(tower);
  });

  camera.position.z = 30;

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    var portWidth = $("#kfupm-viewer").width();
    var portHeight = $("#kfupm-viewer").height();
    camera.aspect = portWidth / portHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(portWidth, portHeight);
  }

  // UNIVERSE STUFF

  window.addEventListener("resize", onWindowResize, false);

  var animate = function (time) {
    requestAnimationFrame(animate);
    tower.rotation.y += 0.005;
    renderer.render(scene, camera);
  };

  animate();
})();
