import './App.css'
import FloatingLines from './components/FloatingLines'
import logo from './assets/react.svg'
import CardNav from './components/CardNav'

function App() {
    const items = [
        {
            label: 'Sobre Mi',
            bgColor: '#0D0716',
            textColor: '#fff',
            links: [
                {
                    label: 'Sobre Mi',
                    href: '#about',
                    ariaLabel: 'Ir a la sección Sobre Mi'
                }
            ]
        },
		{
            label: 'Habilidades',
            bgColor: '#170D27',
            textColor: '#fff',
            links: [
                {
                    label: 'Habilidades',
                    href: '#skills',
                    ariaLabel: 'Ir a la sección Habilidades'
                }
            ]
        },
        {
            label: 'Proyectos',
            bgColor: '#271E37',
            textColor: '#fff',
            links: [
                {
                    label: 'Ver Proyectos',
                    href: '#projects',
                    ariaLabel: 'Ir a la sección Proyectos'
                }
            ]
        },
        
    ]
    return (
        <>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor: '#000',
                    overflow: 'hidden'
                }}
            >
                <FloatingLines
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[10, 10, 10]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={false}
                    parallax={true}
                />
            </div>
            <CardNav
                logo={logo}
                logoAlt="Company Logo"
                items={items}
                baseColor="#fff"
                menuColor="#000"
                ease="power3.out"
            />

			// Componente de Sobre Mi

			// Componente de Habilidades

			// Componente de Proyectos
        </>
    )
}

export default App
