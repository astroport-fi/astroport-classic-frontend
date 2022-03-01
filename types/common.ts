import { Msg } from "@terra-money/terra.js";

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
  router: string;
}

export type Networks = Record<NetworkType, Network>;

// New

export type HumanAddr = string;
export type CanonicalAddr = string;
export type CW20Addr = string;

export type StableDenom = string;
export type bAssetDenom = string;
export type AssetDenom = string;
export type Denom = StableDenom | bAssetDenom | AssetDenom;

export type WASMContractResult<T extends {} = {}> = {
  Result: string;
} & T;

export type CW20AssetInfo = {
  native_token: never;
  token: { contract_addr: CW20Addr };
};
export type NativeAssetInfo = {
  token: never;
  native_token: { denom: StableDenom };
};

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

export type Asset = {
  info: AssetInfo;
  amount: string;
};

export type Pool = {
  assets: [Asset, Asset];
  total_share: string;
};

export type Pair = {
  asset_infos: [AssetInfo, AssetInfo];
  contract: CW20Addr;
  lpToken: CW20Addr;
};

export type PairType = StablePair | XYKPair;

export type StablePair = {
  stable: object;
};

export type XYKPair = {
  xyk: object;
};

export type Routes = {
  [from: string]: {
    [to: string]: Pair;
  };
};

export interface ISelect {
  list: string[];
  setValue: (v: string) => void;
  value: string;
}

export interface IButton {
  title: string;
  onClick: () => void;
  isActive: boolean;
  type: string;
}

export enum PoolFormType {
  Provide = 0,
  Withdraw = 1,
  Stake = 2,
  Unstake = 3,
}

export const PoolFormTypeFactory = (value): PoolFormType => {
  switch (value) {
    case "0":
      return PoolFormType.Provide;
    case "1":
      return PoolFormType.Withdraw;
    case "2":
      return PoolFormType.Stake;
    case "3":
      return PoolFormType.Unstake;
  }
  return null;
};

export enum AstroFormType {
  Stake = 0,
  Unstake = 1,
}

export enum ProvideFormMode {
  Single = 0,
  Double = 1,
}

// temporary governance proposal types
export enum ProposalStatus {
  Fail = 0,
  Active = 1,
  Passed = 2,
  Implemented = 3,
}

export type ProposalStatusProperty = {
  title: string;
  lightColor: string;
  color: string;
};

export type GovernanceProposal = {
  id?: string;
  title?: string;
  description?: string;
  msg?: string;
  link?: string;
  amount?: number;
  endDate?: string;
  votesFor?: number;
  voteForNum?: number;
  votesAgainst?: number;
  voteAgainstNum?: number;
  votesQuorum?: number;
  votesMax?: number;
  address?: string;
  status?: ProposalStatus;
  history: any;
};
