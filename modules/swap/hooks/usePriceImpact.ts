import { num, toTerraAmount } from "@arthuryeti/terra";
import { useTokenPriceInUst, useSwapSimulate } from "modules/swap";

type Token = {
  amount: string;
  asset: string;
};

type Params = {
  token1: Token;
  token2: Token;
};

export const usePriceImpact = ({ token1, token2 }: Params) => {
  const token2PriceInUst = num(useTokenPriceInUst(token2.asset));

  const result = useSwapSimulate({
    token1: token1.asset,
    token2: token2.asset,
    amount: toTerraAmount(token1.amount),
    reverse: false,
  });

  const newToken2PriceInUst = num(toTerraAmount(result?.price));

  return newToken2PriceInUst
    .minus(token2PriceInUst)
    .abs()
    .div(token2PriceInUst)
    .times(100)
    .toNumber();
};

export default usePriceImpact;
