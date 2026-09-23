import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Txnishkk93", label: "@Txnishkk93" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/tanishk-rajput-a74418378/", label: "Tanishk Rajput" },
  { icon: Twitter, href: "https://x.com/_txnishkk_", label: "@_txnishkk_" },
  { icon: Mail, href: "mailto:rajputt4ni5hk@gmail.com", label: "rajputt4ni5hk@gmail.com" },
];

const exploreLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Blurb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <p className="text-lg text-foreground font-medium leading-snug max-w-xs">
              Tanishk.
            </p>
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

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <a
            href="mailto:rajputt4ni5hk@gmail.com"
            className="flex items-center gap-2 text-foreground font-medium hover:opacity-70 transition-opacity"
          >
            Let&apos;s work together
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} Tanishk Rajput. Built with passion.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-mono text-muted-foreground"
          >
            New Delhi, India
          </motion.p>
        </div>
      </div>
    </footer>
  );
};