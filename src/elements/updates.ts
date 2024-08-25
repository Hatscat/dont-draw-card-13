import {
  add,
  assign,
  defineFunc,
  element,
  execFunc,
  formatStyle,
  prop,
  statements,
  Text,
} from "../deps.ts";
import {
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
      body: assign(
        pageHtml,
        add(
          pageHtml,
          element(Elements.card, {
            as: "templateLiteral",
            children: setCurrentCard,
            tagProps: {
              // style: formatStyle({
              //   // TODO: position to + left to be on top of the deck
              // }),
              onclick: execFunc(functions.drawRevealedCard),
            },
          }),
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
