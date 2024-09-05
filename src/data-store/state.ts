import { List } from "../deps.ts";

export const initialState = {
  level: "1",
  money: "0",
  playerHandCards: List(),
  discardedCards: List(),
  boss: { // TODO: to remove? :'(
    text: "0",
    targetElement: "0",
  },
} as const;

export type State = typeof initialState;
