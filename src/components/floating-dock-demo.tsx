"use client";
import React, { useEffect, useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconUser,
  IconBook,
  IconTerminal2,
  IconMessage,
  IconBrandGithub,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const [isDark, setIsDark] = useState(true);

  // Initialize theme state based on current document class
  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "About",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "Education",
      icon: (
        <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#education",
    },
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Contact",
      icon: (
        <IconMessage className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#contact",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Txnishkk93",
    },
    {
      title: isDark ? "Light Mode" : "Dark Mode",
      icon: isDark ? (
        <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ) : (
        <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center w-full pointer-events-none">
      <div className="pointer-events-auto">
        <FloatingDock
          desktopClassName="shadow-2xl border border-neutral-200 dark:border-neutral-800"
          mobileClassName="translate-y-0 shadow-2xl border border-neutral-200 dark:border-neutral-700"
          items={links}
        />
      </div>
    </div>
  );
}
