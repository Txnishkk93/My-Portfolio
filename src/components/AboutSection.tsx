"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImg from "../assests/tanishk.webp";

// ── Tech items per orbit ring ──────────────────────────────────────────────
const orbitRings = [
  // Outer ring – 8 items, slowest
  {
    radius: 190,
    duration: 30,
    items: [
      { label: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { label: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { label: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { label: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { label: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { label: "Prisma", icon: "https://cdn.simpleicons.org/prisma/ffffff" },
      { label: "Express", icon: "https://cdn.simpleicons.org/express/ffffff" },
    ],
  },
  // Mid ring – 6 items, medium
  {
    radius: 135,
    duration: 22,
    items: [
      { label: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { label: "Turborepo", icon: "https://cdn.simpleicons.org/turborepo/ffffff" },
      { label: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { label: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
      { label: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { label: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF" },
    ],
  },
  // Inner ring – 5 items, fastest
  {
    radius: 82,
    duration: 15,
    items: [
      { label: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { label: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
      { label: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
      { label: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
      { label: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
    ],
  },
];

// ── Single orbiting icon ───────────────────────────────────────────────────
const OrbitIcon = ({
  label,
  icon,
  angle,
  radius,
  duration,
}: {
  label: string;
  icon: string;
  angle: number;
  radius: number;
  duration: number;
}) => (
  <motion.div
    style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  >
    <motion.div
      style={{
        position: "absolute",
        x: radius * Math.cos((angle * Math.PI) / 180) - 20,
        y: radius * Math.sin((angle * Math.PI) / 180) - 20,
      }}
      animate={{ rotate: -360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="group"
    >
      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center transition-all duration-200 group-hover:border-white/30 group-hover:bg-black/80 group-hover:scale-110 cursor-default">
        <img
          src={icon}
          alt={label}
          className="w-5 h-5 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded bg-black/90 border border-white/10 text-[10px] font-mono text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {label}
      </div>
    </motion.div>
  </motion.div>
);

// ── Orbit ring track + icons ───────────────────────────────────────────────
const OrbitRing = ({
  radius,
  duration,
  items,
}: {
  radius: number;
  duration: number;
  items: { label: string; icon: string }[];
}) => {
  const size = radius * 2 + 48;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.04)",
        pointerEvents: "none",
      }}
    >
      {items.map((item, i) => (
        <OrbitIcon
          key={item.label}
          label={item.label}
          icon={item.icon}
          angle={(i / items.length) * 360}
          radius={radius}
          duration={duration}
        />
      ))}
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Orbit container size: outermost ring diameter + icon padding
  const orbitSize = 190 * 2 + 48 + 8; // ≈ 436px

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* ── Heading (centered) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-muted-foreground mb-4 block">
            // About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Turning ideas into reality
          </h2>
        </motion.div>

        {/* ── Two column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: orbit rings in bg, photo centered on top ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
            style={{ height: orbitSize }}
          >
            {/* Orbit rings — absolutely behind everything */}
            <div
              style={{
                position: "absolute",
                width: orbitSize,
                height: orbitSize,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            >
              {orbitRings.map((ring) => (
                <OrbitRing key={ring.radius} {...ring} />
              ))}
            </div>

            {/* Profile photo — sits on top of orbits, pointer-events enabled */}
            <div className="relative z-10" style={{ pointerEvents: "auto" }}>
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {/* Soft glow behind photo */}
                <div className="absolute inset-0 rounded-full bg-white/[0.03] blur-2xl scale-110" />
                {/* Photo */}
                <div className="absolute inset-0 rounded-full overflow-hidden border border-white/[0.10] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                  <img
                    src={profileImg}
                    alt="Tanishk"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-white/[0.08] bg-[#0a0a0a] backdrop-blur-sm whitespace-nowrap"
                >
                  <span className="text-[11px] font-mono text-white/40">
                    Fresher · 19 · Delhi
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: description (centered like original) ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a Full-Stack Engineer and Electronics & Communication Engineering student
              focused on building scalable web applications and real-time systems. Over the
              last few years, I've developed production-level projects handling thousands of
              API requests, from AI-powered platforms to real-time data dashboards.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My core stack is TypeScript, Next.js, Node.js, PostgreSQL, and Prisma. I enjoy
              designing systems that are fast, reliable, and easy to scale. Whether it's
              building streaming AI experiences, optimizing backend performance, or creating
              responsive user interfaces, I focus on delivering products that feel polished
              and intuitive.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Recently, I've built AI-driven applications, real-time monitoring systems, and
              full-stack platforms that serve thousands of requests while improving latency,
              efficiency, and user experience. I'm also actively strengthening my Data
              Structures & Algorithms skills in C++ and continuously exploring new
              technologies in the AI and web ecosystem.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};