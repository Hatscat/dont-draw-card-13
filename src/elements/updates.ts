import { add, assign, defineFunc, prop, Text } from "../deps.ts";
import { domElementIds, functions, state } from "../variables.ts";

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
