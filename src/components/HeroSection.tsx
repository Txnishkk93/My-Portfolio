import { motion } from "framer-motion";
import profileImg from "../assests/tanishk.webp";

// ── Tech items per orbit ring ──────────────────────────────────────────────
const orbitRings = [
  {
    radius: 170,
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
    radius: 120,
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
    <section className="relative min-h-screen flex flex-col justify-center bg-background text-foreground px-8 md:px-16 pt-24 pb-16 overflow-hidden">
      <div className="w-full grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15]"
          >
            <span className="block whitespace-nowrap">Hi, I'm Tanishk Rajput.</span>
            <span className="block whitespace-nowrap">I'm a full-stack engineer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Building scalable apps with TypeScript, Next.js, Node.js & PostgreSQL —
            4+ shipped projects, up to 99% latency reduction, 3000+ API requests handled.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-3 text-sm text-muted-foreground/80 max-w-md"
          >
            Currently sharpening DSA in C++ and going deeper into system design.
          </motion.p>
        </div>

        {/* Orbit + photo, centered in its column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center w-[300px] h-[300px] flex-shrink-0">
            {/* Orbit rings */}
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

            {/* Profile photo */}
            <div className="relative z-10">
              <div className="relative w-32 h-32 md:w-36 md:h-36">
                <div className="absolute inset-0 rounded-full bg-foreground/5 blur-2xl scale-110" />
                <div className="absolute inset-0 rounded-full overflow-hidden border border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <img
                    src={profileImg}
                    alt="Tanishk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-border/60 bg-card shadow-sm whitespace-nowrap"
                >
                  <span className="text-[11px] font-mono text-muted-foreground">
                    19 · Delhi
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