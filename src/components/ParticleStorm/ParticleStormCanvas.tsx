import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import ParticleStorm from './ParticleStorm';
import ThreeCanvas from '@components/ThreeCanvas';

export default function ParticleStormCanvas() {
    return (
        <ThreeCanvas>
            <ParticleStorm />
            <Stats />
        </ThreeCanvas>
    )
}