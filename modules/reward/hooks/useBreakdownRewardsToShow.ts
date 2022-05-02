import { useBreakdownRewardsInUst } from "modules/reward";
import useLocalStorage from "hooks/useLocalStorage";
import { useMemo } from "react";

const useBreakdownRewardsToShow = () => {
  const rewards = useBreakdownRewardsInUst();
  const [renderRewardsWithPrice] = useLocalStorage(
    "renderRewardsWithPrice",
    true
  );

  return useMemo(() => {
    if (rewards.filter((r) => r.price === 0).length === 0) {
      return { rewards, renderSwitch: false };
    }

    if (renderRewardsWithPrice) {
      return {
        rewards: rewards.filter((r) => r.price > 0),
        renderSwitch: true,
      };
    } else {
      return {
        rewards: rewards
          .filter((r) => r.price === 0)
          .sort((a, b) => b.amount - a.amount),
        renderSwitch: true,
      };
    }
  }, [rewards, renderRewardsWithPrice]);
};

export default useBreakdownRewardsToShow;
