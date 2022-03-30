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
    return `${handleTinyAmount(stakingRatio)}%`;
  }

  return `${handleTinyAmount(1 / astroMintRatio)}%`;
};
