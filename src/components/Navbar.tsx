 import { ThemeToggle } from "./ThemeToggle";
 import { motion } from "framer-motion";
 
 const navItems = [
   { name: "About", href: "#about" },
   { name: "Education", href: "#education" },
   { name: "Projects", href: "#projects" },
   { name: "Contact", href: "#contact" },
 ];
 
 export const Navbar = () => {
   return (
     <motion.header
       initial={{ y: -100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.6 }}
       className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
     >
       <nav className="max-w-6xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3">
         <motion.a
           href="#"
           whileHover={{ scale: 1.05 }}
           className="text-xl font-bold font-mono text-foreground"
         >
           {"<Tanishk Rajput />"}
         </motion.a>
 
         <div className="hidden md:flex items-center gap-8">
           {navItems.map((item) => (
             <motion.a
               key={item.name}
               href={item.href}
               whileHover={{ y: -2 }}
               className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
             >
               {item.name}
             </motion.a>
           ))}
         </div>
 
         <ThemeToggle />
       </nav>
     </motion.header>
   );
 };