import { ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#16161D] text-[#D2D2FF]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <h1 className="header-1 mb-6 text-[#D2D2FF]">Creative Portfolio</h1>
          <p className="content-1 mx-auto max-w-2xl text-[#D2D2FF]">
            Showcasing a collection of creative works across various disciplines and techniques.
          </p>
        </section>

        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Web is my playground.</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              There was a moment in life where I realized I felt nostalgic towards my past: to the moments where I could really be fully present and truly savor each and every moment.

              I've noticed that this nostalgia fades when I'm building. The web is my playground: a space where I experiment, learn, sometimes get a little silly, and genuinely enjoy the process.I invite you to step into my playground - take a moment to explore, play around and catch a glimpse of who I am.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-video bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Featured Project</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">03.2025</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Post-Processing Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Creative freedom with post-processing</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              Whether it's to achieve a specific style or make your scene go from good to great, adding a dash of
              post-processing can make all the difference. I spent the better part of 2024 experimenting with several
              effects like
              <span className="font-medium"> dithering</span>, <span className="font-medium">color quantization</span>,
              <span className="font-medium"> outlines</span>, and many others that also power the intro scene of this
              portfolio.
            </p>
          </div>

          {/* Add max-w-5xl (1024px) and center it */}
          <div className="grid grid-cols-12 gap-4 max-w-5xl mx-auto">
            {/* Top row */}
            <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-12"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-[2/1] bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=800&text=GPGPU+Particles"
                    muted
                    autoPlay
                    loop
                  >
                    <source src="/a.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">GPGPU Particles & DOF</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">03.2024</span>
                </div>
              </a>
            </div>

            <div className="col-span-4 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-[calc(100%-64px)] bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=400&text=Moebius+shader"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Moebius shader</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">03.2024</span>
                </div>
              </a>
            </div>

            {/* Middle row */}
            <div className="col-span-5 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-[calc(100%-64px)] bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=600&width=450&text=Dithered+Waves"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Dithered Waves</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">07.2024</span>
                </div>
              </a>
            </div>

            <div className="col-span-7 grid grid-cols-7 gap-4">
              <div className="col-span-7 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
                <a
                  href="https://gradient-cat.mattparkarchive.xyz/"
                  className="block h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="aspect-[16/9] bg-[#252532] relative">
                    <video
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=300&width=500&text=Pixel+Art+Generator"
                      muted
                      loop
                    >
                      <source src="#" type="video/mp4" />
                    </video>
                    <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                    </div>
                  </div>
                  <div className="p-4 h-16 flex justify-between items-center text-left">
                    <span className="text-[#D2D2FF] font-ibm-plex-sans">Pixel Art Generator</span>
                    <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">05.2024</span>
                  </div>
                </a>
              </div>

              <div className="col-span-7 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
                <a
                  href="https://gradient-cat.mattparkarchive.xyz/"
                  className="block h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="aspect-[16/9] bg-[#252532] relative">
                    <video
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=300&width=500&text=Color+Quantization"
                      muted
                      loop
                    >
                      <source src="#" type="video/mp4" />
                    </video>
                    <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                    </div>
                  </div>
                  <div className="p-4 h-16 flex justify-between items-center text-left">
                    <span className="text-[#D2D2FF] font-ibm-plex-sans">Color Quantization</span>
                    <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">06.2024</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom row */}
            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-[4/3] bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=500&text=Dithering+Portraits"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Dithering Portraits</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">08.2024</span>
                </div>
              </a>
            </div>

            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-[4/3] bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=500&text=Raymarching+Experiment"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Raymarching Experiment</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">09.2024</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 3D Modeling Section - Keep the original grid layout for other sections */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">3D Modeling & Animation</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              Creating immersive 3D worlds and characters has been a passion of mine for years. These projects showcase
              various techniques in modeling, texturing, and animation that bring digital creations to life.
            </p>
          </div>

          {/* Add max-w-5xl and center it */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-video bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Character+Animation"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Character Animation</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">05.2024</span>
                </div>
              </a>
            </div>

            <div className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-video bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Environment+Design"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Environment Design</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">06.2024</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Experiences Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Interactive Experiences</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              Pushing the boundaries of what's possible with web technologies and real-time graphics. These projects
              focus on creating engaging, interactive experiences that respond to user input and create memorable
              moments.
            </p>
          </div>

          {/* Add max-w-5xl and center it */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-video bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=WebGL+Experience"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">WebGL Experience</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">09.2024</span>
                </div>
              </a>
            </div>

            <div className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-video bg-[#252532] relative">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Interactive+Installation"
                    muted
                    loop
                  >
                    <source src="#" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </div>
                <div className="p-4 h-16 flex justify-between items-center text-left">
                  <span className="text-[#D2D2FF] font-ibm-plex-sans">Interactive Installation</span>
                  <span className="text-sm text-[#A5A5E0] font-ibm-plex-sans">10.2024</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

