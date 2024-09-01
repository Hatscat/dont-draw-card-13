import {
  add,
  assign,
  defineFunc,
  dynamicProp,
  element,
  execFunc,
  expressions,
  formatStyle,
  group,
  ifElse,
  isDifferent,
  isGreater,
  mul,
  prop,
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
      body: assign(
        prop(domElementIds.shopMoneyCounter, "innerHTML"),
        assign(
          prop(domElementIds.gameMoneyCounter, "innerHTML"),
          add(Text("💰 "), state.money),
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
                isGreater(prop(tmpRefs.currentCard, "length"), 2), // TODO: to change with joker cards (emojis too but with few chars, maybe isNaN?)
                element(Elements.emojiCard, {
                  as: "templateLiteral",
                  children: tmpRefs.currentCard,
                }),
                element(Elements.textCard, {
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
                // onclick: execFunc(functions.openCardModal), // TODO: no need to have a dedicated func in fact
                onclick: statements(
                  assign(
                    tmpRefs.currentCard, // TODO: assign the modal elem
                    Text(templateExpression(tmpRefs.currentCard)),
                  ),
                  execFunc(prop(domElementIds.cardDialog, "showModal")),
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
              assign(
                tmpRefs.obj,
                prop(domElementIds.playerHand, "lastChild", "style"),
              ),
              assign(prop(tmpRefs.obj, "animation"), Text("")),
              assign(
                prop(tmpRefs.obj, "left"),
                mul(prop(state.playerHandCards, "length"), 77), // TODO: calc in CSS instead
              ),
              assign(
                prop(tmpRefs.obj, "top"),
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
              assign(
                prop(domElementIds.playerHand, "lastChild", "className"),
                Text(ClassName.InteractiveCard),
              ),
              execFunc(
                prop(state.playerHandCards, "push"),
                tmpRefs.currentCard,
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
  return defineFunc(
    {
      name: functions.openCardModal,
      body: "console.log('drawRevealedCard')",
    },
  );
}
