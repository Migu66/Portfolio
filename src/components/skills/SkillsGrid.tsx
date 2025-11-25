// Importar logos individuales para las categorías
import htmlLogo from '../../assets/logos/html-5.png'
import cssLogo from '../../assets/logos/css-3.png'
import jsLogo from '../../assets/logos/js.png'
import tsLogo from '../../assets/logos/Typescript.png'
import reactLogo from '../../assets/logos/React.png'
import nextjsLogo from '../../assets/logos/nextjs.png'
import tailwindLogo from '../../assets/logos/Tailwind.png'
import nodeLogo from '../../assets/logos/Node.js.png'
import expressLogo from '../../assets/logos/Expressjs.png'
import csharpLogo from '../../assets/logos/csharp.png'
import aspnetLogo from '../../assets/logos/aspnet.png'
import net from '../../assets/logos/NET_Core.png'
import mysqlLogo from '../../assets/logos/mysql.png'
import sqlLogo from '../../assets/logos/sql.png'
import prismaLogo from '../../assets/logos/prisma.png'
import gitLogo from '../../assets/logos/git.png'
import githubLogo from '../../assets/logos/github.png'
import dockerLogo from '../../assets/logos/docker.png'
import vscodeLogo from '../../assets/logos/Visual_Studio_Code.png'
import postmanLogo from '../../assets/logos/postman.png'
import viteLogo from '../../assets/logos/vite.png'
import vercelLogo from '../../assets/logos/vercel.png'
import npmLogo from '../../assets/logos/Npm.png'
import sqlserverLogo from '../../assets/logos/sqlserver.png'
import cloudinaryLogo from '../../assets/logos/cloudinary.png'
import openiaLogo from '../../assets/logos/openia.png'
import zustandLogo from '../../assets/logos/zustand.png'
import zodLogo from '../../assets/logos/zod.png'

const skillCategories = [
    {
        title: 'Front-End',
        gradient: 'from-red-500 to-orange-500',
        skills: [
            { name: 'HTML', logo: htmlLogo },
            { name: 'CSS', logo: cssLogo },
            { name: 'JavaScript', logo: jsLogo },
            { name: 'TypeScript', logo: tsLogo },
            { name: 'React.js', logo: reactLogo },
            { name: 'Next.js', logo: nextjsLogo },
            { name: 'Tailwind', logo: tailwindLogo },
            { name: 'Zustand', logo: zustandLogo },
            { name: 'Zod', logo: zodLogo }
        ]
    },
    {
        title: 'Back-End',
        gradient: 'from-green-500 to-teal-500',
        skills: [
            { name: 'Node.js', logo: nodeLogo },
            { name: 'Express.js', logo: expressLogo },
            { name: 'C#', logo: csharpLogo },
            { name: 'ASP.NET', logo: aspnetLogo },
            { name: '.NET Core', logo: net },
            { name: 'MySQL', logo: mysqlLogo },
            { name: 'SQL Server', logo: sqlserverLogo },
            { name: 'SQL', logo: sqlLogo },
            { name: 'Prisma', logo: prismaLogo },
            { name: 'OpenAI API', logo: openiaLogo }
        ]
    },
    {
        title: 'Programming',
        gradient: 'from-blue-500 to-purple-500',
        skills: [
            { name: 'JavaScript', logo: jsLogo },
            { name: 'TypeScript', logo: tsLogo },
            { name: 'C#', logo: csharpLogo }
        ]
    },
    {
        title: 'Tech & Tools',
        gradient: 'from-pink-500 to-purple-500',
        skills: [
            { name: 'NPM', logo: npmLogo },
            { name: 'Git', logo: gitLogo },
            { name: 'GitHub', logo: githubLogo },
            { name: 'Docker', logo: dockerLogo },
            { name: 'VS Code', logo: vscodeLogo },
            { name: 'Postman', logo: postmanLogo },
            { name: 'Vite.js', logo: viteLogo },
            { name: 'Vercel', logo: vercelLogo },
            { name: 'Cloudinary', logo: cloudinaryLogo }
        ]
    }
]

export default function SkillsGrid() {
    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-20">
            {/* Contenedor principal con fondo difuminado */}
            <div className="bg-linear-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-700/40 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className={`h-3 w-3 rounded-full bg-linear-to-r ${category.gradient}`}
                                ></div>
                                <h3 className="text-xl font-bold text-white">
                                    {category.title}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300 group"
                                    >
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
