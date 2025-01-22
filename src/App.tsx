import './styles/main.scss'
import { GlobalStateProvider } from "@context/GlobalStateProvider"
import { useErrorBoundary } from 'use-error-boundary'
// import ParticleSphere from '@components/particle_sphere/ParticleSphere'
import ThreeCanvas from '@components/ThreeCanvas'
import React, { Suspense } from 'react'

const AsyncParticleSphere = React.lazy(() => import('@components/particle_sphere/ParticleSphere'))

function App() {
  const { didCatch, error } = useErrorBoundary()
  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <GlobalStateProvider>
      <div className='app'>
        <ThreeCanvas showState={true}>
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
