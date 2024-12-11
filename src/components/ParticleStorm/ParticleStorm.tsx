import { float, If, PI, color, cos, instanceIndex, Loop, mix, mod, sin, Fn, uint, uniform, uniformArray, hash, vec3, vec4 } from 'three/tsl'
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef, useState, useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalStateProvider';
import Attractor from './Attractor';


//https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_compute_attractors_particles.html
export default function ParticleStorm() {
    const camRef = useRef<PerspectiveCamera | null>(null);
    const {size} = useThree();
    const {allowOrbitControl} = useContext(GlobalStateContext);
    

    const { controlMode } = useControls({
        controlMode: { value: 'rotate', options: ['translate', 'rotate'] },
      });

    const [attractorsPositions] = useState([
        new Vector3(-1, 0, 0),
        new Vector3(1, 0, -0.5),
        new Vector3(0, 0.5, 1),
    ]);

    // Define attractor rotation axes
    const [attractorsRotationAxes] = useState([
        new Vector3(0, 1, 0),
        new Vector3(0, 1, 0),
        new Vector3(1, 0, -0.5).normalize(),
    ]);
  
    return (
    <>
        <PerspectiveCamera
        ref={camRef}
        makeDefault
        position={[3,8,5]}
        fov={25}
        near={0.1}
        far={100}
        aspect={size.width / size.height}
        ></PerspectiveCamera>

        <OrbitControls 
        camera={camRef.current}
        enabled={allowOrbitControl}
        enableDamping
        minDistance={0.1}
        maxDistance={50}
        />

        <ambientLight 
        position={[4,2,0]}
        intensity={1.5} 
        color={"#ffffff"}>
        </ambientLight>
        
        <Attractor
        position={attractorsPositions[0]}
        rotationAxis={attractorsRotationAxes[0]}
        enableTransformControls={true}
        controlMode={controlMode as 'translate' | 'rotate'}
        />
        
    </>
    );
}