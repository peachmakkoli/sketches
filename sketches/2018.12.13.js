const canvasSketch = require('canvas-sketch');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // load a texture
  const texture = new THREE.TextureLoader().load( "../sketches/textures/blackhole/space.jpg" );
  
  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(0, 0, 20);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshPhysicalMaterial({
      map: texture,
	  color: 'white',
      roughness: 1,
      flatShading: false
    })
  );
  
  const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(.70, 64, 64),
    new THREE.MeshPhysicalMaterial({
	  color: 'black',
      roughness: .75,
      flatShading: false
    })
  );
  mesh2.position.set(0, 0, 5)

  const mesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 60, 32),
    new THREE.MeshPhysicalMaterial({
	  map: texture,
	  color: 'white',
      roughness: 0.75,
      flatShading: false
    })
  );
  mesh3.position.set(0, 0, -50)
  
  const mesh4 = new THREE.Mesh(
    new THREE.SphereGeometry(3.75, 32, 32),
    new THREE.MeshPhysicalMaterial({
      map: texture,
	  color: 'white',
      roughness: 1,
      flatShading: false
    })
  );
  mesh4.position.set(0, 0, -10)

  scene.add( mesh, mesh2, mesh3, mesh4 );

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#ffffff'));

  // Add some light
  const light = new THREE.PointLight('#45caf7', 5, 30);
  light.position.set(2, 2, -4).multiplyScalar(1.5);
  
  const light2 = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
 
  const light3 = new THREE.PointLight('#45caf7', 5, 30);
  light3.position.set(-2, -2, -4).multiplyScalar(1.5);
  
  const group = new THREE.Group()
  group.add( light, light3 )
  
  scene.add( group, light2 );

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render ({ time }) {
      mesh.rotation.z = time * (20 * Math.PI / 180);
	  mesh4.rotation.z = time * (10 * Math.PI / 180);
	  group.rotation.z = time * (25 * Math.PI / 180);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
