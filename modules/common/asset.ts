import {
  AssetInfo,
  CW20AssetInfo,
  NativeAssetInfo,
  Asset,
  Route,
} from "modules/common";

export function isNativeAssetInfo(
  value: NativeAssetInfo | CW20AssetInfo
): value is NativeAssetInfo {
  return value.hasOwnProperty("native_token");
}

export const isNativeToken = (token: string = ""): boolean => {
  return token.startsWith("u") || token.startsWith("ibc/");
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
    if (isNativeAssetInfo(info)) {
      return info.native_token.denom === token;
    }

    return info.token.contract_addr === token;
  });

  if (!asset) {
    return null;
  }

  return asset;
};

export const createAsset = (amount: string, route: Route[]) => {
  const firstRoute = route[0];
  const info = toAssetInfo(firstRoute?.from || "");

  return {
    info,
    amount,
  };
};

export const getTokenDenom = (info?: AssetInfo): string => {
  if (!info) {
    return "";
  }

  if (isNativeAssetInfo(info)) {
    return info.native_token.denom;
  }

  return info.token.contract_addr;
};

export const getTokenDenoms = (infos: AssetInfo[]): string[] => {
  if (infos == null) {
    return [];
  }

  return infos.map((info) => getTokenDenom(info));
};

export const getPoolTokenDenoms = (assets: Asset[]): string[] => {
  return assets.map(({ info }) => getTokenDenom(info));
};
