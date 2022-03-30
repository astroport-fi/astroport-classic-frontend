import { handleTinyAmount } from "modules/common";

export const composeProtocolRatioDisplay = (
  stakedAstroBalance: string | null,
  xAstroSupply: string | null,
  astroMintRatio: number | null,
  stakingRatio: number | null
): string => {
  if (
    stakedAstroBalance === undefined ||
    xAstroSupply === undefined ||
    astroMintRatio === undefined ||
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

  return astroMintRatio ? `${handleTinyAmount(1 / astroMintRatio)}%` : `-`;
};
