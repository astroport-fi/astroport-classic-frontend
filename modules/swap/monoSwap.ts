import { toBase64 } from "@arthuryeti/terra";
import { LCDClient, Coin, MsgExecuteContract } from "@terra-money/terra.js";

import {
  isNativeAsset,
  toAsset,
  createAsset,
  PairResponse,
  SimulationResponse,
  ReverseSimulationResponse,
} from "modules/common";

type GetQueryParams = {
  client: LCDClient;
  swapRoute: PairResponse[];
  token: string;
  amount: string;
  reverse?: boolean;
};

export const simulate = ({
  client,
  swapRoute,
  token,
  amount,
  reverse = false,
}: GetQueryParams) => {
  const { contract_addr } = swapRoute[0];

  if (reverse) {
    return client.wasm.contractQuery<ReverseSimulationResponse>(contract_addr, {
      reverse_simulation: {
        ask_asset: toAsset({ token, amount }),
      },
    });
  }

  return client.wasm.contractQuery<SimulationResponse>(contract_addr, {
    simulation: {
      offer_asset: toAsset({ token, amount }),
    },
  });
};

type CreateSwapMsgsOpts = {
  swapRoute: PairResponse[];
  token: string;
  amount: string;
  slippage: string;
  price: string;
};

export const createSwapMsgs = (
  { swapRoute, token, amount, slippage, price }: CreateSwapMsgsOpts,
  sender: string
): MsgExecuteContract[] => {
  const [{ contract_addr }] = swapRoute;

  const offerAsset = createAsset(token, amount, swapRoute);

  const isNative = isNativeAsset(offerAsset.info);

  if (isNative) {
    return [
      new MsgExecuteContract(
        sender,
        contract_addr,
        {
          swap: {
            offer_asset: offerAsset,
            max_spread: slippage,
            belief_price: price,
          },
        },
        [new Coin(token, amount)]
      ),
    ];
  }

  return [
    new MsgExecuteContract(sender, token, {
      send: {
        amount,
        contract: contract_addr,
        msg: toBase64({
          swap: {
            max_spread: slippage,
            belief_price: price,
          },
        }),
      },
    }),
  ];
};
