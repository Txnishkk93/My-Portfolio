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
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Blurb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2 md:col-span-2"
          >
            <p className="max-w-xs text-lg font-medium leading-snug text-foreground">
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
            <p className="mb-4 text-sm text-muted-foreground">Explore</p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex min-h-[44px] items-center text-sm text-foreground/80 transition-colors hover:text-foreground"
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
            <p className="mb-4 text-sm text-muted-foreground">Follow me</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[44px] items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <link.icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
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
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center"
        >
          <a
            href="mailto:rajputt4ni5hk@gmail.com"
            className="flex min-h-[44px] items-center gap-2 font-medium text-foreground transition-opacity hover:opacity-70"
          >
            Let&apos;s work together
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:px-6 md:flex-row">
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