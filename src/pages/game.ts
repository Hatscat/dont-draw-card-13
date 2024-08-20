// import { actions, dispatch } from "../data-store/mutator.ts";
// import { GameState } from "../data-store/state.ts";
import {
  assign,
  defineFunc,
  element,
  execFunc,
  // INLINE_EVENT_ARG_NAME,
  setInnerHtml,
  statements,
  // Text,
} from "../deps.ts";
import { domElementIds, Elements, functions, state } from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    {
      name: functions.goToGamePage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element(Elements.bigTitle, {
            children: "GAME PAGE",
            closed: true,
          }),
          element(Elements.button, {
            tagProps: { onclick: execFunc(functions.goToGameOverPage) },
            children: "Give up",
            closed: true,
          }),
        ]),
      ),
    },
  );
}
