 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef } from "react";
 import { ExternalLink, Github, Folder } from "lucide-react";
 
 const projects = [
   {
     title: "E-Commerce Platform",
     description: "A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
     tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
     github: "https://github.com",
     live: "https://example.com",
   },
   {
     title: "Task Management App",
     description: "Collaborative task management tool with real-time updates, team workspaces, and progress tracking.",
     tech: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
     github: "https://github.com",
     live: "https://example.com",
   },
   {
     title: "AI Content Generator",
     description: "AI-powered content creation tool using OpenAI APIs for generating blog posts, social media content, and more.",
     tech: ["Python", "FastAPI", "React", "OpenAI"],
     github: "https://github.com",
     live: "https://example.com",
   },
   {
     title: "Real-time Chat Application",
     description: "Feature-rich chat application with group chats, file sharing, and end-to-end encryption.",
     tech: ["React", "Socket.io", "MongoDB", "Redis"],
     github: "https://github.com",
   },
   {
     title: "Portfolio CMS",
     description: "Headless CMS designed specifically for developer portfolios with markdown support and API access.",
     tech: ["Vue.js", "Express", "GraphQL", "MongoDB"],
     github: "https://github.com",
   },
   {
     title: "DevOps Dashboard",
     description: "Monitoring dashboard for CI/CD pipelines, server metrics, and deployment management.",
     tech: ["React", "Go", "Docker", "Kubernetes"],
     github: "https://github.com",
     live: "https://example.com",
   },
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