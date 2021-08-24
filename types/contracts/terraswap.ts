import {
  CW20Addr,
  Denom,
  HumanAddr,
  StableDenom,
} from "types/contracts/common";

export type CW20AssetInfo = { token: { contract_addr: CW20Addr } };
export type NativeAssetInfo = { native_token: { denom: StableDenom } };

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

export interface Pair {
  assets: [AssetInfo, AssetInfo];
  pair: HumanAddr;
  lpToken: CW20Addr;
}

export interface Pool {
  total_share: string;
  assets: [
    {
      amount: string;
      info: {
        token: {
          contract_addr: HumanAddr;
        };
      };
    },
    {
      amount: string;
      info: {
        native_token: {
          denom: Denom;
        };
      };
    }
  ];
}

export type SimulationInfo =
  | {
      token: {
        contract_addr: CW20Addr;
      };
    }
  | {
      native_token: {
        denom: Denom;
      };
    };

export interface Simulation {
  simulation: {
    offer_asset: {
      info: SimulationInfo;
      amount: string;
    };
  };
}

export interface SimulationResponse {
  commission_amount: string;
  return_amount: string;
  spread_amount: string;
}

export type ReverseSimulationInfo =
  | {
      token: {
        contract_addr: CW20Addr;
      };
    }
  | {
      native_token: {
        denom: Denom;
      };
    };

export interface ReverseSimulation {
  reverse_simulation: {
    ask_asset: {
      info: ReverseSimulationInfo;
      amount: string;
    };
  };
}

export interface ReverseSimulationResponse {
  commission_amount: string;
  offer_amount: string;
  spread_amount: string;
}
