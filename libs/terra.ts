import { getTokenDenom } from "@arthuryeti/terra";

import { Pool } from "types/common";

export const findAssetInPool = (pool: Pool, asset: string) => {
  return pool.assets.find((a) => {
    return getTokenDenom(a.info) === asset;
  });
};

export const getAssetAmountsInPool = (pool: Pool) => {
  return pool.assets.reduce(
    (prev, a) => {
      const key = getTokenDenom(a.info) === "uusd" ? "uusd" : "other";

      return {
        ...prev,
        [key]: a.amount,
      };
    },
    { uusd: "0", other: "0" }
  );
};
