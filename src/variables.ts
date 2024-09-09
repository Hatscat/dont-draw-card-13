import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const {
  state,
  functions,
  domElementIds,
  tmpRefs,
  constants,
  data,
} = provideTmpVarNames(
  {
    state: initialState,
    functions: {
      goToMenuPage: "",
      goToGamePage: "",
      refreshAllCounters: "",
      cardReveal: "",
      openShopModal: "",
      openCardModal: "",
      positionHandCards: "",
      discardCard: "",
      shuffleArray: "",
    },
    domElementIds: {
      page: "",
      playerHand: "",
      levelCounter: "",
      deckLengthCounter: "",
      discardPileLengthCounter: "",
      gameMoneyCounter: "",
      shopMoneyCounter: "",
      deck: "",
      discardPile: "",
      modal: "",
    },
    tmpRefs: {
      index: "",
      n: "",
      obj: "",
      item: "",
      currentCard: "",
      currentCardElement: "",
    },
    data: {
      deckCards: "",
    },
    constants: {
      getBoundingClientRect: "getBoundingClientRect",
      fromCharCode: "String.fromCharCode",
      cardValues: "",
      jokerCards: "",
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
  textCard: "b", // no need for this?
  jokerCard: "j",
  closeButton: "x",
} as const;
