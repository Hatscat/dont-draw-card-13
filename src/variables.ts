import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const {
  state,
  functions,
  domElementIds,
  params,
  tmpRefs,
  texts,
  props,
  animations,
} = provideTmpVarNames(
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
      cardReveal: "",
      drawRevealedCard: "",
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
      item: "",
    },
    tmpRefs: {
      currentCard: "",
      obj: "",
    },
    texts: {},
    props: {
      getBoundingClientRect: "getBoundingClientRect",
    },
    animations: {
      cardReveal: "",
    },
  } as const,
);

export const Elements = {
  button: "a",
  page: "d",
  flexWithoutStyle: "z",
  paragraph: "p",
  interactive: "v",
  bigTitle: "h1",
  card: "c",
} as const;
