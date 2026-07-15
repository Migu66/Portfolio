import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { downloadCV } from '../../lib/downloadCV'

interface NavProps {
    show: boolean
}

const LINKS = [
    { index: '01', label: 'Perfil', href: '#perfil' },
    { index: '02', label: 'Trayectoria', href: '#trayectoria' },
    { index: '03', label: 'Habilidades', href: '#habilidades' },
    { index: '04', label: 'Proyectos', href: '#proyectos' },
    { index: '05', label: 'Contacto', href: '#contacto' }
]

/**
 * Barra fija sobre papel sólido: el contenido pasa por debajo sin
 * pisar los titulares. En móvil, menú a pantalla completa con
 * enlaces gigantes en serif.
 */
export default function Nav({ show }: NavProps) {
    const barRef = useRef<HTMLElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    useLayoutEffect(() => {
        if (!show || !barRef.current) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                barRef.current,
                { y: -24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
            )
        }, barRef)
        return () => ctx.revert()
    }, [show])

    useEffect(() => {
        const overlay = overlayRef.current
        if (!overlay) return

        document.body.style.overflow = open ? 'hidden' : ''

        const links = overlay.querySelectorAll('.menu-link')
        gsap.killTweensOf([overlay, ...links])

        if (open) {
            gsap.set(overlay, { display: 'flex' })
            gsap.fromTo(
                overlay,
                { yPercent: -100 },
                { yPercent: 0, duration: 0.7, ease: 'expo.inOut' }
            )
            gsap.fromTo(
                links,
                { yPercent: 120 },
                {
                    yPercent: 0,
                    duration: 0.7,
                    stagger: 0.06,
                    delay: 0.25,
                    ease: 'expo.out'
                }
            )
        } else if (getComputedStyle(overlay).display !== 'none') {
            gsap.to(overlay, {
                yPercent: -100,
                duration: 0.55,
                ease: 'expo.inOut',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' })
                }
            })
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <>
            <header
                ref={barRef}
                className={`fixed inset-x-0 top-0 z-80 border-b transition-colors duration-500 ${
                    open
                        ? 'bg-ink text-paper border-transparent'
                        : 'bg-paper text-ink border-ink/10'
                }`}
                style={{ opacity: show ? undefined : 0 }}
            >
                <nav className="flex items-center justify-between px-5 py-4 md:px-10">
                    <a
                        href="#top"
                        className="meta font-bold"
                        aria-label="Volver arriba"
                    >
                        M.G.P.®
                    </a>

                    <ul className="hidden items-center gap-7 lg:flex">
                        {LINKS.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} className="u-link meta">
                                    <sup className="mr-1 opacity-60">
                                        {link.index}
                                    </sup>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={downloadCV}
                                className="meta border-ink hover:bg-ink hover:text-paper border px-3 py-1.5 transition-colors duration-300"
                            >
                                CV ↓
                            </button>
                        </li>
                    </ul>

                    <button
                        onClick={() => setOpen(!open)}
                        className="meta lg:hidden"
                        aria-expanded={open}
                        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        {open ? 'Cerrar ×' : 'Menú +'}
                    </button>
                </nav>
            </header>

            {/* Menú móvil a pantalla completa */}
            <div
                ref={overlayRef}
                className="bg-ink text-paper fixed inset-0 z-70 hidden flex-col justify-between px-6 pt-24 pb-8"
            >
                <ul className="flex flex-col gap-2">
                    {LINKS.map((link) => (
                        <li key={link.href} className="overflow-hidden">
                            <a
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="menu-link font-display hover:text-accent-light block text-[clamp(2.4rem,10vw,4.5rem)] leading-[1.05] font-semibold transition-colors duration-300 will-change-transform"
                            >
                                <sup className="meta text-accent-light mr-3">
                                    {link.index}
                                </sup>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between">
                    <span className="meta opacity-60">Portfolio © 2026</span>
                    <button
                        onClick={() => {
                            downloadCV()
                            setOpen(false)
                        }}
                        className="meta border-paper hover:bg-paper hover:text-ink border px-4 py-2 transition-colors duration-300"
                    >
                        Descargar CV ↓
                    </button>
                </div>
            </div>
        </>
    )
}
