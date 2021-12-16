import { num } from "@arthuryeti/terra";

import { AssetInfo, getTokenDenom, isNativeToken } from "modules/common";
import { Pool } from "modules/pool";

export const calculateTokensAmounts = (
  pool: any,
  share: string
): Record<string, string> => {
  return pool.assets.reduce(
    (acc: any, asset: any) => ({
      ...acc,
      [getTokenDenom(asset.info)]: String(
        Math.floor(
          (Number(asset.amount) / Number(pool.total_share)) * Number(share)
        )
      ),
    }),
    {}
  );
};

const minusFee = (amount: number) => {
  const minFeeCoefficient = 0.03;
  const maxFee = 1500000;

  let fee = Math.ceil(amount * minFeeCoefficient);

  if (fee > maxFee) {
    fee = maxFee;
  }

  return amount - fee;
};

// TODO: refactor
export const calculateProvideOneAsset = (
  pool: any,
  firstToken: string,
  swapAmountTokenFirst: string,
  receivedAmountTokenSecond: string
) => {
  const [assetFirst, assetSecond] = pool.assets.sort((asset: AssetInfo) => {
    if (getTokenDenom(asset) === firstToken) {
      return -1;
    }

    return 1;
  });

  const poolBalanceAfterSwap = {
    amountFirst: Number(assetFirst.amount) + Number(swapAmountTokenFirst),
    amountSecond:
      Number(assetSecond.amount) - Number(receivedAmountTokenSecond),
  };

  let provideAmountSecond = Number(receivedAmountTokenSecond);

  if (isNativeToken(assetSecond.info)) {
    provideAmountSecond = minusFee(Number(receivedAmountTokenSecond));
  }

  return {
    provideAmount1: String(
      Math.ceil(
        provideAmountSecond *
          (poolBalanceAfterSwap.amountFirst / poolBalanceAfterSwap.amountSecond)
      )
    ),
    provideAmount2: String(provideAmountSecond),
  };
};

// TODO: remove
export const findRegularToken = (tokens: any) => {
  if (tokens[0] === "uusd") {
    return tokens[1];
  }

  return tokens[0];
};

// TODO: remove
export const enumToArray = (enumeration: any) => {
  return Object.keys(enumeration)
    .map((key) => enumeration[key])
    .filter((value) => typeof value === "string");
};

export const calculateTokenAmount = (
  pool: Pool,
  token: string,
  amount: string
) => {
  let token1Share = pool.token1.share;
  let token2Share = pool.token2.share;

  if (token != pool.token1.asset) {
    token1Share = pool.token2.share;
    token2Share = pool.token1.share;
  }

  return num(token2Share).div(token1Share).times(amount).toFixed(6);
};
