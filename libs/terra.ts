import { getTokenDenom, PoolResponse } from "modules/common";

export const findAssetInPool = (pool: PoolResponse, asset: string) => {
  return pool.assets.find((a) => {
    return getTokenDenom(a.info) === asset;
  });
};

export const getAssetAmountsInPool = (assets: any, token: string) => {
  return assets.reduce(
    (prev: any, a: any) => {
      const key = getTokenDenom(a.info) === token ? "token1" : "token2";

      return {
        ...prev,
        [key]: a.amount,
      };
    },
    { token1: null, token2: null }
  );
};
