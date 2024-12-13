import { 
    Vector3, Color, 
    AdditiveBlending, 
    InstancedBufferAttribute,
    SpriteMaterial
} from 'three';

import {SpriteNodeMaterial} from 'three/webgpu';

import { float, If, PI, color, cos, 
    instanceIndex, Loop, mix, mod, sin, 
    Fn, uint, uniform, uniformArray, 
    hash, vec3, vec4, instancedBufferAttribute
} from 'three/tsl'


import { useControls } from 'leva';
import { useEffect, useMemo, useState } from 'react';
export interface ParticleParams {
    count: number;
    timeScale: number;
    spinningStrength: number;
    maxSpeed: number;
    gravityConstant: number;
    velocityDamping: number;
    scale: number;
    boundHalfExtent: number;
    colorA: Color;
    colorB: Color;
}

export const kDefaultParticleParams: ParticleParams = {
    count: Math.pow( 2, 18 ),
    timeScale: 1,
    spinningStrength: 2.75,
    maxSpeed: 8,
    gravityConstant: 6.67e-11,
    velocityDamping: 0.1,
    scale: 0.008,
    boundHalfExtent: 8,
    colorA: new Color('#5900ff'),
    colorB: new Color('#ffa575'),
};

interface ParticlesProps {
    attractorPositions?: Vector3[];
    attractorRotationAxes?: Vector3[];
    attractorMasses?: number[];
    particleParams?: ParticleParams;
    setParticleParams?: (particleParams: ParticleParams) => void;
}

export default function Particles({
    attractorPositions = [new Vector3(-1, 0, 0)],
    attractorRotationAxes = [new Vector3(0, 1, 0)],
    attractorMasses = [Number(`1e${7}`)],
    particleParams = kDefaultParticleParams,
    setParticleParams = () => {},
}: ParticlesProps){

    const { 
        mCount, 
        mTimeScale, 
        mSpinningStrength, 
        mMaxSpeed, 
        mGravityConstant, 
        mVelocityDamping, 
        mScale, 
        mBoundHalfExtent,
        mColorA,
        mColorB,
        } = useControls('Particles Params', {
        mCount: { value: particleParams.count, min: 1, max: Math.pow( 2, 20 ), step: 100 },
        mTimeScale: { value: particleParams.timeScale, min: 0, max: 5, step: 0.01 },
        mSpinningStrength: { value: particleParams.spinningStrength, min: 0, max: 5, step: 0.01 },
        mMaxSpeed: { value: particleParams.maxSpeed, min: 0, max: 20, step: 0.01 },
        mGravityConstant: { value: particleParams.gravityConstant, min: 0, max: 10, step: 0.01 },
        mVelocityDamping: { value: particleParams.velocityDamping, min: 0, max: 1, step: 0.01 },
        mScale: { value: particleParams.scale, min: 0, max: 0.1, step: 0.001 },
        mBoundHalfExtent: { value: particleParams.boundHalfExtent, min: 0, max: 20, step: 0.01 },
        mColorA: { value: `#${particleParams.colorA.getHexString()}` },
        mColorB: { value: `#${particleParams.colorB.getHexString()}` },
    });

    useEffect(() => {
        setParticleParams({
            count: mCount,
            timeScale: mTimeScale,
            spinningStrength: mSpinningStrength,
            maxSpeed: mMaxSpeed,
            gravityConstant: mGravityConstant,
            velocityDamping: mVelocityDamping,
            scale: mScale,
            boundHalfExtent: mBoundHalfExtent,
            colorA: new Color(mColorA),
            colorB: new Color(mColorB),
        });
    }, [mCount, mTimeScale, mSpinningStrength, mMaxSpeed, mGravityConstant, mVelocityDamping, mScale, mBoundHalfExtent, mColorA, mColorB]);


    const [material] = useState(new SpriteNodeMaterial({
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        }));
    
    const {positionBuffer, velocityBuffer} = useMemo(() => {
        const totalElementCount = new Float32Array(mCount * 3);
        //Each item uses 3 elements in the array
        return {
            positionBuffer: new InstancedBufferAttribute(totalElementCount, 3),
            velocityBuffer: new InstancedBufferAttribute(totalElementCount, 3),
        };
    }, [mCount]);


    return <>
        
    </>
}