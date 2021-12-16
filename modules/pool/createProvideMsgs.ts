import { Coin, MsgExecuteContract } from "@terra-money/terra.js";

import {
  PoolResponse,
  getTokenDenom,
  isNativeAsset,
  isNativeAssetInfo,
} from "modules/common";

type CreateProvideMsgsOptions = {
  pool: PoolResponse;
  coin1: Coin;
  coin2: Coin;
  contract: string;
  slippage: string;
};

export const createProvideMsgs = (
  options: CreateProvideMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { contract, pool, coin1, coin2, slippage } = options;

  const assets = pool.assets.map((asset) => ({
    info: asset.info,
    amount:
      getTokenDenom(asset.info) === coin1.denom
        ? coin1.amount.toString()
        : coin2.amount.toString(),
  }));

  const coins = assets
    .filter((asset) => isNativeAsset(asset.info))
    .map((asset) => new Coin(getTokenDenom(asset.info), asset.amount));

  const allowanceMsgs = assets.reduce<MsgExecuteContract[]>((acc, asset) => {
    if (isNativeAssetInfo(asset.info)) {
      return acc;
    }

    return [
      ...acc,
      new MsgExecuteContract(sender, asset.info.token.contract_addr, {
        increase_allowance: {
          amount: asset.amount,
          spender: contract,
        },
      }),
    ];
  }, []);

  const executeMsg = {
    provide_liquidity: { assets, slippage_tolerance: slippage },
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg, coins);

  return [...allowanceMsgs, msg];
};

export default createProvideMsgs;
