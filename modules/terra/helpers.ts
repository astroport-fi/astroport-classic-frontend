import { Denom } from "@terra-money/terra.js";

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
): token is NativeToken => {
  if ("native_token" in token) {
    return true;
  }

  return false;
};

export const getTokenDenom = (info: AssetInfo) => {
  return isNativeToken(info)
    ? info.native_token.denom
    : info.token?.contract_addr;
};

export const getTokenDenoms = (assetInfos: AssetInfo[]) => {
  return assetInfos.map((info) => getTokenDenom(info));
};

const getNativeTokenIconUrl = (symbol: string) =>
  `https://assets.terra.money/icon/60/${symbol}.png`;

const getTokenSymbol = (denom: string, tokenList: TokenList) =>
  tokenList[denom]?.symbol ||
  (denom === "uluna" ? "Luna" : `${denom.slice(1, 3).toUpperCase()}T`);

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

export const formatPairs = (pairs: Pair[]): PairsMap => {
  return pairs.reduce<PairsMap>((pairsMap, pair) => {
    const [tokenFirst, tokenSecond] = pair.asset_infos;

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

export const filterPairs = (pairs: Pair[], tokenList: TokenList) => {
  const nativeTokensList: Array<string> = Object.values(Denom);
  const cw20TokensList = Object.keys(tokenList);

  return pairs.filter((pair) => {
    const tokens = getTokenDenoms(pair.asset_infos);

    return tokens.every(
      (token) =>
        nativeTokensList.includes(token) || cw20TokensList.includes(token)
    );
  });
};

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

export const findAssetInfo = (
  assetInfos: AssetInfo[],
  token: string
): AssetInfo => {
  const assetInfo = assetInfos.find((asset) => {
    return isNativeToken(asset)
      ? asset.native_token.denom === token
      : asset.token.contract_addr === token;
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

export const createAsset = (
  from: string,
  amount: string,
  route: Pair[]
): AssetToken => {
  const [{ asset_infos }] = route;

  const assetInfo = findAssetInfo(asset_infos, from);

  return {
    info: assetInfo,
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

export const coinsToString = (coins: any, tokensMap: TokensMap) =>
  coins
    .toArray()
    .map((coin) => coinToString(coin, tokensMap))
    .join(" / ");

export const toBase64 = (obj: any) => {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
};
