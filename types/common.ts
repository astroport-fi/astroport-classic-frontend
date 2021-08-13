import { Msg } from "@terra-money/terra.js";
import { AssetToken } from "types/asset";

export enum PriceKey {
  NATIVE = "price",
  PAIR = "pair",
  ORACLE = "oracle",
  PRE = "pre",
  END = "end",
  EXTERNAL = "external",
}

export enum BalanceKey {
  NATIVE = "balance",
  TOKEN = "token",
  EXTERNAL = "external",
}

export enum StakingKey {
  LPSTAKABLE = "lpStakable",
  LPSTAKED = "lpStaked",
  SLPSTAKED = "slpStaked",
  LPREWARD = "reward",
  SLPREWARD = "slpReward",
}

export enum AssetInfoKey {
  COMMISSION = "commission",
  LIQUIDITY = "liquidity",
  MINCOLLATERALRATIO = "minCollateralRatio",
  LPTOTALSTAKED = "lpTotalStaked",
  LPTOTALSUPPLY = "lpTotalSupply",
  MULTIPLIER = "multiplier",
}

export type MantleCoin = {
  amount: string;
  denom: string;
};

export type ContractVariables = {
  contract: string;
  msg: object;
};

export type PairPool = {
  assets: (AssetToken | NativeToken)[];
  total_share: string;
};

export type Dictionary<A = string> = {
  [key: string]: A;
};

export interface NativeToken {
  native_token: {
    denom: string;
  };
}

export interface CW20Token {
  token: {
    contract_addr: string;
  };
}

export type AssetInfo = NativeToken | CW20Token;

export interface Pair {
  asset_infos: AssetInfo[];
  contract_addr: string;
  liquidity_token: string;
}

export interface Asset {
  info: AssetInfo;
  amount: string;
}

export interface PoolInfo {
  assets: Asset[];
  total_share: string;
}

export enum ExtensionRequests {
  Connect = "connect",
  Post = "post",
  Sign = "sign",
  Info = "info",
}

export enum ExtensionEvents {
  Connect = "onConnect",
  Post = "onPost",
  Sign = "onSign",
  Info = "onInfo",
}

export interface ExtensionResponse<T> {
  name: string;
  payload: T;
}

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

export type Whitelist = Record<NetworkType, TokenList>;

export interface TokensMap {
  [token: string]: TokenItem;
}

export enum TxStatusMessage {
  InsufficientBalance = "insufficient_balance",
}
