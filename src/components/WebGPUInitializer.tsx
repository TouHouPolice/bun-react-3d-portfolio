import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Color } from 'three';
import { WebGPURenderer } from 'three/webgpu';

function WebGPUInitializer() {
    const { gl, size, set } = useThree();

    useEffect(() => {
        const initRenderer = async () => {
            const renderer = new WebGPURenderer({ 
                canvas: gl.domElement,
                antialias: true 
            });
            await renderer.init();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(new Color(0, 0, 0), 0);

            set({ gl: renderer });

            return () => {
                renderer.dispose();
            };
        };

        initRenderer();

        return () => {
            initRenderer().then(dispose => dispose && dispose());
        };
    }, [size, set]);

    return null;
}

export default WebGPUInitializer;