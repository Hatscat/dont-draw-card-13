import {
  and,
  defineFunc,
  element,
  execFunc,
  expressions,
  formatStyle,
  // INLINE_EVENT_ARG_NAME,
  setInnerHtml,
  statements,
  Text,
} from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    {
      name: functions.goToGamePage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          ...headerElements(),

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
        execFunc(functions.refreshLevelCounter),
        execFunc(functions.refreshMoneyCounters),
      ),
    },
  );
}

function headerElements() {
  return [
    // Title
    element(Elements.bigTitle, {
      children: "Don't draw card 13!",
    }),
    // Level counter and give up button
    element(Elements.paragraph, {
      tagProps: {
        style: formatStyle({
          flexDirection: "row",
          marginBottom: 32,
          gap: "24px",
        }),
      },
      children: [
        element(Elements.flexWithoutStyle, {
          tagProps: {
            id: domElementIds.levelCounter,
          },
        }),
        element(Elements.button, {
          tagProps: {
            id: domElementIds.giveUpButton,
            onclick: Text(and(
              execFunc("confirm", Text("Give up this game?")),
              execFunc(functions.goToGameOverPage),
            )),
          },
          children: "❌ Give up",
        }),
      ],
    }),
  ];
}

function gameArea() {
  return element(Elements.flexWithoutStyle, {
    tagProps: {
      style: formatStyle({
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
          "<br>Card Shop",
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.gameMoneyCounter,
            },
          }),
        ],
        tagProps: {
          id: domElementIds.cardShopButton,
          onclick: execFunc(functions.openShopModal),
        },
      }),
      // Deck
      element(Elements.interactive, {
        children: "Draw",
        tagProps: {
          id: domElementIds.deck,
          onclick: execFunc(functions.cardReveal),
        },
      }),
      // Discard pile
      element(Elements.flexWithoutStyle, {
        tagProps: {
          id: domElementIds.discardPile,
        },
        children: "Discard<br>Pile",
      }),
    ],
  });
}
