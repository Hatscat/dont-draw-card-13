import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const { state, functions, domElementIds, params } = provideTmpVarNames(
  {
    state: initialState,
    functions: {
      goToMenuPage: "",
      goToGamePage: "",
      goToPerksPage: "",
    },
    domElementIds: {
      page: "",
    },
    params: {
      time: "",
      item: "",
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
