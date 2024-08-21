import { actions, dispatch } from "../data-store/mutator.ts";
import { and, prop } from "../deps.ts";
import {
  add,
  assign,
  defineFunc,
  element,
  execFunc,
  // INLINE_EVENT_ARG_NAME,
  setInnerHtml,
  statements,
  Text,
} from "../deps.ts";
import { domElementIds, Elements, functions, state } from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    {
      name: functions.goToGamePage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element(Elements.bigTitle, {
            children: "Don't draw card 13!",
            closed: true,
          }),
          element(Elements.flexWithoutStyle, {
            tagProps: {
              id: domElementIds.levelCounter,
            },
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
        assign(
          prop(domElementIds.levelCounter, "innerHTML"),
          add(Text("Level "), state.level),
        ), // TODO: set in actions!
      ),
    },
  );
}
