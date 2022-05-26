import { useMemo } from "react";
import useAddress from "hooks/useAddress";
import { useContracts, useTransaction, TxErrorHandler } from "modules/common";
import { useLockdropRewards, useUserInfoWithList } from "modules/lockdrop";
import { useUserInfo as useAuctionUserInfo } from "modules/auction";
import {
  useLpRewards,
  createPhase1ClaimAllMsgs,
  createPhase2ClaimAllMsgs,
  createLpRewardMsgs,
  createLockdropRewardMsgs,
} from "modules/reward";
import useBreakdownRewardsToShow from "modules/reward/hooks/useBreakdownRewardsToShow";
import num from "libs/num";

type Params = {
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useClaimAll = ({
  onBroadcasting = () => null,
  onError = () => null,
}: Params) => {
  const { lockdrop, auction, generator } = useContracts();
  const address = useAddress();
  const userInfoWithList = useUserInfoWithList();
  const auctionUserInfo = useAuctionUserInfo();
  const { data: lockdropRewards } = useLockdropRewards();
  const lpRewards = useLpRewards();
  const { rewards: lpAndLockdropRewards } = useBreakdownRewardsToShow();

  const items = useMemo(() => {
    if (userInfoWithList == null) {
      return [];
    }

    return userInfoWithList.lockup_infos.map((info) => {
      return {
        contract: info.pool_address || "",
        duration: info.duration,
      };
    });
  }, [userInfoWithList]);

  const msgs = useMemo(() => {
    let data = [];
    let claimedLps: any = [];
    let claimedLockdrops: any = [];

    if (
      userInfoWithList != null &&
      !userInfoWithList.astro_transferred &&
      num(userInfoWithList.total_astro_rewards).gt(0)
    ) {
      // createPhase1ClaimAllMsgs currently adds 1st item to data.
      // add this to claimedLockdrops to prevent duplicate from
      // positions in lpAndLockdropRewards
      if (items.length > 0) {
        claimedLockdrops.push(items[0]?.contract);
      }

      const phase1Msgs = createPhase1ClaimAllMsgs(
        {
          contract: lockdrop,
          items,
        },
        address || ""
      );

      data.push(...phase1Msgs);
    }

    if (
      auctionUserInfo != null &&
      // initial claim from phase 2
      ((!auctionUserInfo.astro_incentive_transferred &&
        num(auctionUserInfo.auction_incentive_amount).gt(0)) ||
        // ongoing emissions from ust-astro in auction contract
        num(auctionUserInfo.withdrawable_lp_shares).gt(0))
    ) {
      const phase2Msgs = createPhase2ClaimAllMsgs(
        {
          contract: auction,
        },
        address || ""
      );

      data.push(...phase2Msgs);
    }

    // Temporary solution: Due to ledger limitation, we are sorting the
    // lp and lockdrop positions by UST value and claiming positions of
    // highest value first. Once splice is removed, we can revert to
    // old method commented out below.
    if (lpAndLockdropRewards?.length > 0) {
      lpAndLockdropRewards.forEach((item) => {
        const positions = item.positions?.sort(function (a, b) {
          return a.amount < b.amount ? 1 : -1;
        });

        positions?.forEach((position) => {
          let msg;

          if (position.type == "lp") {
            if (!claimedLps.includes(position.lp)) {
              claimedLps.push(position.lp);

              msg = createLpRewardMsgs(
                {
                  lp: position.lp,
                  contract: generator,
                },
                address || ""
              );
            }
          } else {
            if (!claimedLockdrops.includes(position.claimLp)) {
              claimedLockdrops.push(position.claimLp);

              msg = createLockdropRewardMsgs(
                {
                  lockdrop,
                  contract: position.claimLp,
                  duration: position.claimDuration,
                },
                address || ""
              );
            }
          }

          if (msg) {
            data.push(...msg);
          }
        });
      });
    }

    if (data.length == 0) {
      return [];
    }

    // Warning: Due to a Ledger limitation we are reducing the reward claims to
    // four claims at a time, once we are able to figure out if a wallet is a
    // ledger we will be able to only aply this limitation to those wallets.
    return data.splice(0, 4);
  }, [
    address,
    lockdrop,
    lpRewards,
    items,
    auction,
    auctionUserInfo,
    userInfoWithList,
    lockdropRewards,
    lpAndLockdropRewards[0]?.amountUst,
  ]);

  return useTransaction({
    notification: {
      type: "claimRewards",
    },
    msgs,
    onBroadcasting,
    onError,
  });
};

export default useClaimAll;
