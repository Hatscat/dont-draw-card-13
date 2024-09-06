import { element, setInnerHtml } from "../deps.ts";
import { defineFunc, execFunc, statements } from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function defineGameOverPage() {
  return defineFunc(
    {
      name: functions.goToGameOverPage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element(Elements.bigTitle, {
            children: "Game Over",
          }),
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.levelCounter,
            },
          }),
          element(Elements.button, {
            tagProps: { onclick: execFunc(functions.goToMenuPage) },
            children: "Continue",
            closed: false,
          }),
        ]),
        execFunc(functions.refreshAllCounters),
      ),
    },
  );
}
