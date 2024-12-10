import './App.css'
import { Canvas} from '@react-three/fiber'
import ParticleStorm from './components/ParticleStorm'
import { Leva } from 'leva'

//https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_compute_attractors_particles.html
function App() {
  return (
    <>
      <Canvas>
        <ParticleStorm />
      </Canvas>
      <Leva />
    </>
  )
}

export default App
