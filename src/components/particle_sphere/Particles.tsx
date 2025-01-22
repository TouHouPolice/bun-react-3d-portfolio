import * as THREE from 'three'
import { useMemo, useState, useRef, useContext } from 'react'
import { createPortal, extend, useFrame } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import DofPointsMaterial from './DofPointsMaterial'
import SimulationMaterial from './SimulationMaterial'
// import './DofPointsMaterial'
// import './SimulationMaterial'
import { GlobalStateContext } from '@context/GlobalStateProvider'
import { UnprojectPointer } from '@utils/utils'

extend({ DofPointsMaterial, SimulationMaterial })

interface ParticlesProps {
    speed: number;
    fov: number;
    aperture: number;
    focus: number;
    curl: number;
    size?: number;
    opacity?: number;
    expelStrength: number;
}

export default function Particles({ speed, fov, aperture, focus, curl, size = 512, opacity = 1.0, expelStrength, ...props }: ParticlesProps) {
    const { pointerCanvasPos } = useContext(GlobalStateContext);
    // Get the main cam
    //const { camera } = useThree()
    const simRef = useRef<SimulationMaterial>(null!)
    const renderRef = useRef<DofPointsMaterial>(null!)
    // Set up FBO
    const [scene] = useState(() => new THREE.Scene())
    const [orthCamera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))
    const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]))
    const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]))
    const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType
    })
    const gravityPos = useMemo(() => UnprojectPointer(pointerCanvasPos, orthCamera), [pointerCanvasPos])

    //Normalize points
    const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
        let i3 = i * 3
        particles[i3 + 0] = (i % size) / size
        particles[i3 + 1] = i / size / size
    }
    return particles
    }, [size])

    const simulateParticles = (gl: THREE.WebGLRenderer) => {
        gl.setRenderTarget(target)
        gl.clear()
        gl.render(scene, orthCamera)
        gl.setRenderTarget(null)
    }

    // Update FBO and pointcloud every frame
    useFrame((state) => {
        simulateParticles(state.gl)

        renderRef.current.uniforms.positions.value = target.texture
        renderRef.current.uniforms.uTime.value = state.clock.elapsedTime
        renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFocus.value, focus, 0.1)
        renderRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFov.value, fov, 0.1)
        renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1)
        renderRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uOpacity.value, opacity, 0.1)
        simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed
        simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1)
        simRef.current.uniforms.uAntiGravityStrength.value = THREE.MathUtils.lerp(simRef.current.uniforms.uAntiGravityStrength.value, expelStrength, 0.1)
        simRef.current.uniforms.uAntiGravityPos.value = simRef.current.uniforms.uAntiGravityPos.value.lerp(gravityPos, 0.1)
    })

    return (
    <>
        {/* Simulation goes into a FBO/Off-buffer */}
        {createPortal(
        <mesh>
            <simulationMaterial ref={simRef} />
            <bufferGeometry>
                <bufferAttribute 
                attach="attributes-position" 
                count={positions.length / 3} 
                array={positions} 
                itemSize={3} />
                
                <bufferAttribute 
                attach="attributes-uv" 
                count={uvs.length / 2} 
                array={uvs} 
                itemSize={2}/>
            </bufferGeometry>
        </mesh>,
        scene
        )}
        {/* The result of which is forwarded into a pointcloud via data-texture */}
        <points {...props}>
        <dofPointsMaterial ref={renderRef} />
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        </points>
    </>
    )
}
