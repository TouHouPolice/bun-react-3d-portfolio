import './styles/main.scss'
import ParticleStormCanvas from '@components/ParticleStorm/ParticleStormCanvas'
import { GlobalStateProvider } from "@context/GlobalStateProvider"
import { useErrorBoundary } from 'use-error-boundary'

function App() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <GlobalStateProvider>
      <div className='app'>
        <ParticleStormCanvas />
      </div>
    </GlobalStateProvider>
  )
}

export default App
