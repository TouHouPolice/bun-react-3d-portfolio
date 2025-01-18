import './styles/main.scss'
import { GlobalStateProvider } from "@context/GlobalStateProvider"
import { useErrorBoundary } from 'use-error-boundary'
import ParticleSphere from '@components/ParticleSphere/ParticleSphere'
import ThreeCanvas from '@components/ThreeCanvas'

function App() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <GlobalStateProvider>
      <div className='app'>
        <ThreeCanvas showState={true}>
          <ParticleSphere />
        </ThreeCanvas>
      </div>
    </GlobalStateProvider>
  )
}

export default App
