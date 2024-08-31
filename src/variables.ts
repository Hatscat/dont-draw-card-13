import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const {
  state,
  functions,
  domElementIds,
  params,
  tmpRefs,
  texts,
  constants,
  data,
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
      // item: "",
      // event: "",
    },
    tmpRefs: {
      index: "",
      n: "",
      currentCard: "",
      obj: "",
      item: "",
    },
    texts: {},
    data: {
      deckCards: "",
    },
    constants: {
      getBoundingClientRect: "",
      cardValues: "",
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
  emojiCard: "e",
  textCard: "b",
} as const;
