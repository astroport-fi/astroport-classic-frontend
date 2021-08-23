import { Denom, Coin, Coins } from "@terra-money/terra.js";

import { getIsTokenNative } from "libs/parse";
import { ONE_TOKEN, DECIMALS } from "constants/constants";
import { Asset, AssetToken } from "types/asset";
import {
  PairsMap,
  TokenItem,
  TokenList,
  TokensMap,
  NativeToken,
  Pair,
  CW20Token,
  AssetInfo,
} from "types/common";

export const isNativeToken = (
  token: CW20Token | NativeToken | AssetInfo
): any => {
  if ("native_token" in token) {
    return true;
  }

  return false;
};

export const getTokenDenom = ({ info }: any) => {
  if (isNativeToken(info)) {
    return info.native_token.denom;
  }

  return info.token?.contract_addr;
};

export const getTokenDenoms = (assetInfos: AssetInfo[]) => {
  return assetInfos.map((info) => getTokenDenom(info));
};

export const getNativeTokenIconUrl = (symbol: string) => {
  return `https://assets.terra.money/icon/60/${symbol}.png`;
};

const getTokenSymbol = (denom: string, tokenList: TokenList) => {
  return (
    tokenList[denom]?.symbol ||
    (denom === "uluna" ? "Luna" : `${denom.slice(1, 3).toUpperCase()}T`)
  );
};

const formatPair = (
  pairsMap: PairsMap,
  pair: Pair,
  from: AssetInfo,
  to: AssetInfo
) => {
  const [tokenFrom, tokenTo] = getTokenDenoms([from, to]);

  const prevPairs = pairsMap[tokenFrom] || {};

  return {
    [tokenFrom]: {
      ...prevPairs,
      [tokenTo]: pair,
    },
  };
};

export const formatPairs = (pairs: any[]): PairsMap => {
  return pairs.reduce<PairsMap>((pairsMap, pair) => {
    const [tokenFirst, tokenSecond] = pair.assets;

    return {
      ...pairsMap,
      ...formatPair(pairsMap, pair, tokenFirst, tokenSecond),
      ...formatPair(pairsMap, pair, tokenSecond, tokenFirst),
    };
  }, {});
};

export const formatTokens = (
  pairs: PairsMap | any[],
  tokenList: TokenList
): TokensMap =>
  Object.keys(pairs).reduce((acc, token) => {
    const symbol = getTokenSymbol(token, tokenList);

    const icon = tokenList[token]?.icon || getNativeTokenIconUrl(symbol);

    const protocol = tokenList[token]?.protocol || "Terra";

    return {
      ...acc,
      [token]: {
        icon,
        symbol,
        token,
        protocol,
      },
    };
  }, {} as Record<string, TokenItem>);

export const toAssetInfo = (token: string) => {
  if (getIsTokenNative(token)) {
    return { native_token: { denom: token } };
  }

  return { token: { contract_addr: token } };
};

export const toToken = ({ amount, token }: Asset) => {
  return {
    amount,
    info: toAssetInfo(token),
  };
};

export const findAssetInfo = (assetInfos: any[], token: string): AssetInfo => {
  const assetInfo = assetInfos.find(({ info }) => {
    return isNativeToken(info)
      ? info.native_token.denom === token
      : info.token.contract_addr === token;
  });

  if (!assetInfo) {
    throw new Error(
      `Asset info not found: ${JSON.stringify({
        assetInfo,
        token,
      })}`
    );
  }

  return assetInfo;
};

export const findAsset = (assets: any[], token: string) => {
  const asset = assets.find(({ info }) => {
    if (isNativeToken(info)) {
      return info.native_token.denom === token;
    }

    return info.token.contract_addr === token;
  });

  if (!asset) {
    throw new Error(
      `Asset not found: ${JSON.stringify({
        assets,
        token,
      })}`
    );
  }

  return asset;
};

export const createAsset = (
  from: string,
  amount: string,
  route: Pair[]
): any => {
  const [{ assets }] = route;
  const { info } = findAssetInfo(assets, from);

  return {
    info,
    amount,
  };
};

export const trunc = (number: number, fractionDigits = 0) => {
  const [integerPart, decimalPart] = String(number).split(".");

  return Number(
    `${integerPart}${
      decimalPart ? `.${decimalPart.slice(0, fractionDigits)}` : ""
    }`
  );
};

export const formatAmount = (amount: string | null) => {
  if (!amount) {
    return "0";
  }

  return String(trunc(Number(amount) / ONE_TOKEN, DECIMALS));
};

export const isValidAmount = (amount?: string | null): amount is string => {
  return Boolean(amount && Number(amount));
};

export const coinToString = (coin: any, tokensMap: TokensMap) => {
  const amount = formatAmount(coin.amount.toString());
  const symbol = tokensMap[coin.denom]?.symbol || "LP"; // TODO: <<= refactoring

  return `${amount} ${symbol}`;
};

export const coinsToString = (coins: any, tokensMap: any) =>
  coins
    .toArray()
    .map((coin) => coinToString(coin, tokensMap))
    .join(" / ");

export const toBase64 = (obj: any) => {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
};

export const checkBalance = (
  balance: Coins,
  offerAssets: Coins,
  fee: Coins | null
) => {
  const copyBalance = balance.toDecCoins();

  const txCost = new Coins([
    ...offerAssets.toArray(),
    ...(fee ? fee.toArray() : []),
  ]);

  txCost.toArray().forEach((coin) => {
    const tokenBalance = copyBalance.get(coin.denom) || new Coin(coin.denom, 0);

    copyBalance.set(
      coin.denom,
      tokenBalance.amount.toNumber() - coin.amount.toNumber()
    );
  });

  const isEnough = copyBalance
    .toArray()
    .every((coin) => coin.amount.toNumber() >= 0);

  return {
    isEnough,
    txCost,
  };
};

export const calculatePercentage = (
  from: string,
  target: string,
  fractionDigits = 5
) => {
  return String(trunc((Number(from) / Number(target)) * 100, fractionDigits));
};
