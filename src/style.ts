import { domElementIds, Elements } from "./variables.ts";
import { formatStylesheet } from "./deps.ts";

export function getStylesheet() {
  return formatStylesheet({
    "*": { margin: 0, color: "#EEE", fontFamily: "Arial" },
    "body": { background: "#111", overflow: "hidden" },
    [`${Elements.page} *`]: {
      display: "flex",
      fontSize: 24,
    },
    [Elements.page]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [list(Elements.interactive, Elements.button)]: {
      cursor: "pointer",
    },
    [Elements.button]: {
      background: "#333",
      justifyContent: "center",
      width: 256,
      padding: "16 0",
      margin: 16,
      borderRadius: "8px",
    },
    [hover(Elements.button)]: {
      background: "#444",
    },
    // [list(id(domElementIds.cardShopButton), id(domElementIds.giveUpButton))]: {
    //   width: 128,
    //   height: 128,
    // },
    [Elements.bigTitle]: {
      fontSize: 64,
      padding: 16,
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
