import { Msg } from "@terra-money/terra.js";
import { Pair } from "types/contracts/terraswap";

export type ContractVariables = {
  contract: string;
  msg: object;
};

export interface TxResult {
  height: number;
  raw_log: string[];
  txhash: string;
}

export interface TxError {
  code: number;
  message?: string;
}

export interface Tx {
  id: number;
  msgs: Msg[];
  origin: string;
  result: TxResult;
  success: boolean;
  error: TxError;
}

export interface Response<T> {
  error: boolean;
  message: string | null;
  data: T | null;
}

export enum NetworkType {
  Mainnet = "mainnet",
  Testnet = "testnet",
}
export interface Network {
  name: NetworkType;
  chainID: string;
  lcd: string;
  mantle: string;
  factory: string;
  routeContract: string;
}

export type Networks = Record<NetworkType, Network>;

export interface PairsMap {
  [from: string]: {
    [to: string]: Pair;
  };
}

// New

import {
  CW20Addr,
  Denom,
  HumanAddr,
  StableDenom,
} from "types/contracts/common";

export type CW20AssetInfo = {
  native_token: never;
  token: { contract_addr: CW20Addr };
};
export type NativeAssetInfo = {
  token: never;
  native_token: { denom: StableDenom };
};

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

export interface Asset {
  info: AssetInfo;
  amount: string;
}

export interface Pair {
  pool: {
    assets: [Asset, Asset];
    total_share: string;
  };
  contract: CW20Addr;
  lpToken: CW20Addr;
}

export interface Token {
  protocol: string;
  symbol: string;
  token: string;
  pair: string;
  icon: string;
  lpToken: string;
}
