(function () {
  var scene = new THREE.Scene();
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  var scan;
  var mesh;
  var scan;
  var points;
  var refPoints;
  var pivot;
  var obj;
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var portWidth = $("#model-viewer").width();
  var portHeight = $("#model-viewer").height();
  renderer.setSize(portWidth, portHeight);
  camera.aspect = portWidth / portHeight;
  camera.updateProjectionMatrix();
  document.getElementById("model-viewer").appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff);

  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xff0000, 2);
  directionalLight.castShadows = true;
  directionalLight.position.z = 0;
  directionalLight.position.y = 0;
  directionalLight.position.x = 20;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xf0ea76, 1, 200);
  pointLight.position.set(0, -5, 5);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x0000ff, 5, 200);
  pointLight2.position.set(-20, 20, 5);
  scene.add(pointLight2);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.dampingFactor = 0.25;
  // controls.screenSpacePanning = true;
  //controls.minDistance = 30;
  //controls.maxDistance = 30;
  //controls.maxPolarAngle = Math.PI / 2;
  //controls.minPolarAngle = Math.PI / 2; // radians
  //controls.minAzimuthAngle = -Math.PI / 2; // radians
  //controls.maxAzimuthAngle = Math.PI / 2; // radians
  //controls.rotateSpeed = 0.7;
  //controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  ///////////////////MODEL/////////////////////////////

  var loader = new THREE.GLTFLoader();
  loader.load(
    url + "model/shmagh.glb",
    function (gltf) {
      var scale = 8;

      mesh = gltf.scene.children[0];
      mesh.geometry;

      let material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });

      scan = new THREE.Points(mesh.geometry, material);
      console.log(scan);

      scan.scale.set(scale, scale, scale);
      scan.rotation.x = -Math.PI / 2;

      //material.castShadows = true;
      scan.material.color.setHSL(0.7, 0.5, 0.4);
      scan.material.blending = THREE.AdditiveBlending;

      //scene.add(scan);
      var box = new THREE.Box3().setFromObject(scan);
      box.center(scan.position); // this re-sets the mesh position
      scan.position.multiplyScalar(-1);

      pivot = new THREE.Group();
      scene.add(pivot);
      pivot.add(scan);
      pivot.rotation.x = Math.PI / 2;
      //pivot.position.y -= 15;
      //pivot.position.x = 25;

      points = scan.geometry.attributes.position;
      refPoints = points.clone();
      scan.geometry.attributes.position.needsUpdate = true;
    }
  );

  camera.position.z = 30;

  function floatPoints(time) {
    time *= 0.001;

    for (i = 0; i < points.count; i++) {
      if (i % 1 == 0) {
        const x = refPoints.getX(i) + 0.001 * Math.sin(time + 1 * 0.5 * i);
        const y = refPoints.getY(i) + 0.001 * Math.sin(time + 1 * 0.25 * i);
        const z = refPoints.getZ(i) + 0.001 * Math.sin(time + 1 * 0.5 * i);
        points.setXYZ(i, x, y, z);
      }
    }

    scan.geometry.attributes.position.needsUpdate = true;
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    var portWidth = $("#model-viewer").width();
    var portHeight = $("#model-viewer").height();
    camera.aspect = portWidth / portHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(portWidth, portHeight);
  }

  // UNIVERSE STUFF

  window.addEventListener("resize", onWindowResize, false);

  var animate = function (time) {
    requestAnimationFrame(animate);
    if(pivot){
      pivot.rotation.z += 0.002;
    }
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
})();
