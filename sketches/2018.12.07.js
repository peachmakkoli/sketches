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
  const camera = new THREE.PerspectiveCamera(10, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhysicalMaterial({
	  color: '#0099cc',
      roughness: 1,
      flatShading: false
    })
  );
  
  const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhysicalMaterial({
	  color: '#003399',
      roughness: 1,
      flatShading: false
    })
  );
  
  const mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhysicalMaterial({
	  color: '#0066cc',
      roughness: 1,
      flatShading: false
    })
  );
  
  const mesh4 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhysicalMaterial({
	  color: '#0099cc',
      roughness: 1,
      flatShading: false
    })
  );

  const mesh5 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhysicalMaterial({
	  color: '#ccffff',
      roughness: 1,
      flatShading: false
    })
  );
  
  scene.add( mesh, mesh2, mesh3, mesh5 );

  
  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#ffffff'));

  // Add some light
  const light = new THREE.PointLight('#ffffff', 5, 15.5);
  light.position.set(2, 2, -4).multiplyScalar(1.5);
  
  const light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );

  scene.add(light2);

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
      mesh.rotation.z = time * (5 * Math.PI / 180);
	  mesh2.rotation.z = time * (5 * Math.PI / 180);
	  mesh3.rotation.z = time * (5 * Math.PI / 180);
  	  mesh4.rotation.z = time * (5 * Math.PI / 180);
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
