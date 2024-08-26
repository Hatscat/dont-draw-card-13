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
  const pageHtml = prop(domElementIds.page, "innerHTML");
  const setCurrentCard = assign(
    tmpRefs.currentCard,
    execFunc(prop(state.deckCards, "pop")),
  );

  return defineFunc(
    {
      name: functions.cardReveal,
      body: statements(
        assign(
          tmpRefs.obj,
          execFunc(
            dynamicProp(
              domElementIds.deck,
              props.getBoundingClientRect,
            ),
          ),
        ),
        assign(
          pageHtml,
          add(
            pageHtml,
            element(Elements.card, {
              as: "templateLiteral",
              children: setCurrentCard,
              tagProps: {
                style: Text(formatStyle({
                  left: "${" + prop(tmpRefs.obj, "left") + "}",
                  top: "${" + prop(tmpRefs.obj, "top") + "}",
                  animation: `1s ${animations.cardReveal}`,
                })),
                onclick: execFunc(functions.drawRevealedCard),
              },
            }),
          ),
        ),
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
