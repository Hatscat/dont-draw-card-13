import { element, setInnerHtml } from "../deps.ts";
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
              children: "Don't draw card 13!",
              closed: true,
            }),
            element(Elements.button, {
              tagProps: { onclick: execFunc(functions.goToGamePage) },
              closed: true,
              children: "Play",
            }),
            element(Elements.button, {
              tagProps: { onclick: execFunc(functions.goToPerksPage) },
              closed: true,
              children: "Perks",
            }),
          ],
        ),
      ),
    },
  );
}
