import React from 'react';
import { float, If, PI, color, cos, instanceIndex, Loop, mix, mod, sin, Fn, uint, uniform, uniformArray, hash, vec3, vec4 } from 'three/tsl'
import {OrbitControls, TransformControls} from '@react-three/drei'
import {useControls } from 'leva';

export default function ParticleStorm() {
    const { color, scale } = useControls({
        color: { value: 'hotpink' },
        scale: { value: 1, min: 0.5, max: 2 },
      });

    //console.log(clr, scale); // Use clr and scale to avoid unused variable error

    return (
    <>

    </>
    );
}