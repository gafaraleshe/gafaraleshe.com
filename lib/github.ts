/*
 * GitHub contribution calendar for the home page's Activity section: the
 * same year of squares as the github.com/gafaraleshe profile, served to the
 * client by /api/github.
 *
 * Two sources, best first:
 *   1. The GraphQL API's contributionCalendar. Exact, but needs GITHUB_TOKEN
 *      (a fine-grained personal access token; no permissions required).
 *   2. The public calendar fragment GitHub's own profile page loads
 *      (github.com/users/<name>/contributions), parsed from its HTML. No
 *      token, so this is what runs by default.
 *
 * Both are cached for six hours. Any failure resolves to null instead of
 * throwing, so the UI falls back to a profile link and the page never breaks.
 */

export const GITHUB_USERNAME = "gafaraleshe";

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubActivity = {
  username: string;
  total: number;
  // Columns of seven days, Sunday first; null pads the partial first and
  // last weeks.
  weeks: (ContributionDay | null)[][];
};

type Level = ContributionDay["level"];

const REVALIDATE = 21600; // six hours, matching app/api/github/route.ts
const TIMEOUT_MS = 8000; // a stalled request mustn't hold up a build
const USER_AGENT =
  "Mozilla/5.0 (compatible; gafaraleshe.com; +https://gafaraleshe.com)";
const DAY_MS = 24 * 60 * 60 * 1000;
// A year back from any weekday fits in 54 week columns; anything older is
// stray data and would only stretch the grid.
const MAX_DAYS = 54 * 7;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function fetchGitHubActivity(
  username = GITHUB_USERNAME
): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const viaApi = await fromGraphQL(username, token).catch(() => null);
    if (viaApi) return viaApi;
  }
  return fromCalendarPage(username).catch(() => null);
}

// ── 1. GraphQL API ──

const QUERY = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

const LEVELS: Partial<Record<string, Level>> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type CalendarDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

type CalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: { contributionDays?: CalendarDay[] }[];
        };
      };
    } | null;
  };
};

async function fromGraphQL(username: string, token: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify({ query: QUERY, variables: { login: username } }),
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) return null;
  const json = (await res.json()) as CalendarResponse;
  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;
  const days = (calendar?.weeks ?? []).flatMap(week =>
    (week.contributionDays ?? []).map((day): ContributionDay => ({
      date: day.date,
      count: day.contributionCount,
      level:
        LEVELS[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
    }))
  );
  return toActivity(username, days, calendar?.totalContributions);
}

// ── 2. Public calendar page ──

async function fromCalendarPage(username: string) {
  const res = await fetch(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }
  );
  if (!res.ok) return null;
  return parseCalendarPage(username, await res.text());
}

// Each day is a cell like
//   <td data-date="2026-10-05" id="contribution-day-component-1-52" data-level="2" …>
// with its count in a separate tooltip:
//   <tool-tip for="contribution-day-component-1-52">3 contributions on October 5th.</tool-tip>
// Attributes are read one by one, so their order doesn't matter.
function parseCalendarPage(username: string, html: string) {
  const tips = new Map<string, string>();
  for (const [, attrs, text] of html.matchAll(
    /<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/gi
  )) {
    const id = attr(attrs, "for");
    if (id) tips.set(id, text);
  }

  const days: ContributionDay[] = [];
  for (const [tag] of html.matchAll(/<[a-z][\w-]*\s[^>]*data-date=[^>]*>/gi)) {
    const date = attr(tag, "data-date");
    if (!date) continue;
    const id = attr(tag, "id");
    const count = parseCount((id && tips.get(id)) || "") ?? 0;
    const level = Number(attr(tag, "data-level"));
    days.push({
      date,
      count,
      level:
        Number.isInteger(level) && level >= 0 && level <= 4
          ? (level as Level)
          : count > 0
            ? 1
            : 0,
    });
  }

  // "487 contributions in the last year": the number can carry commas and
  // the phrase wraps across lines in the markup.
  const total = /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i.exec(
    html
  );
  return toActivity(username, days, total ? toNumber(total[1]) : undefined);
}

function attr(tag: string, name: string) {
  return new RegExp(`\\s${name}=["']([^"']*)["']`, "i").exec(tag)?.[1];
}

// "No contributions on …" is 0, "1 contribution on …" 1, "1,024 …" 1024.
function parseCount(text: string) {
  const match = /^\s*(no|[\d,]+)\s+contributions?\b/i.exec(text);
  if (!match) return undefined;
  return match[1].toLowerCase() === "no" ? 0 : toNumber(match[1]);
}

function toNumber(text: string) {
  const n = Number(text.replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

// ── Layout ──

// Lays the days out the way GitHub draws them: one column per week, Sunday
// to Saturday, with null before the first day and after the last.
function toActivity(
  username: string,
  days: ContributionDay[],
  total?: number
): GitHubActivity | null {
  // One entry per date, oldest first; anything malformed is dropped.
  const byDate = new Map<string, ContributionDay>();
  for (const day of days) {
    if (ISO_DATE.test(day.date) && Number.isFinite(day.count)) {
      byDate.set(day.date, day);
    }
  }
  const sorted = [...byDate.values()].sort((a, b) =>
    a.date < b.date ? -1 : 1
  );
  if (!sorted.length) return null;

  // Day offsets are counted in UTC, so the server's timezone can't move a
  // square to the wrong row.
  const end = utc(sorted[sorted.length - 1].date);
  const year = sorted.filter(day => end - utc(day.date) < MAX_DAYS * DAY_MS);
  const start = utc(year[0].date);
  const lead = new Date(start).getUTCDay(); // empty squares before day one

  const weeks: (ContributionDay | null)[][] = [];
  for (const day of year) {
    const i = lead + Math.round((utc(day.date) - start) / DAY_MS);
    const col = Math.floor(i / 7);
    while (weeks.length <= col) {
      weeks.push(Array<ContributionDay | null>(7).fill(null));
    }
    weeks[col][i % 7] = day;
  }

  const sum = year.reduce((n, day) => n + day.count, 0);
  return {
    username,
    total: total !== undefined && total >= 0 ? total : sum,
    weeks,
  };
}

function utc(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
