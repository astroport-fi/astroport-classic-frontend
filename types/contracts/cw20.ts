import { HumanAddr } from "types/contracts/common";

export interface Balance {
  balance: {
    address: HumanAddr;
  };
}

export interface BalanceResponse {
  balance: string;
}

export interface TokenInfo {
  token_info: {};
}

export interface TokenInfoResponse {
  decimals: number;
  name: string;
  symbol: symbol;
  total_supply: string;
}
