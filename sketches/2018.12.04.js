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

  // load a texture, set wrap mode to repeat
  const texture = new THREE.TextureLoader().load( "../sketches/textures/sky/star.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set ( 4, 4 );
  const texture2 = new THREE.TextureLoader().load( "../sketches/textures/sky/night.png" );

  
  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 550);
  camera.position.set(0, 0, 500);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();
  
  const mesh = new THREE.Mesh(
    new THREE.RingGeometry(1, 10, 64),
    new THREE.MeshPhysicalMaterial({
      map: texture, 
	  transparent: true, 
	  opacity: 0.9, 
	  color: 'white',
	  side: THREE.DoubleSide,
      roughness: 0.75,
      flatShading: true
    })
  );
  
  const mesh2 = new THREE.Mesh(
    new THREE.RingGeometry(50, 20, 64),
    new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true, 
	  opacity: 0.9, 
	  color: 'white',
	  side: THREE.DoubleSide,
      roughness: 0.75,
      flatShading: true
    })
  ); 
  
  const mesh3 = new THREE.Mesh(
    new THREE.RingGeometry(200, 100, 64),
    new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true, 
	  opacity: 0.9, 
	  color: 'white',
	  side: THREE.DoubleSide,
      roughness: 0.75,
      flatShading: true
    })
  ); 

  const mesh4 = new THREE.Mesh(
    new THREE.RingGeometry(500, 300, 64),
    new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true, 
	  opacity: 0.9, 
	  color: 'white',
	  side: THREE.DoubleSide,
      roughness: 0.75,
      flatShading: true
    })
  ); 
  
  const mesh5 = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 500, 32),
    new THREE.MeshPhysicalMaterial({
      map: texture2,
	  side: THREE.DoubleSide,
      roughness: 0.75,
      flatShading: true
    })
  ); 
  
  scene.add( mesh, mesh2, mesh3, mesh4, mesh5 );
  mesh5.position.set (0, 0, -50);
  
  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#ffffff'));

  // Add some light
  const light = new THREE.PointLight('#45caf7', 1, 15.5);
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
      mesh.rotation.z = time * (20 * Math.PI / 180);
      mesh2.rotation.z = time * (10 * Math.PI / 180);
      mesh3.rotation.z = time * (5 * Math.PI / 180);	  
      mesh4.rotation.z = time * (1 * Math.PI / 180);		  
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
