import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  date: string
  poster: string
  videoSrc?: string
}

interface PortfolioSectionProps {
  title: string
  description: string
  projects: Project[]
}

export function PortfolioSection({ title, description, projects }: PortfolioSectionProps) {
  return (
    <section className="mb-24 text-center">
      <h2 className="section-title mb-6 text-[#D2D2FF]">{title}</h2>
      <div className="mb-10 mx-auto max-w-3xl">
        <p className="content-1 text-[#D2D2FF]">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
            <a
              href="https://gradient-cat.mattparkarchive.xyz/"
              className="block w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full h-full aspect-video bg-[#252532]">
                <video className="w-full h-full object-cover" poster={project.poster} muted loop>
                  {project.videoSrc && <source src={project.videoSrc} type="video/mp4" />}
                </video>
              </div>
              <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[#D2D2FF] font-ibm-plex-sans">{project.title}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

