import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

import {PointerLockControls} from './pointerlockcotrols.js';
//import {FirstPersonControls} from './firstpersoncontrols.js';

let camera, scene, renderer, controls;
let wf = true;
let Pspeed = 10;
var cube,cube2,meshFloor;
var keyboard = {};
var direction = new THREE.Vector3();

// POINTER LOCK
/*controls.movementSpeed = 150;
controls.lookSpeed = 0.1;*/

init();
animate();

function init() {
    // CAMERA
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // SCENE
    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x8B0000 );

    // CUBE
    cube = new THREE.Mesh(
        new THREE.BoxGeometry(2,1,2),
        new THREE.MeshBasicMaterial({color:0x00ff00,wireframe:wf})
    );
    cube.position.y = -1.5;
    scene.add(cube);

    // CUBE2
    cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({color:0xffffff,wireframe:wf})
    );
    cube2.position.x = 3.5;
    cube2.position.y = -1.5;
    cube2.position.z = 0.5;
    scene.add(cube2);
    // FLOOR
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100,100,100),
        new THREE.MeshBasicMaterial({color:0xff0000,wireframe:wf})
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.position.y = -2;
    scene.add(meshFloor);

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // POINTER LOCK
    controls = new PointerLockControls(camera , renderer.domElement);

    window.addEventListener( 'resize', onWindowResize );

    animate();
};

document.body.addEventListener( 'mousemove', ( event ) => {

    if ( document.pointerLockElement === document.body ) {

        camera.rotation.y -= event.movementX / 500;
        camera.rotation.x -= event.movementY / 500;

    }

} );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );
    camera.getWorldDirection( direction );
    renderer.render(scene,camera);
}

document.addEventListener( 'keydown', ( event ) => {

    keyboard[event.code] = true;

    switch (event.code) {
        case "KeyE":
            controls.lock();
        break;

        case "KeyW":
            camera.position.x += direction.x/Pspeed
            camera.position.z += direction.z/Pspeed
        break;

        case "KeyS":
            camera.position.x -= direction.x/Pspeed
            camera.position.z -= direction.z/Pspeed
        break;
    }

} );