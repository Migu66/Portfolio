import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee, { Asterisk } from '../general/Marquee'
import fotoMiguel from '../../assets/Mi-foto.png'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
    play: boolean
}

const NAME_LINES = [
    { text: 'MIGUEL', outline: false, indent: '' },
    { text: 'GONZÁLEZ', outline: true, indent: 'ml-[6vw]' },
    { text: 'PASCUAL', outline: false, indent: 'ml-[12vw]' }
]

const MARQUEE_ITEMS = [
    'Disponible para nuevos proyectos',
    'C#',
    '.NET',
    'SQL Server',
    'React',
    'TypeScript',
    'Next.js',
    'Azure'
]

/**
 * Portada editorial: nombre a tres líneas escalonadas que invaden la
 * foto, metadatos mono en la cabecera y cinta de texto en la base.
 */
export default function Hero({ play }: HeroProps) {
    const rootRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // estado inicial (oculto) hasta que el preloader termina
                gsap.set('.hero-letter', { yPercent: 120 })
                gsap.set('.hero-meta', { y: 16, opacity: 0 })
                gsap.set('.hero-photo', { opacity: 0 })
                gsap.set('.hero-photo img', { yPercent: 18, scale: 1.25 })
                gsap.set('.hero-bottom', { yPercent: 100, opacity: 0 })

                if (!play) return

                const tl = gsap.timeline({
                    defaults: { ease: 'expo.out' }
                })

                tl.to('.hero-letter', {
                    yPercent: 0,
                    duration: 1.1,
                    stagger: 0.032
                })
                    .to(
                        '.hero-photo',
                        { opacity: 1, duration: 0.5, ease: 'power1.out' },
                        0.35
                    )
                    .to(
                        '.hero-photo img',
                        { yPercent: 0, scale: 1, duration: 1.3 },
                        0.35
                    )
                    .to(
                        '.hero-meta',
                        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
                        0.55
                    )
                    .to(
                        '.hero-bottom',
                        { yPercent: 0, opacity: 1, duration: 0.8 },
                        0.75
                    )

                // parallax: la foto y las líneas derivan al hacer scroll
                // (solo la foto absoluta de escritorio; en móvil va en
                // flujo y derivaría sobre la marquesina)
                gsap.to('.hero-photo-parallax', {
                    y: 80,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: root,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                })

                gsap.utils
                    .toArray<HTMLElement>('.hero-line')
                    .forEach((line, i) => {
                        gsap.to(line, {
                            x: (i - 1) * 60,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: root,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: true
                            }
                        })
                    })
            })
        }, root)

        return () => ctx.revert()
    }, [play])

    return (
        <section
            ref={rootRef}
            id="top"
            className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-20"
        >
            {/* metadatos de portada */}
            <div className="flex items-baseline justify-between px-5 md:px-10">
                <span className="hero-meta meta">Portfolio © 2026</span>
                <span className="hero-meta meta hidden md:inline">
                    Desarrollador Full-Stack
                </span>
                <span className="hero-meta meta text-accent flex items-center gap-2">
                    <span className="blink-dot bg-accent inline-block h-2 w-2 rounded-full" />
                    Disponible
                </span>
            </div>

            {/* bloque de nombre + foto */}
            <div className="relative px-5 md:px-10">
                {/* foto: recorte editorial con marco naranja desplazado */}
                <div className="hero-photo hero-photo-parallax absolute top-[46%] right-[6%] z-0 hidden w-[clamp(200px,23vw,330px)] -translate-y-1/2 rotate-2 md:block">
                    <div className="bg-accent absolute inset-0 translate-x-3 translate-y-3" />
                    <div className="relative aspect-3/4 overflow-hidden">
                        <img
                            src={fotoMiguel}
                            alt="Retrato de Miguel González Pascual"
                            className="h-full w-full object-cover grayscale"
                        />
                    </div>
                    <p className="meta mt-3 opacity-60">
                        fig. 01 — el desarrollador
                    </p>
                </div>

                <h1
                    aria-label="Miguel González Pascual"
                    className="font-display relative z-10 leading-[0.86] font-semibold tracking-tight"
                >
                    {NAME_LINES.map((line) => (
                        <span
                            key={line.text}
                            className={`hero-line block overflow-hidden pb-[0.08em] text-[clamp(3.4rem,13.5vw,12.5rem)] ${line.indent} ${
                                line.outline ? 'text-outline' : ''
                            }`}
                        >
                            {line.text.split('').map((letter, i) => (
                                <span
                                    key={i}
                                    aria-hidden="true"
                                    className="hero-letter inline-block will-change-transform"
                                >
                                    {letter}
                                </span>
                            ))}
                            {line.text === 'PASCUAL' && (
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 100 100"
                                    className="spin-slow text-accent mb-[0.5em] ml-[0.1em] inline-block h-[0.32em] w-[0.32em]"
                                    fill="currentColor"
                                >
                                    <path d="M50 0 L58 38 L96 28 L64 50 L96 72 L58 62 L50 100 L42 62 L4 72 L36 50 L4 28 L42 38 Z" />
                                </svg>
                            )}
                        </span>
                    ))}
                </h1>

                {/* foto en móvil: bloque en flujo, alineado a la derecha */}
                <div className="hero-photo relative mt-8 ml-auto w-[58%] max-w-60 rotate-2 md:hidden">
                    <div className="bg-accent absolute inset-0 translate-x-2 translate-y-2" />
                    <div className="relative aspect-3/4 overflow-hidden">
                        <img
                            src={fotoMiguel}
                            alt=""
                            className="h-full w-full object-cover grayscale"
                        />
                    </div>
                    <p className="meta mt-2 opacity-60">
                        fig. 01 — el desarrollador
                    </p>
                </div>
            </div>

            {/* pista de scroll + cinta */}
            <div className="hero-bottom">
                <div className="mb-4 hidden justify-end px-10 md:flex">
                    <span className="meta flex items-center gap-2 opacity-60">
                        Desliza
                        <span className="inline-block animate-bounce">↓</span>
                    </span>
                </div>
                <Marquee
                    items={MARQUEE_ITEMS.map((item) => (
                        <span key={item} className="expanded">
                            {item}
                        </span>
                    ))}
                    duration={26}
                    separator={<Asterisk className="text-accent" />}
                    className="border-ink border-y py-3 text-[clamp(0.85rem,1.5vw,1.15rem)] font-medium"
                />
            </div>
        </section>
    )
}
