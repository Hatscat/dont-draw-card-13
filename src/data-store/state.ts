// import { config } from "../config.ts";

import { List } from "../deps.ts";

// no need I think?
// export const enum GameState {
//   Play = "1",
//   GameOver = "2",
// }

export const initialState = {
  level: "1",
  money: "0",
  perkPoints: "0",
  perks: List(),
  playerHandCards: List(),
  discardedCards: List(),
  boss: {
    text: "0",
    targetElement: "0",
  },
} as const;

export type State = typeof initialState;
