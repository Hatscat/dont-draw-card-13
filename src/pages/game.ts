import {
  defineFunc,
  element,
  execFunc,
  formatStyle,
  // INLINE_EVENT_ARG_NAME,
  setInnerHtml,
  statements,
} from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    {
      name: functions.goToGamePage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          // Title
          element(Elements.bigTitle, {
            children: "Don't draw card 13!",
          }),

          gameArea(),

          // Player hand
          element(Elements.flexWithoutStyle, {
            tagProps: {
              id: domElementIds.playerHand,
            },
          }),

          // Modal for card and shop
          element("dialog", {
            tagProps: {
              id: domElementIds.modal,
            },
          }),
        ]),
        // refresh counters
        execFunc(functions.refreshAllCounters),
      ),
    },
  );
}

function gameArea() {
  return element(Elements.flexWithoutStyle, {
    tagProps: {
      style: formatStyle({
        marginTop: 64,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: "8px",
        alignItems: "start",
      }),
    },
    children: [
      // Card shop button
      element(Elements.button, {
        children: [
          element(Elements.bigTitle, { children: "🃏" }),
          "Card Shop",
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.gameMoneyCounter,
            },
          }),
        ],
        tagProps: {
          onclick: execFunc(functions.openShopModal),
        },
      }),
      // Deck
      element(Elements.interactive, {
        children: element(Elements.paragraph, {
          tagProps: {
            id: domElementIds.deckLengthCounter,
          },
        }),
        tagProps: {
          id: domElementIds.deck,
          onclick: execFunc(functions.cardReveal),
        },
      }),
      // Discard pile
      element(Elements.flexWithoutStyle, {
        tagProps: {
          style: formatStyle({
            alignSelf: "flex-end",
          }),
        },
        children: [
          element(Elements.paragraph, {
            children: element(Elements.flexWithoutStyle, {
              tagProps: {
                id: domElementIds.discardPileLengthCounter,
              },
            }),
          }),
          element(Elements.flexWithoutStyle, {
            tagProps: {
              id: domElementIds.discardPile,
            },
          }),
        ],
      }),
    ],
  });
}
