import {
  and,
  defineFunc,
  element,
  execFunc,
  formatStyle,
  // INLINE_EVENT_ARG_NAME,
  prop,
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

          // Game area
          element(Elements.flexWithoutStyle, {
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
                  onclick: execFunc(
                    prop(domElementIds.cardShopDialog, "showModal"),
                  ),
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
          }),

          // Player hand
          element(Elements.flexWithoutStyle, {
            tagProps: {
              id: domElementIds.playerHand,
            },
          }),

          // Card shop dialog
          element("dialog", {
            tagProps: {
              id: domElementIds.cardShopDialog,
            },
            children: [
              element(Elements.bigTitle, {
                children: "Card Shop",
              }),
              element(Elements.paragraph, {
                tagProps: {
                  id: domElementIds.shopMoneyCounter,
                },
              }),
              element(Elements.button, {
                children: "Close",
                tagProps: {
                  onclick: execFunc(
                    prop(domElementIds.cardShopDialog, "close"),
                  ),
                },
              }),
            ],
          }),

          // Card dialog
          element("dialog", {
            tagProps: {
              id: domElementIds.cardDialog,
            },
            children: [
              element(Elements.bigTitle, {
                children: "Card", // current card
              }),
              element(Elements.paragraph, {
                tagProps: {
                  id: domElementIds.shopMoneyCounter, // current card value
                },
              }),
              element(Elements.button, {
                children: "Close",
                tagProps: {
                  onclick: execFunc(
                    prop(domElementIds.cardDialog, "close"),
                  ),
                },
              }),
            ],
          }),
        ]),
        // refresh counters
        execFunc(functions.refreshLevelCounter),
        execFunc(functions.refreshMoneyCounters),
      ),
    },
  );
}
