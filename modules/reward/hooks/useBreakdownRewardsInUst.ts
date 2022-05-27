import { useMemo } from "react";
import { useQuery } from "react-query";
import num from "libs/num";

import { useBreakdownRewards } from "modules/reward";
import { usePrice } from "modules/swap";
import { QUERY_STALE_TIME } from "constants/constants";

export const useBreakdownRewardsInUst = () => {
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

  const rewardsWithUst = rewards.map((reward, index) => {
    const price = !data ? 0 : data[index];
    return {
      token: reward.token,
      amount: reward.amount,
      positions: reward.positions,
      price,
      amountUst: reward.amount * price,
    };
  });

  return rewardsWithUst.sort(function (a, b) {
    return a.amountUst < b.amountUst ? 1 : -1;
  });
};

export default useBreakdownRewardsInUst;
