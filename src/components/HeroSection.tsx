import { motion } from "framer-motion";
import profileImg from "../assests/tanishk.webp";

// ── Tech items per orbit ring ──────────────────────────────────────────────
const orbitRings = [
  {
    radius: 190,
    duration: 30,
    items: [
      { label: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/111111" },
      { label: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { label: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { label: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { label: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { label: "Prisma", icon: "https://cdn.simpleicons.org/prisma/111111" },
      { label: "Express", icon: "https://cdn.simpleicons.org/express/111111" },
    ],
  },
  {
    radius: 133,
    duration: 22,
    items: [
      { label: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { label: "Turborepo", icon: "https://cdn.simpleicons.org/turborepo/111111" },
      { label: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { label: "GitHub", icon: "https://cdn.simpleicons.org/github/111111" },
      { label: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { label: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF" },
    ],
  },
  {
    radius: 78,
    duration: 15,
    items: [
      { label: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { label: "Vercel", icon: "https://cdn.simpleicons.org/vercel/111111" },
      { label: "Linux", icon: "https://cdn.simpleicons.org/linux/111111" },
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
        x: radius * Math.cos((angle * Math.PI) / 180) - 16,
        y: radius * Math.sin((angle * Math.PI) / 180) - 16,
      }}
      animate={{ rotate: -360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="group"
    >
      <div className="w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 shadow-sm flex items-center justify-center transition-all duration-200 group-hover:border-border group-hover:bg-card group-hover:scale-110 cursor-default">
        <img
          src={icon}
          alt={label}
          className="w-3.5 h-3.5 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded bg-foreground text-[10px] font-mono text-background whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
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
  const size = radius * 2;
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
        border: "1px solid hsl(var(--border) / 0.6)",
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

export const HeroSection = () => {
  const orbitSize = 190 * 2 + 8;

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background px-4 pb-16 pt-24 text-foreground sm:px-6 md:px-8 md:pt-28 lg:px-16 lg:pb-20 lg:pt-32">
      <div className="grid w-full items-center gap-10 lg:grid-cols-2 xl:gap-16">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl font-bold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="block sm:whitespace-nowrap">Hi, I'm Tanishk Rajput.</span>
            <span className="mt-1 block sm:whitespace-nowrap">I'm a full-stack engineer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Building scalable apps with TypeScript, Next.js, Node.js & PostgreSQL —
            4+ shipped projects, up to 99% latency reduction, 3000+ API requests handled.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-3 max-w-md text-sm text-muted-foreground/80"
          >
            Currently sharpening DSA in C++ and going deeper into system design.
          </motion.p>
        </div>

        {/* Orbit + photo, scaled for smaller screens instead of hiding it completely */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center pt-2 lg:pt-0"
        >
          <div className="relative flex h-[220px] w-[220px] shrink-0 items-center justify-center sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px]">
            {/* Orbit rings */}
            <div
              style={{
                position: "absolute",
                width: orbitSize,
                height: orbitSize,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0.74)",
                pointerEvents: "none",
              }}
            >
              {orbitRings.map((ring) => (
                <OrbitRing key={ring.radius} {...ring} />
              ))}
            </div>

            {/* Profile photo */}
            <div className="relative z-10">
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36">
                <div className="absolute inset-0 scale-110 rounded-full bg-foreground/5 blur-2xl" />
                <div className="absolute inset-0 overflow-hidden rounded-full border border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <img
                    src={profileImg}
                    alt="Tanishk"
                    className="h-full w-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-normal rounded-full border border-border/60 bg-card px-3 py-1 text-center shadow-sm sm:whitespace-nowrap"
                >
                  <span className="text-[10px] font-mono text-muted-foreground sm:text-[11px]">
                    Fresher · 19 · Delhi
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};