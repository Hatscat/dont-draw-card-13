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
            children: "PERKS PAGE",
            closed: true,
          }),
          element(Elements.button, {
            tagProps: { onclick: execFunc(functions.goToMenuPage) },
            closed: true,
            children: "Back",
          }),
        ]),
      ),
    },
  );
}
