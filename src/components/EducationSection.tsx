import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Technology in Electronics and Communication Engineering",
    institution: "Guru Gobind Singh Indraprastha University",
    year: "2024 - 2028",
    description: "strong focus on software development, web technologies, data structures, and core engineering fundamentals and alongside core ECE subjects",
  },
  {
    degree: "Cohort 3.0 Full Stack Development",
    institution: "100xDevs",
    year: "2025",
    description: "Completed a fast-paced Full Stack Development cohort with hands-on experience in frontend, backend, databases, and real-world project workflows.",
  }
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-muted-foreground mb-4 block">
             // Education
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My Learning Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-background z-10" />

              {/* Content card */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}>
                <div className="p-6 rounded-2xl glass hover-lift">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-mono">{item.year}</span>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <GraduationCap className="h-6 w-6 text-foreground mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.degree}</h3>
                      <p className="text-muted-foreground">{item.institution}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};