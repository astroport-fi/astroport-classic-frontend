import { AssetInfo } from "types/common";
import { Asset } from "./astroswap";

export type Pool = {
  lp_address: string; // liquidity_token
  pool_address: string; // contract_addr
  pool_type: string; // pair_type
  assets: AssetInfo[]; // asset_infos
  pool_liquidity: number;
  _24hr_volume: number;
  trading_fees: {
    apy: number;
    apr: number;
    day: number;
  };
  astro_rewards: {
    apy: number;
    apr: number;
    day: number;
  };
  protocol_rewards: {
    apy: number;
    apr: number;
    day: number;
  };
  total_rewards: {
    apy: number;
    apr: number;
    day: number;
  };
  token_symbol: string;
};

export type Token = {
  protocol: string;
  symbol: string;
  token: string;
  icon?: string;
  decimals?: number;
};

export type TokenTooltip = {
  poolAssets: [Asset, Asset];
  myLiquidity: number;
  totalLiquidity: number;
};

export type Tokens = {
  [token: string]: Token;
};
