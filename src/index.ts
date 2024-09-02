import {
  add,
  assign,
  defineFunc,
  dynamicProp,
  element,
  group,
  ifThen,
  increment,
  initVariables,
  isGreater,
  isLess,
  loop,
  or,
  prop,
  Record,
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
import { getStylesheet } from "./style.ts";
import { initialState } from "./data-store/state.ts";
import { defineGameOverPage } from "./pages/game-over.ts";
import {
  defineCardReveal,
  defineLevelCounterRefresh,
  defineMoneyCountersRefresh,
  defineOpenCardModal,
  defineOpenShopModal,
  definePositionHandCards,
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
    defineGamePage(),
    defineGameOverPage(),
    defineLevelCounterRefresh(),
    defineMoneyCountersRefresh(),
    defineCardReveal(),
    defineOpenCardModal(),
    defineOpenShopModal(),
    definePositionHandCards(),
    // Init the state
    assign(
      data.deckCards,
      execFunc(
        prop(execFunc("Object.keys", constants.cardValues), "sort"),
        defineFunc({
          body: sub(execFunc("Math.random"), ".5"),
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
    assign(constants.cardValues, Record({})),
    assign(tmpRefs.obj, Text("&#x1F0")),
    loop({
      init: assign(tmpRefs.index, 0),
      condition: isLess(increment(tmpRefs.index), 13),
      body: group(
        statements(
          // value for classic cards
          assign(tmpRefs.n, execFunc("Math.min", [tmpRefs.index, 10])),
          // assign(tmpRefs.n, 13), // TODO: TMP, only 13 cards for now
          // html codes for card emojis
          assign(
            tmpRefs.item,
            or(
              dynamicProp(Text("EDBA"), sub(13, tmpRefs.index)),
              tmpRefs.index,
            ),
          ),
          // spades
          assign(
            dynamicProp(
              constants.cardValues,
              add(tmpRefs.obj, Text("A"), tmpRefs.item),
            ),
            tmpRefs.n,
          ),
          // hearts
          assign(
            dynamicProp(
              constants.cardValues,
              add(tmpRefs.obj, Text("B"), tmpRefs.item),
            ),
            tmpRefs.n,
          ),
          // diamonds
          assign(
            dynamicProp(
              constants.cardValues,
              add(tmpRefs.obj, Text("C"), tmpRefs.item),
            ),
            tmpRefs.n,
          ),
          // clubs
          assign(
            dynamicProp(
              constants.cardValues,
              add(tmpRefs.obj, Text("D"), tmpRefs.item),
            ),
            tmpRefs.n,
          ),
          // trump cards
          assign(
            dynamicProp(constants.cardValues, tmpRefs.index),
            tmpRefs.index,
          ),
          ifThen(
            isGreater(tmpRefs.index, 5),
            assign(
              dynamicProp(constants.cardValues, add(tmpRefs.index, 8)),
              add(tmpRefs.index, 8),
            ),
          ),
        ),
        "}",
      ),
    }),
  );
}
