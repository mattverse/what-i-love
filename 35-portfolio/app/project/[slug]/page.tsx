import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch project data based on the slug
  const projectTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <main className="min-h-screen bg-[#16161D] text-[#D2D2FF]">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-[#A5A5E0] hover:text-[#D2D2FF] mb-8 font-ibm-plex-sans">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to portfolio
        </Link>

        <h1 className="header-1 mb-6 text-center text-[#D2D2FF]">{projectTitle}</h1>

        <div className="aspect-video bg-[#1E1E27] rounded-lg mb-8">
          <video
            className="w-full h-full object-cover rounded-lg"
            poster="/placeholder.svg?height=600&width=1200"
            controls
          >
            <source src="#" type="video/mp4" />
          </video>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 text-center md:text-center">
            <h2 className="section-title mb-4 text-center text-[#D2D2FF]">About this project</h2>
            <p className="content-1 mb-4 text-[#D2D2FF]">
              This is a detailed description of the project, explaining the creative process, technical challenges, and
              the solutions implemented. The content would be specific to each individual project.
            </p>
            <p className="content-1 mb-4 text-[#D2D2FF]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>

          <div className="text-center md:text-center">
            <h2 className="section-title mb-4 text-center text-[#D2D2FF]">Project details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-[#A5A5E0] font-ibm-plex-sans">Date</h3>
                <p className="content-1 text-[#D2D2FF]">March 2024</p>
              </div>
              <div>
                <h3 className="text-sm text-[#A5A5E0] font-ibm-plex-sans">Tools</h3>
                <p className="content-1 text-[#D2D2FF]">Blender, Three.js, WebGL</p>
              </div>
              <div>
                <h3 className="text-sm text-[#A5A5E0] font-ibm-plex-sans">Category</h3>
                <p className="content-1 text-[#D2D2FF]">3D Animation, Post-processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

