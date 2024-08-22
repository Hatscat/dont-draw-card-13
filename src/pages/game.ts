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
            closed: true,
          }),

          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.levelCounter,
            },
            closed: true,
          }),

          element(Elements.flexWithoutStyle, {
            tagProps: {
              style: formatStyle({
                width: "99%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "start", // TODO: to decide
                // margin: 64,
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
                    closed: true,
                  }),
                ],
                tagProps: {
                  id: domElementIds.cardShopButton,
                  onclick: execFunc(
                    prop(domElementIds.cardShopDialog, "showModal"),
                  ),
                },
                closed: true,
              }),

              element(Elements.interactive, {
                children: "Draw",
                tagProps: {
                  id: domElementIds.deck,
                  style: formatStyle({
                    // flex: 1,
                  }),
                  onclick: dispatch(actions.draw()), // TODO: execFunc(functions.drawCard),
                },
                closed: true,
              }),

              element(Elements.button, {
                tagProps: {
                  id: domElementIds.giveUpButton,
                  onclick: Text(and(
                    execFunc("confirm", Text("Give up this game?")),
                    execFunc(functions.goToGameOverPage),
                  )),
                },
                // children: "<br>Give up<p>❌</p>",
                children: "❌ Give up",
                closed: true,
              }),
            ],
            closed: true,
          }),

          element(Elements.flexWithoutStyle, {
            tagProps: {
              id: domElementIds.playerHand,
            },
            closed: true,
          }),

          element("dialog", {
            tagProps: {
              id: domElementIds.cardShopDialog,
            },
            children: [
              element(Elements.bigTitle, {
                children: "Card Shop",
                closed: true,
              }),
              element(Elements.paragraph, {
                tagProps: {
                  id: domElementIds.shopMoneyCounter,
                },
                closed: true,
              }),
              element(Elements.card, {
                children: "🃏",
                tagProps: {
                  onclick: dispatch(actions.buyCard("A1")),
                },
                closed: true,
              }),
              element(Elements.button, {
                children: "Close",
                tagProps: {
                  autofocus: "",
                  onclick: execFunc(
                    prop(domElementIds.cardShopDialog, "close"),
                  ),
                },
                closed: true,
              }),
            ],
            closed: true,
          }),
        ]),
        execFunc(functions.refreshLevelCounter),
        execFunc(functions.refreshMoneyCounters),
      ),
    },
  );
}
