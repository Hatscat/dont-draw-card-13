import { element, setInnerHtml } from "../deps.ts";
import { defineFunc, execFunc, statements } from "../deps.ts";
import { domElementIds, Elements, functions, texts } from "../variables.ts";

export function defineMenuPage() {
  return defineFunc(
    {
      name: functions.goToMenuPage,
      body: statements(
        setInnerHtml(
          domElementIds.page,
          [
            element(Elements.bigTitle, {
              children: texts.gameTitle,
              closed: true,
            }),
            element(Elements.button, {
              tagProps: { onclick: execFunc(functions.goToGamePage) },
              children: "Play",
              closed: true,
            }),
            element(Elements.button, {
              tagProps: { onclick: execFunc(functions.goToPerksPage) },
              children: "Perks",
              closed: true,
            }),
          ],
        ),
      ),
    },
  );
}
