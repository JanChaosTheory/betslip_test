/** Hardcoded data - match images exactly. */

export const BREADCRUMB = "Tennis - WTA Doha";
export const PAGE_TITLE = "Linda Noskova v Maya Joint";
export const DATE_TIME = "9 Feb 21:00";

export const TABS = [
  { id: "popular", label: "Popular", active: true },
  { id: "sgm", label: "SGM", active: false },
  { id: "set", label: "Set", active: false },
  { id: "games", label: "Games", active: false },
  { id: "player", label: "Player", active: false },
] as const;

export type MarketRowOption = {
  id: string;
  label: string;
  odds: string;
  locked?: boolean;
};

export type MarketRow = {
  id: string;
  rowLabel?: string;
  options: MarketRowOption[];
};

export type Market = {
  id: string;
  title: string;
  sgmPill?: boolean;
  columnHeaders?: string[];
  rows: MarketRow[];
  layout?: "grid" | "table" | "doubleResult";
};

/** Betslip selection (stable id = `${marketId}:${optionId}`) */
export type Selection = {
  id: string;
  event: string;
  marketLabel: string;
  optionLabel: string;
  odds: number;
};

export const MARKETS: Market[] = [
  {
    id: "to-win-match",
    title: "To Win Match",
    sgmPill: true,
    rows: [
      {
        id: "r1",
        options: [
          { id: "ln", label: "Linda Noskova", odds: "1.44" },
          { id: "mj", label: "Maya Joint", odds: "2.75" },
        ],
      },
    ],
  },
  {
    id: "match-handicap-games",
    title: "Match Handicap (Games)",
    sgmPill: true,
    columnHeaders: ["Linda Noskova", "Maya Joint"],
    rows: [
      {
        id: "r1",
        rowLabel: "",
        options: [
          { id: "ln-35", label: "-3.5", odds: "1.72" },
          { id: "mj-35", label: "+3.5", odds: "2.00" },
        ],
      },
    ],
  },
  {
    id: "total-games-2-way",
    title: "Total Games 2-Way",
    sgmPill: true,
    columnHeaders: ["", "Over", "Under"],
    rows: [
      {
        id: "r1",
        rowLabel: "21.5",
        options: [
          { id: "over-215", label: "1.83", odds: "1.83" },
          { id: "under-215", label: "1.83", odds: "1.83" },
        ],
      },
    ],
  },
  {
    id: "set-betting",
    title: "Set Betting",
    sgmPill: true,
    columnHeaders: ["", "Linda Noskova", "Maya Joint"],
    rows: [
      { id: "r1", rowLabel: "2-0", options: [{ id: "ln-20", label: "2.00", odds: "2.00" }, { id: "mj-20", label: "5.50", odds: "5.50" }] },
      { id: "r2", rowLabel: "2-1", options: [{ id: "ln-21", label: "3.75", odds: "3.75" }, { id: "mj-21", label: "5.50", odds: "5.50" }] },
    ],
  },
  {
    id: "total-sets",
    title: "Total Sets",
    sgmPill: true,
    rows: [
      {
        id: "r1",
        options: [
          { id: "2sets", label: "2 Sets", odds: "1.53" },
          { id: "3sets", label: "3 Sets", odds: "2.37" },
        ],
      },
    ],
  },
  {
    id: "1st-set-winner",
    title: "1st Set Winner",
    sgmPill: true,
    rows: [
      {
        id: "r1",
        options: [
          { id: "ln", label: "Linda Noskova", odds: "1.44" },
          { id: "mj", label: "Maya Joint", odds: "2.75" },
        ],
      },
    ],
  },
  {
    id: "1st-set-total-games",
    title: "1st Set Total Games",
    sgmPill: true,
    columnHeaders: ["", "Over", "Under"],
    rows: [
      { id: "r1", rowLabel: "6.5", options: [{ id: "o65", label: "1.03", odds: "1.03" }, { id: "u65", label: "15.00", odds: "15.00" }] },
      { id: "r2", rowLabel: "7.5", options: [{ id: "o75", label: "1.14", odds: "1.14" }, { id: "u75", label: "5.50", odds: "5.50" }] },
      { id: "r3", rowLabel: "8.5", options: [{ id: "o85", label: "1.44", odds: "1.44" }, { id: "u85", label: "2.62", odds: "2.62" }] },
      { id: "r4", rowLabel: "9.5", options: [{ id: "o95", label: "2.00", odds: "2.00" }, { id: "u95", label: "1.72", odds: "1.72" }] },
      { id: "r5", rowLabel: "10.5", options: [{ id: "o105", label: "4.00", odds: "4.00" }, { id: "u105", label: "1.22", odds: "1.22" }] },
      { id: "r6", rowLabel: "12.5", options: [{ id: "o125", label: "7.00", odds: "7.00" }, { id: "u125", label: "1.10", odds: "1.10" }] },
    ],
  },
  {
    id: "first-set-score",
    title: "First Set Score",
    sgmPill: true,
    columnHeaders: ["", "Linda Noskova", "Maya Joint"],
    rows: [
      { id: "r1", rowLabel: "6-0", options: [{ id: "ln-60", label: "19.00", odds: "19.00" }, { id: "mj-60", label: "41.00", odds: "41.00" }] },
      { id: "r2", rowLabel: "6-1", options: [{ id: "ln-61", label: "11.00", odds: "11.00" }, { id: "mj-61", label: "19.00", odds: "19.00" }] },
      { id: "r3", rowLabel: "6-2", options: [{ id: "ln-62", label: "6.50", odds: "6.50" }, { id: "mj-62", label: "17.00", odds: "17.00" }] },
      { id: "r4", rowLabel: "6-3", options: [{ id: "ln-63", label: "6.50", odds: "6.50" }, { id: "mj-63", label: "9.00", odds: "9.00" }] },
      { id: "r5", rowLabel: "6-4", options: [{ id: "ln-64", label: "5.00", odds: "5.00" }, { id: "mj-64", label: "11.00", odds: "11.00" }] },
      { id: "r6", rowLabel: "7-5", options: [{ id: "ln-75", label: "13.00", odds: "13.00" }, { id: "mj-75", label: "19.00", odds: "19.00" }] },
      { id: "r7", rowLabel: "7-6", options: [{ id: "ln-76", label: "11.00", odds: "11.00" }, { id: "mj-76", label: "15.00", odds: "15.00" }] },
    ],
  },
  {
    id: "match-result-total-games",
    title: "Match Result & Total Games",
    sgmPill: true,
    columnHeaders: ["", "Over", "Under"],
    rows: [
      { id: "r1", rowLabel: "Linda Noskova", options: [{ id: "ln-o205", label: "20.5", odds: "2.62" }, { id: "ln-u205", label: "20.5", odds: "2.50" }] },
      { id: "r2", rowLabel: "Maya Joint", options: [{ id: "mj-o235", label: "23.5", odds: "5.50" }, { id: "mj-u235", label: "23.5", odds: "5.50" }] },
    ],
  },
  {
    id: "linda-noskova-to",
    title: "Linda Noskova To",
    sgmPill: true,
    columnHeaders: ["", "Yes", "No"],
    rows: [
      { id: "r1", rowLabel: "Win a Set", options: [{ id: "y1", label: "1.14", odds: "1.14" }, { id: "n1", label: "5.50", odds: "5.50" }] },
      { id: "r2", rowLabel: "Win From Behind", options: [{ id: "y2", label: "7.00", odds: "7.00" }, { id: "n2", label: "1.10", odds: "1.10" }] },
      { id: "r3", rowLabel: "Win in Straight Sets", options: [{ id: "y3", label: "2.00", odds: "2.00" }, { id: "n3", label: "1.72", odds: "1.72" }] },
    ],
  },
  {
    id: "first-linda-service-winners",
    title: "First Linda Noskova Service Game - Winners",
    sgmPill: true,
    columnHeaders: ["", "Linda Noskova", "Maya Joint"],
    rows: [
      { id: "r1", rowLabel: "Winner", options: [{ id: "ln-w", label: "1.28", odds: "1.28" }, { id: "mj-w", label: "3.50", odds: "3.50" }] },
    ],
  },
  {
    id: "first-linda-service-score",
    title: "First Linda Noskova Service Game - Score",
    sgmPill: true,
    columnHeaders: ["", "Linda Noskova", "Maya Joint"],
    rows: [
      { id: "r1", rowLabel: "To win to love", options: [{ id: "ln-love", label: "6.00", odds: "6.00" }, { id: "mj-love", label: "29.00", odds: "29.00" }] },
      { id: "r2", rowLabel: "To win to 15", options: [{ id: "ln-15", label: "4.00", odds: "4.00" }, { id: "mj-15", label: "13.00", odds: "13.00" }] },
      { id: "r3", rowLabel: "To win to 30", options: [{ id: "ln-30", label: "4.00", odds: "4.00" }, { id: "mj-30", label: "9.00", odds: "9.00" }] },
      { id: "r4", rowLabel: "To win to 40", options: [{ id: "ln-40", label: "4.50", odds: "4.50" }, { id: "mj-40", label: "9.50", odds: "9.50" }] },
    ],
  },
  {
    id: "first-linda-service-to-win-to",
    title: "First Linda Noskova Service Game - To Win To",
    sgmPill: true,
    columnHeaders: ["", "Yes", "No"],
    rows: [
      { id: "r1", rowLabel: "0 or 15", options: [{ id: "y1", label: "2.62", odds: "2.62" }, { id: "n1", label: "1.44", odds: "1.44" }] },
      { id: "r2", rowLabel: "0, 15 or 30", options: [{ id: "y2", label: "1.66", odds: "1.66" }, { id: "n2", label: "2.10", odds: "2.10" }] },
    ],
  },
  {
    id: "maya-joint-to",
    title: "Maya Joint To",
    sgmPill: true,
    columnHeaders: ["", "Yes", "No"],
    rows: [
      { id: "r1", rowLabel: "Win a Set", options: [{ id: "y1", label: "1.72", odds: "1.72" }, { id: "n1", label: "2.00", odds: "2.00" }] },
      { id: "r2", rowLabel: "Win From Behind", options: [{ id: "y2", label: "10.00", odds: "10.00" }, { id: "n2", label: "1.062", odds: "1.062" }] },
      { id: "r3", rowLabel: "Win in Straight Sets", options: [{ id: "y3", label: "5.50", odds: "5.50" }, { id: "n3", label: "1.14", odds: "1.14" }] },
    ],
  },
  {
    id: "first-maya-service-winners",
    title: "First Maya Joint Service Game - Winners",
    sgmPill: true,
    columnHeaders: ["", "Maya Joint", "Linda Noskova"],
    rows: [
      { id: "r1", rowLabel: "Winner", options: [{ id: "mj-w", label: "1.50", odds: "1.50" }, { id: "ln-w", label: "2.50", odds: "2.50" }] },
    ],
  },
  {
    id: "first-maya-service-score",
    title: "First Maya Joint Service Game - Score",
    sgmPill: true,
    columnHeaders: ["", "Maya Joint", "Linda Noskova"],
    rows: [
      { id: "r1", rowLabel: "To win to love", options: [{ id: "mj-love", label: "8.50", odds: "8.50" }, { id: "ln-love", label: "19.00", odds: "19.00" }] },
      { id: "r2", rowLabel: "To win to 15", options: [{ id: "mj-15", label: "5.00", odds: "5.00" }, { id: "ln-15", label: "9.00", odds: "9.00" }] },
      { id: "r3", rowLabel: "To win to 30", options: [{ id: "mj-30", label: "4.50", odds: "4.50" }, { id: "ln-30", label: "6.50", odds: "6.50" }] },
      { id: "r4", rowLabel: "To win to 40", options: [{ id: "mj-40", label: "4.75", odds: "4.75" }, { id: "ln-40", label: "7.00", odds: "7.00" }] },
    ],
  },
  {
    id: "first-maya-service-to-win-to",
    title: "First Maya Joint Service Game - To Win To",
    sgmPill: true,
    columnHeaders: ["", "Yes", "No"],
    rows: [
      { id: "r1", rowLabel: "0 or 15", options: [{ id: "y1", label: "3.50", odds: "3.50" }, { id: "n1", label: "1.28", odds: "1.28" }] },
      { id: "r2", rowLabel: "0, 15 or 30", options: [{ id: "y2", label: "2.10", odds: "2.10" }, { id: "n2", label: "1.66", odds: "1.66" }] },
    ],
  },
  {
    id: "double-result",
    title: "Double Result",
    sgmPill: true,
    layout: "doubleResult",
    rows: [
      { id: "r1", options: [{ id: "ln-win", label: "Linda Noskova to win 1st set and WIN match", odds: "1.61" }] },
      { id: "r2", options: [{ id: "mj-win", label: "Maya Joint to win 1st set and WIN match", odds: "3.75" }] },
      { id: "r3", options: [{ id: "ln-lose", label: "Linda Noskova to win 1st set and LOSE match", odds: "10.00" }] },
      { id: "r4", options: [{ id: "mj-lose", label: "Maya Joint to win 1st set and LOSE match", odds: "7.00" }] },
    ],
  },
  {
    id: "ace-totals",
    title: "Ace Totals",
    sgmPill: true,
    columnHeaders: ["Linda Noskova", "Maya Joint", "Match"],
    rows: [
      { id: "r1", rowLabel: "1+", options: [{ id: "ln-1", label: "1.004", odds: "1.004" }, { id: "mj-1", label: "1.05", odds: "1.05" }, { id: "m-1", label: "1.001", odds: "1.001" }] },
      { id: "r2", rowLabel: "3+", options: [{ id: "ln-3", label: "1.083", odds: "1.083" }, { id: "mj-3", label: "1.53", odds: "1.53" }, { id: "m-3", label: "1.015", odds: "1.015" }] },
      { id: "r3", rowLabel: "5+", options: [{ id: "ln-5", label: "1.33", odds: "1.33" }, { id: "mj-5", label: "3.00", odds: "3.00" }, { id: "m-5", label: "1.083", odds: "1.083" }] },
      { id: "r4", rowLabel: "10+", options: [{ id: "ln-10", label: "3.75", odds: "3.75" }, { id: "mj-10", label: "23.00", odds: "23.00" }, { id: "m-10", label: "1.80", odds: "1.80" }] },
      { id: "r5", rowLabel: "15+", options: [{ id: "ln-15", label: "15.00", odds: "15.00" }, { id: "mj-15", label: "26.00", odds: "26.00" }, { id: "m-15", label: "4.00", odds: "4.00" }] },
      { id: "r6", rowLabel: "20+", options: [{ id: "ln-20", label: "26.00", odds: "26.00" }, { id: "mj-20", label: "", odds: "0", locked: true }, { id: "m-20", label: "11.00", odds: "11.00" }] },
      { id: "r7", rowLabel: "25+", options: [{ id: "ln-25", label: "", odds: "0", locked: true }, { id: "mj-25", label: "", odds: "0", locked: true }, { id: "m-25", label: "26.00", odds: "26.00" }] },
    ],
  },
  {
    id: "double-fault-totals",
    title: "Double Fault Totals",
    sgmPill: true,
    columnHeaders: ["Linda Noskova", "Maya Joint", "Match"],
    rows: [
      { id: "r1", rowLabel: "1+", options: [{ id: "ln-1", label: "1.012", odds: "1.012" }, { id: "mj-1", label: "1.025", odds: "1.025" }, { id: "m-1", label: "1.001", odds: "1.001" }] },
      { id: "r2", rowLabel: "2+", options: [{ id: "ln-2", label: "1.083", odds: "1.083" }, { id: "mj-2", label: "1.14", odds: "1.14" }, { id: "m-2", label: "1.002", odds: "1.002" }] },
      { id: "r3", rowLabel: "3+", options: [{ id: "ln-3", label: "1.25", odds: "1.25" }, { id: "mj-3", label: "1.40", odds: "1.40" }, { id: "m-3", label: "1.015", odds: "1.015" }] },
      { id: "r4", rowLabel: "5+", options: [{ id: "ln-5", label: "1.90", odds: "1.90" }, { id: "mj-5", label: "3.00", odds: "3.00" }, { id: "m-5", label: "1.12", odds: "1.12" }] },
      { id: "r5", rowLabel: "8+", options: [{ id: "ln-8", label: "5.50", odds: "5.50" }, { id: "mj-8", label: "15.00", odds: "15.00" }, { id: "m-8", label: "1.66", odds: "1.66" }] },
      { id: "r6", rowLabel: "10+", options: [{ id: "ln-10", label: "13.00", odds: "13.00" }, { id: "mj-10", label: "26.00", odds: "26.00" }, { id: "m-10", label: "2.62", odds: "2.62" }] },
      { id: "r7", rowLabel: "12+", options: [{ id: "ln-12", label: "26.00", odds: "26.00" }, { id: "mj-12", label: "", odds: "0", locked: true }, { id: "m-12", label: "4.50", odds: "4.50" }] },
      { id: "r8", rowLabel: "15+", options: [{ id: "ln-15", label: "", odds: "0", locked: true }, { id: "mj-15", label: "", odds: "0", locked: true }, { id: "m-15", label: "13.00", odds: "13.00" }] },
      { id: "r9", rowLabel: "20+", options: [{ id: "ln-20", label: "", odds: "0", locked: true }, { id: "mj-20", label: "", odds: "0", locked: true }, { id: "m-20", label: "26.00", odds: "26.00" }] },
    ],
  },
  {
    id: "go-the-distance",
    title: "Go The Distance?",
    sgmPill: true,
    rows: [
      {
        id: "r1",
        options: [
          { id: "yes", label: "Yes", odds: "15.00" },
          { id: "no", label: "No", odds: "1.03" },
        ],
      },
    ],
  },
];

export type BetBoostCard = {
  id: string;
  matchTitle: string;
  bullets: string[];
  oldOdds: string;
  newOdds: string;
  stakeReturns: string;
};

export const BET_BOOST_CARDS: BetBoostCard[] = [
  {
    id: "bb1",
    matchTitle: "LINDA NOSKOVA V MAYA JOINT",
    bullets: ["Linda Noskova will win the Match", "5+ Aces for Linda Noskova"],
    oldOdds: "6.00",
    newOdds: "6.50",
    stakeReturns: "$20 stake returns $130",
  },
  {
    id: "bb2",
    matchTitle: "LINDA NOSKOVA V MAYA JOINT",
    bullets: ["Maya Joint will win the Match", "Over 22.5 total games"],
    oldOdds: "5.50",
    newOdds: "6.00",
    stakeReturns: "$20 stake returns $120",
  },
  {
    id: "bb3",
    matchTitle: "LINDA NOSKOVA V MAYA JOINT",
    bullets: ["Linda Noskova 2-0", "Under 20.5 games"],
    oldOdds: "4.00",
    newOdds: "4.50",
    stakeReturns: "$20 stake returns $90",
  },
  {
    id: "bb4",
    matchTitle: "LINDA NOSKOVA V MAYA JOINT",
    bullets: ["First set over 9.5 games", "Maya Joint to win a set"],
    oldOdds: "3.20",
    newOdds: "3.50",
    stakeReturns: "$20 stake returns $70",
  },
];

export const FOOTER_TEXT = "Information and transmission delays";
