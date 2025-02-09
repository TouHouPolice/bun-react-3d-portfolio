
import { useControls } from 'leva';
import Particles from './Particles';



export default function ParticleSphere(){
    const props = useControls({
        focus: { value: 4.64, min: 0, max: 7, step: 0.01 },
        speed: { value: 17.5, min: 0.1, max: 100, step: 0.1 },
        aperture: { value: 5.0, min: 1, max: 5.6, step: 0.1 },
        fov: { value: 78, min: 0, max: 200 },
        curl: { value: 0.55, min: 0.01, max: 2, step: 0.01 },
        opacity: {value: 1, min: 0, max: 1, step: 0.01},
        expelStrength: { value: 0.54, min: 0, max: 5, step: 0.01 },
    })

    return (
        <>
        <Particles {...props} />
      </>
    )
}