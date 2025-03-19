import { ArrowUpRight } from "lucide-react"
import { LazyVideo } from "@/components/lazy-video"


export default function Home() {
  return (
    <main className="min-h-screen bg-[#16161D] text-[#D2D2FF]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <h1 className="header-1 mb-6 text-[#D2D2FF]">Works of Matt Park</h1>
          <p className="content-1 mx-auto max-w-3xl text-[#D2D2FF]">
            Hi, I'm Matt Changhyun Park, Software engineer with 6 years of experience in high-performance systems development and software engineering.<br /><br />
            I am passionate about performance optimizations, creative coding, and real-time 3D graphics.
          </p>
        </section>

        {/* New Featured Project Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Web is my playground</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              There was a moment in life where I realized I felt nostalgic towards my past: to the moments where I could really be fully present and truly savor each and every moment. I've noticed that this nostalgia fades when I'm building. The web is my playground: a space where I experiment, learn, sometimes get a little silly, and genuinely enjoy the process. <br /><br />
              I invite you to step into my playground - take a moment to explore, play around and catch a glimpse of who I am.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://world.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/mattparkarchive.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>

              </a>
            </div>
          </div>
        </section>

        {/* Post-Processing Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Pixel Level Expression</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              My recent works explore the essence of pixels—the tiny building blocks that shape your experience.
              Every image, every scene, is woven together in these delicate units of light and color. The ability to craft and control at the pixel level allows me to sculpt a world where precision meets imagination.
            </p>
          </div>

          {/* Asymmetrical Grid Layout */}
          <div className="grid grid-cols-12 gap-4 max-w-3xl mx-auto">
            {/* Top row - FIXED HEIGHT */}
            <div className="col-span-9 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://goodtime.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[5/1] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/good-time.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>

              </a>
            </div>

            <div className="col-span-3 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://monalisa.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-square bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/monalisa.mp4"
                  />
                  {/* <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=200&width=200&text=Moebius+shader"
                    muted
                    loop
                    autoPlay
                    playsInline
                  >
                    <source src="/monalisa.mp4" type="video/mp4" />
                  </video> */}
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            {/* Middle row */}
            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://nokia.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[3/4] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/nokia.mp4"
                  />
                  {/* <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=300&text=Dithered+Waves"
                    muted
                    loop
                    autoPlay
                    playsInline
                  >
                    <source src="/nokia.mp4" type="video/mp4" />
                  </video> */}
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            <div className="col-span-6 grid grid-cols-8 gap-4">
              <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
                <a
                  href="https://eye.mattparkarchive.xyz/"
                  className="block w-full h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-full h-full aspect-[16/7] bg-[#252532]">
                    <LazyVideo
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                      src="/eye.mp4"
                    />
                    {/* <video
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=220&width=500&text=Pixel+Art+Generator"
                      muted
                      loop
                      autoPlay
                      playsInline
                    >
                      <source src="/eye.mp4" type="video/mp4" />
                    </video> */}
                  </div>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </a>
              </div>

              <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
                <a
                  href="https://cow.mattparkarchive.xyz/"
                  className="block w-full h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-full h-full aspect-[16/7] bg-[#252532]">
                    <img
                      src="/cow.png"
                      alt="Cow pixel art"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom row */}
            <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://halftone-camera.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[2/1] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/halftone.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            <div className="col-span-4 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://halftone.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/moon.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 3D Modeling Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">3D Modeling & Materials</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              I want to be someone who brings value to the world, someone who creates.
              The value that no one else can bring, the one that only I can offer, is "beauty."<br /><br />

              With my own colors, my own eyes, and my unique perspective, I want to present visual beauty— a beauty that allows people to experience a sense of catharsis or even just a fleeting smile.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 max-w-3xl mx-auto">
            {/* First row - Same ratio as Dithering Portraits and Raymarching Experiment */}
            <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://transparent-cube.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[2/1] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/reflective-cube.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            <div className="col-span-4 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://holographic-text.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/space.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            {/* Second row - Square first, then rectangular */}
            <div className="col-span-4 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://transparent-text.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[2/1] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/torus.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://bar.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[2/1] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/bar.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Experiences Section - ADDED THIRD ROW */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Interactive Experiences</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              While my work speaks for itself, each piece is designed with a purpose—for you. These are some of the works I build in order to create an experience between you and me together.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 max-w-3xl mx-auto">
            {/* First row */}
            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://bowlofwrongs.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/hands.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://lighted-text.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/light.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            {/* Second row (new) - same ratio as first row */}
            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://scroll-particles.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/particles.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            <div className="col-span-6 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://rotating-laptop.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-video bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/mac.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* NEW Gradient Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Gradient Experiments</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              Gradients represent the seamless flow of colors, the transition between emotions, and the depth of perception. To me, gradients are more than just a visual technique—they are a language of harmony, where different shades blend into something entirely new. <br /><br />

              In my work, I try to use gradients to guide the eye, evoke feelings, and create immersive atmospheres. Whether subtle or bold, each gradient is carefully crafted to enhance the experience, adding dimension and emotion to every piece.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 max-w-3xl mx-auto">
            {/* Thinner tall rectangular card on the left */}
            <div className="col-span-4 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
              <a
                href="https://gradient-cat.mattparkarchive.xyz/"
                className="block w-full h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full h-full aspect-[3/4] bg-[#252532]">
                  <LazyVideo
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                    src="/cat.mp4"
                  />
                </div>
                <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                </div>
              </a>
            </div>

            {/* Wider long rectangular cards on the right, stacked vertically */}
            <div className="col-span-8 grid grid-cols-8 gap-4">
              <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
                <a
                  href="https://twisted-text.mattparkarchive.xyz/"
                  className="block w-full h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-full h-full aspect-[16/7] bg-[#252532]">
                    <LazyVideo
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                      src="/spiral.mp4"
                    />
                  </div>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </a>
              </div>

              <div className="col-span-8 relative group bg-[#1E1E27] rounded-lg overflow-hidden">
                <a
                  href="https://gradient-cone.mattparkarchive.xyz/"
                  className="block w-full h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-full h-full aspect-[16/7] bg-[#252532]">
                    <LazyVideo
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=400&width=600&text=Featured+Project"
                      src="/cone.mp4"
                    />
                  </div>
                  <div className="absolute top-3 right-3 p-1 bg-[#16161D]/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D2D2FF]" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Me Section */}
        <section className="mb-24 text-center">
          <h2 className="section-title mb-6 text-[#D2D2FF]">Contact Me</h2>
          <div className="mb-10 mx-auto max-w-3xl">
            <p className="content-1 text-[#D2D2FF]">
              Interested in collaborating or have questions about my work? Feel free to connect with me on social media.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center space-x-8">
              {/* Twitter/X Icon */}
              <a href="https://x.com/mattparkarchive" className="text-[#A5A5E0] hover:text-[#D2D2FF] transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>

              {/* GitHub Icon */}
              <a href="https://github.com/mattverse" className="text-[#A5A5E0] hover:text-[#D2D2FF] transition-colors duration-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>

              {/* LinkedIn Icon */}
              <a href="https://www.linkedin.com/in/mattverse/" className="text-[#A5A5E0] hover:text-[#D2D2FF] transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

