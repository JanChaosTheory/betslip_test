import type { Selection } from "../types";

const MATCH_NAME = "Katie Volynets vs Alycia Parks";
const TOURNAMENT = "Ostrava Open";
const START = "Tomorrow • 10:00 AM";

export const tennisMatchMeta = { matchName: MATCH_NAME, tournament: TOURNAMENT, start: START };

export const TENNIS_SELECTIONS: Selection[] = [
  { id: "w-katie", eventName: MATCH_NAME, marketName: "Winner", outcomeName: "Katie Volynets", odds: 1.78 },
  { id: "w-alycia", eventName: MATCH_NAME, marketName: "Winner", outcomeName: "Alycia Parks", odds: 1.78 },
  { id: "gh-katie-05", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Katie Volynets +0.5", odds: 3.5 },
  { id: "gh-katie-1", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Katie Volynets +1", odds: 3.5 },
  { id: "gh-katie-15", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Katie Volynets +1.5", odds: 3.5 },
  { id: "gh-katie-2", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Katie Volynets +2", odds: 3.5 },
  { id: "gh-katie-25", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Katie Volynets +2.5", odds: 3.5 },
  { id: "gh-alycia-05", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Alycia Parks -0.5", odds: 3.5 },
  { id: "gh-alycia-1", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Alycia Parks -1", odds: 3.5 },
  { id: "gh-alycia-15", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Alycia Parks -1.5", odds: 3.5 },
  { id: "gh-alycia-2", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Alycia Parks -2", odds: 3.5 },
  { id: "gh-alycia-25", eventName: MATCH_NAME, marketName: "Game Handicap", outcomeName: "Alycia Parks -2.5", odds: 3.5 },
  { id: "tg-235-over", eventName: MATCH_NAME, marketName: "Total Games 2 way", outcomeName: "Over 23.5", odds: 1.9 },
  { id: "tg-235-under", eventName: MATCH_NAME, marketName: "Total Games 2 way", outcomeName: "Under 23.5", odds: 1.8 },
];

const byMarket = (market: string) => TENNIS_SELECTIONS.filter((s) => s.marketName === market);

export const winnerOutcomes = byMarket("Winner");
export const gameHandicapOutcomes = byMarket("Game Handicap");
export const totalGamesOutcomes = byMarket("Total Games 2 way");
