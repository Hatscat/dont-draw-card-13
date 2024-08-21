import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const { state, functions, domElementIds, params, texts } =
  provideTmpVarNames(
    {
      state: initialState,
      functions: {
        goToMenuPage: "",
        goToGamePage: "",
        goToPerksPage: "",
        goToGameOverPage: "",
        refreshLevelCounter: "",
      },
      domElementIds: {
        page: "",
        playerHand: "",
        levelCounter: "",
      },
      params: {
        time: "",
        item: "",
      },
      texts: {},
    } as const,
  );

export const Elements = {
  button: "a",
  page: "b",
  flexWithoutStyle: "z",
  interactive: "v",
  bigTitle: "h1",
  playerHand: "x",
} as const;
