import { domElementIds, Elements } from "./variables.ts";
import { formatStylesheet } from "./deps.ts";

export function getStylesheet() {
  return formatStylesheet({
    "body": { background: "#111" },
    "body *": {
      color: "#EEE",
      fontFamily: "monospace",
      display: "flex",
      fontSize: 24,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    [list(Elements.page, Elements.button, id(domElementIds.cardShopDialog))]: {
      flexDirection: "column",
    },
    [directChildren(Elements.page)]: {
      minWidth: 256,
    },
    [list(Elements.interactive, Elements.button)]: {
      cursor: "pointer",
    },
    [Elements.button]: {
      background: "#333",
      padding: 24,
      margin: 24,
      transition: "all 0.6s ease",
    },
    [hover(Elements.button)]: {
      filter: "invert(1)",
    },
    [Elements.bigTitle]: {
      fontSize: 64,
      // padding: 16,
      margin: 24,
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
