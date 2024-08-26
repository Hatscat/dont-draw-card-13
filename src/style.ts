import { animations, domElementIds, Elements } from "./variables.ts";
import { formatStylesheet } from "./deps.ts";

export function getStylesheet() {
  return formatStylesheet({
    [`@keyframes ${animations.cardReveal}`]: formatStylesheet({
      "0%": { transform: "scaleX(-1)", background: "#A11", color: "#A11" },
      "40%": { background: "#A11", color: "#A11" },
      "50%": { background: "#FFF", color: "#000" },
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
      transition: "all 0.6s ease",
    },
    [directChildren(Elements.page)]: {
      minWidth: 256,
    },
    [list(Elements.interactive, Elements.button)]: {
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
      height: 320,
      width: 256,
      color: "#000",
      paddingBottom: 40,
    },
    [id(domElementIds.deck)]: {
      background: "#1EE",
      outline: "2px double #000",
      boxShadow: "0 0 4px 4px #188",
    },
    [Elements.card]: {
      border: "2px solid #000",
      background: "#FFF",
      fontSize: 400,
      position: "fixed",
    },
    [id(domElementIds.discardPile)]: {
      alignSelf: "flex-end",
      borderRadius: "16px",
      border: "4px dashed #CCC",
      height: 192,
      width: 128,
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
