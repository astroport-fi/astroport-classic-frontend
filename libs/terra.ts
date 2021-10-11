import { getTokenDenom, PoolResponse } from "modules/common";

export const findAssetInPool = (pool: PoolResponse, asset: string) => {
  return pool.assets.find((a) => {
    return getTokenDenom(a.info) === asset;
  });
};

export const getAssetAmountsInPool = (pool: PoolResponse) => {
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
