import {
    useFadeInUp,
    useStaggerAnimation
} from '../../hooks/useScrollAnimation'

interface ExperienceItem {
    period: string
    role: string
    company: string
    description: string
}

const experiences: ExperienceItem[] = [
    {
        period: 'sept 2024 - dic 2024',
        role: 'Prácticas ICP',
        company: 'ICP',
        description:
            'Durante las prácticas, diseñé y desarrollé una aplicación en C# con base de datos SQL para representar el flujo y gestión de una operativa logística, incluyendo el control de entradas, salidas y el estado de los pedidos.'
    },
    {
        period: 'ene 2025 - may 2025',
        role: 'Soporte IT nivel 2',
        company: 'ICP',
        description:
            'Experiencia como Soporte IT de nivel 2, resolviendo incidencias técnicas y realizando mejoras funcionales en aplicaciones logísticas internas. Uso de Visual Basic, C# y SQL Server para adaptar y actualizar el software según las necesidades del equipo operativo.'
    }
]

export default function Experience() {
    const titleRef = useFadeInUp(1)
    const experiencesRef = useStaggerAnimation('.experience-item', 0.2)

    return (
        <section
            id="experience"
            className="relative py-16 px-4 md:px-8 lg:px-16"
        >
            <div className="px-6 md:px-12 lg:px-9 py-16 w-full">
                {/* Título con efecto brillante */}
                <div ref={titleRef} className="mb-16 lg:pl-25">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#148bdb] to-[#B57EDC] tracking-wider pb-2">
                        Experiencia Laboral
                    </h2>
                    <div className="h-1 w-24 bg-linear-to-r from-[#148bdb] to-[#B57EDC] mt-4 rounded-full"></div>
                </div>

                <div className="relative max-w-4xl mx-auto pb-12">
                    {/* Línea vertical con flecha */}
                    <div className="absolute left-0 md:left-8 top-3 h-[calc(92%+3rem)] md:h-[calc(88%+3rem)] w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500"></div>

                    {/* Punta de flecha */}
                    <div className="absolute -left-1.5 md:left-[26px] bottom-0 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-12 border-t-pink-500"></div>

                    {/* Items de experiencia */}
                    <div ref={experiencesRef} className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="experience-item relative pl-8 md:pl-20"
                            >
                                {/* Punto en la línea */}
                                <div className="absolute -left-2 md:left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>

                                {/* Contenido */}
                                <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-[#148bdb]/70 transition-all duration-300 hover:shadow-lg hover:shadow-[#148bdb]/30">
                                    <div className="text-sm text-[#148bdb] font-semibold mb-2">
                                        {exp.period}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">
                                        {exp.role}
                                    </h3>
                                    <div className="text-gray-300 mb-4">
                                        {exp.company}
                                    </div>
                                    <p className="text-gray-100 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
