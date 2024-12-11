import { Canvas } from '@react-three/fiber';
import { Color, WebGLRenderer } from 'three';
import ParticleStorm from './ParticleStorm';

export default function ParticleStormCanvas() {
    return (
        <Canvas  gl={(canvas) => 
            {const renderer = new WebGLRenderer({ 
                canvas: canvas,
                antialias: true,
              });
              renderer.setPixelRatio(window.devicePixelRatio);
              renderer.setClearColor(new Color(0,0,0), 0);
              return renderer;}
          }>
            <ParticleStorm />
        </Canvas>
    )
}