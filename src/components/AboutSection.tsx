 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef } from "react";
 import { Code2, Palette, Zap, Users } from "lucide-react";
 import profileImg from '../assests/tanishk.webp'
 
 const skills = [
   { icon: Code2, title: "Frontend", description: "React, TypeScript, Next.js, Tailwind CSS" },
   { icon: Zap, title: "Backend", description: "Node.js, Python, PostgreSQL, MongoDB" },
   { icon: Palette, title: "Others", description: "Python, Responsive Design, Basic Machine Learning Concepts" },
   { icon: Users, title: "Tools & Platforms", description: "Git, GitHub, Monorepo Architecture (Turborepo) "},
 ];
 
 export const AboutSection = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   return (
     <section id="about" className="py-32 px-6" ref={ref}>
       <div className="max-w-6xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
           <span className="text-sm font-mono text-muted-foreground mb-4 block">
             // About Me
           </span>
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
             Turning ideas into reality
           </h2>
         </motion.div>
 
         <div className="grid lg:grid-cols-2 gap-16 items-center">
           {/* Profile Image */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="relative"
           >
             <div className="relative w-full aspect-square max-w-md mx-auto">
               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-muted to-accent rotate-6 glow-lg" />
               <div className="absolute inset-0 rounded-3xl glass overflow-hidden">
                 <img
                   src={profileImg}
                   alt="Profile"
                   className="w-full h-full object-cover"
                 />
               </div>
               {/* Floating badge */}
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -bottom-4 -right-4 px-4 py-2 glass rounded-full"
               >
                 <span className="text-sm font-mono">Fresher | 19, Delhi</span>
               </motion.div>
             </div>
           </motion.div>
 
           {/* About Content */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.3 }}
           >
             <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Full-stack developer experienced in scalable web apps, REST APIs, authentication, and frontend–backend integration using TypeScript, Node.js, Next.js, and modern databases.
             </p>
             <p className="text-lg text-muted-foreground leading-relaxed mb-10">
               When I'm not coding, you'll find me exploring new technologies, or sharing knowledge with the developer 
               community.
             </p>
 
             {/* Skills Grid */}
             <div className="grid sm:grid-cols-2 gap-4">
               {skills.map((skill, index) => (
                 <motion.div
                   key={skill.title}
                   initial={{ opacity: 0, y: 20 }}
                   animate={isInView ? { opacity: 1, y: 0 } : {}}
                   transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                   className="p-4 rounded-xl glass hover-lift group cursor-default"
                 >
                   <skill.icon className="h-6 w-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                   <h3 className="font-semibold mb-1">{skill.title}</h3>
                   <p className="text-sm text-muted-foreground">{skill.description}</p>
                 </motion.div>
               ))}
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };