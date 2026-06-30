import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CardDemo from "@/components/ui/cards-demo-1";

const projects = [
  {
    title: "PredictX – Prediction Market Exchange",
    description:
      "Built a Polymarket-inspired prediction market exchange that enables users to trade on real-world event outcomes through YES/NO markets. Features authentication, wallet management, order-book based trading, market creation, position tracking, and real-time price discovery. Engineered with a scalable TypeScript backend, PostgreSQL database, and modern React frontend.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS"
    ],
    github: "https://github.com/Txnishkk93/Polymarket",
    live: "https://predictx-polymarket.vercel.app/",
    coverImage: "/projects/social-network-poster.jpg",
    hoverGif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif"
  },
  {
    title: "readable.ai – AI Response Renderer",
    description:
      "An open-source monorepo library that parses any LLM response into structured data and renders it as beautiful UI in three lines of code — with metric detection, intent classification, confidence scoring, and streaming support. Ships as a React component library, a zero-dependency core parser, and a UMD embed bundle.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "pnpm Workspaces"],
    github: "https://github.com/Txnishkk93/readable.ai",
    live: "https://readable-ai.vercel.app/",
    coverImage: "/projects/eye-close-up.jpg",
    hoverGif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG44NmMwbHJyMzR5enhva2hhZ2plNXAzcXVoaG1vdzZtOXlyb251dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8hYcOUTk27QVDTqY5I/giphy.gif"
  },
  {
    title: "आत्mann – Mental Wellness Companion",
    description:
      "A full-stack mental wellness platform featuring AI-powered chat for stress and anxiety support, daily mood tracking with pattern visualization, free-form journaling with emotional insights, and a burnout assessment tool — built for students and professionals.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Txnishkk93/MindWell--e6",
    live: "https://aatmann.vercel.app/",
    coverImage: "/projects/coder.jpg",
    hoverGif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjg4dGM4YWw3amhta2NlY2Yxczh3ZnJ1bndvY2gwZ280MGs2N20xciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RkCiLT8fUW9vMPXA5J/giphy.gif"
  },
  {
    title: "BlackSignal – Real-Time World Monitor",
    description: "A real-time global crisis monitoring dashboard that visualizes conflicts, geopolitical tensions, and breaking world events through live analytics, heatmaps, and alert systems. Designed as a modern Conflict-as-a-Service (CaaS) platform with a clean, data-driven interface.",
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript"
    ],
    github: "https://github.com/Txnishkk93/world-monitor.git",
    live: "https://blacksignal-worldmonitor.vercel.app/",
    coverImage: "/projects/binary-matrix.jpg",
    hoverGif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3hsMno1Y3pzeXJtdTZsbHFhOXZoc2pudjcxaDUwanNodzM4dG9oaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/u9293Xrizd0tO/giphy.gif"
  },
  {
    title: "Metaverse-2D",
    description: "Metaverse-2D brings virtual spaces to life in a 2D environment, allowing users to explore, interact, and experience digital worlds through a modern full-stack web platform.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Express", "Turborepo"],
    github: "https://github.com/Txnishkk93/Metaverse-2d",
    live: "https://x.com/_txnishkk_/status/2012539973631942690?s=20",
    coverImage: "/projects/formula.jpg",
    hoverGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTN0Znc3NzBjczJldWJoMmk3N2hrbWc5ODB0OXljaXk5Z2V0OXc3cyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/SVCSsoKU5v6ZJLk07n/giphy.gif"
  },
  {
    title: "DarkDrop",
    description: "A web-based video downloader that allows users to fetch and download videos from supported URLs using a Next.js frontend and a Python backend powered by yt-dlp.",
    tech: ["Next.js", "TypeScript", "Python", "Yt-dlp Library", "Express"],
    github: "https://github.com/Txnishkk93/video-downloader-from-url",
    live: "https://x.com/_txnishkk_/status/2013585593377194294?s=20",
    coverImage: "/projects/se7en.jpg",
    hoverGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejdtYmZ1bGk3eDg1bDczeDBoZWl0MnY1c2QwcnpoYW9ibGp1cDR1cyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/9PrJfVcDBQgXMu8DOM/giphy.gif"
  },
  {
    title: "Paytm Clone (Digital Wallet Application)",
    description: "A full-stack digital wallet application enabling user authentication, wallet balance management, and secure money transfers, built using Vite, React, TypeScript, and Node.js.",
    tech: ["Vite", "React", "TypeScript", "Node.js", "Express"],
    github: "https://github.com/Txnishkk93/PaytmProject",
    live: "https://x.com/_txnishkk_/status/2019392182147592255?s=20",
    coverImage: "/projects/steve.jpg",
    hoverGif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3YwNWt6c2loNThpaXZ6bWw5dGI1cGU4NnAyNXVpNDQ2NWxwNTdrdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPm3BynUpUysTHW/giphy.gif"
  },
  {
    title: "Movie booking platform",
    description: "Movie booking platform featuring movie listings, showtime selection, seat booking, and a smooth user experience powered by React and Vite.",
    tech: ["React", "Node.js", "TypeScript", "Express"],
    github: "https://github.com/Txnishkk93/Movie-booking-app",
    live: "https://x.com/_txnishkk_/status/2018383330107162938?s=20",
    coverImage: "/projects/social.jpg",
    hoverGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2l5eXZsdmJwNWtxZ2xhYWc4bHhrcXB5ejdiNTNlcTU3ODU2M3BraCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xrvCI5ykhg9QQ/giphy.gif"
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
              className="h-full"
            >
              <CardDemo
                title={project.title}
                description={project.description}
                tech={project.tech}
                github={project.github}
                live={project.live}
                coverImage={project.coverImage}
                hoverGif={project.hoverGif}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};