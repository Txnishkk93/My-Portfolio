import { Moon } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 rounded-full glass hover-glow"
      aria-label="Light theme"
      type="button"
    >
      <motion.div
        initial={false}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Moon className="h-5 w-5 text-foreground" />
      </motion.div>
    </motion.button>
  );
};