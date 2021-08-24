import {
  isValidAmount,
  isNativeToken,
  createAsset,
  findAsset,
} from "modules/terra";
import { createMultiSwapOperations } from "modules/swap";
import { toBase64 } from "modules/terra";
import { Coin, MsgExecuteContract, Msg } from "@terra-money/terra.js";
import { Pair } from "types/common";
import { HumanAddr } from "types/contracts/common";
import { CreateTxResponse } from "types/swap";

type CreateMonoSwapMsgOptions = {
  pairs: Pair[];
  token1: string;
  amount: string;
  slippage: string;
};

const createMonoSwapMsg = (
  options: CreateMonoSwapMsgOptions,
  sender: string
): MsgExecuteContract => {
  const { pairs, token1, amount, slippage } = options;

  const [{ contract }] = pairs;

  const offerAsset = createAsset(token1, amount, pairs);

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
  pairs: Pair[];
  token1: string;
  amount: string;
  minimumReceive: string;
  routeContract: string;
};

const createMultiSwapMsg = (
  options: CreateMultiSwapMsgOptions,
  sender: HumanAddr
): MsgExecuteContract => {
  const { pairs, token1, amount, minimumReceive, routeContract } = options;

  const [{ pool }] = pairs;

  const { info } = findAsset(pool.assets, token1);

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

type CreateSwapTxOptions = {
  pairs: Pair[];
  token1: string;
  amount: string;
  routeContract: string;
  minimumReceive?: string;
  slippage?: string;
};

type CreateSwapTxResponse = {
  sender: HumanAddr;
  msgs: Msg[];
};

export const createSwapTx = async (
  options: CreateSwapTxOptions,
  sender: string
): Promise<CreateSwapTxResponse> => {
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
