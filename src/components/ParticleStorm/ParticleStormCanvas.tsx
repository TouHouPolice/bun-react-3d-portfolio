import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import ParticleStorm from './ParticleStorm';
import { Stats } from '@react-three/drei';
import { WebGPURenderer } from 'three/webgpu';

export default function ParticleStormCanvas() {
    return (
        <Canvas  gl={async (canvas) => 
            {const renderer = new WebGPURenderer({ 
                canvas: canvas,
                antialias: true,
              });
              await renderer.init(); // Wait for the renderer to initialize
              renderer.setPixelRatio(window.devicePixelRatio);
              renderer.setClearColor(new Color(0,0,0), 0);
              return renderer;}
          }>
            <ParticleStorm />
            <Stats />
        </Canvas>
    )
}