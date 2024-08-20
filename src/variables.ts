import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const { state, functions, domElementIds, params } = provideTmpVarNames(
  {
    state: initialState,
    functions: {
      goToMenuPage: "",
      goToGamePage: "",
      goToPerksPage: "",
      goToGameOverPage: "",
    },
    domElementIds: {
      page: "",
    },
    params: {
      time: "",
      item: "",
    },
    texts: {
      gameTitle: "", // "Don't draw card 13!"
    },
  } as const,
);

export const Elements = {
  button: "a",
  page: "b",
  flexWithoutStyle: "z",
  interactive: "v",
  bigTitle: "t",
} as const;
