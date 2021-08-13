import { StdSignMsg } from "@terra-money/terra.js";
import { Pair, Response } from "types/common";

export enum SimulationType {
  Simulation = "simulation",
  ReverseSimulation = "reverse_simulation",
}

export enum SwapMode {
  Mono = "mono",
  Multi = "multi",
}

export type SimulationData = {
  amount: string;
  spreadAmount: string | null;
};

export type CreateSwapTxData = {
  tx: StdSignMsg;
};

export type SimulateResponse = Response<SimulationData>;

export type CreateTxResponse = Response<CreateSwapTxData>;

export type SimulateSwapToken = (
  from: string,
  to: string,
  amount: string,
  reverse?: boolean
) => Promise<SimulateResponse | null>;

export type CreateSwapTx = (
  from: string,
  to: string,
  amount: string,
  slippage: string,
  minimumReceive: string
) => Promise<CreateTxResponse | null>;

export type FindSwapRoute = (from: string, to: string) => Pair[] | null;

export type GetTokenPrice = (
  from: string,
  to: string
) => Promise<SimulateResponse | null>;
