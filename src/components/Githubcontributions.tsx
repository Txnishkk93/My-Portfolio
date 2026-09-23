import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AlertCircle, Users, BookOpen, GitBranch, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
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

interface GraphQLContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
}

interface GraphQLResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: GraphQLContributionDay[] }[];
        };
      };
    };
  };
  errors?: { message: string }[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const USERNAME = "Txnishkk93";
const CELL_SIZE = 12;
const CELL_GAP = 4;

// Muted, off-white-friendly levels — light gray track, green fills
const LEVEL_BG: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "rgba(17,17,17,0.06)",
  1: "#c8e6c9",
  2: "#81c784",
  3: "#4caf50",
  4: "#2e7d32",
};

const LEVEL_MAP: Record<GraphQLContributionDay["contributionLevel"], 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
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

// Flatten GitHub GraphQL's weeks[].contributionDays[] into a flat Contribution[]
function flattenGraphQLContributions(
  weeks: { contributionDays: GraphQLContributionDay[] }[]
): Contribution[] {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL_MAP[day.contributionLevel],
    }))
  );
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
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#111111]/50 sm:text-xs">
          <span className="font-bold text-[#111111]">{total.toLocaleString()}</span> contributions in the last year
        </span>
      </div>

      <div className="relative" ref={wrapRef}>
        <AnimatePresence>
          {tooltip.visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="whitespace-nowrap rounded bg-[#111111] px-3 py-1.5 text-[11px] font-medium text-white shadow-lg">
                <span className="font-bold">{tooltip.count === 0 ? "No" : tooltip.count}</span>
                {tooltip.count === 1 ? " contribution" : " contributions"} on {tooltip.date}
              </div>
              <div className="mx-auto -mt-px h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#111111]" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="inline-block min-w-[280px] max-w-full md:min-w-0">
            {/* Month labels */}
            <div className="flex pl-7 mb-1 h-4">
              {months.map((m, i) => {
                const nextIdx = months[i + 1]?.weekIndex ?? weeks.length;
                const w = (nextIdx - m.weekIndex) * colWidth;
                if (w < 20) return null;
                return (
                  <div
                    key={`${m.name}-${i}`}
                    className="text-[10px] font-mono text-[#111111]/40 flex-shrink-0"
                    style={{ width: w }}
                  >
                    {m.name}
                  </div>
                );
              })}
            </div>

            {/* Weekday labels + cell columns */}
            <div className="flex gap-[4px]">
              <div className="flex flex-col gap-[4px] w-6 flex-shrink-0 mr-1">
                {WEEKDAY_LABELS.map((d, i) => (
                  <div
                    key={d}
                    className={cn(
                      "h-[12px] text-[10px] font-mono text-[#111111]/35 flex items-center justify-end",
                      ![1, 3, 5].includes(i) && "invisible"
                    )}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[4px] w-[12px] flex-shrink-0">
                  {week.map((cell, di) =>
                    cell ? (
                      <motion.span
                        key={cell.date}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: wi * 0.005 }}
                        className="block w-[12px] h-[12px] rounded-[3px] cursor-pointer transition-colors duration-200"
                        style={{
                          backgroundColor: LEVEL_BG[cell.level],
                          outline: "1px solid rgba(17,17,17,0.05)",
                        }}
                        onMouseEnter={(e) => onEnter(e, cell)}
                        onMouseLeave={() =>
                          setTooltip((t) => ({ ...t, visible: false }))
                        }
                        whileHover={{
                          outline: "1px solid rgba(17,17,17,0.3)",
                          scale: 1.15,
                          zIndex: 10,
                        }}
                      />
                    ) : (
                      <span
                        key={`pad-${wi}-${di}`}
                        className="block w-[12px] h-[12px] flex-shrink-0"
                      />
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-4">
              <span className="text-[10px] font-mono text-[#111111]/40">Less</span>
              {([0, 1, 2, 3, 4] as const).map((l) => (
                <div
                  key={l}
                  className="w-[12px] h-[12px] rounded-[3px]"
                  style={{
                    backgroundColor: LEVEL_BG[l],
                    outline: "1px solid rgba(17,17,17,0.05)",
                  }}
                />
              ))}
              <span className="text-[10px] font-mono text-[#111111]/40">More</span>
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
      className="bg-white border border-[#111111]/[0.08] p-4 rounded-xl hover:border-[#111111]/20 transition-colors group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#111111]/[0.04] group-hover:bg-[#111111]/[0.07] transition-colors">
          <Icon className="w-4 h-4 text-[#111111]/60" />
        </div>
        <span className="text-xs font-mono text-[#111111]/45 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold text-[#111111]">{value}</div>
    </motion.div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#111111]/[0.06] shrink-0" />
        <div className="space-y-3 flex-1">
          <div className="h-6 w-48 bg-[#111111]/[0.06] rounded" />
          <div className="h-4 w-32 bg-[#111111]/[0.05] rounded" />
          <div className="h-4 w-full max-w-md bg-[#111111]/[0.04] rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-[#111111]/[0.04]" />
        ))}
      </div>
      <div className="h-48 rounded-xl bg-[#111111]/[0.03]" />
    </div>
  );
}

// ─── GraphQL query ───────────────────────────────────────────────────────────

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

// ─── Main Section ────────────────────────────────────────────────────────────

export default function GitHubDashboard() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { weeks, months } = useMemo(
    () => buildWeeks(contributions),
    [contributions]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error(
            "Missing VITE_GITHUB_TOKEN — add it to your .env file and restart the dev server."
          );
        }

        const [gqlRes, uRes] = await Promise.all([
          fetch("https://api.github.com/graphql", {
            method: "POST",
            signal,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: CONTRIBUTIONS_QUERY,
              variables: { login: USERNAME },
            }),
          }),
          fetch(`https://api.github.com/users/${USERNAME}`, {
            signal,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!gqlRes.ok) {
          throw new Error(`GitHub GraphQL error: ${gqlRes.status} ${gqlRes.statusText}`);
        }
        if (!uRes.ok) {
          throw new Error(`GitHub API error: ${uRes.status} ${uRes.statusText}`);
        }

        const [gqlData, uData] = await Promise.all([
          gqlRes.json() as Promise<GraphQLResponse>,
          uRes.json() as Promise<GitHubUser>,
        ]);

        if (gqlData.errors?.length) {
          throw new Error(gqlData.errors[0].message);
        }

        const calendar = gqlData.data?.user.contributionsCollection.contributionCalendar;
        if (!calendar) {
          throw new Error("No contribution data returned");
        }

        setContributions(flattenGraphQLContributions(calendar.weeks));
        setTotalContributions(calendar.totalContributions);
        setUser(uData);
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
    <section
      id="github"
      className="relative z-10 bg-[#F5F3EF] px-4 py-16 text-[#111111] selection:bg-[#111111]/10 sm:px-6 md:py-24 lg:py-32"
      ref={ref}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-4 block text-sm font-mono text-[#111111]/50">
            // GitHub Activity
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            GitHub Pulse
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#111111]/60 md:text-lg">
            Real-time contribution history, repositories, and community activity.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl border border-[#111111]/[0.08] bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:p-10"
        >
          {loading ? (
            <Skeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[#111111]/[0.05] flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-[#111111]/50" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connection Error</h3>
              <p className="text-[#111111]/50 font-mono text-sm max-w-xs">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-3 bg-[#111111] text-white rounded-full text-sm font-medium hover:opacity-85 transition-opacity min-h-[44px]"
              >
                Retry
              </button>
            </div>
          ) : user ? (
            <div className="space-y-10">
              {/* Profile Header */}
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative">
                    <img
                      src={user.avatar_url}
                      alt={user.name ?? user.login}
                      width={80}
                      height={80}
                      className="h-16 w-16 rounded-2xl border border-[#111111]/[0.08] object-cover sm:h-20 sm:w-20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#3fb950]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                      {user.name ?? user.login}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-xs text-[#111111]/45 sm:text-sm">
                        @{user.login}
                      </span>
                      <div className="h-1 w-1 rounded-full bg-[#111111]/25" />
                      <span className="text-xs text-[#111111]/45 sm:text-sm">
                        {user.public_repos} repositories
                      </span>
                    </div>
                    {user.bio && (
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#111111]/55">
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </a>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard icon={Users} label="Followers" value={user.followers} delay={0.1} />
                <StatCard icon={Users} label="Following" value={user.following} delay={0.15} />
                <StatCard icon={BookOpen} label="Public Repos" value={user.public_repos} delay={0.2} />
                <StatCard icon={GitBranch} label="Public Gists" value={user.public_gists} delay={0.25} />
              </div>

              <div className="h-px bg-[#111111]/[0.08]" />

              {/* Contribution Graph */}
              <div className="space-y-6">
                <h4 className="text-sm font-mono text-[#111111]/45 uppercase tracking-widest">
                  Activity Heatmap
                </h4>
                <div className="bg-[#F5F3EF] border border-[#111111]/[0.06] rounded-2xl p-6 md:p-8">
                  <ContributionGrid weeks={weeks} months={months} total={totalContributions} />
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(17,17,17,0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(17,17,17,0.25);
        }
      `}</style>
    </section>
  );
}