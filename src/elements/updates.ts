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
            add(Text("💰 "), state.money),
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
        600,
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
    element(Elements.flexWithoutStyle, {
      children: templateExpression(tmpRefs.currentCard),
      tagProps: {
        style: formatStyle({
          fontSize: 200,
        }),
      },
    }),
    element(Elements.paragraph, {
      children: [
        "Value: ",
        templateExpression(
          dynamicProp(constants.cardValues, tmpRefs.currentCard),
        ),
      ],
    }),
    element(Elements.button, {
      children: "Close",
      tagProps: {
        onclick: execFunc(
          prop(domElementIds.modal, "close"),
        ),
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
          element(Elements.bigTitle, {
            children: "Card Shop",
          }),
          element(Elements.paragraph, {
            tagProps: {
              id: domElementIds.shopMoneyCounter,
            },
          }),
          element(Elements.button, {
            children: "Close",
            tagProps: {
              onclick: execFunc(
                prop(domElementIds.modal, "close"),
              ),
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
        mul(
          div(
            execFunc("Math.min", ["innerWidth", mul(tmpRefs.n, 256)]),
            tmpRefs.n,
          ),
          tmpRefs.index,
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
