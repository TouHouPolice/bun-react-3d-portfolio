import './styles/main.scss'
import ParticleStormCanvas from '@components/ParticleStorm/ParticleStormCanvas'
import { GlobalStateProvider } from "@context/GlobalStateProvider"


function App() {
  return (
    <GlobalStateProvider>
      <div className='app'>
        <ParticleStormCanvas />
      </div>
    </GlobalStateProvider>
  )
}

export default App
