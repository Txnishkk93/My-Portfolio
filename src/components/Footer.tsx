import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Download } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Txnishkk93", label: "@Txnishkk93" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/tanishk-rajput-a74418378/", label: "Tanishk Rajput" },
  { icon: Twitter, href: "https://x.com/_txnishkk_", label: "@_txnishkk_" },
  { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=rajputt4ni5hk@gmail.com", label: "rajputt4ni5hk@gmail.com" },
];

const exploreLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#footer" },
];

export const Footer = () => {
  return (
    <footer id="footer"
      className="scroll-mt-16 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Blurb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col gap-3"
          >
            <p className="text-lg text-foreground font-medium leading-snug max-w-xs">
              Tanishk
            </p>

            <p className="text-sm text-muted-foreground max-w-xs">
              Full-Stack Engineer · Delhi, India
            </p>


            <div>
              <span>
                <a
                  href="/projects/resume.pdf"
                  download="Tanishk_Rajput_Resume.pdf"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Resume
                  <Download className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
              </span>
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm text-muted-foreground mb-4">Explore</p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground mb-4">Follow me</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors group"
                  >
                    <link.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    {link.label}
                  </a>


                </li>


              ))}


            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};