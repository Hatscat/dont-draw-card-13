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
        refreshPerkPointsCounter: "",
        refreshMoneyCounters: "",
      },
      domElementIds: {
        page: "",
        playerHand: "",
        levelCounter: "",
        perkPointsCounter: "",
        gameMoneyCounter: "",
        shopMoneyCounter: "",
        deck: "",
        discardPile: "",
        giveUpButton: "",
        cardShopButton: "",
        cardShopDialog: "",
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
  paragraph: "p",
  interactive: "v",
  bigTitle: "h1",
  card: "c",
} as const;
