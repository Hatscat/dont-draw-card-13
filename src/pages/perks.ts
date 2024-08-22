import { element, setInnerHtml } from "../deps.ts";
import { defineFunc, execFunc, statements } from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function definePerksPage() {
  return defineFunc(
    {
      name: functions.goToPerksPage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element(Elements.bigTitle, {
            children: "Perks",
          }),
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.perkPointsCounter,
            },
          }),
          element(Elements.button, {
            tagProps: { onclick: execFunc(functions.goToMenuPage) },
            children: "Continue",
            closed: false,
          }),
        ]),
        execFunc(functions.refreshPerkPointsCounter),
      ),
    },
  );
}
