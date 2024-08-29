import {
  add,
  assign,
  defineFunc,
  dynamicProp,
  element,
  execFunc,
  formatStyle,
  mul,
  prop,
  statements,
  templateExpression,
  Text,
} from "../deps.ts";
import {
  animations,
  domElementIds,
  Elements,
  functions,
  params,
  props,
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

export function definePerkPointsCounterRefresh() {
  return defineFunc(
    {
      name: functions.refreshPerkPointsCounter,
      body: assign(
        prop(domElementIds.perkPointsCounter, "innerHTML"),
        add(Text("⭐️ "), state.perkPoints),
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
  const setCurrentCard = assign(
    tmpRefs.currentCard,
    execFunc(prop(state.deckCards, "pop")),
  );
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
              props.getBoundingClientRect,
            ),
          ),
        ),
        assign(
          playerHandHtml,
          add(
            playerHandHtml,
            element(Elements.card, {
              as: "templateLiteral",
              children: [
                "",
                element(Elements.flexWithoutStyle, {
                  children: templateExpression(setCurrentCard),
                }),
              ],
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
                        props.getBoundingClientRect,
                      ),
                    ),
                    "top",
                  ),
                ),
                // assign(
                //   prop(tmpRefs.obj, "&:hover", "transform"),
                //   "translateY(-16)",
                // ),
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
