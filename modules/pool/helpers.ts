import { ONE_TOKEN } from "constants/constants";
import { lookupSymbol } from "libs/parse";
import { AssetInfo, getTokenDenom, isNativeToken } from "modules/common";

export const calculateToken2Amount = (
  pool: any,
  token: string,
  amount: string
) => {
  const { assets } = pool;

  const [{ amount: totalAmount1 }, { amount: totalAmount2 }] = [...assets].sort(
    (a) => {
      if (getTokenDenom(a) === token) {
        return -1;
      }

      return 1;
    }
  );

  const result = Number(amount) * (Number(totalAmount2) / Number(totalAmount1));

  return String(result.toFixed(6));
};

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

export const calculateSharePrice = (
  pool: any,
  share: string,
  token1: string,
  token2: string,
  token1Price: string,
  token2Price: string
) => {
  const tokensAmounts = calculateTokensAmounts(pool, share);

  const token1TotalPrice =
    (Number(tokensAmounts[token1]) * Number(token1Price)) / ONE_TOKEN;

  const token2TotalPrice =
    (Number(tokensAmounts[token2]) * Number(token2Price)) / ONE_TOKEN;

  return String(token1TotalPrice + token2TotalPrice);
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

export const preparingSelectList = (tokens: any) => {
  // const { getSymbol } = useTokenInfo();

  if (tokens.includes("uusd")) {
    const preparedTokens = [...tokens].sort();

    const lookupedToken = lookupSymbol(preparedTokens[0]);

    return [`${lookupedToken} / UST`];
  }

  const firstLookupedToken = lookupSymbol(tokens[0]);
  const secondLookupedToken = lookupSymbol(tokens[1]);

  return [
    `${firstLookupedToken} / UST`,
    `${secondLookupedToken} / UST`,
    `${firstLookupedToken} / ${secondLookupedToken}`,
  ];
};

export const findRegularToken = (tokens: any) => {
  if (tokens[0] === "uusd") {
    return tokens[1];
  }

  return tokens[0];
};

export const enumToArray = (enumeration: any) => {
  return Object.keys(enumeration)
    .map((key) => enumeration[key])
    .filter((value) => typeof value === "string");
};
