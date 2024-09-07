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
import { Animation, ClassName, className } from "../style.ts";
import {
  constants,
  data,
  domElementIds,
  Elements,
  functions,
  state,
  tmpRefs,
} from "../variables.ts";

export function defineRefreshAllCounters() {
  return defineFunc(
    {
      name: functions.refreshAllCounters,
      body: statements(
        // Deck length counter
        assign(
          prop(domElementIds.deckLengthCounter, "innerHTML"),
          add(
            Text("Draw ("),
            prop(data.deckCards, "length"),
            Text(")"),
          ),
        ),
        // Discard pile length counter
        assign(
          prop(domElementIds.discardPileLengthCounter, "innerHTML"),
          add(
            Text("Discard Pile ("),
            prop(state.discardedCards, "length"),
            Text(")"),
          ),
        ),
        // Game money counter
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
  const pageHtml = prop(domElementIds.page, "innerHTML");
  const deckBox = tmpRefs.obj;
  const setDeckBox = assign(
    deckBox,
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
        execFunc(functions.refreshAllCounters),
        // create a new card element
        assign(
          pageHtml,
          add(
            pageHtml,
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
                  animation: `.5s ${Animation.CardReveal}`,
                })),
                onclick: expressions(
                  assign(
                    tmpRefs.currentCard,
                    Text(templateExpression(tmpRefs.currentCard)),
                  ),
                  assign(tmpRefs.currentCardElement, "this"),
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
      execFunc(
        prop(state.playerHandCards, "push"),
        tmpRefs.currentCard,
      ),
      assign(
        tmpRefs.currentCardElement,
        prop(domElementIds.page, "lastChild"),
      ),
      execFunc("setTimeout", [
        defineFunc(
          {
            body: statements(
              assign(
                prop(tmpRefs.currentCardElement, "style", "animation"),
                Text(""),
              ),
              assign(
                prop(tmpRefs.currentCardElement, "className"),
                Text(ClassName.InHandCard),
              ),
              execFunc(functions.positionHandCards),
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
            assign(state.gameState, Text("gameOver")),
            execFunc(functions.goToMenuPage),
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
        execFunc(functions.refreshAllCounters),
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
    body: statements(
      loop({
        init: expressions(
          assign(
            tmpRefs.obj,
            execFunc(
              prop(domElementIds.page, "querySelectorAll"),
              Elements.card + className(ClassName.InHandCard),
              { isTemplateLiteral: true },
            ),
          ),
          assign(tmpRefs.n, assign(tmpRefs.index, prop(tmpRefs.obj, "length"))),
        ),
        condition: assign(
          tmpRefs.item,
          dynamicProp(
            tmpRefs.obj,
            decrement(tmpRefs.index, 1, { before: true }),
          ),
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
              sub(
                div("innerWidth", 2),
                mul(tmpRefs.n, config.cardWidth / 2),
              ),
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
    ),
  });
}

export function defineDiscardCard() {
  const discardPileBox = tmpRefs.obj;
  const setDiscardPileBox = assign(
    discardPileBox,
    execFunc(
      dynamicProp(
        domElementIds.discardPile,
        constants.getBoundingClientRect,
      ),
    ),
  );

  return defineFunc({
    name: functions.discardCard,
    body: statements(
      // remove the click event handler
      assign(
        prop(tmpRefs.currentCardElement, "onclick"),
        Text(""),
      ),
      // close the modal
      execFunc(prop(domElementIds.modal, "close")),
      execFunc(
        // push card in discard pile
        prop(state.discardedCards, "push"),
        dynamicProp(
          execFunc(
            // remove card from hand
            prop(state.playerHandCards, "splice"),
            execFunc(
              prop(state.playerHandCards, "indexOf"),
              tmpRefs.currentCard,
            ),
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
      // refresh money counters
      execFunc(functions.refreshAllCounters),
      // replace the class name with DiscardedCard
      assign(
        prop(tmpRefs.currentCardElement, "className"),
        Text(ClassName.DiscardedCard),
      ),
      // move card to discard pile element: left and top position
      setDiscardPileBox,
      assign(
        prop(tmpRefs.currentCardElement, "style", "left"),
        prop(discardPileBox, "left"),
      ),
      assign(
        prop(tmpRefs.currentCardElement, "style", "top"),
        prop(discardPileBox, "top"),
      ),
      // set order of the card in the discard pile
      assign(
        prop(tmpRefs.currentCardElement, "style", "zIndex"),
        sub(prop(state.discardedCards, "length"), 88),
      ),
      // position other cards
      execFunc(functions.positionHandCards),
    ),
  });
}
