import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    index: "01",
    degree: "B.Tech, Electronics & Communication Engineering",
    institution: "Guru Gobind Singh Indraprastha University",
    year: "2024 — 2028",
    location: "Delhi, India",
    description:
      "Strong focus on software development, web technologies, and data structures alongside core ECE subjects.",
    image: "/projects/clg.jpg", // optional — leave blank/remove if you don't have one
  },
  {
    index: "02",
    degree: "Cohort 3.0 — Full Stack Development",
    institution: "100xDevs",
    year: "2025",
    location: "Online . 1 Year",
    description:
      "Fast-paced cohort covering frontend, backend, databases, and real-world project workflows,  taught by Harkirat Singh",
    image: "/projects/edu02.png",
  },
  {
    index: "03",
    degree: "Node.js — Beginner to Advance",
    institution: "Udemy",
    year: "2025",
    location: "Online · 36.5 hrs",
    description:
      "Node.js fundamentals through advanced backend concepts, taught by Hitesh Choudhary & Piyush Garg.",
    image: "/projects/edu03.jpg",
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="px-4 py-16 sm:px-6 md:py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-4 block text-sm font-mono text-muted-foreground">
            Education
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
            My Learning Journey
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="group rounded-2xl overflow-hidden border border-border bg-background hover-lift"
            >
              {/* Photo, if provided — falls back to a plain numbered block */}
              <div className="relative aspect-[4/5] bg-secondary/40 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.degree}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}

                {/* Corner metadata, poster-style */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-[10px] font-mono uppercase tracking-wide text-foreground/70">
                  <span>{item.year}</span>
                  <span className="text-right">{item.location}</span>
                </div>

                <div className="absolute bottom-4 left-4 text-6xl font-bold text-foreground/10 leading-none select-none">
                  {item.index}
                </div>
              </div>

              {/* Text block */}
              <div className="p-6">
                <h3 className="text-base font-semibold leading-snug mb-1">
                  {item.degree}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.institution}
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};