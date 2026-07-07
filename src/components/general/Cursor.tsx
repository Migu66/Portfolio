import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Cursor personalizado: punto que sigue al ratón + anillo con retardo.
 * mix-blend-difference lo hace legible sobre papel, tinta y naranja.
 * Estados vía atributo data-cursor en los elementos objetivo:
 *   data-cursor="ver"  → el anillo crece y muestra la etiqueta "VER"
 *   enlaces y botones  → el anillo crece un poco
 */
export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const finePointer = window.matchMedia('(pointer: fine)').matches
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
        if (!finePointer || reducedMotion) return

        const dot = dotRef.current
        const ring = ringRef.current
        const label = labelRef.current
        if (!dot || !ring || !label) return

        document.documentElement.classList.add('has-cursor')
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

        const dotX = gsap.quickTo(dot, 'x', {
            duration: 0.12,
            ease: 'power2.out'
        })
        const dotY = gsap.quickTo(dot, 'y', {
            duration: 0.12,
            ease: 'power2.out'
        })
        const ringX = gsap.quickTo(ring, 'x', {
            duration: 0.45,
            ease: 'power3.out'
        })
        const ringY = gsap.quickTo(ring, 'y', {
            duration: 0.45,
            ease: 'power3.out'
        })

        let visible = false

        const onMove = (e: PointerEvent) => {
            if (!visible) {
                visible = true
                gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
            }
            dotX(e.clientX)
            dotY(e.clientY)
            ringX(e.clientX)
            ringY(e.clientY)
        }

        const setState = (state: 'default' | 'link' | 'ver') => {
            gsap.to(ring, {
                scale: state === 'ver' ? 2.6 : state === 'link' ? 1.6 : 1,
                duration: 0.35,
                ease: 'power3.out'
            })
            gsap.to(dot, {
                scale: state === 'ver' ? 0 : 1,
                duration: 0.25
            })
            label.style.opacity = state === 'ver' ? '1' : '0'
        }

        const onOver = (e: PointerEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('[data-cursor="ver"]')) setState('ver')
            else if (target.closest('a, button')) setState('link')
            else setState('default')
        }

        const onLeave = () => {
            visible = false
            gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerover', onOver)
        document.documentElement.addEventListener('pointerleave', onLeave)

        return () => {
            document.documentElement.classList.remove('has-cursor')
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerover', onOver)
            document.documentElement.removeEventListener(
                'pointerleave',
                onLeave
            )
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true">
                <span ref={labelRef} className="cursor-label">
                    VER
                </span>
            </div>
        </>
    )
}
