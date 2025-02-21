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
import { LOAD_CANVAS } from './utils/Constants';
import { addStyles } from '@utils/utils';
import LoadingScreen from '@components/LoadingScreen';
import MobileBlocker from '@components/MobileBlocker';
import { isMobile } from 'react-device-detect';

const AsyncParticleSphere = React.lazy(() => import('@components/particle_sphere/ParticleSphere'))
const AsyncCityModel = React.lazy(() => import('@components/CityModel'))

const mode = import.meta.env.VITE_APP_MODE;
console.log('App Mode:', mode)

if (mode === 'prod') {
  addStyles(`
    #leva__root {
      display: none;
    }  
  `)
}

function App() {
  const { didCatch, error } = useErrorBoundary()
  const props = useControls({
    camZoom: { value: 1.26, min: 0, max: 5, step: 0.01 },
  })

  if (isMobile) {
    return (
      <MobileBlocker />
    )
  }

  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <>
    <GlobalStateProvider>
      <div className='app'>
        <ScifiBackground />
        <MainOverlay />
        <LoadingScreen />
        {LOAD_CANVAS &&
          <ThreeCanvas 
          className="main-canvas"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
          showState={mode === 'dev'}>
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
