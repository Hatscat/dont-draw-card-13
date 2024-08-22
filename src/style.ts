import { domElementIds, Elements } from "./variables.ts";
import { formatStylesheet } from "./deps.ts";

export function getStylesheet() {
  return formatStylesheet({
    body: { background: "#111" },
    [list(Elements.page, `${Elements.page} *`)]: {
      color: "#EEE",
      fontFamily: "monospace",
      fontSize: 24,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
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
