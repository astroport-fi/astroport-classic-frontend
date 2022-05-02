export type CW20AssetInfo = { token: { contract_addr: string } };
export type NativeAssetInfo = { native_token: { denom: string } };

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

type CW20Asset = {
  amount: string;
  info: CW20AssetInfo;
};

type NativeAsset = {
  amount: string;
  info: NativeAssetInfo;
};

export type Asset = CW20Asset | NativeAsset;

export type PairResponse = {
  asset_infos: [AssetInfo, AssetInfo];

  /** Pair contract address */
  contract_addr: string;

  /** LP contract address (not lp minter cw20 token) */
  liquidity_token: string;

  pair_type:
    | {
        xyk: {};
      }
    | {
        stable: {};
      };
};

export type FeeResponse = {
  fee_address: string;
  total_fee_bps: number;
  maker_fee_bps: number;
};

export type PoolResponse = {
  total_share?: string | undefined;
  assets?: [Asset, Asset] | undefined;
};

export type SimulationResponse = {
  commission_amount: string;
  return_amount: string;
  spread_amount: string;
};

export type MultiSimulationResponse = {
  amount: string;
};

export type ReverseSimulationResponse = {
  commission_amount: string;
  offer_amount: string;
  spread_amount: string;
};

type NativeSwapOperation = {
  native_swap: {
    offer_denom: string;
    ask_denom: string;
  };
};

type CW20SwapOperation = {
  astro_swap: {
    offer_asset_info: AssetInfo;
    ask_asset_info: AssetInfo;
  };
};

export type SwapOperation = NativeSwapOperation | CW20SwapOperation;

export type LpDepositResponse = string;

export type Route = {
  contract_addr: string;
  from: string;
  to: string;
  type: string;
};
