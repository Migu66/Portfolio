import curriculumPdf from '../assets/Curriculum - Miguel González Pascual.pdf'

export function downloadCV() {
    const link = document.createElement('a')
    link.href = curriculumPdf
    link.download = 'Curriculum - Miguel González Pascual.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
