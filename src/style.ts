import { animations, domElementIds, Elements } from "./variables.ts";
import { formatStylesheet, Text } from "./deps.ts";
import { config } from "./config.ts";

export const enum ClassName {
  InteractiveCard = "a",
  DiscardedCard = "b",
  GameOver = "c",
}

export function getStylesheet() {
  return formatStylesheet({
    // animations
    [`@keyframes ${animations.cardReveal}`]: formatStylesheet({
      "0%": { transform: "scaleX(-1)", background: "#000" },
      "20%": { background: "#000" },
      "50%": { background: "#FFF" },
    }),
    [`@keyframes ${animations.gameOver}`]: formatStylesheet({
      "0%": { filter: "none", color: "#0000" },
      "100%": {
        filter: "blur(7px)",
        color: "#F00",
        fontSize: 777,
      },
    }),
    [`@keyframes ${animations.screenShake}`]: formatStylesheet({
      "33%": { transform: "rotate(2deg)" },
      "77%": { transform: "rotate(-2deg)" },
    }),
    // general
    body: { background: "#111" },
    [list(Elements.page, `${Elements.page} *`)]: {
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
      list(
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
      padding: 16,
    },
    [list(hover(Elements.button), hover(id(domElementIds.deck)))]: {
      filter: "invert(1)",
    },
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
    [`${id(domElementIds.modal)}[open]`]: {
      display: "flex",
      background: "#000",
    },
    ["::backdrop"]: {
      background: "#7777",
    },
    // cards, deck and discard pile
    [list(Elements.card, id(domElementIds.deck))]: {
      borderRadius: "24px",
      height: config.cardHeight,
      width: config.cardWidth,
      color: "#000",
    },
    [id(domElementIds.deck)]: {
      background: "#FFF",
      outline: "4px double #777",
    },
    [Elements.card]: {
      background: "#FFF",
      position: "fixed",
      outline: "4px solid",
    },
    [directChildren(Elements.card)]: {
      fontSize: 88,
      color: "#000",
      pointerEvents: "none",
    },
    [Elements.emojiCard]: {
      fontSize: 400,
      position: "absolute",
      top: -88,
    },
    [id(domElementIds.discardPile)]: {
      outline: "4px dashed #CCC",
    },
    [list(id(domElementIds.discardPile), className(ClassName.DiscardedCard))]: {
      pointerEvents: "none",
      borderRadius: "16px",
      height: 192,
      width: 128,
    },
    [id(domElementIds.playerHand)]: {
      margin: 24,
    },
    [hover(className(ClassName.InteractiveCard))]: {
      transform: "translateY(-7%)",
      zIndex: 7,
    },
    [directChildren(className(ClassName.DiscardedCard), Elements.emojiCard)]: {
      fontSize: 200,
      top: -36,
    },
    // game over
    [className(ClassName.GameOver)]: {
      pointerEvents: "none",
      animation:
        `5s ${animations.gameOver}, .1s ${animations.screenShake} infinite`,
    },
    [after(className(ClassName.GameOver))]: {
      content: Text("13"),
      position: "fixed",
    },
    // victory
    // TODO: victory animation
  });
}

export function id(id: string) {
  return `#${id}`;
}

export function className(cn: string) {
  return `.${cn}`;
}

export function list(...selectors: string[]) {
  return selectors.join(",");
}

export function hover(selector: string) {
  return `${selector}:hover`;
}

export function after(selector: string) {
  return `${selector}::after`;
}

export function directChildren(selector: string, childSelector = "*") {
  return `${selector}>${childSelector}`;
}
