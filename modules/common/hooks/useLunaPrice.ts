import { num, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { Coin } from "@terra-money/terra.js";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  astro_token: string;
  auction_contract: string;
  deposit_window: number;
  generator: string;
  init_timestamp: number;
  lockdrop_incentives: string;
  max_lock_duration: number;
  min_lock_duration: number;
  owner: string;
  weekly_divider: number;
  weekly_multiplier: number;
  withdrawal_window: number;
};

export const useLunaPrice = () => {
  const { client } = useTerraWebapp();

  const { data, isLoading } = useQuery("luna", () => {
    return client.market.swapRate(new Coin("uluna", ONE_TOKEN), "uusd");
  });

  if (isLoading || data == null) {
    return null;
  }

  return num(data.amount.toString()).div(ONE_TOKEN).toNumber();
};

export default useLunaPrice;
