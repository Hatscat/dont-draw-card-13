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
            closed: true,
          }),
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.levelCounter,
            },
            closed: true,
          }),
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.perkPointsCounter,
            },
            closed: true,
          }),
          element(Elements.button, {
            tagProps: { onclick: execFunc(functions.goToPerksPage) },
            children: "Continue",
            closed: true,
          }),
        ]),
        execFunc(functions.refreshLevelCounter),
        execFunc(functions.refreshPerkPointsCounter),
      ),
    },
  );
}
