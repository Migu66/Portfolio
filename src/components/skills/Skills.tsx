import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '../general/Marquee'

gsap.registerPlugin(ScrollTrigger)

type Tier = 1 | 2 | 3

interface Group {
    label: string
    skills: { name: string; tier: Tier }[]
}

const GROUPS: Group[] = [
    {
        label: 'Back-End',
        skills: [
            { name: 'C#', tier: 1 },
            { name: '.NET', tier: 1 },
            { name: 'ASP.NET Core', tier: 2 },
            { name: 'Entity Framework', tier: 2 },
            { name: 'Node.js', tier: 2 },
            { name: 'Python', tier: 3 },
            { name: 'Visual Basic', tier: 3 },
            { name: 'xUnit', tier: 3 }
        ]
    },
    {
        label: 'Front-End',
        skills: [
            { name: 'React', tier: 1 },
            { name: 'TypeScript', tier: 1 },
            { name: 'Next.js', tier: 2 },
            { name: 'JavaScript', tier: 2 },
            { name: 'Tailwind', tier: 2 },
            { name: 'HTML5', tier: 3 },
            { name: 'CSS3', tier: 3 }
        ]
    },
    {
        label: 'Datos',
        skills: [
            { name: 'SQL Server', tier: 1 },
            { name: 'T-SQL', tier: 2 },
            { name: 'PostgreSQL', tier: 2 },
            { name: 'MongoDB', tier: 3 },
            { name: 'Prisma', tier: 3 }
        ]
    },
    {
        label: 'IA aplicada',
        skills: [
            { name: 'Integración de LLMs', tier: 2 },
            { name: 'OpenAI API', tier: 2 },
            { name: 'Claude API', tier: 2 },
            { name: 'Prompt engineering', tier: 3 }
        ]
    },
    {
        label: 'DevOps',
        skills: [
            { name: 'Azure', tier: 2 },
            { name: 'Docker', tier: 2 },
            { name: 'Git', tier: 2 },
            { name: 'CI/CD', tier: 3 },
            { name: 'GitHub', tier: 3 },
            { name: 'Swagger', tier: 3 },
            { name: 'Postman', tier: 3 },
            { name: 'Vercel', tier: 3 }
        ]
    }
]

const tierClass: Record<Tier, string> = {
    1: 'skill-word font-display font-semibold tracking-tight text-[clamp(2.1rem,4.8vw,4.4rem)] leading-none',
    2: 'skill-word skill-outline font-display font-semibold tracking-tight text-[clamp(1.7rem,3.4vw,3rem)] leading-none',
    3: 'skill-word font-mono uppercase text-muted text-[clamp(0.8rem,1.1vw,1rem)] tracking-widest'
}

/**
 * Habilidades: nada de iconitos ni barras de progreso — un muro
 * tipográfico donde el tamaño de cada palabra es la jerarquía.
 */
export default function Skills() {
    const rootRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('.skills-title', {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '.skills-title',
                        start: 'top 85%',
                        once: true
                    }
                })

                gsap.utils
                    .toArray<HTMLElement>('.skills-group')
                    .forEach((group) => {
                        // se anima el wrapper: el hover CSS de la
                        // palabra interior no compite con el tween
                        gsap.from(group.querySelectorAll('.skill-reveal'), {
                            y: 30,
                            opacity: 0,
                            duration: 0.7,
                            stagger: 0.04,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: group,
                                start: 'top 85%',
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
            id="habilidades"
            className="relative overflow-hidden pt-28 md:pt-40"
        >
            <div className="px-5 md:px-10">
                {/* cabecera: variación con el rótulo gigante a la derecha */}
                <div className="mb-14 md:mb-20">
                    <div className="flex items-center gap-5">
                        <span className="meta">(03)</span>
                        <span className="bg-ink/20 h-px flex-1" />
                        <span className="meta text-muted hidden md:inline">
                            Sin iconitos. Sin barras de progreso.
                        </span>
                    </div>
                    <h2 className="skills-title font-display mt-6 text-right text-[clamp(2.6rem,9.5vw,8.5rem)] leading-none font-semibold tracking-tight">
                        HABILIDADES
                        <span className="text-accent">.</span>
                    </h2>
                </div>

                {/* muro tipográfico */}
                <div>
                    {GROUPS.map((group) => (
                        <div
                            key={group.label}
                            className="skills-group border-ink/15 flex flex-col gap-4 border-t py-9 md:flex-row md:gap-8"
                        >
                            <div className="w-44 shrink-0 pt-2">
                                <span className="meta opacity-60">
                                    {group.label}
                                </span>
                                <span className="meta text-accent ml-2">
                                    (
                                    {String(group.skills.length).padStart(
                                        2,
                                        '0'
                                    )}
                                    )
                                </span>
                            </div>
                            <p className="flex flex-wrap items-baseline gap-x-7 gap-y-4">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="skill-reveal inline-block"
                                    >
                                        <span className={tierClass[skill.tier]}>
                                            {skill.name}
                                        </span>
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* cinta de acento a contracorriente */}
            <Marquee
                reverse
                duration={34}
                items={[
                    'Siempre aprendiendo',
                    'Código para humanos',
                    'Sin plantillas',
                    'Producción manda'
                ].map((text) => (
                    <span key={text} className="expanded">
                        {text}
                    </span>
                ))}
                className="bg-accent text-paper border-ink mt-20 border-y py-3 text-[clamp(0.85rem,1.5vw,1.15rem)] font-medium"
            />
        </section>
    )
}
