import {
  assign,
  element,
  initVariables,
  manifestLink,
  registerServiceWorker,
  SrcProps,
  Text,
  titleTag,
  viewportMeta,
} from "./deps.ts";
import { execFunc, statements } from "./deps.ts";
import { defineGamePage } from "./pages/game.ts";
import { defineMenuPage } from "./pages/menu.ts";
import {
  domElementIds,
  Elements,
  functions,
  state,
  texts,
} from "./variables.ts";
import { definePerksPage } from "./pages/perks.ts";
import { getStylesheet } from "./style.ts";
import { initialState } from "./data-store/state.ts";
import { defineGameOverPage } from "./pages/game-over.ts";

export function getGameSrc(): SrcProps {
  return {
    css: getStylesheet(),
    js: getScript(),
    html: {
      head: [
        // htmlDoctype(), // The DOCTYPE breaks the CSS sizes without unit
        titleTag("Don't draw card 13!"),
        viewportMeta(),
        manifestLink(),
      ],
      body: [
        element(Elements.page, { tagProps: { id: domElementIds.page } }),
      ],
    },
  };
}

function getScript() {
  return statements(
    // Register the service worker
    registerServiceWorker(),
    // assign common texts values
    assign(texts.gameTitle, Text("Don't draw card 13!")),
    // Declare functions
    defineMenuPage(),
    definePerksPage(),
    defineGamePage(),
    defineGameOverPage(),
    // shop will be a dialog, not a page

    // Init the state
    initVariables(state, initialState),
    // Render the Home page
    execFunc(functions.goToMenuPage),
  );
}
