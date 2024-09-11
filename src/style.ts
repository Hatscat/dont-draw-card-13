import { domElementIds, Elements } from "./variables.ts";
import {
  after,
  attribute,
  className,
  directChildren,
  formatStylesheet,
  hover,
  id,
  selectorList,
  Text,
} from "./deps.ts";
import { config } from "./config.ts";

export const enum ClassName {
  InHandCard = "a",
  DiscardedCard = "b",
  ShopCard = "c",
  ActionCard = "d",
  GameOver = "e",
}

export const enum Animation {
  CardReveal = "a",
  GameOver = "b",
  ScreenShake = "c",
}

export function getStylesheet() {
  return formatStylesheet({
    // animations
    [`@keyframes ${Animation.CardReveal}`]: formatStylesheet({
      "0%": { transform: "scaleX(-1)", background: "#000" },
      "20%": { background: "#000" },
      "50%": { background: "#FFF" },
    }),
    [`@keyframes ${Animation.GameOver}`]: formatStylesheet({
      "0%": { filter: "none", color: "#0000" },
      "100%": {
        filter: "blur(7px)",
        color: "red",
        fontSize: 777,
      },
    }),
    [`@keyframes ${Animation.ScreenShake}`]: formatStylesheet({
      "33%": { transform: "rotate(2deg)" },
      "77%": { transform: "rotate(-2deg)" },
    }),
    // general
    body: { background: "#111" },
    [selectorList(Elements.page, `${Elements.page} *`)]: {
      color: "#EEE",
      fontFamily: "monospace",
      fontSize: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      transition: "all .7s",
    },
    [Elements.bigTitle]: {
      fontSize: 48,
      margin: 16,
    },
    // buttons
    [
      selectorList(
        Elements.interactive,
        Elements.button,
        Elements.card,
        Elements.closeButton,
      )
    ]: {
      cursor: "pointer",
    },
    [Elements.button]: {
      background: "#333",
      padding: "24 48",
    },
    [
      selectorList(
        hover(Elements.button),
        hover(Elements.interactive),
        hover(Elements.card),
        hover(Elements.closeButton),
      )
    ]: {
      filter: "invert(1)",
    },
    // [hover(Elements.interactive)]: {
    //   zIndex: 7,
    // },
    [Elements.closeButton]: {
      alignSelf: "flex-end",
    },
    [after(Elements.closeButton)]: {
      content: Text("❌"),
    },
    // modals
    [id(domElementIds.modal)]: {
      display: "none",
    },
    [attribute(id(domElementIds.modal), "open")]: {
      display: "flex",
      background: "#000",
    },
    ["::backdrop"]: {
      background: "#7777",
    },
    // cards, deck and discard pile
    [
      selectorList(
        Elements.card,
        id(domElementIds.deck),
      )
    ]: {
      borderRadius: "16px",
      height: config.cardHeight,
      width: config.cardWidth,
      color: "#000",
    },
    [id(domElementIds.deckLengthCounter)]: {
      color: "#000",
    },
    [id(domElementIds.deck)]: {
      background: "#FFF",
      outline: "4px double #777",
    },
    [Elements.card]: {
      background: "#DDD",
      outline: "3px solid",
      color: "#000",
      fontSize: 100,
    },
    [directChildren(Elements.card)]: {
      fontSize: "1em",
      color: "inherit",
      pointerEvents: "none",
    },
    [Elements.emojiCard]: {
      fontSize: "4em",
      paddingBottom: "22%",
    },
    [id(domElementIds.discardPile)]: {
      outline: "4px dashed #CCC",
    },
    [
      selectorList(
        id(domElementIds.discardPile),
        className(ClassName.DiscardedCard),
      )
    ]: {
      pointerEvents: "none",
      borderRadius: "16px",
      height: 192,
      width: 128,
    },
    [id(domElementIds.playerHand)]: {
      margin: 24,
    },
    [className(ClassName.DiscardedCard)]: {
      fontSize: 50,
    },
    // game over
    [className(ClassName.GameOver)]: {
      pointerEvents: "none",
      animation:
        `5s ${Animation.GameOver}, .1s ${Animation.ScreenShake} infinite`,
    },
    [after(className(ClassName.GameOver))]: {
      content: Text("13"),
      position: "fixed",
    },
    // victory
    // TODO: victory animation
  });
}
