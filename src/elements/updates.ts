import { config } from "../config.ts";
import {
  add,
  assign,
  castNumber,
  decrement,
  defineFunc,
  div,
  dynamicProp,
  element,
  execFunc,
  expressions,
  formatStyle,
  group,
  ifElse,
  ifThen,
  isDifferent,
  loop,
  mul,
  prop,
  setInnerHtml,
  statements,
  sub,
  templateExpression,
  Text,
} from "../deps.ts";
import { ClassName } from "../style.ts";
import {
  animations,
  constants,
  data,
  domElementIds,
  Elements,
  functions,
  state,
  tmpRefs,
} from "../variables.ts";

export function defineLevelCounterRefresh() {
  return defineFunc(
    {
      name: functions.refreshLevelCounter,
      body: assign(
        prop(domElementIds.levelCounter, "innerHTML"),
        add(Text("Level "), state.level),
      ),
    },
  );
}

export function defineMoneyCountersRefresh() {
  return defineFunc(
    {
      name: functions.refreshMoneyCounters,
      body: statements(
        assign(
          tmpRefs.n,
          assign(
            prop(domElementIds.gameMoneyCounter, "innerHTML"),
            add(Text("💰"), state.money),
          ),
        ),
        ifThen(
          prop("window", domElementIds.shopMoneyCounter),
          assign(
            prop(domElementIds.shopMoneyCounter, "innerHTML"),
            tmpRefs.n,
          ),
        ),
      ),
    },
  );
}

export function defineCardReveal() {
  const deckBox = tmpRefs.obj;
  const playerHandHtml = prop(domElementIds.playerHand, "innerHTML");
  const setDeckBox = assign(
    tmpRefs.obj,
    execFunc(
      dynamicProp(
        domElementIds.deck,
        constants.getBoundingClientRect,
      ),
    ),
  );

  return defineFunc(
    {
      name: functions.cardReveal,
      body: statements(
        setDeckBox,
        assign(
          tmpRefs.currentCard,
          execFunc(prop(data.deckCards, "pop")),
        ),
        assign(
          playerHandHtml,
          add(
            playerHandHtml,
            element(Elements.card, {
              as: "templateLiteral",
              children: ifElse(
                castNumber(tmpRefs.currentCard),
                element(Elements.textCard, {
                  as: "templateLiteral",
                  children: tmpRefs.currentCard,
                }),
                element(Elements.emojiCard, {
                  as: "templateLiteral",
                  children: tmpRefs.currentCard,
                }),
              ),
              tagProps: {
                style: Text(formatStyle({
                  left: templateExpression(prop(deckBox, "left")),
                  top: templateExpression(prop(deckBox, "top")),
                  animation: `.5s ${animations.cardReveal}`,
                })),
                onclick: expressions(
                  assign(
                    tmpRefs.currentCard,
                    Text(templateExpression(tmpRefs.currentCard)),
                  ),
                  execFunc(functions.openCardModal),
                ),
              },
            }),
          ),
        ),
        ifElse(
          isDifferent(
            dynamicProp(constants.cardValues, tmpRefs.currentCard),
            13,
          ),
          drawValidCard(),
          draw13Card(),
        ),
      ),
    },
  );
}

function drawValidCard() {
  return group(
    expressions(
      execFunc("setTimeout", [
        defineFunc(
          {
            body: statements(
              execFunc(
                prop(state.playerHandCards, "push"),
                tmpRefs.currentCard,
              ),
              execFunc(functions.positionHandCards),
              assign(
                prop(
                  domElementIds.playerHand,
                  "lastChild",
                  "style",
                  "animation",
                ),
                Text(""),
              ),
              assign(
                prop(domElementIds.playerHand, "lastChild", "className"),
                Text(ClassName.InteractiveCard),
              ),
            ),
          },
        ),
        500,
      ]),
    ),
    ")",
  );
}

function draw13Card() {
  return group(expressions(
    assign(
      prop(domElementIds.page, "className"),
      Text(ClassName.GameOver),
    ),
    execFunc("setTimeout", [
      defineFunc(
        {
          body: statements(
            assign(prop(domElementIds.page, "className"), Text("")),
            execFunc(functions.goToGameOverPage),
          ),
        },
      ),
      5000,
    ]),
  ));
}

export function defineOpenCardModal() {
  const modalElements = [
    element(Elements.closeButton, {
      tagProps: {
        onclick: execFunc(
          prop(domElementIds.modal, "close"),
        ),
      },
    }),
    element(Elements.flexWithoutStyle, {
      children: templateExpression(tmpRefs.currentCard),
      tagProps: {
        style: formatStyle({
          fontSize: 200,
        }),
      },
    }),
    element(Elements.button, {
      children: [
        "Discard for 💰",
        templateExpression(
          dynamicProp(constants.cardValues, tmpRefs.currentCard),
        ),
      ],
      tagProps: {
        onclick: execFunc(functions.discardCard),
      },
    }),
  ];

  return defineFunc(
    {
      name: functions.openCardModal,
      body: statements(
        assign(
          prop(domElementIds.modal, "innerHTML"),
          "`" + modalElements.join("") + "`",
        ),
        execFunc(prop(domElementIds.modal, "showModal")),
      ),
    },
  );
}

export function defineOpenShopModal() {
  return defineFunc(
    {
      name: functions.openShopModal,
      body: statements(
        setInnerHtml(domElementIds.modal, [
          element(Elements.closeButton, {
            tagProps: {
              onclick: execFunc(
                prop(domElementIds.modal, "close"),
              ),
            },
          }),
          element(Elements.bigTitle, {
            children: "Card Shop",
          }),
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.shopMoneyCounter,
            },
          }),
        ]),
        execFunc(functions.refreshMoneyCounters),
        execFunc(
          prop(domElementIds.modal, "showModal"),
        ),
      ),
    },
  );
}

export function definePositionHandCards() {
  return defineFunc({
    name: functions.positionHandCards,
    body: loop({
      init: expressions(
        assign(tmpRefs.obj, prop(domElementIds.playerHand, "children")),
        assign(tmpRefs.n, assign(tmpRefs.index, prop(tmpRefs.obj, "length"))),
      ),
      condition: assign(
        tmpRefs.item,
        dynamicProp(tmpRefs.obj, decrement(tmpRefs.index, 1, { before: true })),
      ),
      body: assign(
        prop(tmpRefs.item, "style", "left"),
        add(
          mul(
            div(
              execFunc("Math.min", [
                "innerWidth",
                mul(tmpRefs.n, config.cardWidth),
              ]),
              tmpRefs.n,
            ),
            tmpRefs.index,
          ),
          execFunc("Math.max", [
            0,
            sub(div("innerWidth", 2), mul(tmpRefs.n, config.cardWidth / 2)),
          ]),
        ),
      ),
      body2: assign(
        prop(tmpRefs.item, "style", "top"),
        prop(
          execFunc(
            dynamicProp(
              domElementIds.playerHand,
              constants.getBoundingClientRect,
            ),
          ),
          "top",
        ),
      ),
    }),
  });
}

export function defineDiscardCard() {
  return defineFunc({
    name: functions.discardCard,
    body: statements(
      // close the modal
      execFunc(prop(domElementIds.modal, "close")),
      execFunc(
        // push card in discard pile
        prop(state.discardedCards, "push"),
        dynamicProp(
          execFunc(
            // remove card from hand
            prop(state.playerHandCards, "splice"),
            [execFunc(
              prop(state.playerHandCards, "indexOf"),
              tmpRefs.currentCard,
            )],
          ),
          0,
        ),
      ),
      // add card value to money
      assign(
        state.money,
        add(
          state.money,
          dynamicProp(constants.cardValues, tmpRefs.currentCard),
        ),
      ),
      // move card to discard pile element
      // position hand cards
      execFunc(functions.positionHandCards),
      // refresh money counters
      execFunc(functions.refreshMoneyCounters),
    ),
  });
}
