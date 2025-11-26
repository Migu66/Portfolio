import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import chicoEscritorio from '../../assets/chico-escritorio.png'

const Home = () => {
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // Animación del texto
            tl.fromTo(
                textRef.current?.children || [],
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2
                }
            )

            // Animación de la imagen
            tl.fromTo(
                imageRef.current,
                {
                    opacity: 0,
                    x: 100,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'back.out(1.2)'
                },
                '-=0.8'
            )

            // Animación del indicador de scroll
            tl.fromTo(
                scrollIndicatorRef.current,
                {
                    opacity: 0,
                    y: -20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8
                },
                '-=0.5'
            )
        })

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="home"
            className="relative w-screen min-h-screen flex flex-col md:flex-row items-center justify-between px-[5%] md:px-[10%] z-1 box-border md:text-left text-center overflow-x-hidden"
        >
            {/* Contenido de texto */}
            <div
                ref={textRef}
                className="flex-1 max-w-[600px] text-white mt-40 lg:mt-0"
            >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-4 text-white">
                    ¡Hola! <span className="inline-block animate-wave">👋</span>
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                    SOY{' '}
                    <span
                        className="text-[#148bdb] animate-glow"
                        style={{
                            textShadow:
                                '0 0 20px rgba(74, 144, 226, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)'
                        }}
                    >
                        Miguel González Pascual
                    </span>
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#B57EDC] mb-8 bg-gradient-to-r from-[#B57EDC] via-[#148bdb] to-[#B57EDC] bg-clip-text text-transparent animate-gradient">
                    Desarrollador Fullstack
                </p>
            </div>

            {/* Imagen */}
            <div
                ref={imageRef}
                className="flex-1 flex justify-center md:justify-end items-center max-w-[1200px] md:pr-8 lg:pr-16 mb-20 lg:mb-0 animate-float-gentle"
            >
                <img
                    src={chicoEscritorio}
                    alt="Desarrollador trabajando"
                    className="w-[190%] max-w-[1100px] h-auto object-contain md:translate-x-20 lg:translate-x-75 hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Indicador de scroll */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <p className="text-gray-400 text-sm tracking-wider">
                    Desliza para explorar
                </p>
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll"></div>
                </div>
            </div>
        </section>
    )
}

export default Home
