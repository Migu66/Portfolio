import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            // Animación de salida del loader
            gsap.to('.loader-container', {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    setIsLoading(false)
                }
            })
        }, 10)

        return () => clearTimeout(timer)
    }, [])

    if (!isLoading) return null

    return (
        <div className="loader-container fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-[#0D0716] via-[#150D1E] to-[#1D0D26]">
            <div className="text-center">
                {/* Barra de carga animada */}
                <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                    <div className="absolute inset-0 bg-linear-to-r from-[#148bdb] to-[#B57EDC] animate-loading-bar"></div>
                </div>
            </div>

            {/* Partículas decorativas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-500 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
