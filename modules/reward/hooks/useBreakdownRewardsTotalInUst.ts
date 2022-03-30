import { useMemo } from "react";
import { useQuery } from "react-query";
import { num } from "@arthuryeti/terra";

import { useBreakdownRewards } from "modules/reward";
import { usePrice } from "modules/swap";
import { QUERY_STALE_TIME } from "constants/constants";

export const useBreakdownRewardsTotalInUst = () => {
  const rewards = useBreakdownRewards();
  const { getPriceInUst } = usePrice();

  const { data } = useQuery(
    ["prices", rewards],
    () => {
      const promises = rewards.map((reward) => getPriceInUst(reward.token));
      return Promise.all(promises);
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: QUERY_STALE_TIME,
    }
  );

  return useMemo(() => {
    if (data == null) {
      return 0;
    }

    const total = rewards.reduce((acc, reward, index) => {
      // TODO: Make sure the tokens are in the same order as the query
      return acc + data[index] * reward.amount;
    }, 0);

    return num(total).dp(6).toNumber();
  }, [data]);
};

export default useBreakdownRewardsTotalInUst;
