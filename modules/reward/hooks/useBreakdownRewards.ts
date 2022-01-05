import { useMemo } from "react";

import { useLockdropRewards } from "modules/lockdrop";
import { useGeneratorRewards } from "modules/generator";

export const useBreakdownRewards = () => {
  const lock = useLockdropRewards();
  const generator = useGeneratorRewards();

  console.log("lock", lock);
  console.log("generator", generator);

  return useMemo(() => {
    return 0;
  }, []);
};

export default useBreakdownRewards;
