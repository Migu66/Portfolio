import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Entry {
    index: string
    period: string
    company: string
    role: string
    description: string
    open?: boolean
}

const ENTRIES: Entry[] = [
    {
        index: '01',
        period: 'Sept — Dic 2024',
        company: 'ICP · Meco',
        role: 'Prácticas · Desarrollo',
        description:
            'Diseño y desarrollo integral de una aplicación de escritorio en .NET con arquitectura multicapa para la gestión logística: inventario, entradas, salidas y trazabilidad de pedidos en tiempo real, con modelado de datos y procedimientos almacenados en SQL Server.'
    },
    {
        index: '02',
        period: 'Ene — Jun 2025',
        company: 'ICP · Meco',
        role: 'Soporte IT Nivel 2 · Desarrollo',
        description:
            'Resolución de incidencias técnicas críticas y mejoras funcionales en las aplicaciones logísticas internas: mantenimiento de software empresarial con Visual Basic, .NET y consultas avanzadas en T-SQL sobre SQL Server.'
    },
    {
        index: '03',
        period: 'Ahora',
        company: '¿Tu equipo?',
        role: 'Siguiente capítulo',
        description:
            'Buscando el reto que deje obsoleto este portfolio. Si tienes uno entre manos, hablemos.',
        open: true
    }
]

/**
 * Trayectoria: libro de registro sobre tinta. Filas que se revelan al
 * hacer scroll y se inundan de azul al pasar el cursor; detrás, la
 * palabra TRAYECTORIA vaciada deriva en horizontal.
 */
export default function Experience() {
    const rootRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.to('.exp-bgword', {
                    xPercent: -22,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: root,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })

                gsap.utils
                    .toArray<HTMLElement>('.exp-row')
                    .forEach((row, i) => {
                        gsap.from(row, {
                            y: 70,
                            opacity: 0,
                            duration: 0.9,
                            delay: i * 0.06,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: row,
                                start: 'top 88%',
                                once: true
                            }
                        })
                    })
            })
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={rootRef}
            id="trayectoria"
            className="bg-ink text-paper relative overflow-hidden py-28 md:py-40"
        >
            {/* palabra de fondo, vaciada, en deriva horizontal */}
            <div
                aria-hidden="true"
                className="exp-bgword text-outline-paper font-display pointer-events-none absolute top-6 left-0 text-[clamp(5rem,18vw,17rem)] leading-none font-semibold whitespace-nowrap opacity-25"
            >
                TRAYECTORIA — TRAYECTORIA — TRAYECTORIA
            </div>

            <div className="relative px-5 md:px-10">
                <div className="mt-24 mb-14 flex items-center gap-5 md:mt-36 md:mb-20">
                    <span className="meta opacity-70">(02)</span>
                    <span className="expanded text-sm font-semibold">
                        Trayectoria
                    </span>
                    <span className="bg-paper/25 h-px flex-1" />
                    <span className="meta hidden opacity-50 md:inline">
                        Aprendida en producción
                    </span>
                </div>

                <div className="border-paper/20 border-t">
                    {ENTRIES.map((entry) => (
                        <article
                            key={entry.index}
                            className="exp-row group border-paper/20 relative overflow-hidden border-b"
                        >
                            {/* marea azul al hover */}
                            <div
                                aria-hidden="true"
                                className="bg-accent absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                            />

                            <div className="relative z-10 grid grid-cols-1 gap-x-8 gap-y-3 px-2 py-10 md:grid-cols-12 md:items-baseline md:py-12">
                                <span className="font-mono text-sm opacity-60 md:col-span-1">
                                    ({entry.index})
                                </span>

                                <div className="md:col-span-3">
                                    <p className="meta">{entry.period}</p>
                                    <p className="meta mt-1 opacity-60">
                                        {entry.company}
                                    </p>
                                </div>

                                <div className="md:col-span-8">
                                    {entry.open ? (
                                        <a
                                            href="#contacto"
                                            className="font-display text-accent-light group-hover:text-paper inline-block text-[clamp(1.7rem,3.6vw,3.2rem)] leading-tight font-semibold tracking-tight italic transition-colors duration-300"
                                        >
                                            {entry.role} ↗
                                        </a>
                                    ) : (
                                        <h3 className="font-display text-[clamp(1.7rem,3.6vw,3.2rem)] leading-tight font-semibold tracking-tight">
                                            {entry.role}
                                        </h3>
                                    )}
                                    <p className="mt-3 max-w-[52ch] leading-relaxed opacity-70">
                                        {entry.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
