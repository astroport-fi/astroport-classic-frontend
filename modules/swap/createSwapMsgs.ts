import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import {
  isNativeToken,
  createAsset,
  findAsset,
  toBase64,
} from "@arthuryeti/terra";

import { createMultiSwapOperations } from "modules/swap";
import { Pair, HumanAddr } from "types/common";

type CreateMonoSwapMsgOptions = {
  route: Pair[];
  token1: string;
  amount: string;
  slippage: string;
};

const createMonoSwapMsg = (
  options: CreateMonoSwapMsgOptions,
  sender: string
): MsgExecuteContract => {
  const { route, token1, amount, slippage } = options;

  const [{ contract }] = route;

  const offerAsset = createAsset(token1, amount, route);

  const isNative = isNativeToken(offerAsset.info);

  if (isNative) {
    return new MsgExecuteContract(
      sender,
      contract,
      {
        swap: {
          offer_asset: offerAsset,
          max_spread: slippage,
        },
      },
      [new Coin(token1, amount)]
    );
  }

  return new MsgExecuteContract(sender, token1, {
    send: {
      amount,
      contract,
      msg: toBase64({
        swap: {
          max_spread: slippage,
        },
      }),
    },
  });
};

type CreateMultiSwapMsgOptions = {
  route: Pair[];
  token1: string;
  amount: string;
  minimumReceive: string;
  routeContract: string;
};

const createMultiSwapMsg = (
  options: CreateMultiSwapMsgOptions,
  sender: HumanAddr
): MsgExecuteContract => {
  const { route, token1, amount, minimumReceive, routeContract } = options;

  const [{ asset_infos }] = route;

  const info = findAsset(asset_infos, token1);

  const isNative = isNativeToken(info);

  const operations = createMultiSwapOperations(token1, route);

  if (isNative) {
    return new MsgExecuteContract(
      sender,
      routeContract,
      {
        execute_swap_operations: {
          offer_amount: amount,
          operations,
          minimum_receive: minimumReceive,
        },
      },
      [new Coin(token1, amount)]
    );
  }

  return new MsgExecuteContract(sender, token1, {
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
  });
};

type CreateSwapMsgsOptions = {
  route: Pair[];
  token1: string;
  amount: string;
  routeContract: string;
  minimumReceive?: string;
  slippage?: string;
};

export const createSwapMsgs = (
  options: CreateSwapMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { route } = options;

  let msg;

  if (route.length === 1) {
    // @ts-expect-error
    msg = createMonoSwapMsg(options, sender);
  } else {
    // @ts-expect-error
    msg = createMultiSwapMsg(options, sender);
  }

  return [msg];
};
