import { useEffect, useRef } from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import LoadModel from '../functions/LoadModel'
import PickPosition from '../functions/PickPosition'
import { setVisible } from './game';
import Button from '@mui/material/Button';

const Planets = () => {
    const space = [{ name: 'space', path: '/model3D/space.glb', position: [-500, -150, 50], scale: 1000 }]
    const gigantesGaseosos = [
        { name: '51_pegasi_b', path: '/model3D/JupiterCaliente/51_pegasi_b.glb', position: [-215, 102, -608], scale: 8 },
        { name: '55_Cancri_e', path: '/model3D/JupiterCaliente/55_Cancri_e.glb', position: [-455, 216, -677], scale: 0.05 },
        { name: 'corot_7b', path: '/model3D/JupiterCaliente/corot_7b_fiery.glb', position: [136, -131, -159], scale: 0.005 },
        { name: 'Kepler-7b', path: '/model3D/JupiterCaliente/Kepler-7b.glb', position: [2, 111, -66], scale: 5 },
        { name: 'WASP-12b', path: '/model3D/JupiterCaliente/WASP-12b.glb', position: [-95, -175, -599], scale: 0.03 },
    ];
    
    const neptunosCalientes = [
        { name: 'gliese_581_e', path: '/model3D/NeptunosCalientes/gliese_581_e.glb', position: [-150, -15, -367], scale: 0.01 },
        { name: 'gliese_876_e', path: '/model3D/NeptunosCalientes/gliese_876_e.glb', position: [-135, -240, -67], scale: 0.01 },
    ];
    
    const superTierras = [
        { name: 'gliese_581_d', path: '/model3D/SuperTierras/gliese_581_d.glb', position: [-184, 246, -364], scale: 0.01 },
        { name: 'kepler_22b', path: '/model3D/SuperTierras/kepler_22b.glb', position: [-141, 25, -742], scale: 1 },
        { name: 'kepler_452b', path: '/model3D/SuperTierras/kepler_452b.glb', position: [-28, 54, -414], scale: 5 },
        { name: 'lp_791-18d', path: '/model3D/SuperTierras/lp_791-18d.glb', position: [162, -17, -62], scale: 10 },
        //{ name: 'kepler-186f', path: '/model3D/SuperTierras/kepler-186f.glb', position: [-200, 47, -675], scale: 5 },
    ];
    

    const canvasRef = useRef(null);
    const planets = {};

    useEffect(() => {
        const loader = new GLTFLoader();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 5000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const picker = new PickPosition(renderer.domElement);

        camera.position.set(450, 142, 174);
        camera.lookAt(new THREE.Vector3(0, 0, 0)); // La cámara apunta al origen (0, 0, 0)

        const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Luz ambiental con mayor intensidad
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1); // Luz puntual cerca del satélite
        pointLight.position.set(0, 5, 10);
        scene.add(pointLight);


        LoadModel(loader, space, scene, planets);
        LoadModel(loader, gigantesGaseosos, scene, planets);
        LoadModel(loader, neptunosCalientes, scene, planets);
        LoadModel(loader, superTierras, scene, planets);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = true;
        controls.enableZoom = true;

        const animate = () => {
            if (planets['space']) {
                planets['space'].rotation.y += 0.0005; // Rota el objeto 'space'
            }

            //picker.pick(scene, camera);

            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
        };
    },
);

  return (
    <div className="home-container">
        <Button 
            color="secondary" 
            variant="outlined" 
            size="medium" 
            onClick={setVisible}
            style={{ position: 'absolute', top: '50px', left: '50px', zIndex: 2 }}
        >
            Volver
        </Button> 
        <canvas ref={canvasRef}></canvas> 
    </div>
  );
};

export default Planets;
