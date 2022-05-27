import { Asset } from "modules/common";

export type Networks = "TERRA_V2" | "TERRA_CLASSIC";

export type CW20Addr = string;

export type StableDenom = string;

export type CW20AssetInfo = {
  native_token: never;
  token: { contract_addr: CW20Addr };
};

export type NativeAssetInfo = {
  token: never;
  native_token: { denom: StableDenom };
};

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

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

export const PoolFormTypeFactory = (value: string): PoolFormType => {
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
  return PoolFormType.Provide;
};

export enum AstroFormType {
  Stake = 0,
  Unstake = 1,
}

export enum ProvideFormMode {
  Single = 0,
  Double = 1,
}

// Pools
export type FeedPoolTypes =
  | "mypools"
  | "otherpools"
  | "lockedpools"
  | "auctionpools";

export type AllPoolsPool = {
  inUse: boolean;
  favorite: boolean;
  contract: string;
  assets: (string | undefined)[];
  poolAssets: Asset[];
  sortingAssets: string[];
  pairType: any;
  totalLiquidity: number;
  totalLiquidityInUst: number;
  myLiquidity: number;
  myLiquidityInUst: number;
  _24hr_volume: number;
  rewards: {
    pool: number;
    astro: number;
    protocol: number;
    total: number;
    apy: number;
    token_symbol: string;
  };
  canManage: boolean;
  canStake: boolean;
  isStakable: boolean;
};

export type AuctionPoolsPool = {
  name: string;
  contract: string;
  assets: (string | undefined)[];
  poolAssets: any;
  sortingAssets: string[];
  pairType: any;
  totalLiquidity: number;
  totalLiquidityInUst: number;
  myLiquidity: number;
  myLiquidityInUst: number;
  myUnlockableLiquidity: number;
  myUnlockableLiquidityInUst: number;
  isClaimable: boolean;
  isClaimed: boolean;
  amount: string;
  lockEnd: any;
  rewards: { token: string; amount: number }[];
};

export type AstroPoolsPool = {
  name: string;
  astroLpToken: string;
  assets: (string | undefined)[];
  poolAssets: Asset[];
  sortingAssets: string[];
  pairType: any;
  totalLiquidity: number;
  totalLiquidityInUst: number;
  myLiquidity: number;
  myLiquidityInUst: number;
  lockEnd: any;
  isClaimable: boolean;
  isClaimed: boolean;
  duration: any;
  rewards: { token: string; amount: number }[];
};

export type PoolWithUserState = AllPoolsPool & {
  userCanProvideLiquidity: boolean;
};

// Governance interface and types
export interface Proposal {
  proposal_id: string;
  state: Proposal_Status;
  // details
  title: string;
  description: string;
  link?: string;
  messages?: string;
  submitter: string;
  // voting period
  start_timestamp: string;
  end_timestamp: string;
  // voting power
  votes_for: number | null;
  votes_against: number | null;
  votes_for_power: number | null;
  votes_against_power: number | null;
  total_voting_power: number | null;
  // state timestamps
  active: string | null;
  passed: string | null;
  executed: string | null;
  rejected: string | null;
  expired: string | null;
}

export enum Proposal_Status {
  Active = "Active",
  Passed = "Passed",
  Executed = "Executed",
  Rejected = "Rejected",
  Hidden = "Hidden",
  Expired = "Expired",
}

export interface Proposal_Status_Props {
  title: string;
  lightColor: string;
  color: string;
}

export type Proposal_Vote_Power = {
  voteForPower: number;
  voteAgainstPower: number;
};

export type Proposal_Vote_Dist = {
  voteForDist: number;
  voteAgainstDist: number;
};

export type FixedSizeArray<N extends number, T> = N extends 0
  ? never[]
  : {
      0: T;
      length: N;
    } & ReadonlyArray<T>;

export type Proposal_History = FixedSizeArray<
  4,
  {
    title: string;
    dotColor: string;
    color: string;
    timestamp: string | null;
  } | null
>;
