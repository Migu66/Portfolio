import { useCallback, useState } from 'react'
import './App.css'
import Cursor from './components/general/Cursor'
import Preloader from './components/general/Preloader'
import Nav from './components/general/Nav'
import Hero from './components/home/Hero'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Skills from './components/skills/Skills'
import Projects from './components/projects/Projects'
import Footer from './components/general/Footer'

function App() {
    const [loaded, setLoaded] = useState(false)
    const handleLoaderDone = useCallback(() => setLoaded(true), [])

    return (
        <>
            <Cursor />
            <Preloader onDone={handleLoaderDone} />
            <div className="noise" aria-hidden="true" />
            <Nav show={loaded} />
            <main>
                <Hero play={loaded} />
                <About />
                <Experience />
                <Skills />
                <Projects />
            </main>
            <Footer />
        </>
    )
}

export default App
