import { handleTinyAmount } from "modules/common";

export const composeProtocolRatioDisplay = (
  stakedAstroBalance: string | null,
  xAstroSupply: string | null,
  astroCircSupply: number | null,
  stakingRatio: number | null
): string => {
  if (
    stakedAstroBalance === undefined ||
    xAstroSupply === undefined ||
    astroCircSupply === undefined ||
    stakingRatio === undefined
  ) {
    return `-`;
  }

  if (stakedAstroBalance === "0") {
    return `0%`;
  }

  if (xAstroSupply === "0") {
    return stakingRatio ? `${handleTinyAmount(stakingRatio)}%` : `-`;
  }

  return stakedAstroBalance && astroCircSupply
    ? `${handleTinyAmount(
        Number(stakedAstroBalance) / (astroCircSupply * 10 ** 4)
      )}%`
    : `-`;
};
