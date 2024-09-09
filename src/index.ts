import {
  add,
  assign,
  dynamicProp,
  element,
  group,
  ifElse,
  ifThen,
  increment,
  initVariables,
  isDifferent,
  isGreater,
  isLess,
  loop,
  Record,
  SrcProps,
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
import {
  defineCardReveal,
  defineDiscardCard,
  defineOpenCardModal,
  defineOpenShopModal,
  definePositionHandCards,
  defineRefreshAllCounters,
} from "./elements/updates.ts";
import { defineShuffleArray } from "./data-store/helpers.ts";

export function getGameSrc(): SrcProps {
  return {
    css: getStylesheet(),
    js: getScript(),
    html: {
      head: [
        // htmlDoctype(), // The DOCTYPE breaks the CSS sizes without unit
        titleTag("🃏"),
        viewportMeta(),
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
    assign(constants.fromCharCode, "String.fromCharCode"),
    defineBaseCards(),
    defineJokerCards(),
    // Declare functions
    defineMenuPage(),
    defineGamePage(),
    defineRefreshAllCounters(),
    defineCardReveal(),
    defineOpenCardModal(),
    defineOpenShopModal(),
    definePositionHandCards(),
    defineDiscardCard(),
    defineShuffleArray(),
    // Init the state
    assign(
      data.deckCards,
      execFunc("Object.keys", constants.cardValues),
    ),
    execFunc(functions.shuffleArray, [data.deckCards]),
    initVariables(state, initialState),
    // Render the Home page
    execFunc(functions.goToMenuPage),
  );
}

function defineBaseCards() {
  return statements(
    assign(constants.cardValues, Record({})),
    assign(tmpRefs.obj, 0xD83C),
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
            ifElse(isDifferent(tmpRefs.index, 12), tmpRefs.index, 14),
          ),
          // spades
          assign(
            dynamicProp(
              constants.cardValues,
              execFunc(constants.fromCharCode, [
                tmpRefs.obj,
                add(0xDCA0, tmpRefs.item),
              ]),
            ),
            tmpRefs.n,
          ),
          // hearts
          assign(
            dynamicProp(
              constants.cardValues,
              execFunc(constants.fromCharCode, [
                tmpRefs.obj,
                add(0xDCB0, tmpRefs.item),
              ]),
            ),
            tmpRefs.n,
          ),
          // diamonds
          assign(
            dynamicProp(
              constants.cardValues,
              execFunc(constants.fromCharCode, [
                tmpRefs.obj,
                add(0xDCC0, tmpRefs.item),
              ]),
            ),
            tmpRefs.n,
          ),
          // clubs
          assign(
            dynamicProp(
              constants.cardValues,
              execFunc(constants.fromCharCode, [
                tmpRefs.obj,
                add(0xDCD0, tmpRefs.item),
              ]),
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

function defineJokerCards() {
  return statements(
    assign(
      constants.jokerCards,
      Record({
        "🔮": "",
        "🃏": "",
      }),
    ),
  );
}
