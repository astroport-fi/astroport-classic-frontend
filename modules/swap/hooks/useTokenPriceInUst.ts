import { num } from "@arthuryeti/terra";

import { ONE_TOKEN, ESTIMATE_TOKEN } from "constants/constants";
import { useSwapSimulate } from "modules/swap";

export const useTokenPriceInUst = (token1: string | null) => {
  const data = useSwapSimulate({
    token1,
    token2: ESTIMATE_TOKEN,
    amount: String(ONE_TOKEN),
    reverse: false,
  });

  if (token1 == "uusd") {
    return String(ONE_TOKEN);
  }

  if (data == null) {
    return "0";
  }

  return num("1").div(data.price).times(ONE_TOKEN).toFixed();
};

export default useTokenPriceInUst;
