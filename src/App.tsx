import './styles/main.scss'
import { GlobalStateProvider } from "@context/GlobalStateProvider"
import { useErrorBoundary } from 'use-error-boundary'
// import ParticleSphere from '@components/particle_sphere/ParticleSphere'
import ThreeCanvas from '@components/ThreeCanvas'
import React, { Suspense, useRef } from 'react'
import { CameraShake, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Vector3 } from 'three'
import { useControls } from 'leva'


const AsyncParticleSphere = React.lazy(() => import('@components/particle_sphere/ParticleSphere'))

function App() {
  const { didCatch, error } = useErrorBoundary()
  const props = useControls({
    camZoom: { value: 1.26, min: 0, max: 5, step: 0.01 },
  })
  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <GlobalStateProvider>
      <div className='app'>
        <ThreeCanvas showState={true}>
          <PerspectiveCamera 
          makeDefault 
          position={[0, 0, 5]} 
          zoom={props.camZoom}
          />
          <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          zoomSpeed={1}
          onChange={(e) => console.log(e)}
          />
          <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
          <Suspense fallback={null}>
            <AsyncParticleSphere />
          </Suspense>
        </ThreeCanvas>
        {/* Some placeholder to show that other components are loaded first */}
        <div className='placeholder' style={{ position: 'absolute', top: 0, left: 0, zIndex: 100, color: 'white' }}>
          <h1>Some placeholder to show that other components are loaded first</h1>
        </div>
      </div>
    </GlobalStateProvider>
  )
}

export default App
