import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { downloadCV } from '../../lib/downloadCV'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'miguelgp789@gmail.com'

const LINKS = [
    {
        label: 'GitHub',
        note: '@Migu66',
        href: 'https://github.com/Migu66',
        external: true
    },
    {
        label: 'LinkedIn',
        note: 'Miguel González Pascual',
        href: 'https://www.linkedin.com/in/miguel-gonz%C3%A1lez-pascual-9a62b6292/',
        external: true
    }
]

/**
 * Contacto: el cierre en naranja pleno. HABLEMOS gigante como mailto
 * con letras que saltan una a una, y filas de enlaces que se tiñen de
 * tinta al pasar por encima.
 */
export default function Footer() {
    const rootRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                // se anima el wrapper de cada letra: el salto CSS al
                // pasar el cursor vive en el span interior
                gsap.from('.footer-letter', {
                    yPercent: 115,
                    duration: 0.9,
                    stagger: 0.04,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '.footer-word',
                        start: 'top 85%',
                        once: true
                    }
                })

                gsap.from('.footer-row', {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.footer-rows',
                        start: 'top 90%',
                        once: true
                    }
                })
            })
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <footer
            ref={rootRef}
            id="contacto"
            className="bg-accent text-ink relative overflow-hidden"
        >
            <div className="px-5 pt-24 pb-8 md:px-10 md:pt-36">
                {/* cabecera de sección */}
                <div className="mb-14 flex items-center gap-5 md:mb-20">
                    <span className="meta">(05)</span>
                    <span className="expanded text-sm font-semibold">
                        Contacto
                    </span>
                    <span className="bg-ink/30 h-px flex-1" />
                    <span className="meta hidden md:inline">
                        ¿Proyecto? ¿Vacante? ¿Ambas?
                    </span>
                </div>

                {/* la palabra */}
                <a
                    href={`mailto:${EMAIL}`}
                    className="footer-word group block"
                    aria-label={`Escribir a ${EMAIL}`}
                >
                    <span className="font-display block overflow-hidden pb-[0.06em] text-[clamp(3.2rem,14vw,13rem)] leading-[0.9] font-semibold tracking-tight whitespace-nowrap">
                        {'HABLEMOS'.split('').map((letter, i) => (
                            <span
                                key={i}
                                aria-hidden="true"
                                className="footer-letter inline-block will-change-transform"
                            >
                                <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-[0.08em]">
                                    {letter}
                                </span>
                            </span>
                        ))}
                        <span
                            aria-hidden="true"
                            className="footer-letter inline-block"
                        >
                            <span className="inline-block transition-transform duration-300 group-hover:-rotate-45">
                                .
                            </span>
                        </span>
                    </span>
                </a>

                <p className="meta mt-6 mb-20 md:mb-28">
                    {EMAIL} — respondo rápido
                </p>

                {/* filas de enlaces */}
                <div className="footer-rows">
                    {LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-row border-ink hover:bg-ink hover:text-accent flex items-baseline justify-between border-t px-2 py-6 transition-colors duration-300"
                        >
                            <span className="expanded text-lg font-semibold md:text-2xl">
                                {link.label}
                            </span>
                            <span className="meta flex items-center gap-3">
                                <span className="hidden opacity-60 sm:inline">
                                    {link.note}
                                </span>
                                ↗
                            </span>
                        </a>
                    ))}
                    <button
                        onClick={downloadCV}
                        className="footer-row border-ink hover:bg-ink hover:text-accent flex w-full items-baseline justify-between border-t px-2 py-6 text-left transition-colors duration-300"
                    >
                        <span className="expanded text-lg font-semibold md:text-2xl">
                            Descargar CV
                        </span>
                        <span className="meta flex items-center gap-3">
                            <span className="hidden opacity-60 sm:inline">
                                PDF · ES
                            </span>
                            ↓
                        </span>
                    </button>
                </div>

                {/* colofón */}
                <div className="border-ink mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6">
                    <span className="meta">
                        © 2026 Miguel González Pascual
                    </span>
                    <span className="meta hidden opacity-70 md:inline">
                        Diseñado y programado a mano — sin plantillas
                    </span>
                    <a href="#top" className="u-link meta">
                        Volver arriba ↑
                    </a>
                </div>
            </div>
        </footer>
    )
}
