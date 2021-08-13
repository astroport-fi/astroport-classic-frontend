import {
  isValidAmount,
  isNativeToken,
  createAsset,
  findAssetInfo,
} from "modules/terra";
import { createMultiSwapOperations } from "modules/swap";
import { toBase64 } from "modules/terra";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";

const createMonoSwapMsg = (options: any, sender: string) => {
  const { route, token1, amount, slippage } = options;

  const [{ contract_addr }] = route;

  const offerAsset = createAsset(token1, amount, route);

  const isNative = isNativeToken(offerAsset.info);

  const executeMsg = isNative
    ? {
        swap: {
          offer_asset: offerAsset,
          max_spread: slippage,
        },
      }
    : {
        send: {
          amount,
          contract: contract_addr,
          msg: toBase64({
            swap: {
              max_spread: slippage,
            },
          }),
        },
      };

  return isNative
    ? new MsgExecuteContract(sender, contract_addr, executeMsg, [
        new Coin(token1, amount),
      ])
    : new MsgExecuteContract(sender, token1, executeMsg);
};

const createMultiSwapMsg = (options: any, sender: any) => {
  const { route, token1, amount, minimumReceive, routeContract } = options;

  const [{ asset_infos }] = route;

  const assetInfo = findAssetInfo(asset_infos, token1);

  const isNative = isNativeToken(assetInfo);

  const operations = createMultiSwapOperations(token1, route);

  const executeMsg = isNative
    ? {
        execute_swap_operations: {
          offer_amount: amount,
          operations,
          minimum_receive: minimumReceive,
        },
      }
    : {
        send: {
          amount,
          contract: routeContract,
          msg: toBase64({
            execute_swap_operations: {
              offer_amount: amount,
              operations,
              minimum_receive: minimumReceive,
            },
          }),
        },
      };

  return isNative
    ? new MsgExecuteContract(sender, routeContract, executeMsg, [
        new Coin(token1, amount),
      ])
    : new MsgExecuteContract(sender, token1, executeMsg);
};

export const createSwapTx = async (options: any, sender: string) => {
  const { route, amount } = options;

  let msg;

  if (!isValidAmount(amount)) {
    throw new Error("Invalid amount");
  }

  if (route.length === 1) {
    msg = createMonoSwapMsg(options, sender);
  } else {
    msg = createMultiSwapMsg(options, sender);
  }

  return {
    sender,
    msgs: [msg],
  };
};
