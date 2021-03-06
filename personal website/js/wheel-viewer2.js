/*import {
  Lensflare,
  LensflareElement
} from "https://cdn.jsdelivr.net/gh/AzizAlMusa/portfolio-site@master/personal%20website/js/Lensflare.js";
*/
(function () {
  //url = "";
  var scene = new THREE.Scene();
  //scene.background = new THREE.Color(0x000000);
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  
  //camera.lookAt(0, 0, 0);
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  //renderer.gammaOutput = true;
  //renderer.gammaFactor = 2.2;
  var portWidth = $("#wheel-viewer").width();
  var portHeight = $("#wheel-viewer").height();
  renderer.setSize(portWidth, portHeight);
  camera.aspect = portWidth / portHeight;
  camera.updateProjectionMatrix();
  document.getElementById("wheel-viewer").appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 0.05);

  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.castShadows = true;
  directionalLight.position.z = 0;
  directionalLight.position.y = 0;
  directionalLight.position.x = -10;
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xff0000, 2);
  directionalLight2.castShadows = true;
  directionalLight2.position.z = 0;
  directionalLight2.position.y = 0;
  directionalLight2.position.x = -24;
  scene.add(directionalLight2);

  const PointLight = new THREE.PointLight(0xff0000, 0.1);
  PointLight.castShadows = true;
  PointLight.position.z = 6;
  PointLight.position.y = 0;
  PointLight.position.x = 8;
  scene.add(PointLight);

  const PointLight2 = new THREE.PointLight(0xfd5800, 0.2);
  PointLight2.castShadows = true;
  PointLight2.position.z = 10;
  PointLight2.position.y = 1;
  PointLight2.position.x = 10;
  scene.add(PointLight2);

  const PointLight3 = new THREE.DirectionalLight(0xffffff, 1);
  PointLight3.castShadows = true;
  PointLight3.position.z = -30;
  PointLight3.position.y = 0;
  PointLight3.position.x = 0;
  scene.add(PointLight3);

  /*
const Hemilight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(Hemilight);
*/
  /*
const PointLight2 = new THREE.PointLight(0x00ff00, 2);
PointLight2.castShadows = true;
PointLight2.position.z = 10;
PointLight2.position.y = 0;
PointLight2.position.x = 0;
scene.add(PointLight2);
*/

  //const controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.dampingFactor = 0.1;
  //controls.enableDamping = true;
  //controls.autoRotateSpeed = 2.0;

  var renderTarget = new THREE.WebGLRenderTarget(512, 512, {
    format: THREE.RGBFormat
  });

  const textureLoader = new THREE.TextureLoader();

  const textureFlare0 = textureLoader.load(url + "texture/lensflare0.png");
  const textureFlare3 = textureLoader.load(url + "texture/lensflare3.png");

  //addLight(0.15, 0.1, 0.8, 3, 200, -500);
  function addLight(h, s, l, x, y, z) {
    const light = new THREE.PointLight(0xffffff, 2, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(textureFlare0, 2500, 0, light.color)
    );
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
    light.add(lensflare);
  }
  var wheel;
  var loader = new THREE.GLTFLoader();
  loader.load(url + "model/wheel.gltf", function (gltf) {
    var scale = 75;

    wheel = gltf.scene.children[0].children[0];

    const loader = new THREE.CubeTextureLoader();

    loader.setPath(url + "texture/");

    const textureCube = loader.load([
      "posx.jpg",
      "negx.jpg",
      "posy.jpg",
      "negy.jpg",
      "posz.jpg",
      "negz.jpg"
    ]);
    textureCube.encoding = THREE.sRGBEncoding;
    //scene.background = textureCube;


    wheel.traverse(mesh => {
      if (!mesh.isMesh) return;

      if (mesh.name == "blue_high_gloss_plastic") {
     
        // mesh.material.map = loader.load("model/wheel_Texture_0001.png");

        mesh.material.color.setHex(0x2c2cd1);
        //mesh.material.color.setHex(0x0000ff);

        //mesh.material.specularMap = renderTarget.texture;
      }

      if (mesh.name == "mesh_1" || mesh.name == "mesh_2") {

        // mesh.material.map = loader.load("model/wheel_Texture_0001.png");
        //mesh.material.roughness = 0.1;
        //mesh.material.color.setHex(0xff00000);
        mesh.material.emissive.setHex(0x130000);
        mesh.material.emissiveIntensity = 0.4;
        mesh.material.envMap = textureCube;
        //mesh.material.map = texture;
        //mesh.material.needsUpdate = true;
        // mesh.material.specularMap = camera.renderTarget;
        //mesh.material.reflectivity = 1.0;
        // mesh.material.combine = THREE.AddOperation;
      }
    });

    wheel.scale.set(scale, scale, scale);
    wheel.position.x = 6;
    wheel.rotation.y = THREE.MathUtils.degToRad(10);
    wheel.rotation.x = THREE.MathUtils.degToRad(15);
    wheel.position.z = 20;
    scene.add(wheel);

    //let material = new THREE.MeshBasicMateri({ color: 0xffffff, size: 0.02 });
  });

  camera.position.z = 14;
  camera.position.x = 0;
  camera.position.y = 0;
  //scene.add(particle);
  //var wheelInView = false;
  /*
  $(window).scroll(function () {
    if ($.scrollify.current().attr("id") == "hook-section") {
      wheelInView = true;
    }
  });
 */
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    var portWidth = $("#wheel-viewer").width();
    var portHeight = $("#wheel-viewer").height();
    camera.aspect = portWidth / portHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(portWidth, portHeight);
  }
  window.addEventListener("resize", onWindowResize, false);
  var animationDone = false;

  //wheel.rotation.y = THREE.MathUtils.degToRad(20);

  const SCREEN_CUTOFF = 991;
  // if (window.innerWidth > SCREEN_CUTOFF) {
  var position = { x: 6, z: 20, th: THREE.MathUtils.degToRad(10) };
  var target = { x: 6, z: -10, th: THREE.MathUtils.degToRad(10) };
  // } else if (window.innerWidth <= SCREEN_CUTOFF) {
  var positionPhone = { x: 6, z: 20, th: THREE.MathUtils.degToRad(20) };
  var targetPhone = { x: -1, z: -15, th: THREE.MathUtils.degToRad(20) };
  // }
  var wheelGroup = new TWEEN.Group();
  var tween = new TWEEN.Tween(position, wheelGroup).to(target, 6000);
  var tweenPhone = new TWEEN.Tween(positionPhone, wheelGroup).to(
    targetPhone,
    6000
  );

  tween.onUpdate(function () {
    if (window.innerWidth > SCREEN_CUTOFF) {
      wheel.position.x = position.x;
      wheel.position.z = position.z;
      wheel.rotation.y = position.th;
    }
  });

  tweenPhone.onUpdate(function () {
    if (window.innerWidth <= SCREEN_CUTOFF) {
      wheel.position.x = positionPhone.x;
      wheel.position.z = positionPhone.z;
      wheel.rotation.y = positionPhone.th;
    }
  });

  tween.easing(TWEEN.Easing.Cubic.Out);
  tweenPhone.easing(TWEEN.Easing.Cubic.Out);

  tween.onComplete(function () {
    animationDone = true;
  });

  tweenPhone.onComplete(function () {
    animationDone = true;
  });

  $(window).scroll(function () {
    console.log($.scrollify.current());
    if ($.scrollify.current().attr("id") == "wheel-viewer") {
      tween.start();
      tweenPhone.start();
    }
  });

  var animate = function (time) {
    requestAnimationFrame(animate);
    //controls.update();
    renderer.render(scene, camera);
    //particle.rotation.x += 0.002;
    //wheel.rotation.x += 0.002;
    //wheel.rotation.y += 0.002;
    //wheel.rotation. += 0.004;
    if (wheel) {
      wheel.rotation.z += 0.0015;
      wheel.position.y = 3 + 0.1 * Math.sin(0.002 * time);
      //smoothIntro();
      wheelGroup.update();

      if (animationDone) {
        if (window.innerWidth <= SCREEN_CUTOFF) {
          wheel.position.x = targetPhone.x;
          wheel.position.z = targetPhone.z;
          wheel.rotation.y = targetPhone.th;
        } else if (window.innerWidth > SCREEN_CUTOFF) {
          wheel.position.x = target.x;
          wheel.position.z = target.z;
          wheel.rotation.y = target.th;
        }
      }
    }
  };

  animate();
})();
