import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateProvider } from "@context/GlobalStateProvider"
import { useErrorBoundary } from 'use-error-boundary'
import ThreeCanvas from '@components/ThreeCanvas'
import React, { Suspense } from 'react'
import { CameraShake, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import PostProc from '@components/PostProc'
import ScifiBackground from '@components/ScifiBackground'
import MainOverlay from '@components/MainOverlay'
const AsyncParticleSphere = React.lazy(() => import('@components/particle_sphere/ParticleSphere'))
const AsyncCityModel = React.lazy(() => import('@components/CityModel'))

const LOAD_CANVAS = true

function App() {
  const { didCatch, error } = useErrorBoundary()
  const props = useControls({
    camZoom: { value: 1.26, min: 0, max: 5, step: 0.01 },
  })

  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <>
    <GlobalStateProvider>
      <div className='app'>
        <ScifiBackground />
        <MainOverlay />
        {LOAD_CANVAS &&
          <ThreeCanvas 
          className="main-canvas"
          showState={true}>
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
            <CameraShake yawFrequency={1} maxYaw={0.03} pitchFrequency={0.2} maxPitch={0.03} rollFrequency={0.5} maxRoll={0.3} intensity={0.2} />
            <Suspense fallback={null}>
              <AsyncCityModel />
            </Suspense>
            <Suspense fallback={null}>
              <AsyncParticleSphere />
            </Suspense>
            <PostProc/>
          </ThreeCanvas>
        }
      </div>
    </GlobalStateProvider>
    </>
  )
}

export default App
