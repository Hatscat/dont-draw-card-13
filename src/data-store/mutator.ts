import { config } from "../config.ts";
import {
  ActionBase,
  add,
  assign,
  createActionDispatch,
  decrement,
  defineFunc,
  div,
  execFunc,
  expressions,
  ifElse,
  ifThen,
  increment,
  isGreater,
  List,
  minus,
  mul,
  prop,
  Record,
  statements,
  sub,
} from "../deps.ts";
import { data, params, state } from "../variables.ts";
import { State } from "./state.ts";

enum ActionType {
  Draw,
  Discard,
  UseJoker,
  BuyCard,
}

type Action<T = ActionType> =
  & ActionBase<T>
  & (
    | {
      type: ActionType.Draw;
    }
    | {
      type: ActionType.Discard;
      payload: { card: string };
    }
    | {
      type: ActionType.UseJoker;
      payload: { joker: string };
    }
    | {
      type: ActionType.BuyCard;
      payload: { card: string };
    }
  );

export const actions = {
  draw: (): Action<ActionType.Draw> => ({
    type: ActionType.Draw,
  }),
  discard: (card: string): Action<ActionType.Discard> => ({
    type: ActionType.Discard,
    payload: { card },
  }),
  useJoker: (joker: string): Action<ActionType.UseJoker> => ({
    type: ActionType.UseJoker,
    payload: { joker },
  }),
  buyCard: (card: string): Action<ActionType.BuyCard> => ({
    type: ActionType.BuyCard,
    payload: { card },
  }),
} as const;

function mutator(state: State, action: Action): string {
  switch (action.type) {
    case ActionType.Draw: {
      return execFunc(
        prop(state.playerHandCards, "push"),
        execFunc(prop(data.deckCards, "pop")),
      );
    }
    case ActionType.Discard: {
      return "TODO";
    }
    case ActionType.UseJoker: {
      return "TODO";
    }
    case ActionType.BuyCard: {
      return "TODO";
    }
  }
}

export const dispatch = createActionDispatch(state, mutator);
