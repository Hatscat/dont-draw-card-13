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
      goToGameOverPage: "",
      refreshLevelCounter: "",
      refreshMoneyCounters: "",
      cardReveal: "",
      openShopModal: "",
      openCardModal: "",
      positionHandCards: "",
      discardCard: "",
    },
    domElementIds: {
      page: "",
      playerHand: "",
      levelCounter: "",
      gameMoneyCounter: "",
      shopMoneyCounter: "",
      deck: "",
      discardPile: "",
      giveUpButton: "", // TODO: remove? or for tutorial?
      cardShopButton: "", // TODO: remove? or for tutorial?
      modal: "",
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
      getBoundingClientRect: "getBoundingClientRect",
      fromCharCode: "String.fromCharCode",
      cardValues: "",
    },
    animations: {
      cardReveal: "",
      gameOver: "",
      screenShake: "",
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
  closeButton: "x",
} as const;
