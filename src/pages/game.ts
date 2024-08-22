import { actions, dispatch } from "../data-store/mutator.ts";
import {
  and,
  defineFunc,
  element,
  execFunc,
  formatStyle,
  prop,
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
          element(Elements.bigTitle, {
            children: "Don't draw card 13!",
          }),

          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.levelCounter,
            },
          }),

          element(Elements.flexWithoutStyle, {
            tagProps: {
              style: formatStyle({
                width: "99%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "start",
              }),
            },
            children: [
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

              element(Elements.interactive, {
                children: "Draw",
                tagProps: {
                  id: domElementIds.deck,
                  style: formatStyle({ // TODO: move to CSS
                    // flex: 1,
                    // border: "1px solid white",
                    borderRadius: "16px",
                    background: "#666",
                    height: 320,
                    width: 256,
                    // padding: 24,
                    // margin: 24,
                    transition: "all 0.6s ease",
                  }),
                  onclick: dispatch(actions.draw()), // TODO: execFunc(functions.drawCard),
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

          element(Elements.flexWithoutStyle, {
            tagProps: {
              id: domElementIds.playerHand,
            },
          }),

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
              element(Elements.card, {
                children: "🃏",
                tagProps: {
                  onclick: dispatch(actions.buyCard("A1")),
                },
              }),
              element(Elements.button, {
                children: "Close",
                tagProps: {
                  autofocus: "",
                  onclick: execFunc(
                    prop(domElementIds.cardShopDialog, "close"),
                  ),
                },
              }),
            ],
          }),
        ]),
        execFunc(functions.refreshLevelCounter),
        execFunc(functions.refreshMoneyCounters),
      ),
    },
  );
}
