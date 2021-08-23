import { findAsset, getTokenDenom, trunc, isNativeToken } from "modules/terra";
import { DECIMALS, ONE_TOKEN } from "constants/constants";

export const calculateShare = (pool: any, token: string, amount: string) => {
  const asset = findAsset(pool.assets, token);

  const share = trunc(
    (Number(amount) / Number(asset.amount)) * Number(pool.total_share)
  );

  return String(share);
};

export const calculateWithdrawTotalPrice = (
  totalPrice1: string,
  totalPrice2: string
) => String(trunc(Number(totalPrice1) + Number(totalPrice2), DECIMALS));

export const calculateToken2Amount = (
  pool: any,
  token: string,
  amount: string
) => {
  const { assets } = pool;

  const [{ amount: totalAmount1 }, { amount: totalAmount2 }] = [...assets].sort(
    (a) => (getTokenDenom(a) === token ? -1 : 1)
  );

  const result = Number(amount) * (Number(totalAmount2) / Number(totalAmount1));

  return String(result);
};

export const calculateTokensAmounts = (
  pool: any,
  share: string
): Record<string, string> => {
  return pool.assets.reduce(
    (acc, asset) => ({
      ...acc,
      [getTokenDenom(asset)]: Math.floor(
        (Number(asset.amount) / Number(pool.total_share)) * Number(share)
      ),
    }),
    {}
  );
};

export const calculateSharePrice = (
  pool: any,
  share: string,
  token1: string,
  token2: string,
  token1Price: string,
  token2Price: string
) => {
  const tokensAmounts = calculateTokensAmounts(pool, share);

  const token1TotalPrice = trunc(
    (Number(tokensAmounts[token1]) * Number(token1Price)) / ONE_TOKEN
  );

  const token2TotalPrice = trunc(
    (Number(tokensAmounts[token2]) * Number(token2Price)) / ONE_TOKEN
  );

  return String(token1TotalPrice + token2TotalPrice);
};

const minusFee = (amount: number) => {
  const minFeeCoefficient = 0.03;
  const maxFee = 1500000;

  let fee = Math.ceil(amount * minFeeCoefficient);

  fee = fee > maxFee ? maxFee : fee;

  return amount - fee;
};

export const calculateProvideOneAsset = (
  pool: any,
  firstToken: string,
  swapAmountTokenFirst: string,
  receivedAmountTokenSecond: string
) => {
  const [assetFirst, assetSecond] = pool.assets.sort((asset) => {
    return getTokenDenom(asset) === firstToken ? -1 : 1;
  });

  const poolBalanceAfterSwap = {
    amountFirst: Number(assetFirst.amount) + Number(swapAmountTokenFirst),
    amountSecond:
      Number(assetSecond.amount) - Number(receivedAmountTokenSecond),
  };

  console.log("receivedAmountTokenSecond", receivedAmountTokenSecond);
  console.log("poolBalanceAfterSwap", poolBalanceAfterSwap);

  const provideAmountSecond = isNativeToken(assetSecond.info)
    ? minusFee(Number(receivedAmountTokenSecond))
    : Number(receivedAmountTokenSecond);

  return {
    provideAmountFirst: String(
      Math.ceil(
        provideAmountSecond *
          (poolBalanceAfterSwap.amountFirst / poolBalanceAfterSwap.amountSecond)
      )
    ),
    provideAmountSecond: String(provideAmountSecond),
  };
};
