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
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhysicalMaterial({
	  color: '#153F4C',
	  transparent: true, 
	  opacity: 0.9, 
      roughness: 1,
      flatShading: true
    })
  );
  
  const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhysicalMaterial({
	  color: '#1F5869',
	  transparent: true, 
	  opacity: 0.9, 
      roughness: 1,
      flatShading: true
    })
  );
  
  const mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhysicalMaterial({
	  color: '#75C9BE',
	  transparent: true, 
	  opacity: 0.9, 
      roughness: 1,
      flatShading: true
    })
  );
  
  const mesh4 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhysicalMaterial({
	  color: '#C8E2E2',
	  transparent: true, 
	  opacity: 0.9, 
      roughness: 1,
      flatShading: true
    })
  );

  const mesh5 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhysicalMaterial({
	  color: '#EFF9F0',
	  transparent: true, 
	  opacity: 0.9, 
      roughness: 1,
      flatShading: true
    })
  );
  
  const mesh6 = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 32, 32),
    new THREE.MeshPhysicalMaterial({
	  color: '#005F81',
	  transparent: true, 
	  opacity: 0.9, 
      roughness: .65,
      flatShading: false
    })
  );
  
  scene.add( mesh, mesh2, mesh3, mesh4, mesh5, mesh6 );

  
  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#ffffff'));

  // Add some light
  const light = new THREE.PointLight('#ffffff', 5, 15.5);
  light.position.set(-2, 5, -4).multiplyScalar(1.5);
  
  const light2 = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );

  scene.add(light, light2);

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
      mesh.rotation.x = time * (5 * Math.PI / 180);
	  mesh2.rotation.z = time * (10 * Math.PI / 180);
	  mesh3.rotation.z = time * (5 * Math.PI / 180);
  	  mesh4.rotation.x = time * (10 * Math.PI / 180);
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
