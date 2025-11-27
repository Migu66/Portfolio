import { Github, Linkedin, FileText } from 'lucide-react'
import { useFadeInUp } from '../../hooks/useScrollAnimation'
import curriculumPdf from '../../assets/Curriculum - Miguel González Pascual.pdf'

export default function Footer() {
    const footerRef = useFadeInUp(0.8)

    const handleDownloadCV = () => {
        const link = document.createElement('a')
        link.href = curriculumPdf
        link.download = 'Curriculum - Miguel González Pascual.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <footer
            ref={footerRef}
            className="relative py-12 px-6 md:px-12 lg:px-24 border-t border-gray-800/50 backdrop-blur-lg bg-black/30"
        >
            <div className="max-w-7xl mx-auto bg-linear-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/40 shadow-2xl">
                {/* Contenido principal del footer */}
                <div className="flex flex-col items-center gap-8">
                    {/* Nombre y título */}
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#148bdb] to-[#B57EDC] mb-2">
                            Miguel González Pascual
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base">
                            Desarrollador Fullstack
                        </p>
                    </div>

                    {/* Enlaces sociales */}
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/Migu66"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-4 bg-linear-to-r from-[#0D0716]/80 to-[#1D0D26]/80 rounded-xl border border-gray-700 hover:border-[#148bdb] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#148bdb]/50 hover:-translate-y-1"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:rotate-12" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/miguel-gonz%C3%A1lez-pascual-9a62b6292/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-4 bg-linear-to-r from-[#0D0716]/80 to-[#1D0D26]/80 rounded-xl border border-gray-700 hover:border-[#148bdb] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#148bdb]/50 hover:-translate-y-1"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:rotate-12" />
                        </a>

                        <button
                            onClick={handleDownloadCV}
                            className="group relative p-4 bg-linear-to-r from-[#0D0716]/80 to-[#1D0D26]/80 rounded-xl border border-gray-700 hover:border-[#B57EDC] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#B57EDC]/50 hover:-translate-y-1 cursor-pointer"
                            aria-label="Descargar Currículum"
                            title="Descargar CV"
                        >
                            <FileText className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:rotate-12" />
                        </button>
                    </div>

                    {/* Línea divisoria */}
                    <div className="w-full max-w-md h-px bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>

                    {/* Copyright */}
                    <div className="text-center text-gray-500 text-sm">
                        <p>
                            © {new Date().getFullYear()} Miguel González
                            Pascual. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>

            {/* Efecto de brillo de fondo */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#148bdb] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#B57EDC] rounded-full blur-[100px]"></div>
            </div>
        </footer>
    )
}
