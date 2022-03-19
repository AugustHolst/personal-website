import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( new THREE.Color(0x00beef), 1.0 );
document.body.appendChild(renderer.domElement);

//const geometry = new THREE.BoxGeometry(3, 3, 3);
//const material = new THREE.MeshBasicMaterial( { color: 0x00beef } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );


const loader = new GLTFLoader();
loader.load( '../res/kb.glb', function ( gltf ) {
	gltf.scene.scale.set(0.5, 0.5, 0.5);
	gltf.scene.position.set(-3.5, -2, -0.5);
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );


const spotlight = new THREE.SpotLight( 0xffffff );
spotlight.position.set( 0, 75, -10 );
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

spotlight.shadow.camera.near = 500;
spotlight.shadow.camera.far = 4000;
spotlight.shadow.camera.fov = 30;

scene.add(spotlight);

const curve = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3(0, 0, 5),
	new THREE.Vector3(2.5, 6, 5+2),
	new THREE.Vector3(5, 5, 5+1)
)

function animate() {
	requestAnimationFrame( animate );

	var scrollUnit = window.scrollY / (5000 - window.innerHeight);
	camera.position.copy(curve.getPoint(scrollUnit));
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();
