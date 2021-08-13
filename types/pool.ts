export enum PoolType {
  LPPool = "LP Pool",
}

export type Pool = {
  id: string;
  logo1: string;
  logo2: string;
  name: string;
  type: PoolType;
  liquidity: string;
  apr: string;
};
