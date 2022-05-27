import { LCDClient, Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { MULTI_SWAP_MAX_SPREAD } from "constants/constants";
import { toBase64 } from "libs/terra";

import {
  isNativeAsset,
  findAsset,
  Route,
  SwapOperation,
  toAssetInfo,
  MultiSimulationResponse,
} from "modules/common";

type GetSwapOperationsParams = {
  swapRoute: Route[] | null;
  operations?: SwapOperation[];
};

export const getSwapOperations = ({
  swapRoute,
  operations = [],
}: GetSwapOperationsParams): SwapOperation[] => {
  if (swapRoute == null || swapRoute.length === 0) {
    return operations;
  }

  const [{ from, to }] = swapRoute;

  const operation: SwapOperation = {
    astro_swap: {
      offer_asset_info: toAssetInfo(from),
      ask_asset_info: toAssetInfo(to),
    },
  };

  return getSwapOperations({
    swapRoute: swapRoute.slice(1),
    operations: [...operations, operation],
  });
};

type GetQueryParams = {
  client: LCDClient;
  router: string;
  swapRoute: Route[];
  token: string;
  amount: string;
  reverse?: boolean;
};

export const simulate = ({
  client,
  swapRoute,
  router,
  amount,
}: GetQueryParams) => {
  const operations = getSwapOperations({ swapRoute });

  return client.wasm.contractQuery<MultiSimulationResponse>(router, {
    simulate_swap_operations: {
      offer_amount: amount,
      operations,
    },
  });
};

type CreateSwapMsgsOpts = {
  swapRoute: Route[];
  router: string;
  token: string;
  amount: string;
  minReceive: number | null;
};

export const createSwapMsgs = (
  { swapRoute, token, router, amount, minReceive }: CreateSwapMsgsOpts,
  sender: string
): MsgExecuteContract[] | null => {
  if (minReceive == null) {
    return null;
  }

  const [{ to, from }] = swapRoute;

  const assetInfos = [toAssetInfo(from), toAssetInfo(to)];

  const info = findAsset(assetInfos, token);

  if (info == null) {
    return null;
  }

  const isNative = isNativeAsset(info);

  const operations = getSwapOperations({ swapRoute });

  if (isNative) {
    return [
      new MsgExecuteContract(
        sender,
        router,
        {
          execute_swap_operations: {
            offer_amount: amount,
            operations,
            minimum_receive: minReceive.toString(),
            max_spread: MULTI_SWAP_MAX_SPREAD,
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
        contract: router,
        msg: toBase64({
          execute_swap_operations: {
            offer_amount: amount,
            operations,
            minimum_receive: minReceive.toString(),
            max_spread: MULTI_SWAP_MAX_SPREAD,
          },
        }),
      },
    }),
  ];
};
