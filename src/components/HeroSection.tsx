 import { motion } from "framer-motion";
 import { Github, Linkedin, Twitter, Mail, ArrowDown } from "lucide-react";
 
 const socialLinks = [
   { icon: Github, href: "https://github.com", label: "GitHub" },
   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
   { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
   { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
 ];
 
 export const HeroSection = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
       {/* Spotlight effect */}
       <div className="absolute inset-0 spotlight" />
       
       {/* Animated grid background */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
 
       <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="mb-6"
         >
           <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-muted-foreground">
             Full Stack Developer
           </span>
         </motion.div>
 
         <motion.h1
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
         >
           <span className="text-foreground">Hi, I'm </span>
           <span className="relative">
             <span className="text-gradient bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
               John Doe
             </span>
             <motion.span
               className="absolute -bottom-2 left-0 w-full h-1 bg-foreground/20 rounded-full"
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 0.8, delay: 0.5 }}
             />
           </span>
         </motion.h1>
 
         <motion.p
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
         >
           I craft modern web experiences with clean code and pixel-perfect designs.
           Passionate about building scalable applications that make a difference.
         </motion.p>
 
         {/* Social Links */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="flex items-center justify-center gap-4 mb-16"
         >
           {socialLinks.map((link, index) => (
             <motion.a
               key={link.label}
               href={link.href}
               target="_blank"
               rel="noopener noreferrer"
               whileHover={{ scale: 1.1, y: -3 }}
               whileTap={{ scale: 0.95 }}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
               className="p-3 rounded-full glass hover-glow group"
               aria-label={link.label}
             >
               <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
             </motion.a>
           ))}
         </motion.div>
 
         {/* Scroll indicator */}
         <motion.a
           href="#about"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1, y: [0, 10, 0] }}
           transition={{ 
             opacity: { delay: 0.8 },
             y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
           }}
           className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
         >
           <span className="text-sm font-medium">Scroll to explore</span>
           <ArrowDown className="h-5 w-5" />
         </motion.a>
       </div>
     </section>
   );
 };