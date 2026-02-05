 import { motion } from "framer-motion";
 
 export const Footer = () => {
   return (
     <footer className="py-8 px-6 border-t border-border">
       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
         <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-sm text-muted-foreground"
         >
           © {new Date().getFullYear()} John Doe. Built with passion.
         </motion.p>
         
         <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-sm font-mono text-muted-foreground"
         >
           {"<Made with ❤️ />"}
         </motion.p>
       </div>
     </footer>
   );
 };