import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold font-mono text-foreground glass px-4 py-2 rounded-full shadow-md"
        >
          {"<Tanishk Rajput />"}
        </motion.a>
      </nav>
    </motion.header>
  );
};