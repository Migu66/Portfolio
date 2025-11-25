import LogoLoop from './LogoLoop'
import SkillsGrid from './SkillsGrid'
import { techLogos } from '../../lib/TechLogos'

export default function Skills() {
    return (
        <section id="skills" className="relative py-16">
            <div className="px-6 md:px-12 lg:px-9 py-16 w-full">
                <div className="mb-16 lg:pl-25">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#148bdb] to-[#B57EDC] tracking-wider pb-2 lg:px-18">
                        Tecnologias y Herramientas
                    </h2>
                    <div className="h-1 w-24 bg-linear-to-r from-[#148bdb] to-[#B57EDC] mt-4 rounded-full lg:ml-18"></div>
                </div>
            </div>
            <div
                className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
                style={{ height: '120px', overflow: 'hidden' }}
            >
                {/* Basic horizontal loop */}
                <LogoLoop
                    logos={techLogos}
                    speed={120}
                    direction="left"
                    logoHeight={80}
                    gap={50}
                    hoverSpeed={0}
                    scaleOnHover
                    ariaLabel="Technology partners"
                />
            </div>

            {/* Categorías de habilidades */}
            <SkillsGrid />
        </section>
    )
}
