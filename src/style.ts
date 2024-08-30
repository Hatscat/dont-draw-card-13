import { animations, domElementIds, Elements } from "./variables.ts";
import { formatStylesheet, Text } from "./deps.ts";

export const enum ClassName {
  InteractiveCard = "a",
}

export function getStylesheet() {
  return formatStylesheet({
    [`@keyframes ${animations.cardReveal}`]: formatStylesheet({
      "0%": { transform: "scaleX(-1)", background: "#000" },
      "20%": { background: "#000" },
      "50%": { background: "#FFF" },
      "100%": {},
    }),
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
      transition: "all 1s ease",
    },
    [directChildren(Elements.page)]: {
      minWidth: 256,
    },
    [list(Elements.interactive, Elements.button, Elements.card)]: {
      cursor: "pointer",
    },
    [Elements.button]: {
      background: "#333",
      padding: 16,
    },
    [list(hover(Elements.button), hover(id(domElementIds.deck)))]: {
      filter: "invert(1)",
    },
    [Elements.bigTitle]: {
      fontSize: 48,
      margin: 16,
    },
    [id(domElementIds.cardShopDialog)]: {
      display: "none",
    },
    [`${id(domElementIds.cardShopDialog)}[open]`]: {
      display: "flex",
      background: "#000",
    },
    ["::backdrop"]: {
      background: "#7777",
    },
    [list(Elements.card, id(domElementIds.deck))]: {
      borderRadius: "24px",
      height: 360,
      width: 256,
      color: "#000",
    },
    [id(domElementIds.deck)]: {
      background: "#FFF",
      outline: "2px double",
      boxShadow: "0 0 4px 4px #777",
    },
    [Elements.card]: {
      background: "#FFF",
      position: "fixed",
      border: "4px solid",
    },
    [`${Elements.card}>*`]: {
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
      alignSelf: "flex-end",
      borderRadius: "16px",
      border: "4px dashed #CCC",
      height: 192,
      width: 128,
    },
    [id(domElementIds.playerHand)]: {
      height: 192,
      margin: 24,
    },
    [`.${ClassName.InteractiveCard}:hover`]: {
      transform: "translateY(-66%)",
    },
  });
}

function id(id: string) {
  return `#${id}`;
}

function list(...selectors: string[]) {
  return selectors.join(",");
}

function hover(selector: string) {
  return `${selector}:hover`;
}

function directChildren(selector: string) {
  return `${selector}>*`;
}
