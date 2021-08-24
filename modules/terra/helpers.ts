import { Denom, Coin, Coins } from "@terra-money/terra.js";

import { getIsTokenNative } from "libs/parse";
import { ONE_TOKEN, DECIMALS } from "constants/constants";
import {
  PairsMap,
  TokenItem,
  TokenList,
  TokensMap,
  Pair,
  AssetInfo,
  Asset,
} from "types/common";

export const isNativeToken = (info: AssetInfo): any => {
  if ("native_token" in info) {
    return true;
  }

  return false;
};

export const getTokenDenom = ({ info }: Asset) => {
  if (isNativeToken(info)) {
    return info.native_token.denom;
  }

  return info.token?.contract_addr;
};

export const getTokenDenoms = (assets: Asset[]) => {
  return assets.map((asset) => getTokenDenom(asset));
};

export const getNativeTokenIconUrl = (symbol: string) => {
  return `https://assets.terra.money/icon/60/${symbol}.png`;
};

const formatPair = (pairsMap: PairsMap, pair: Pair, from: Asset, to: Asset) => {
  const [tokenFrom, tokenTo] = getTokenDenoms([from, to]);

  const prevPairs = pairsMap[tokenFrom] || {};

  return {
    [tokenFrom]: {
      ...prevPairs,
      [tokenTo]: pair,
    },
  };
};

export const formatPairsToRoutes = (pairs: any[]): PairsMap => {
  return pairs.reduce<PairsMap>((pairsMap, pair) => {
    const [tokenFirst, tokenSecond] = pair.pool.assets;

    return {
      ...pairsMap,
      ...formatPair(pairsMap, pair, tokenFirst, tokenSecond),
      ...formatPair(pairsMap, pair, tokenSecond, tokenFirst),
    };
  }, {});
};

export const toAssetInfo = (token: string) => {
  if (getIsTokenNative(token)) {
    return { native_token: { denom: token } };
  }

  return { token: { contract_addr: token } };
};

export const toToken = ({ amount, token }: any) => {
  return {
    amount,
    info: toAssetInfo(token),
  };
};

export const findAsset = (assets: any[], token: string) => {
  const asset = assets.find(({ info }) => {
    if (isNativeToken(info)) {
      return info.native_token.denom === token;
    }

    return info.token.contract_addr === token;
  });

  if (!asset) {
    throw new Error("Asset not found");
  }

  return asset;
};

export const createAsset = (
  from: string,
  amount: string,
  route: Pair[]
): any => {
  const [{ pool }] = route;
  const { info } = findAsset(pool.assets, from);

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
