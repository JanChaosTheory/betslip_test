export type Selection = {
  id: string;
  eventName: string;
  marketName: string;
  outcomeName: string;
  odds: number;
};

export type MockEvent = Selection & { marketLabel?: string };
