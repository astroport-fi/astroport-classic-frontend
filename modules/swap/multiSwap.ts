import { toBase64 } from "@arthuryeti/terra";
import { LCDClient, Coin, MsgExecuteContract } from "@terra-money/terra.js";

import {
  getTokenDenom,
  isNativeAsset,
  findAsset,
  PairResponse,
  isTypeNativeAssetInfo,
  SwapOperation,
} from "modules/common";

type GetSwapOperationsParams = {
  token: string;
  swapRoute: PairResponse[] | null;
  operations?: SwapOperation[];
};

export const getSwapOperations = ({
  token,
  swapRoute,
  operations = [],
}: GetSwapOperationsParams): SwapOperation[] => {
  if (swapRoute == null || swapRoute.length === 0) {
    return operations;
  }

  const [{ asset_infos }] = swapRoute;

  const sortedAssets = [...asset_infos].sort((a) => {
    return getTokenDenom(a) === token ? -1 : 1;
  });

  let operation: SwapOperation = {
    astro_swap: {
      offer_asset_info: sortedAssets[0],
      ask_asset_info: sortedAssets[1],
    },
  };

  if (sortedAssets.every(isTypeNativeAssetInfo)) {
    operation = {
      native_swap: {
        offer_denom: sortedAssets[0].native_token.denom,
        ask_denom: sortedAssets[1].native_token.denom,
      },
    };
  }

  const nextToken = getTokenDenom(sortedAssets[1]);

  return getSwapOperations({
    token: nextToken,
    swapRoute: swapRoute.slice(1),
    operations: [...operations, operation],
  });
};

type GetQueryParams = {
  client: LCDClient;
  router: string;
  swapRoute: PairResponse[];
  token: string;
  amount: string;
  reverse?: boolean;
};

export const simulate = ({
  client,
  swapRoute,
  router,
  token,
  amount,
}: GetQueryParams) => {
  const operations = getSwapOperations({ token, swapRoute });

  return client.wasm.contractQuery(router, {
    simulate_swap_operations: {
      offer_amount: amount,
      operations,
    },
  });
};

type CreateSwapMsgsOpts = {
  swapRoute: PairResponse[];
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

  const [{ asset_infos }] = swapRoute;

  const info = findAsset(asset_infos, token);

  const isNative = isNativeAsset(info);

  const operations = getSwapOperations({ token, swapRoute });

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
            minimum_receive: minReceive,
          },
        }),
      },
    }),
  ];
};
