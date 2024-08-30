import {
  add,
  and,
  assign,
  decrement,
  defineFunc,
  dynamicProp,
  element,
  group,
  initVariables,
  isGreater,
  List,
  loop,
  or,
  prop,
  SrcProps,
  sub,
  Text,
  titleTag,
  viewportMeta,
} from "./deps.ts";
import { execFunc, statements } from "./deps.ts";
import { defineGamePage } from "./pages/game.ts";
import { defineMenuPage } from "./pages/menu.ts";
import {
  constants,
  data,
  domElementIds,
  Elements,
  functions,
  state,
  tmpRefs,
} from "./variables.ts";
import { definePerksPage } from "./pages/perks.ts";
import { getStylesheet } from "./style.ts";
import { initialState } from "./data-store/state.ts";
import { defineGameOverPage } from "./pages/game-over.ts";
import {
  defineCardReveal,
  defineDrawRevealedCard,
  defineLevelCounterRefresh,
  defineMoneyCountersRefresh,
  definePerkPointsCounterRefresh,
} from "./elements/updates.ts";

export function getGameSrc(): SrcProps {
  return {
    css: getStylesheet(),
    js: getScript(),
    html: {
      head: [
        // htmlDoctype(), // The DOCTYPE breaks the CSS sizes without unit
        titleTag("🃏"),
        viewportMeta(), // TODO: set to landscape for mobile?
        // manifestLink(), // TODO: useful for JS13K?
      ],
      body: [
        element(Elements.page, {
          tagProps: { id: domElementIds.page },
        }),
      ],
    },
  };
}

function getScript(): string {
  return statements(
    // Register the service worker
    // registerServiceWorker(), // TODO: useful for JS13K?
    // Assign constants
    assign(constants.getBoundingClientRect, Text("getBoundingClientRect")),
    defineBaseCards(),
    // Declare functions
    defineMenuPage(),
    definePerksPage(),
    defineGamePage(),
    defineGameOverPage(),
    defineLevelCounterRefresh(),
    definePerkPointsCounterRefresh(),
    defineMoneyCountersRefresh(),
    defineCardReveal(),
    defineDrawRevealedCard(),
    // Init the state
    assign(
      data.deckCards,
      execFunc(
        prop(constants.baseCards, "sort"),
        defineFunc({
          body: sub(execFunc(prop("Math", "random")), ".5"),
          safe: false,
        }),
      ),
    ),
    initVariables(state, initialState),
    // Render the Home page
    execFunc(functions.goToMenuPage),
  );
}

function defineBaseCards() {
  return statements(
    assign(constants.baseCards, List()),
    assign(tmpRefs.obj, Text("&#x1F0")),
    loop({
      init: assign(tmpRefs.index, 13),
      condition: decrement(tmpRefs.index),
      body: execFunc(
        prop(constants.baseCards, "push"),
        [
          add(
            tmpRefs.obj,
            Text("A"),
            group(
              assign(
                tmpRefs.item,
                or(
                  dynamicProp(Text("EDBA"), sub(12, tmpRefs.index)),
                  add(tmpRefs.index, 1),
                ),
              ),
            ),
          ),
          add(tmpRefs.obj, Text("B"), tmpRefs.item),
          add(tmpRefs.obj, Text("C"), tmpRefs.item),
          add(tmpRefs.obj, Text("D"), tmpRefs.item),
          add(tmpRefs.index, 1),
        ],
      ),
      body2: and(
        isGreater(tmpRefs.index, 4),
        execFunc(
          prop(constants.baseCards, "push"),
          add(tmpRefs.index, 9),
        ),
      ),
    }),
  );
}
