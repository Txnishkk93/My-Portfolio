 import { Moon, Sun } from "lucide-react";
 import { useEffect, useState } from "react";
 import { motion } from "framer-motion";
 
 export const ThemeToggle = () => {
   const [isDark, setIsDark] = useState(true);
 
   useEffect(() => {
     const root = window.document.documentElement;
     if (isDark) {
       root.classList.add("dark");
     } else {
       root.classList.remove("dark");
     }
   }, [isDark]);
 
   useEffect(() => {
     // Set dark mode as default on mount
     document.documentElement.classList.add("dark");
   }, []);
 
   return (
     <motion.button
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       onClick={() => setIsDark(!isDark)}
       className="relative p-2.5 rounded-full glass hover-glow"
       aria-label="Toggle theme"
     >
       <motion.div
         initial={false}
         animate={{ rotate: isDark ? 0 : 180 }}
         transition={{ duration: 0.3 }}
       >
         {isDark ? (
           <Moon className="h-5 w-5 text-foreground" />
         ) : (
           <Sun className="h-5 w-5 text-foreground" />
         )}
       </motion.div>
     </motion.button>
   );
 };