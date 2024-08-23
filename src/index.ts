import {
  element,
  initVariables,
  manifestLink,
  registerServiceWorker,
  SrcProps,
  titleTag,
  viewportMeta,
} from "./deps.ts";
import { execFunc, statements } from "./deps.ts";
import { defineGamePage } from "./pages/game.ts";
import { defineMenuPage } from "./pages/menu.ts";
import { domElementIds, Elements, functions, state } from "./variables.ts";
import { definePerksPage } from "./pages/perks.ts";
import { getStylesheet } from "./style.ts";
import { initialState } from "./data-store/state.ts";
import { defineGameOverPage } from "./pages/game-over.ts";
import {
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

function getScript() {
  return statements(
    // Register the service worker
    // registerServiceWorker(), // TODO: useful for JS13K?
    // Declare functions
    defineMenuPage(),
    definePerksPage(),
    defineGamePage(),
    defineGameOverPage(),
    defineLevelCounterRefresh(),
    definePerkPointsCounterRefresh(),
    defineMoneyCountersRefresh(),
    // Init the state
    initVariables(state, initialState),
    // Render the Home page
    execFunc(functions.goToMenuPage),
  );
}
