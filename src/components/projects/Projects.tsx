import { Github, ExternalLink } from 'lucide-react'
import InterCodeViewImg from '../../assets/InterCodeView.png'
import TikitImg from '../../assets/Tikit.png'
import {
    useFadeInUp,
    useStaggerAnimation
} from '../../hooks/useScrollAnimation'

export default function Projects() {
    const titleRef = useFadeInUp(0)
    const projectsRef = useStaggerAnimation('.project-card', 0.15)

    const projects = [
        {
            title: 'InterCodeView',
            description:
                'Plataforma interactiva para visualización de código con IA que ofrece análisis inteligente, sugerencias automáticas en tiempo real.',
            image: InterCodeViewImg,
            github: 'https://github.com/Migu66/InterCodeView',
            demo: 'https://inter-code-view.vercel.app/',
            technologies: ['React', 'TypeScript', 'Node.js']
        },
        {
            title: 'Tikit',
            description:
                'Aplicación para gestionar y analizar tus tickets de compra usando IA. Obtén estadísticas detalladas de tus gastos y analiza patrones de consumo.',
            image: TikitImg,
            github: 'https://github.com/Migu66/Tikit',
            demo: 'https://tikit-drab.vercel.app/es',
            technologies: ['React', 'Next.js', 'Tailwind']
        },
        {
            title: 'Próximamente',
            description:
                'Nuevo proyecto en desarrollo. Mantente atento para más novedades.',
            image: null,
            github: null,
            demo: null,
            technologies: [],
            comingSoon: true
        }
    ]

    return (
        <section id="projects" className="relative py-16 px-4 md:px-8 lg:px-16">
            <div className="px-6 md:px-12 lg:px-9 py-16 w-full">
                <div ref={titleRef} className="mb-16 lg:pl-25">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#148bdb] to-[#B57EDC] tracking-wider pb-2">
                        Mis proyectos
                    </h2>
                    <div className="h-1 w-24 bg-linear-to-r from-[#148bdb] to-[#B57EDC] mt-4 rounded-full"></div>
                </div>

                <div
                    ref={projectsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-0 md:px-8 lg:px-35"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`project-card group relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 hover:rotate-1 ${
                                project.comingSoon ? 'opacity-75' : ''
                            }`}
                            style={{
                                transformStyle: 'preserve-3d',
                                transition:
                                    'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {/* Imagen del proyecto */}
                            <div className="relative h-56 bg-gray-800 overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-700 to-gray-800">
                                        <div className="text-center">
                                            <div className="text-6xl mb-2">
                                                🚀
                                            </div>
                                            <p className="text-gray-400 text-sm">
                                                En desarrollo
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Contenido */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tecnologías */}
                                {project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 transition-all duration-300 hover:bg-blue-500/30 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Botones */}
                                {!project.comingSoon && (
                                    <div className="flex gap-3 mt-6">
                                        <a
                                            href={project.github!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 hover:-translate-y-1"
                                        >
                                            <Github
                                                size={18}
                                                className="transition-transform duration-300 group-hover:rotate-12"
                                            />
                                            <span className="font-medium">
                                                GitHub
                                            </span>
                                        </a>
                                        <a
                                            href={project.demo!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 hover:-translate-y-1"
                                        >
                                            <ExternalLink
                                                size={18}
                                                className="transition-transform duration-300 group-hover:rotate-12"
                                            />
                                            <span className="font-medium">
                                                Demo
                                            </span>
                                        </a>
                                    </div>
                                )}

                                {project.comingSoon && (
                                    <div className="mt-6">
                                        <div className="px-4 py-2.5 bg-linear-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-center font-medium">
                                            Próximamente
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Efecto de brillo en hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
