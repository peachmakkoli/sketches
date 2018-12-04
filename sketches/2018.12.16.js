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
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(1, 0),
    new THREE.MeshPhysicalMaterial({
      color: 'yellow',
      roughness: 0.75,
      flatShading: true
    })
  );
  
  const mesh2 = new THREE.Mesh(
    new THREE.OctahedronGeometry(1, 0),
    new THREE.MeshPhysicalMaterial({
      color: 'yellow',
      roughness: 0.75,
      flatShading: true
    })
  );
  
  const mesh3 = new THREE.Mesh(
    new THREE.OctahedronGeometry(1, 0),
    new THREE.MeshPhysicalMaterial({
      color: 'yellow',
      roughness: 0.75,
      flatShading: true
    })
  );
  
  const mesh4 = new THREE.Mesh(
    new THREE.OctahedronGeometry(1, 0),
    new THREE.MeshPhysicalMaterial({
      color: 'yellow',
      roughness: 0.75,
      flatShading: true
    })
  );
  
  scene.add(mesh, mesh2, mesh3, mesh4);

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('hsl(0, 0%, 100%)'));

  // Add some light
  const light = new THREE.PointLight('hsl(60, 100%, 90%)', 1, 15.5);
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
	  
 	  mesh2.rotation.y = Math.PI / 4;	
	  mesh3.rotation.z = Math.PI / 4;
	  mesh4.rotation.x = Math.PI / 4;
	  
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
