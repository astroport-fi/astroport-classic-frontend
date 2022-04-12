import { AssetInfo } from "types/common";
import { Asset } from "./astroswap";

export type Pool = {
  lp_address: string; // liquidity_token
  pool_address: string; // contract_addr
  pool_type: string; // pair_type
  assets: AssetInfo[]; // asset_infos
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
