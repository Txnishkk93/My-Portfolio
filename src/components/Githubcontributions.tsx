import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AlertCircle, Users, BookOpen, Star, ExternalLink, GitBranch, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContribAPIResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

interface GitHubUser {
  name: string | null;
  login: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  html_url: string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  count: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const USERNAME = "Txnishkk93";
const CELL_SIZE = 10;
const CELL_GAP = 3;

// GitHub's actual dark mode colors
const LEVEL_BG: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

// ─── Utilities ───────────────────────────────────────────────────────────────

function safeParseDate(dateStr: string): Date {
  const date = new Date(dateStr + "T12:00:00Z");
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateStr}`);
  }
  return date;
}

// ─── buildWeeks ───────────────────────────────────────────────────────────────

interface WeeksData {
  weeks: (Contribution | null)[][];
  months: { name: string; weekIndex: number }[];
}

function buildWeeks(contributions: Contribution[]): WeeksData {
  if (!contributions.length) {
    return { weeks: [], months: [] };
  }

  try {
    const firstDay = safeParseDate(contributions[0].date);
    const startPad = firstDay.getDay();

    const cells: (Contribution | null)[] = [
      ...Array(startPad).fill(null),
      ...contributions,
    ];

    const weeks: (Contribution | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    const months: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wi) => {
      const firstReal = week.find(Boolean) as Contribution | undefined;
      if (!firstReal) return;

      const d = safeParseDate(firstReal.date);
      if (d.getMonth() !== lastMonth) {
        months.push({
          name: d.toLocaleString("en-US", { month: "short" }),
          weekIndex: wi,
        });
        lastMonth = d.getMonth();
      }
    });

    return { weeks, months };
  } catch (error) {
    console.error("Error building weeks:", error);
    return { weeks: [], months: [] };
  }
}

// ─── Contribution Grid ────────────────────────────────────────────────────────

interface ContributionGridProps {
  weeks: (Contribution | null)[][];
  months: { name: string; weekIndex: number }[];
  total: number;
}

function ContributionGrid({ weeks, months, total }: ContributionGridProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    count: 0,
  });
  const wrapRef = useRef<HTMLDivElement>(null);

  const onEnter = (e: React.MouseEvent<HTMLSpanElement>, cell: Contribution) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const wRect = wrapRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    
    try {
      const date = safeParseDate(cell.date);
      setTooltip({
        visible: true,
        x: rect.left - wRect.left + CELL_SIZE / 2,
        y: rect.top - wRect.top - 8,
        date: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        count: cell.count,
      });
    } catch (error) {
      console.error("Error parsing date for tooltip:", error);
    }
  };

  const colWidth = CELL_SIZE + CELL_GAP;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <span className="text-zinc-200 font-bold">{total.toLocaleString()}</span> contributions in the last year
        </span>
      </div>

      <div className="relative" ref={wrapRef}>
        <AnimatePresence>
          {tooltip.visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 rounded px-3 py-1.5 text-[11px] font-medium whitespace-nowrap shadow-2xl">
                <span className="font-bold">{tooltip.count === 0 ? "No" : tooltip.count}</span>
                {tooltip.count === 1 ? " contribution" : " contributions"} on {tooltip.date}
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-zinc-800 mx-auto -mt-px" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="inline-block min-w-max">
            {/* Month labels */}
            <div className="flex pl-7 mb-1 h-4">
              {months.map((m, i) => {
                const nextIdx = months[i + 1]?.weekIndex ?? weeks.length;
                const w = (nextIdx - m.weekIndex) * colWidth;
                if (w < 20) return null;
                return (
                  <div
                    key={`${m.name}-${i}`}
                    className="text-[10px] font-mono text-zinc-500 flex-shrink-0"
                    style={{ width: w }}
                  >
                    {m.name}
                  </div>
                );
              })}
            </div>

            {/* Weekday labels + cell columns */}
            <div className="flex gap-[3px]">
              {/* Weekday labels */}
              <div className="flex flex-col gap-[3px] w-6 flex-shrink-0 mr-1">
                {WEEKDAY_LABELS.map((d, i) => (
                  <div
                    key={d}
                    className={cn(
                      "h-[10px] text-[9px] font-mono text-zinc-600 flex items-center justify-end",
                      ![1, 3, 5].includes(i) && "invisible"
                    )}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Week columns */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px] w-[10px] flex-shrink-0">
                  {week.map((cell, di) =>
                    cell ? (
                      <motion.span
                        key={cell.date}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: wi * 0.005 }}
                        className="block w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-colors duration-200"
                        style={{
                          backgroundColor: LEVEL_BG[cell.level],
                          outline: "1px solid rgba(255,255,255,0.03)",
                        }}
                        onMouseEnter={(e) => onEnter(e, cell)}
                        onMouseLeave={() =>
                          setTooltip((t) => ({ ...t, visible: false }))
                        }
                        whileHover={{
                          outline: "1px solid rgba(255,255,255,0.2)",
                          scale: 1.1,
                          zIndex: 10,
                        }}
                      />
                    ) : (
                      <span
                        key={`pad-${wi}-${di}`}
                        className="block w-[10px] h-[10px] flex-shrink-0"
                      />
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-4">
              <span className="text-[10px] font-mono text-zinc-500">Less</span>
              {([0, 1, 2, 3, 4] as const).map((l) => (
                <div
                  key={l}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{
                    backgroundColor: LEVEL_BG[l],
                    outline: "1px solid rgba(255,255,255,0.03)",
                  }}
                />
              ))}
              <span className="text-[10px] font-mono text-zinc-500">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-zinc-700 transition-colors group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
          <Icon className="w-4 h-4 text-zinc-400" />
        </div>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold text-zinc-100">{value}</div>
    </motion.div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-zinc-800 shrink-0" />
        <div className="space-y-3 flex-1">
          <div className="h-6 w-48 bg-zinc-800 rounded" />
          <div className="h-4 w-32 bg-zinc-800/70 rounded" />
          <div className="h-4 w-full max-w-md bg-zinc-800/50 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-zinc-800/40" />
        ))}
      </div>
      <div className="h-48 rounded-xl bg-zinc-800/20" />
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function GitHubDashboard() {
  const [contribs, setContribs] = useState<ContribAPIResponse | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize weeks calculation
  const { weeks, months } = useMemo(
    () => (contribs ? buildWeeks(contribs.contributions) : { weeks: [], months: [] }),
    [contribs]
  );

  const currentYear = new Date().getFullYear();
  const totalThisYear = useMemo(
    () => contribs?.total?.[currentYear] ?? 0,
    [contribs, currentYear]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const [cRes, uRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
            { signal }
          ),
          fetch(`https://api.github.com/users/${USERNAME}`, { signal }),
        ]);

        if (!cRes.ok) {
          throw new Error(`Contributions API error: ${cRes.status} ${cRes.statusText}`);
        }
        if (!uRes.ok) {
          throw new Error(`GitHub API error: ${uRes.status} ${uRes.statusText}`);
        }

        const [cData, uData] = await Promise.all([
          cRes.json(),
          uRes.json(),
        ]);

        setContribs(cData as ContribAPIResponse);
        setUser(uData as GitHubUser);
      } catch (e: unknown) {
        if (e instanceof Error && e.name === "AbortError") return;
        const errorMessage =
          e instanceof Error ? e.message : "Failed to load GitHub data";
        setError(errorMessage);
        console.error("GitHub data fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100">
      {/* Background Grid Effect */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <section id="github" className="relative z-10 py-24 px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-zinc-400" />
              </div>
              <span className="text-sm font-mono text-zinc-500 uppercase tracking-[0.2em]">
                System.Activity.Log
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              GitHub Pulse
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              Real-time monitoring of development cycles, repository growth, and
              community engagement.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle glow effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-zinc-700/20 transition-colors duration-700" />

            {loading ? (
              <Skeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connection Error</h3>
                <p className="text-zinc-500 font-mono text-sm max-w-xs">{error}</p>
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="mt-8 px-6 py-2 bg-zinc-100 text-black rounded-full text-sm font-bold hover:bg-white transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            ) : user ? (
              <div className="space-y-10">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="relative">
                      <img
                        src={user.avatar_url}
                        alt={user.name ?? user.login}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-zinc-950" />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight text-white">
                        {user.name ?? user.login}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-zinc-500 font-mono text-sm">
                          @{user.login}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="text-zinc-500 text-sm">
                          {user.public_repos} Repositories
                        </span>
                      </div>
                      {user.bio && (
                        <p className="text-zinc-400 text-sm mt-3 max-w-md leading-relaxed">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 text-black rounded-xl text-sm font-bold hover:bg-white transition-all hover:translate-y-[-2px] active:translate-y-[0px] shadow-lg shadow-white/5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Profile
                  </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    icon={Users}
                    label="Followers"
                    value={user.followers}
                    delay={0.3}
                  />
                  <StatCard
                    icon={Users}
                    label="Following"
                    value={user.following}
                    delay={0.4}
                  />
                  <StatCard
                    icon={BookOpen}
                    label="Public Repos"
                    value={user.public_repos}
                    delay={0.5}
                  />
                  <StatCard
                    icon={GitBranch}
                    label="Public Gists"
                    value={user.public_gists}
                    delay={0.6}
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                {/* Contribution Graph */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-zinc-500" />
                    <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
                      Activity Heatmap
                    </h3>
                  </div>
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 md:p-8">
                    <ContributionGrid
                      weeks={weeks}
                      months={months}
                      total={totalThisYear}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-12 text-zinc-600 text-xs font-mono uppercase tracking-[0.3em]"
          >
            Data synchronized with GitHub API v3
          </motion.p>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </main>
  );
}