import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const FACTS = [
    { label: 'Rol', value: 'Desarrollador Full-Stack' },
    { label: 'Stack', value: 'C# · .NET · SQL Server · React' },
    { label: 'Base', value: 'Madrid / Guadalajara' },
    { label: 'Formación', value: 'G.S. DAM · Inglés B2' },
    { label: 'Estado', value: 'Disponible', accent: true }
]

/**
 * Perfil: spread editorial. Statement enorme en serif a la izquierda,
 * columna estrecha con ficha técnica y párrafos a la derecha.
 */
export default function About() {
    const rootRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // statement palabra a palabra, enmascarado por líneas
                const split = SplitText.create('.about-statement', {
                    type: 'lines,words',
                    mask: 'lines'
                })

                gsap.from(split.words, {
                    yPercent: 110,
                    duration: 0.9,
                    stagger: 0.025,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '.about-statement',
                        start: 'top 78%',
                        once: true
                    }
                })

                gsap.from('.about-col > *', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-col',
                        start: 'top 80%',
                        once: true
                    }
                })

                return () => split.revert()
            })
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={rootRef}
            id="perfil"
            className="relative px-5 py-28 md:px-10 md:py-40"
        >
            {/* cabecera de sección */}
            <div className="mb-16 flex items-center gap-5 md:mb-24">
                <span className="meta">(01)</span>
                <span className="expanded text-sm font-semibold">Perfil</span>
                <span className="bg-ink/20 h-px flex-1" />
                <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="spin-slow text-accent h-5 w-5"
                    fill="currentColor"
                >
                    <path d="M50 0 L58 38 L96 28 L64 50 L96 72 L58 62 L50 100 L42 62 L4 72 L36 50 L4 28 L42 38 Z" />
                </svg>
            </div>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                {/* statement */}
                <h2 className="about-statement font-display col-span-1 text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.05] font-medium tracking-tight lg:col-span-7">
                    Del modelo de datos al{' '}
                    <em className="text-accent font-light italic">
                        último píxel
                    </em>
                    : me interesa el producto entero, no solo mi mitad del
                    stack.
                </h2>

                {/* columna estrecha: ficha + párrafos + enlaces */}
                <div className="about-col col-span-1 flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
                    <dl>
                        {FACTS.map((fact) => (
                            <div
                                key={fact.label}
                                className="border-ink/20 flex items-baseline justify-between gap-4 border-t py-3"
                            >
                                <dt className="meta opacity-60">
                                    {fact.label}
                                </dt>
                                <dd
                                    className={`meta text-right ${
                                        fact.accent
                                            ? 'text-accent flex items-center gap-2'
                                            : ''
                                    }`}
                                >
                                    {fact.accent && (
                                        <span className="blink-dot bg-accent inline-block h-1.5 w-1.5 rounded-full" />
                                    )}
                                    {fact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <p className="text-base leading-relaxed">
                        Soy Miguel González Pascual, desarrollador full-stack.
                        Mi terreno principal es C# y .NET — arquitecturas
                        limpias, API REST, SQL Server — y me muevo con la misma
                        soltura en el ecosistema TypeScript: React y Next.js
                        para interfaces que no dan vergüenza enseñar.
                    </p>

                    <p className="text-muted text-base leading-relaxed">
                        Aprendí el oficio donde más se aprende: en producción.
                        En ICP desarrollé una aplicación de escritorio en .NET
                        con arquitectura multicapa para logística, y después la
                        sostuve desde soporte de nivel 2. Resolver incidencias
                        ajenas enseña a no crear las propias: escribo código
                        pensado para el siguiente que lo lea.
                    </p>

                    <div className="flex gap-8">
                        <a
                            href="https://github.com/Migu66"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="u-link meta"
                        >
                            GitHub ↗
                        </a>
                        <a
                            href="https://www.linkedin.com/in/miguel-gonz%C3%A1lez-pascual-9a62b6292/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="u-link meta"
                        >
                            LinkedIn ↗
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
