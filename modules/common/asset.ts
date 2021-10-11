import {
  AssetInfo,
  CW20AssetInfo,
  NativeAssetInfo,
  PairResponse,
} from "./types";

export function isTypeNativeAssetInfo(
  value: NativeAssetInfo | CW20AssetInfo
): value is NativeAssetInfo {
  return value.hasOwnProperty("native_token");
}

export const isNativeToken = (token: string = ""): boolean => {
  return token.startsWith("u");
};

export const isNativeAsset = (info: AssetInfo): boolean => {
  return "native_token" in info;
};

export const toAssetInfo = (token: string): AssetInfo => {
  if (isNativeToken(token)) {
    return { native_token: { denom: token } };
  }

  return { token: { contract_addr: token } };
};

type ToAssetOpts = {
  amount: string;
  token: string;
};

export const toAsset = ({ amount, token }: ToAssetOpts) => {
  return {
    amount,
    info: toAssetInfo(token),
  };
};

export const findAsset = (infos: AssetInfo[], token: string) => {
  const asset = infos.find((info) => {
    if (isTypeNativeAssetInfo(info)) {
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
  route: PairResponse[]
) => {
  const [{ asset_infos }] = route;
  const info = findAsset(asset_infos, from);

  return {
    info,
    amount,
  };
};

export const getTokenDenom = (info: AssetInfo): string => {
  if (isTypeNativeAssetInfo(info)) {
    return info.native_token.denom;
  }

  return info.token.contract_addr;
};

export const getTokenDenoms = (infos: AssetInfo[]): string[] => {
  return infos.map((info) => getTokenDenom(info));
};
