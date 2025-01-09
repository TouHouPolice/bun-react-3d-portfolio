import { 
    Vector3, Color,
    GLSL3,
    WebGLRenderTarget,
    FloatType,
    NearestFilter,
    RawShaderMaterial,
    PlaneGeometry,
    Mesh,

} from 'three';

import { useFBO } from '@react-three/drei';

import { useControls } from 'leva';
import { useEffect, useMemo, useRef, useState} from 'react';

import dummyComputeVert from '@shaders/dummy_compute.vert';
import dummyComputeFrag from '@shaders/dummy_compute.frag';

import { ParticleParams, kDefaultParticleParams } from './ParticleParams';
import { useFrame, useThree } from '@react-three/fiber';
import {GlslRemoveVersionLine} from '@utils/utils';

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
    const { gl, scene, camera } = useThree();
    
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

    const computeShaderRef = useRef<RawShaderMaterial | null>(null);

    const rtA = useFBO(256, 256, {
        type: FloatType,
        minFilter: NearestFilter,
        magFilter: NearestFilter
    });
    
    const rtB = useFBO(256, 256, {
        type: FloatType,
        minFilter: NearestFilter,
        magFilter: NearestFilter,
    });

    const [currentRT, setCurrentRT] = useState(rtA);
    const [nextRT, setNextRT] = useState(rtB);

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

    useFrame(({gl, clock}) => {
        // Update uniforms in the shader material
        if (!computeShaderRef.current) return;

        // console.log(currentRT.texture);
        const dt = clock.getDelta();
        computeShaderRef.current.uniforms.deltaTime.value = dt;
        computeShaderRef.current.uniforms.texturePosition.value = currentRT.texture;

        // Render to ping-pong buffer
        // console.log(nextRT.textures[0]);
        gl.setRenderTarget(nextRT);
        const plane = new Mesh(new PlaneGeometry(2, 2), computeShaderRef.current);
        gl.render(plane, camera);
        gl.setRenderTarget(null);

        // Swap ping-pong buffers
        const tmp = currentRT;
        setCurrentRT(nextRT);
        setNextRT(tmp);

    });

    return <>
        <rawShaderMaterial
            ref={computeShaderRef}
            name="ParticleComputeShader"
            uniforms={{
                texturePosition: { value: null },
                deltaTime: { value: 0 },
                }}
            vertexShader={GlslRemoveVersionLine(dummyComputeVert)}
            fragmentShader={GlslRemoveVersionLine(dummyComputeFrag)}
            transparent={false}
            glslVersion={GLSL3}
        />
        <mesh>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial map={currentRT.texture} />
        </mesh>
    </>
}