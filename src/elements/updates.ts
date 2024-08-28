import {
  add,
  assign,
  defineFunc,
  dynamicProp,
  element,
  execFunc,
  formatStyle,
  prop,
  statements,
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
              children: setCurrentCard,
              tagProps: {
                style: Text(formatStyle({
                  left: "${" + prop(deckBox, "left") + "}",
                  top: "${" + prop(deckBox, "top") + "}",
                  animation: `1s ${animations.cardReveal}`,
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
                assign(prop(tmpRefs.obj, "left"), Text("0px")),
                assign(prop(tmpRefs.obj, "top"), Text("80%")),
              ),
            },
          ),
          "1e3",
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
