import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
    trigger?: string
    start?: string
    end?: string
    scrub?: boolean
    toggleActions?: string
    once?: boolean
}

export const useScrollAnimation = <T extends HTMLElement>(
    animationFn: (element: T) => gsap.core.Timeline | gsap.core.Tween,
    options: ScrollAnimationOptions = {}
) => {
    const elementRef = useRef<T>(null)

    useEffect(() => {
        if (!elementRef.current) return

        const ctx = gsap.context(() => {
            const animation = animationFn(elementRef.current!)

            ScrollTrigger.create({
                trigger: options.trigger || elementRef.current,
                start: options.start || 'top 80%',
                end: options.end || 'bottom 20%',
                toggleActions:
                    options.toggleActions || 'play none none reverse',
                scrub: options.scrub || false,
                once: options.once || false,
                animation: animation
            })
        }, elementRef)

        return () => ctx.revert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return elementRef
}

// Animación de fade in desde abajo
export const useFadeInUp = (duration = 1) => {
    return useScrollAnimation<HTMLDivElement>(
        (element) => {
            return gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    ease: 'power3.out'
                }
            )
        },
        { once: true }
    )
}

// Animación de fade in desde la izquierda
export const useFadeInLeft = (duration = 1) => {
    return useScrollAnimation<HTMLDivElement>(
        (element) => {
            return gsap.fromTo(
                element,
                {
                    opacity: 0,
                    x: -50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration,
                    ease: 'power3.out'
                }
            )
        },
        { once: true }
    )
}

// Animación de fade in desde la derecha
export const useFadeInRight = (duration = 1) => {
    return useScrollAnimation<HTMLDivElement>(
        (element) => {
            return gsap.fromTo(
                element,
                {
                    opacity: 0,
                    x: 50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration,
                    ease: 'power3.out'
                }
            )
        },
        { once: true }
    )
}

// Animación de escala
export const useScaleIn = (duration = 0.8) => {
    return useScrollAnimation<HTMLDivElement>(
        (element) => {
            return gsap.fromTo(
                element,
                {
                    opacity: 0,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration,
                    ease: 'back.out(1.7)'
                }
            )
        },
        { once: true }
    )
}

// Animación de stagger (para múltiples elementos)
export const useStaggerAnimation = (selector: string, stagger = 0.1) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            const elements = containerRef.current!.querySelectorAll(selector)

            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        once: true
                    }
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [selector, stagger])

    return containerRef
}
