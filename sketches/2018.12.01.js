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
  camera.position.set(0, 20, 10);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(10, 3, 100, 16),
    new THREE.MeshPhysicalMaterial({
      color: 'white',
      roughness: .75,
      flatShading: true
    })
  );
  scene.add(mesh);

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#00e6e6'));

  // Add some light
  const light = new THREE.PointLight('#45caf7', 1, 15.5);
  light.position.set(2, 2, -4).multiplyScalar(1.5);

  const light2 = new THREE.HemisphereLight( 0xff00ff, 0x00ffff, 1);
 
  scene.add( light, light2 );
  
  // const textureLoader = new THREE.TextureLoader();

  // const textureFlare0 = textureLoader.load( "textures/lensflare/lensflare0.png" );
  // const textureFlare1 = textureLoader.load( "textures/lensflare/lensflare2.png" );
  // const textureFlare2 = textureLoader.load( "textures/lensflare/lensflare3.png" );
  
  // const lensflare = new THREE.Lensflare();

  // lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) );
  // lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
  // lensflare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );

  // light.add( lensflare );
  
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
      mesh.rotation.x = time * (3 * Math.PI / 180);
	  mesh.rotation.y = time * (3 * Math.PI / 180);
  	  mesh.rotation.z = time * (3 * Math.PI / 180);
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
