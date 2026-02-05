 import { motion } from "framer-motion";
 import { useInView } from "framer-motion";
 import { useRef } from "react";
 import { Github, Linkedin, Twitter, Mail, MapPin, Send } from "lucide-react";
 
 const socialLinks = [
   { icon: Github, href: "https://github.com/Txnishkk93", label: "GitHub", username: "@Taxnishkk93" },
   { icon: Linkedin, href: "https://www.linkedin.com/in/tanishk-rajput-a74418378/", label: "LinkedIn", username: "Tanishk Rajput" },
   { icon: Twitter, href: "https://x.com/_txnishkk_", label: "Twitter", username: "@_txnishkk_" },
   { icon: Mail, href: "rajputt4ni5hk@gmail.com", label: "Email", username: "rajputt4ni5hk@gmail.com" },
 ];
 

 export const ContactSection = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   return (
     <section id="contact" className="py-32 px-6 bg-secondary/30" ref={ref}>
       <div className="max-w-4xl mx-auto">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
           <span className="text-sm font-mono text-muted-foreground mb-4 block">
             // Contact
           </span>
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
             Let's Work Together
           </h2>
           <p className="text-lg text-muted-foreground max-w-xl mx-auto">
             I'm always open to new opportunities and interesting projects. 
             Feel free to reach out!
           </p>
         </motion.div>
 
         <div className="grid md:grid-cols-2 gap-8">
           {/* Contact Info */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="space-y-6"
           >
             <div className="flex items-center gap-4 p-4 rounded-xl glass">
               <div className="p-3 rounded-full bg-secondary">
                 <MapPin className="h-5 w-5 text-foreground" />
               </div>
               <div>
                 <p className="text-sm text-muted-foreground">Location</p>
                 <p className="font-medium">New Delhi, India</p>
               </div>
             </div>
 
             {socialLinks.map((link, index) => (
               <motion.a
                 key={link.label}
                 href={link.href}
                 target="_blank"
                 rel="noopener noreferrer"
                 initial={{ opacity: 0, x: -30 }}
                 animate={isInView ? { opacity: 1, x: 0 } : {}}
                 transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                 className="flex items-center gap-4 p-4 rounded-xl glass hover-lift group"
               >
                 <div className="p-3 rounded-full bg-secondary group-hover:bg-foreground/10 transition-colors">
                   <link.icon className="h-5 w-5 text-foreground" />
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground">{link.label}</p>
                   <p className="font-medium">{link.username}</p>
                 </div>
               </motion.a>
             ))}
           </motion.div>
 
           {/* CTA Card */}
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="relative p-8 rounded-2xl glass overflow-hidden"
           >
             {/* Background pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50" />
             
             <div className="relative">
               <h3 className="text-2xl font-bold mb-4">Have a project in mind?</h3>
               <p className="text-muted-foreground mb-8 leading-relaxed">
                 Whether you need a full-stack application, a stunning website, or 
                 technical consultation, I'd love to hear about your project.
               </p>
               <motion.a
                 href="rajputt4ni5hk@gmail.com"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
               >
                 <Send className="h-4 w-4" />
                 Send me an email
               </motion.a>
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };