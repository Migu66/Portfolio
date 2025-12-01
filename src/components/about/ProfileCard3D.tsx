import { useState, useRef, type MouseEvent, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import foto from '../../assets/Mi-foto.png'

gsap.registerPlugin(ScrollTrigger)

interface ProfileCard3DProps {
    imageSrc?: string
    name?: string
    title?: string
}

export default function ProfileCard3D({
    imageSrc = foto,
    name = 'Miguel González Pascual',
    title = 'Desarrollador Fullstack'
}: ProfileCard3DProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Animación de entrada con scroll
    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 50
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        once: true
                    }
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const card = cardRef.current
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 })
        setIsHovering(false)
    }

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center perspective-1000"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                className="relative w-[340px] h-[500px] transition-transform duration-300 ease-out cursor-pointer"
                style={{
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
                        isHovering ? 'scale(1.02)' : 'scale(1)'
                    }`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Card principal */}
                <div
                    className="relative w-full h-full rounded-3xl overflow-hidden"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(26, 35, 126, 0.4) 0%, rgba(123, 31, 162, 0.3) 50%, rgba(194, 24, 91, 0.4) 100%)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: isHovering
                            ? '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(20, 139, 219, 0.2)'
                            : '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                    }}
                >
                    {/* Información del perfil - Arriba */}
                    <div
                        className="absolute top-0 left-0 right-0 p-8 text-center z-10"
                        style={{
                            transform: 'translateZ(30px)',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
                            {name}
                        </h3>
                        <p className="text-base text-gray-400 font-light tracking-wider">
                            {title}
                        </p>
                    </div>

                    {/* Contenedor de la imagen */}
                    <div
                        className="absolute top-24 left-0 right-0 bottom-0 overflow-hidden"
                        style={{
                            transform: 'translateZ(20px)',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <img
                            src={imageSrc}
                            alt="Foto de perfil"
                            className="w-full h-full object-cover object-top"
                            style={{
                                filter: 'brightness(0.92) contrast(1.08) saturate(0.5) sepia(0.5) hue-rotate(220deg)'
                            }}
                        />
                    </div>
                </div>

                {/* Efecto de sombra flotante */}
                <div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/40 rounded-full blur-2xl transition-all duration-300"
                    style={{
                        opacity: isHovering ? 0.6 : 0.4,
                        transform: `translateX(-50%) scale(${isHovering ? 1.05 : 1})`
                    }}
                ></div>
            </div>
        </div>
    )
}
