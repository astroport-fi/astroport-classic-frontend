import { useMemo } from "react";
import num from "libs/num";

import { PoolResponse, getTokenDenom, useTokenInfo } from "modules/common";

type Response = {
  [key: string]: string;
} | null;

type Params = {
  pool?: PoolResponse | undefined;
  amount?: string | undefined;
};

export const useLpToTokens = ({ pool, amount }: Params): Response => {
  const { getDecimals } = useTokenInfo();

  return useMemo(() => {
    if (pool == null || amount == null || num(amount).isEqualTo(0)) {
      return null;
    }

    const { assets, total_share } = pool;

    // @ts-expect-error
    return (assets || []).reduce((acc, asset) => {
      return {
        ...acc,
        [getTokenDenom(asset.info)]: num(amount)
          .div(10 ** 6)
          .times(
            num(asset.amount).div(10 ** getDecimals(getTokenDenom(asset.info)))
          )
          .div(num(total_share).div(10 ** 6))
          .times(10 ** 6)
          .toFixed(),
      };
    }, {});
  }, [pool, amount]);
};

export default useLpToTokens;
