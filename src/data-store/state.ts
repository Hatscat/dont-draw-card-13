import { List } from "../deps.ts";

export const enum GameState {
  Initial = "0",
  GameOver = "1",
  GameWon = "2",
}

export const initialState = {
  money: "0",
  gameState: GameState.Initial,
  playerHandCards: List(),
  discardedCards: List(),
} as const;

export type State = typeof initialState;
