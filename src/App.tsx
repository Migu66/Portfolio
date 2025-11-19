import './App.css'
import FloatingLines from './components/FloatingLines'

function App() {

  return (
    <>
	<div style={{ 
    width: '100vw', 
    height: '100vh', 
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    overflow: 'hidden'
  }}>
  <FloatingLines 
    enabledWaves={['top', 'middle', 'bottom']}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={[10, 10, 10]}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={[8, 6, 4]}
    bendRadius={5.0}
    bendStrength={-0.5}
    interactive={false}
    parallax={true}
  />
	</div>
    </>
  )
}

export default App
