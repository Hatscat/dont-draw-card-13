import { domElementIds, Elements } from "./variables.ts";
import { formatStylesheet } from "./deps.ts";

export function getStylesheet() {
  return formatStylesheet({
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
    [id(domElementIds.deck)]: {
      borderRadius: "24px",
      background: "#1EE",
      color: "#000",
      outline: "2px double #000",
      boxShadow: "0 0 4px 4px #188",
      height: 384,
      width: 256,
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
