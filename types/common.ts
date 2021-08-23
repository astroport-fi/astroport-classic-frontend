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

export interface TokenItem {
  protocol: string;
  symbol: string;
  token: string;
  icon: string;
}

export interface TokenList {
  [token: string]: TokenItem;
}

export interface TokensMap {
  [token: string]: TokenItem;
}
