import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder, Library } from "lucide-react";

const projects = [
  {
    title: "Metaverse-2D",
    description: "Metaverse-2D brings virtual spaces to life in a 2D environment, allowing users to explore, interact, and experience digital worlds through a modern full-stack web platform.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Express", "Turborepo"],
    github: "https://github.com/Txnishkk93/Metaverse-2d",
    live: "https://x.com/_txnishkk_/status/2012539973631942690?s=20",
  },
  {
    title: "Video Downloader Application",
    description: "A web-based video downloader that allows users to fetch and download videos from supported URLs using a Next.js frontend and a Python backend powered by yt-dlp.",
    tech: ["Next.js", "TypeScript", "Python", "Yt-dlp Library", "Express"],
    github: "https://github.com/Txnishkk93/video-downloader-from-url",
    live: "https://x.com/_txnishkk_/status/2013585593377194294?s=20",
  },
  {
    title: "Movie booking platform",
    description: "Movie booking platform featuring movie listings, showtime selection, seat booking, and a smooth user experience powered by React and Vite.",
    tech: ["React", "Node.js", "TypeScript", "Express"],
    github: "https://github.com/Txnishkk93/Movie-booking-app",
    live: "https://x.com/_txnishkk_/status/2018383330107162938?s=20",
  },
  {
    title: "Paytm Clone (Digital Wallet Application)",
    description: "A full-stack digital wallet application enabling user authentication, wallet balance management, and secure money transfers, built using Vite, React, TypeScript, and Node.js.",
    tech: ["Vite", "React", "TypeScript", "Node.js", "Express"],

    github: "https://github.com/Txnishkk93/PaytmProject",
    live: "https://x.com/_txnishkk_/status/2019392182147592255?s=20"
  },
  {
    title: "AirPods Pro – Cinematic Product Landing Page",
    description: "An Apple-inspired, scroll-driven product landing page showcasing AirPods with cinematic storytelling, smooth image-sequence animations, and premium typography. The experience focuses on luxury aesthetics, seamless transitions, and an immersive engineering-style reveal, delivering a flagship-level product presentation.",
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Scroll-based Animation"
    ],

    github: "https://github.com/Txnishkk93/airpods-landing-page",
    live: "https://airpods-landing-page-mu.vercel.app/"
  }, {
    title: "Formula 1 – Cinematic Engineering Showcase",
    description: "An Apple-inspired, scroll-driven Formula 1 car landing page that presents F1 engineering as a cinematic product reveal. The experience features smooth scrollytelling, a high-resolution exploded car animation, and premium typography to showcase aerodynamics, power unit technology, and performance with a flagship-level visual narrative.",
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Scroll-based Image Sequences"
    ],
    github: "https://github.com/Txnishkk93/f1-car-landing-page.git",
    live: "https://f1-car-landing-page.vercel.app/"
  }
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-muted-foreground mb-4 block">
             // Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've worked on. Each one taught me something new.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative p-6 rounded-2xl glass hover-lift h-full flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <Folder className="h-10 w-10 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};