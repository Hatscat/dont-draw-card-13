// import { actions, dispatch } from "../data-store/mutator.ts";
// import { GameState } from "../data-store/state.ts";
import { actions, dispatch } from "../data-store/mutator.ts";
import { and, prop } from "../deps.ts";
import {
  assign,
  defineFunc,
  element,
  execFunc,
  ifThen,
  // INLINE_EVENT_ARG_NAME,
  setInnerHtml,
  statements,
  Text,
  // Text,
} from "../deps.ts";
import {
  domElementIds,
  Elements,
  functions,
  state,
  texts,
} from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    {
      name: functions.goToGamePage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element(Elements.bigTitle, {
            children: texts.gameTitle,
            closed: true,
          }),
          element(Elements.flexWithoutStyle, {
            children: `Level ${state.level}`,
            closed: true,
          }),
          element(Elements.button, {
            children: "Draw",
            tagProps: {
              onclick: dispatch(actions.draw()), // TODO: execFunc(functions.drawCard),
            },
            closed: true,
          }),
          element(Elements.button, {
            children: "Card Shop",
            tagProps: {
              onclick: execFunc(prop("shopDialog", "showModal")),
            },
            closed: true,
          }),
          element(Elements.button, {
            tagProps: {
              onclick: Text(and(
                execFunc("confirm", Text("Give up this game?")),
                execFunc(functions.goToGameOverPage),
              )),
            },
            children: "Give up",
            closed: true,
          }),
          element(Elements.playerHand, {
            tagProps: {
              id: domElementIds.playerHand,
            },
          }),
        ]),
      ),
    },
  );
}
