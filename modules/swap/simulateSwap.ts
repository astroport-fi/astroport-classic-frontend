import { LCDClient } from "@terra-money/terra.js";

import { toToken, getTokenDenom, isNativeToken } from "modules/terra";
import { findSwapRoute } from "modules/swap";
import { Pair } from "types/contracts/terraswap";

const createMonoSwapQuery = async (client: LCDClient, token, route, amount) => {
  const [{ pair }] = route;

  return client.wasm.contractQuery(pair, {
    simulation: {
      offer_asset: toToken({ token, amount }),
    },
  });
};

export const createMultiSwapOperations = (
  from: string,
  route: any[],
  operations: any[] = []
): any[] => {
  if (route.length === 0) {
    return operations;
  }

  const assets = route[0]?.assets;

  if (!assets) {
    return operations;
  }

  const assetInfos = [...assets].sort((a) =>
    getTokenDenom(a) === from ? -1 : 1
  );

  const operation = assetInfos.every(isNativeToken)
    ? {
        native_swap: {
          offer_denom: assetInfos[0].info.native_token.denom,
          ask_denom: assetInfos[1].info.native_token.denom,
        },
      }
    : {
        terra_swap: {
          offer_asset_info: assetInfos[0].info,
          ask_asset_info: assetInfos[1].info,
        },
      };

  const nextFrom = getTokenDenom(assetInfos[1]);

  return createMultiSwapOperations(nextFrom, route.slice(1), [
    ...operations,
    operation,
  ]);
};

const createMultiSwapQuery = async (
  client: LCDClient,
  routeContract,
  from,
  route,
  amount
) => {
  const operations = createMultiSwapOperations(from, route);

  return client.wasm.contractQuery(routeContract, {
    simulate_swap_operations: {
      offer_amount: amount,
      operations,
    },
  });
};

export const simulateSwap = async (
  client: LCDClient,
  routeContract,
  routes,
  from,
  to,
  amount
) => {
  const route = findSwapRoute(routes, from, to);

  if (!route) {
    return {
      amount: "0",
      spreadAmount: "0",
    };
  }

  if (route.length === 1) {
    try {
      const result = await createMonoSwapQuery(client, from, route, amount);

      return {
        error: false,
        message: null,
        amount: result.return_amount,
        spreadAmount: result.spread_amount,
      };
    } catch (e) {
      return {
        error: true,
        message: e.response.data.error,
        data: null,
      };
    }
  }

  try {
    const result = await createMultiSwapQuery(
      client,
      routeContract,
      from,
      route,
      amount
    );

    return {
      error: false,
      message: null,
      amount: result.amount,
      spreadAmount: null,
    };
  } catch (e) {
    return {
      error: true,
      message: e.response.data.error,
      data: null,
    };
  }
};
