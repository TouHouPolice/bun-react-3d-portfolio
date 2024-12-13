import { Canvas } from '@react-three/fiber';
//import { Color } from 'three';
import ParticleStorm from './ParticleStorm';
import { Stats } from '@react-three/drei';
//import { WebGPURenderer } from 'three/webgpu';
import WebGPUInitializer from '../WebGPUInitializer';

export default function ParticleStormCanvas() {
    return (
        <Canvas>
            <WebGPUInitializer />
            <ParticleStorm />
            <Stats />
        </Canvas>
    )
}