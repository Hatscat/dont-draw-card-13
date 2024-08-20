// import { font, Text } from "./deps.ts";

export const config = {
  perksCost: {
    displayTheDeckLength: "1",
    displayTheDiscardedLength: "1",
    startEveryLevelWithTheResetJokerInHand: "1",
    startEveryLevelWith10Money: "1",
    twentyPercentShopDiscount: "1",
    freeShopReload: "100",
    // twentyPercentMoreMoney: "1",
  },
  jokersCost: {
    resetTheCurrentLevel: "1",
  },
} as const;
