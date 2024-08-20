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
import { params, state } from "../variables.ts";
import { State } from "./state.ts";

enum ActionType {
  Draw,
  Discard,
  UseJoker,
  BuyCard,
  BuyPerk,
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
    | {
      type: ActionType.BuyPerk;
      payload: { perk: string };
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
  buyPerk: (perk: string): Action<ActionType.BuyPerk> => ({
    type: ActionType.BuyPerk,
    payload: { perk },
  }),
} as const;

function mutator(state: State, action: Action): string {
  switch (action.type) {
    case ActionType.Draw: {
      return execFunc(
        prop(state.playerHandCards, "push"),
        execFunc(prop(state.deckCards, "pop")),
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
    case ActionType.BuyPerk: {
      return "TODO";
    }
  }
}

export const dispatch = createActionDispatch(state, mutator);
