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
renderer.setClearColor('#fff', 1);

// Setup a camera
const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
camera.position.set(28, 0, 0);
camera.lookAt(new THREE.Vector3(0, 0, 1));

// Setup camera controller
const controls = new THREE.OrbitControls(camera);

// Setup your scene
const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
new THREE.SphereGeometry(20, 20, 1024),
new THREE.MeshPhysicalMaterial({
color: 'white',
roughness: 0,
flatShading: false
})
);

const group = new THREE.Group()
group.add( camera )

scene.add( mesh, group );

// Specify an ambient/unlit colour
scene.add(new THREE.AmbientLight('#00bfff'));

// Add some light
const light = new THREE.HemisphereLight( 0x000000, 0xffffff, 1);

const width = 10;
const height = 10;
const intensity = 1;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity, width, height );
rectLight.position.set( 5, 5, 0 );
rectLight.lookAt( 0, 0, 0 );

rectLightHelper = new THREE.RectAreaLightHelper( rectLight );

scene.add( light );

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
group.rotation.z = time * (10 * Math.PI / 180);
// controls.update();
renderer.render(scene, camera);
},

// Dispose of events & renderer for cleaner hot-reloading
unload () {
  // controls.dispose();
  renderer.dispose();
}
};
};

canvasSketch(sketch, settings);