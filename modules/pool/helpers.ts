import {
  findAsset,
  getTokenDenom,
  trunc,
  isNativeToken,
  useTokenInfo
} from "@arthuryeti/terra";
import { DECIMALS, ONE_TOKEN } from "constants/constants";
import { lookupSymbol } from "libs/parse";
import { Pool } from 'types/common';

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
  pool: Pool,
  share: string
): Record<string, string> => {
  return pool.assets.reduce(
    (acc, asset) => ({
      ...acc,
      [getTokenDenom(asset.info)]: String(Math.floor(
        (Number(asset.amount) / Number(pool.total_share)) * Number(share)
      )),
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

  const provideAmountSecond = isNativeToken(assetSecond.info)
    ? minusFee(Number(receivedAmountTokenSecond))
    : Number(receivedAmountTokenSecond);

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


export const preparingSelectList = (tokens) => {
  const { getSymbol } = useTokenInfo();

  if (tokens.includes('uusd')) {
    const preparedTokens = [...tokens].sort();

    const lookupedToken = lookupSymbol(getSymbol(preparedTokens[0]));

    return [
      `${lookupedToken} / UST`
    ];
  }

  const firstLookupedToken = lookupSymbol(getSymbol(tokens[0]));
  const secondLookupedToken = lookupSymbol(getSymbol(tokens[1]));

  return [
    `${firstLookupedToken} / UST`,
    `${secondLookupedToken} / UST`,
    `${firstLookupedToken} / ${secondLookupedToken}`,
  ];
}

export const findRegularToken = (tokens) => {
  return tokens[0] === "uusd" ? tokens[1] : tokens[0];
}

export const enumToArray = (enumeration) => {
  return Object.keys(enumeration).map(key => enumeration[key]).filter(value => typeof value === 'string');
}
