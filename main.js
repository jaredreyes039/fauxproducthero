
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

//TypeIt.JS Landing Text

document.addEventListener("DOMContentLoaded", function () {
    new TypeIt("#landingHead", {lifelike: true,
      strings: ["HYPERDRIVE"], cursor: false
    }).go();
    new TypeIt("#landingPara", {speed: 100, nextStringDelay: 500, lifelike: true,loop: true, loopDelay: 10000,
        strings: ["Built for Futuristic Performance", "August 4, 2023"],
      }).go();
  });


  //Scene, Camera, and Renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement)

//Light- point and ambient
const light = new THREE.AmbientLight('white', 0.5, 0)
const point = new THREE.PointLight('white', 0.3, 10)
scene.add(light, point)
camera.position.z = 1;
point.position.z = 1

//screen size adjust
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//random value array

let values = [];
function randomValue(){
    for(let i=0; i<100; i++){
        let value = Math.random()*50
        values.push(value)
    }
    console.log(values)
}

//updating animationFrame Function w/ callback

const update = function(){
    requestAnimationFrame(update)

}

//establish renderer.render

const render = function(){
    renderer.render(scene, camera)
}

// Physical Box Geometry

const boxframe = new THREE.BoxGeometry(.01, .01, Math.random()*(Math.random()*5), 1);
const boxmesh = new THREE.MeshPhongMaterial({color: 'white', wireframe: false})
const box = new THREE.Mesh(boxframe, boxmesh)

//Box Position Randomizer
for(let i = 0; i<10000; i++){
    generateBox(Math.sin(Math.floor(Math.random() * (10 + 10 + 1)) + -10), Math.sin(Math.floor(Math.random() * (10 + 10 + 1)) + -10) ,Math.floor(Math.random() * (10 + 500 + 1)) + -500);
}
randomValue();

//Box Generating Function

function generateBox(x, y, z){
    const box = new THREE.Mesh(boxframe, boxmesh)
    scene.add(box)
    box.position.x = x*(Math.PI/2);
    box.position.y = y;
    box.position.z = z;
}


//Animation Frame Request

const animation = function(){
    setTimeout(function(){requestAnimationFrame(animation)}, 50)
    
    if(scene.position.z < (camera.position.z*100)){
        scene.position.z += 0.1;
        } else{
            scene.position.z = -0.1
        }
    update();
    
    render();
    

}

//Animation

animation();

