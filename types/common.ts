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
