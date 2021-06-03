(function () {
  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  
  var tower;
  var logo;
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

  const light = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0x8470ff, 2); //0x7142FF
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
    tower = gltf.scene.children[0].children[0].children[0];
    var scale = 4;
    tower.scale.set(scale, scale, scale);
    tower.position.y -= 150;
    tower.position.z -= 100;
    tower.position.x = 100;
    tower.getObjectByName('color-6').material.color.setHex(0xC7A878);
    //tower.getObjectByName('color-7').material.color.setHex(0x00ff00);
    //tower.children[4].material.color.setHex(0x00ff00); //fffdd1 #F9E7CE 0xffcccb
    //tower.children[13].material.color.setHex(0xC7A878); //fffdd1 #F9E7CE 0xffcccb #C7A878
    console.log(tower);
    scene.add(tower);
  });

  loader.load("model/kfupm/kfupm_logo.gltf", function (gltf) {
    console.log(gltf);
    logo = gltf.scene.children[0].children[0].children[0];
    var scale = 80;
    logo.scale.set(scale, scale, scale);
    logo.position.y -= 60;
    logo.position.z -= 100;
    logo.position.x = -120;
    //tower.getObjectByName('color-6').material.color.setHex(0xC7A878);
    //tower.getObjectByName('color-7').material.color.setHex(0x00ff00);
    //tower.children[4].material.color.setHex(0x00ff00); //fffdd1 #F9E7CE 0xffcccb
    //tower.children[13].material.color.setHex(0xC7A878); //fffdd1 #F9E7CE 0xffcccb #C7A878
    console.log(logo);
    scene.add(logo);
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
    
    if(tower)  tower.rotation.y += 0.005;
    if(logo)  logo.rotation.y += 0.005;
    renderer.render(scene, camera);
  };

  animate();
})();
