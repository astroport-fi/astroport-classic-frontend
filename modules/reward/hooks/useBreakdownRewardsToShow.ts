import { useBreakdownRewardsInUst } from "modules/reward";
import useLocalStorage from "hooks/useLocalStorage";

export const useBreakdownRewardsToShow = () => {
  const rewards = useBreakdownRewardsInUst();
  const [renderRewardsWithPrice] = useLocalStorage(
    "renderRewardsWithPrice",
    true
  );

  if (rewards.filter((r) => r.price === 0).length === 0) {
    return { rewards, renderSwitch: false };
  }

  if (renderRewardsWithPrice) {
    return { rewards: rewards.filter((r) => r.price > 0), renderSwitch: true };
  } else {
    return {
      rewards: rewards
        .filter((r) => r.price === 0)
        .sort((a, b) => b.amount - a.amount),
      renderSwitch: true,
    };
  }
};

export default useBreakdownRewardsToShow;
