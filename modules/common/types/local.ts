import { Asset, PairResponse } from "./astroswap";

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

export type Routes = {
  [from: string]: {
    [to: string]: PairResponse;
  };
};
