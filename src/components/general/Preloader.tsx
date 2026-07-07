import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
    onDone: () => void
}

const WORDS = ['MIGUEL', 'GONZÁLEZ', 'PASCUAL']

/**
 * Preloader: telón de tinta con el nombre componiéndose letra a letra
 * y un contador 000→100. Al terminar, todo el panel sube como una
 * plancha de imprenta y arranca la entrada del hero.
 */
export default function Preloader({ onDone }: PreloaderProps) {
    const rootRef = useRef<HTMLDivElement>(null)
    const counterRef = useRef<HTMLSpanElement>(null)
    const [gone, setGone] = useState(false)

    useLayoutEffect(() => {
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        if (reducedMotion) {
            setGone(true)
            onDone()
            return
        }

        const root = rootRef.current
        if (!root) return

        document.body.style.overflow = 'hidden'

        const ctx = gsap.context(() => {
            const letters = root.querySelectorAll<HTMLElement>('.pl-letter')
            const meta = root.querySelectorAll<HTMLElement>('.pl-meta')
            const counter = counterRef.current!
            const tick = { value: 0 }

            const tl = gsap.timeline({
                defaults: { ease: 'expo.out' },
                onComplete: () => {
                    document.body.style.overflow = ''
                    setGone(true)
                    onDone()
                }
            })

            tl.from(meta, {
                opacity: 0,
                y: 14,
                duration: 0.6,
                stagger: 0.08
            })
                .from(
                    letters,
                    {
                        yPercent: 115,
                        duration: 0.9,
                        stagger: 0.035
                    },
                    0.1
                )
                .to(
                    tick,
                    {
                        value: 100,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        onUpdate: () => {
                            counter.textContent = String(
                                Math.round(tick.value)
                            ).padStart(3, '0')
                        }
                    },
                    0.1
                )
                .to(
                    [
                        root.querySelector('.pl-name'),
                        root.querySelector('.pl-counter')
                    ],
                    {
                        yPercent: -30,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.in'
                    },
                    '+=0.2'
                )
                .to(
                    root,
                    {
                        yPercent: -100,
                        duration: 0.85,
                        ease: 'expo.inOut'
                    },
                    '<0.15'
                )
        }, root)

        return () => {
            document.body.style.overflow = ''
            ctx.revert()
        }
    }, [onDone])

    if (gone) return null

    return (
        <div
            ref={rootRef}
            className="bg-ink text-paper fixed inset-0 z-90 flex flex-col justify-between p-6 md:p-10"
            aria-hidden="true"
        >
            <div className="flex justify-between">
                <span className="pl-meta meta">Portfolio © 2026</span>
                <span className="pl-meta meta text-accent">
                    Cargando tinta…
                </span>
            </div>

            <div className="pl-name font-display font-semibold leading-[0.95] tracking-tight">
                {WORDS.map((word) => (
                    <div
                        key={word}
                        className="overflow-hidden text-[clamp(2.6rem,7.5vw,7rem)]"
                    >
                        {word.split('').map((letter, i) => (
                            <span
                                key={i}
                                className="pl-letter inline-block will-change-transform"
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <div className="pl-counter flex items-end justify-between">
                <span className="pl-meta meta">Desarrollador Full-Stack</span>
                <span
                    ref={counterRef}
                    className="font-mono text-[clamp(2.4rem,6vw,5rem)] leading-none"
                >
                    000
                </span>
            </div>
        </div>
    )
}
