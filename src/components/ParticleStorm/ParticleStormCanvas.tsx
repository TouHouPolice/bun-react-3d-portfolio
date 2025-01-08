import { Canvas, useThree } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import ParticleStorm from './ParticleStorm';

export default function ParticleStormCanvas() {
    return (
        <Canvas>
            <ParticleStorm />
            <Stats />
        </Canvas>
    )
}