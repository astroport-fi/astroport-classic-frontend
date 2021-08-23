import {
  isValidAmount,
  isNativeToken,
  createAsset,
  findAssetInfo,
} from "modules/terra";
import { createMultiSwapOperations } from "modules/swap";
import { toBase64 } from "modules/terra";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import { Pair } from "types/contracts/terraswap";
import { HumanAddr } from "types/contracts/common";

type CreateMonoSwapMsgOptions = {
  pairs: Pair[];
  token1: string;
  amount: string;
  slippage: string;
};

const createMonoSwapMsg = (
  options: CreateMonoSwapMsgOptions,
  sender: string
) => {
  const { pairs, token1, amount, slippage } = options;

  const [{ pair }] = pairs;

  const offerAsset = createAsset(token1, amount, pairs);

  const isNative = isNativeToken(offerAsset.info);

  if (isNative) {
    return new MsgExecuteContract(
      sender,
      pair,
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
      contract: pair,
      msg: toBase64({
        swap: {
          max_spread: slippage,
        },
      }),
    },
  });
};

type CreateMultiSwapMsgOptions = {
  pairs: Pair[];
  token1: string;
  amount: string;
  minimumReceive: string;
  routeContract: string;
};

const createMultiSwapMsg = (
  options: CreateMultiSwapMsgOptions,
  sender: HumanAddr
) => {
  const { pairs, token1, amount, minimumReceive, routeContract } = options;

  const [{ assets }] = pairs;

  const { info } = findAssetInfo(assets, token1);

  const isNative = isNativeToken(info);

  const operations = createMultiSwapOperations(token1, pairs);

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

export const createSwapTx = async (options: any, sender: string) => {
  const { pairs, amount } = options;

  let msg;

  if (!isValidAmount(amount)) {
    throw new Error("Invalid amount");
  }

  if (pairs.length === 1) {
    msg = createMonoSwapMsg(options, sender);
  } else {
    msg = createMultiSwapMsg(options, sender);
  }

  return {
    sender,
    msgs: [msg],
  };
};
