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

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 512, 512),
    new THREE.MeshPhysicalMaterial({
	  color: 'red',
      roughness: 0.5,
      flatShading: false
    })
  );
  
   const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 512, 512),
    new THREE.MeshPhysicalMaterial({
	  color: 'green',
      roughness: 0.5,
      flatShading: false
    })
  );
  
  const mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 512, 512),
    new THREE.MeshPhysicalMaterial({
	  color: 'blue',
      roughness: 0.5,
      flatShading: false
    })
  );
  
  const group = new THREE.Group()
  
  group.add( mesh, mesh2, mesh3 );

  scene.add(group)
  
  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#ffffff'));

  // Add some light
  const light = new THREE.PointLight('#ffffff', 5, 20);
  light.position.set(2, 2, -4).multiplyScalar(1.5);
  scene.add(light);

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
      mesh.rotation.y = time * (10 * Math.PI / 180);
	  mesh2.rotation.z = time * (10 * Math.PI / 180);
	  group.rotation.x = time * (10 * Math.PI / 180);
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
