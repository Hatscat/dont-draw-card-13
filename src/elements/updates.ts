import {
  add,
  assign,
  defineFunc,
  dynamicProp,
  element,
  execFunc,
  formatStyle,
  ifElse,
  isGreater,
  mul,
  prop,
  statements,
  templateExpression,
  Text,
} from "../deps.ts";
import { ClassName } from "../style.ts";
import {
  animations,
  constants,
  data,
  domElementIds,
  Elements,
  functions,
  state,
  tmpRefs,
} from "../variables.ts";

export function defineLevelCounterRefresh() {
  return defineFunc(
    {
      name: functions.refreshLevelCounter,
      body: assign(
        prop(domElementIds.levelCounter, "innerHTML"),
        add(Text("Level "), state.level),
      ),
    },
  );
}

export function defineMoneyCountersRefresh() {
  return defineFunc(
    {
      name: functions.refreshMoneyCounters,
      body: assign(
        prop(domElementIds.shopMoneyCounter, "innerHTML"),
        assign(
          prop(domElementIds.gameMoneyCounter, "innerHTML"),
          add(Text("💰 "), state.money),
        ),
      ),
    },
  );
}

export function defineCardReveal() {
  const playerHandHtml = prop(domElementIds.playerHand, "innerHTML");
  const deckBox = tmpRefs.obj;

  return defineFunc(
    {
      name: functions.cardReveal,
      body: statements(
        assign(
          deckBox,
          execFunc(
            dynamicProp(
              domElementIds.deck,
              constants.getBoundingClientRect,
            ),
          ),
        ),
        assign(
          tmpRefs.currentCard,
          execFunc(prop(data.deckCards, "pop")),
        ),
        assign(
          playerHandHtml,
          add(
            playerHandHtml,
            element(Elements.card, {
              as: "templateLiteral",
              children: ifElse(
                isGreater(prop(tmpRefs.currentCard, "length"), 2),
                element(Elements.emojiCard, {
                  as: "templateLiteral",
                  children: tmpRefs.currentCard,
                }),
                element(Elements.textCard, {
                  as: "templateLiteral",
                  children: tmpRefs.currentCard,
                }),
              ),
              tagProps: {
                style: Text(formatStyle({
                  left: templateExpression(prop(deckBox, "left")),
                  top: templateExpression(prop(deckBox, "top")),
                  animation: `0.5s ${animations.cardReveal}`,
                })),
                onclick: execFunc(functions.drawRevealedCard), // TODO: open card menu
              },
            }),
          ),
        ),
        execFunc("setTimeout", [
          defineFunc(
            {
              body: statements(
                assign(
                  tmpRefs.obj,
                  prop(domElementIds.playerHand, "lastChild", "style"),
                ),
                assign(prop(tmpRefs.obj, "animation"), Text("")),
                assign(
                  prop(tmpRefs.obj, "left"),
                  mul(prop(state.playerHandCards, "length"), 64),
                ),
                assign(
                  prop(tmpRefs.obj, "top"),
                  prop(
                    execFunc(
                      dynamicProp(
                        domElementIds.playerHand,
                        constants.getBoundingClientRect,
                      ),
                    ),
                    "top",
                  ),
                ),
                assign(
                  prop(domElementIds.playerHand, "lastChild", "className"),
                  Text(ClassName.InteractiveCard), // TODO: on click instead of hover
                ),
                execFunc(
                  prop(state.playerHandCards, "push"),
                  tmpRefs.currentCard,
                ),
              ),
            },
          ),
          600,
        ]),
      ),
    },
  );
}

export function defineDrawRevealedCard() {
  return defineFunc(
    {
      name: functions.drawRevealedCard,
      body: "console.log('drawRevealedCard')",
    },
  );
}
