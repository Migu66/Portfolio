import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import interCodeViewImg from '../../assets/InterCodeView.png'
import tikitImg from '../../assets/Tikit.png'

gsap.registerPlugin(ScrollTrigger)

interface Project {
    index: string
    title: string
    description: string
    image: string
    caption: string
    github: string
    demo: string
    technologies: string[]
}

const PROJECTS: Project[] = [
    {
        index: '01',
        title: 'InterCodeView',
        description:
            'Plataforma para practicar entrevistas técnicas: más de 150 ejercicios en 13 lenguajes con editor Monaco integrado, y un LLM que evalúa tu código en tiempo real con feedback personalizado y puntuación automática.',
        image: interCodeViewImg,
        caption: 'fig. 02 — inter-code-view.vercel.app / captura',
        github: 'https://github.com/Migu66/InterCodeView',
        demo: 'https://inter-code-view.vercel.app/',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL']
    },
    {
        index: '02',
        title: 'Tikit',
        description:
            'Digitaliza tickets de compra: subes la foto, OCR e IA extraen los datos y clasifican el gasto. Estadísticas con gráficos interactivos, interfaz en ES/EN y más del 80% de cobertura de tests con CI/CD.',
        image: tikitImg,
        caption: 'fig. 03 — tikit-drab.vercel.app / captura',
        github: 'https://github.com/Migu66/Tikit',
        demo: 'https://tikit-drab.vercel.app/es',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL']
    }
]

/**
 * Proyectos: cada uno es un spread asimétrico distinto — número
 * vaciado gigante, captura con marco naranja desplazado y título que
 * invade la imagen sobre bandas de papel. Composición espejada en el
 * segundo proyecto.
 */
export default function Projects() {
    const rootRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.utils
                    .toArray<HTMLElement>('.project-spread')
                    .forEach((spread) => {
                        const img = spread.querySelector('.project-img')
                        const number = spread.querySelector('.project-number')
                        const content = spread.querySelectorAll(
                            '.project-content > *'
                        )

                        // parallax interno de la captura (el Sistema
                        // ABAC es solo ficha, sin imagen)
                        if (img) {
                            gsap.fromTo(
                                img,
                                { yPercent: -8 },
                                {
                                    yPercent: 8,
                                    ease: 'none',
                                    scrollTrigger: {
                                        trigger: spread,
                                        start: 'top bottom',
                                        end: 'bottom top',
                                        scrub: true
                                    }
                                }
                            )
                        }

                        gsap.from(number, {
                            y: 90,
                            opacity: 0,
                            duration: 1,
                            ease: 'expo.out',
                            scrollTrigger: {
                                trigger: spread,
                                start: 'top 75%',
                                once: true
                            }
                        })

                        gsap.from(content, {
                            y: 50,
                            opacity: 0,
                            duration: 0.85,
                            stagger: 0.1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: spread,
                                start: 'top 70%',
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
            id="proyectos"
            className="relative px-5 py-28 md:px-10 md:py-40"
        >
            <div className="mb-20 flex items-center gap-5 md:mb-32">
                <span className="meta">(04)</span>
                <span className="expanded text-sm font-semibold">
                    Proyectos seleccionados
                </span>
                <span className="bg-ink/20 h-px flex-1" />
                <span className="meta text-muted">
                    Tres — con el código a la vista
                </span>
            </div>

            <div className="flex flex-col gap-32 md:gap-48">
                {PROJECTS.map((project, i) => {
                    const mirrored = i % 2 === 1
                    return (
                        <article
                            key={project.index}
                            className="project-spread grid grid-cols-1 items-start gap-10 lg:grid-cols-12"
                        >
                            {/* captura con marco naranja + número vaciado */}
                            <div
                                className={`relative lg:col-span-7 ${
                                    mirrored ? 'lg:order-2 lg:col-start-6' : ''
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`project-number text-outline-diff font-display absolute z-20 text-[clamp(4.5rem,11vw,10rem)] leading-none font-semibold ${
                                        mirrored
                                            ? '-top-12 right-2 md:right-4'
                                            : '-top-12 -left-2 md:-left-6'
                                    }`}
                                >
                                    {project.index}
                                </span>

                                <div className="bg-accent absolute inset-0 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4" />
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor="ver"
                                    aria-label={`Abrir demo de ${project.title}`}
                                    className="group relative block overflow-hidden"
                                >
                                    <div className="aspect-16/10 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={`Captura de ${project.title}`}
                                            className="project-img h-full w-full scale-110 object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                                        />
                                    </div>
                                </a>
                                <p className="meta mt-3 opacity-60">
                                    {project.caption}
                                </p>
                            </div>

                            {/* texto que invade la captura */}
                            <div
                                className={`project-content relative z-10 lg:col-span-5 lg:pt-16 ${
                                    mirrored
                                        ? 'lg:order-1 lg:col-start-1 lg:text-right'
                                        : ''
                                }`}
                            >
                                {/* solo el título invade la captura: la
                                    banda de tinta lo mantiene legible
                                    sobre capturas claras y oscuras */}
                                <h3
                                    className={`font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.02] font-semibold tracking-tight ${
                                        mirrored ? 'lg:-mr-14' : 'lg:-ml-14'
                                    }`}
                                >
                                    <span className="bg-ink text-paper box-decoration-clone px-3 py-1">
                                        {project.title}
                                    </span>
                                </h3>

                                <p
                                    className={`mt-8 max-w-md leading-relaxed ${
                                        mirrored ? 'lg:ml-auto' : ''
                                    }`}
                                >
                                    {project.description}
                                </p>

                                <p className="meta text-muted mt-6">
                                    {project.technologies.join(' / ')}
                                </p>

                                <div
                                    className={`mt-10 flex gap-10 ${
                                        mirrored ? 'lg:justify-end' : ''
                                    }`}
                                >
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="u-link-active u-link text-accent expanded text-sm font-semibold"
                                    >
                                        Ver demo ↗
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="u-link expanded text-sm font-semibold"
                                    >
                                        Código ↗
                                    </a>
                                </div>
                            </div>
                        </article>
                    )
                })}

                {/* el tercero: API pura, sin captura — ficha técnica */}
                <article className="project-spread border-ink/20 relative border-y py-14 md:py-16">
                    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
                        <span
                            aria-hidden="true"
                            className="project-number text-outline font-display text-[clamp(4rem,9vw,8rem)] leading-none font-semibold"
                        >
                            03
                        </span>
                        <div className="project-content flex flex-1 flex-wrap items-baseline justify-between gap-6">
                            <h3 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-none font-semibold tracking-tight">
                                Sistema ABAC
                            </h3>
                            <span className="border-accent text-accent meta -rotate-6 border-2 px-3 py-1.5 font-bold">
                                API · Sin interfaz
                            </span>
                        </div>
                    </div>
                    <div className="project-content mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <p className="max-w-xl leading-relaxed lg:col-span-7">
                            Control de acceso basado en atributos con motor de
                            políticas dinámicas, construido en C# bajo Clean
                            Architecture y DDD: JWT con refresh tokens, rate
                            limiting, auditoría completa de accesos y despliegue
                            en Azure con Docker. Sin pantallas que enseñar — el
                            diseño está en el código.
                        </p>
                        <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
                            <p className="meta text-muted">
                                C# / .NET / Entity Framework / SQL Server /
                                Azure / xUnit
                            </p>
                            <a
                                href="https://github.com/Migu66/Sistema-ABAC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="u-link expanded mt-8 inline-block text-sm font-semibold"
                            >
                                Código ↗
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}
