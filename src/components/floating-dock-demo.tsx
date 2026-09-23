"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon, Github, Linkedin, Twitter } from "lucide-react";

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Txnishkk93", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/tanishk-rajput-a74418378/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/_txnishkk_", label: "Twitter" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm border-border/60"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-8 md:px-16 h-16">
        <a href="#" className="text-sm font-semibold tracking-tight text-foreground">
          Tanishk Rajput
        </a>

        <div className="flex items-center gap-7">
          <ul className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-wide text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5 pl-7 border-l border-border/50 h-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.icon className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </a>
            ))}

          </div>
        </div>
      </nav>
    </header>
  );
}