import { element, formatStyle, setInnerHtml } from "../deps.ts";
import { defineFunc, execFunc, statements } from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function defineMenuPage() {
  return defineFunc(
    {
      name: functions.goToMenuPage,
      body: statements(
        setInnerHtml(
          domElementIds.page,
          [
            element(Elements.bigTitle, {
              children: "🃏",
              tagProps: { style: formatStyle({ fontSize: 256 }) },
            }),
            element(Elements.button, {
              tagProps: {
                onclick: execFunc(functions.goToGamePage),
              },
              children: "Play",
            }),
            element(Elements.button, {
              tagProps: {
                onclick: execFunc(functions.goToPerksPage),
                style: formatStyle({ margin: 24 }),
              },
              children: "Perks",
              closed: false,
            }),
          ],
        ),
      ),
    },
  );
}
