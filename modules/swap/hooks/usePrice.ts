import { useTerraWebapp, num } from "@arthuryeti/terra";

import {
  getSwapRoute,
  useAstroswap,
  useContracts,
  useTokenInfo,
} from "modules/common";
import { simulate as simulateMonoSwap } from "modules/swap/monoSwap";
import { simulate as simulateMultiSwap } from "modules/swap/multiSwap";

export const usePrice = () => {
  const { client } = useTerraWebapp();
  const { routes } = useAstroswap();
  const { router } = useContracts();
  const { getDecimals } = useTokenInfo();

  const getPriceInUst = async (token) => {
    const decimals = getDecimals(token);
    const swapRoute = getSwapRoute({ routes, from: token, to: "uusd" });

    if (swapRoute.length > 1) {
      const data = await simulateMultiSwap({
        client,
        swapRoute,
        router,
        token,
        amount: (10 ** decimals).toString(),
      });

      return num(data.amount)
        .div(10 ** 6)
        .dp(6)
        .toNumber();
    }

    const data = await simulateMonoSwap({
      client,
      swapRoute,
      token,
      amount: (10 ** decimals).toString(),
      reverse: false,
    });

    if (!data) {
      return 0;
    }

    // @ts-expect-error
    return num(data.return_amount)
      .plus(data.commission_amount)
      .plus(data.spread_amount)
      .div(10 ** 6)
      .dp(6)
      .toNumber();
  };

  return {
    getPriceInUst,
  };
};

export default usePrice;
