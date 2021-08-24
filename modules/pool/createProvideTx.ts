import { Coin, MsgExecuteContract } from "@terra-money/terra.js";

import { getTokenDenom, isNativeToken } from "modules/terra";
import { Asset } from "types/common";

export const createProvideTx = async (options: any, sender: string) => {
  const { contract, pool, coin1, coin2 } = options;

  const assets: Asset[] = pool.assets.map((asset) => ({
    info: asset.info,
    amount:
      getTokenDenom(asset) === coin1.denom
        ? coin1.amount.toString()
        : coin2.amount.toString(),
  }));

  const executeMsg = {
    provide_liquidity: { assets },
  };

  const coins = assets
    .filter((asset) => isNativeToken(asset.info))
    .map((asset) => new Coin(getTokenDenom(asset), asset.amount));

  const allowanceMsgs = assets.reduce<MsgExecuteContract[]>((acc, asset) => {
    if (isNativeToken(asset.info)) {
      return acc;
    }

    return [
      ...acc,
      new MsgExecuteContract(
        sender,
        asset.info.token.contract_addr,
        {
          increase_allowance: {
            amount: asset.amount,
            spender: contract,
          },
        },
        coins
      ),
    ];
  }, []);

  const msg = new MsgExecuteContract(sender, contract, executeMsg, coins);

  return {
    sender,
    msgs: [...allowanceMsgs, msg],
  };
};
