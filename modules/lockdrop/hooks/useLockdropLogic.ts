import { useMemo } from "react";
import dayjs from "dayjs";
import { num } from "@arthuryeti/terra";

import { useLockedLpAmount, useConfig, useUserInfo } from "modules/lockdrop";
import { ONE_TOKEN } from "constants/constants";

type Opts = {
  lpToken: string;
  duration: number;
};

export const useLockdropLogic = ({ lpToken, duration }: Opts) => {
  const currentTimestamp = dayjs().unix();
  const config = useConfig();
  const userInfo = useUserInfo();
  const stakedAmount = useLockedLpAmount(lpToken, duration);

  return useMemo(() => {
    let canDeposit = false;
    let canWithdraw = false;
    let max = num(stakedAmount).div(ONE_TOKEN).toNumber();

    if (config == null || userInfo == null) {
      return { canDeposit: false, canWithdraw: false, max };
    }

    const lockupInfo = userInfo.lockup_infos.find(
      (info) =>
        info.terraswap_lp_token === lpToken && info.duration === duration
    );

    const phaseOpenUntil =
      config.init_timestamp + config.deposit_window + config.withdrawal_window;
    const depositAllowedUntil = config.init_timestamp + config.deposit_window;
    const withdraw50PercentUntil =
      config.init_timestamp +
      config.deposit_window +
      config.withdrawal_window / 2;

    if (config.init_timestamp < currentTimestamp) {
      canDeposit = true;
      canWithdraw = true;
    }

    if (depositAllowedUntil < currentTimestamp) {
      canDeposit = false;

      if (lockupInfo?.withdrawal_flag) {
        canWithdraw = false;
      }
    }

    if (
      depositAllowedUntil < currentTimestamp &&
      currentTimestamp < withdraw50PercentUntil
    ) {
      max = max / 2;
    }

    if (phaseOpenUntil < currentTimestamp) {
      canDeposit = false;
      canWithdraw = false;
      max = 0;
    }

    if (
      withdraw50PercentUntil < currentTimestamp &&
      currentTimestamp < phaseOpenUntil &&
      lockupInfo != null
    ) {
      const units = num(lockupInfo.lp_units_locked)
        .div(ONE_TOKEN)
        .div(2)
        .toNumber();

      max =
        units *
        ((phaseOpenUntil - currentTimestamp) /
          (phaseOpenUntil - withdraw50PercentUntil));
    }

    return {
      canDeposit,
      canWithdraw,
      max,
    };
  }, [config, userInfo, currentTimestamp, stakedAmount, duration, lpToken]);
};

export default useLockdropLogic;
