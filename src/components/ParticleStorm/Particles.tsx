import { 
    Vector3, Color, 
} from 'three';

import { useControls } from 'leva';
import { useEffect} from 'react';

import dummyComputeVert from '@shaders/dummy_compute.vert?raw';
import dummyComputeFrag from '@shaders/dummy_compute.frag?raw';

import { ParticleParams, kDefaultParticleParams } from './ParticleParams';

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
        console.log(dummyComputeVert);
    }, [mCount, mTimeScale, mSpinningStrength, mMaxSpeed, mGravityConstant, mVelocityDamping, mScale, mBoundHalfExtent, mColorA, mColorB]);


    return <>
        
    </>
}