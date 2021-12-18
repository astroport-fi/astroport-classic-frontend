import { toBase64 } from "@arthuryeti/terra";
import { LCDClient, Coin, MsgExecuteContract } from "@terra-money/terra.js";

import {
  isNativeAsset,
  findAsset,
  PairResponse,
  Route,
  SwapOperation,
  toAssetInfo,
  isNativeAssetInfo,
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

  let operation: SwapOperation = {
    astro_swap: {
      offer_asset_info: toAssetInfo(from),
      ask_asset_info: toAssetInfo(to),
    },
  };

  if ([toAssetInfo(from), toAssetInfo(to)].every(isNativeAssetInfo)) {
    operation = {
      native_swap: {
        offer_denom: from,
        ask_denom: to,
      },
    };
  }

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

  return client.wasm.contractQuery(router, {
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
  minReceive: string | null;
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
            minimum_receive: minReceive,
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
            // minimum_receive: minReceive,
          },
        }),
      },
    }),
  ];
};
