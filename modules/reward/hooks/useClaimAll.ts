import { useMemo } from "react";
import { useAddress, num } from "@arthuryeti/terra";

import { useContracts, useTransaction, TxErrorHandler } from "modules/common";
import { useLockdropRewards, useUserInfoWithList } from "modules/lockdrop";
import {
  useAirdrop,
  useAirdropBalance,
  useUserInfo as useAirdropUserInfo,
  useUserInfo2 as useAirdrop2UserInfo,
  useAirdrop2Balance,
} from "modules/airdrop";
import { useUserInfo as useAuctionUserInfo } from "modules/auction";
import {
  useLpRewards,
  useBreakdownRewardsInUst,
  createClaimAirdropMsgs,
  createPhase1ClaimAllMsgs,
  createPhase2ClaimAllMsgs,
  createLpRewardsMsgs,
  createLockdropRewardsMsgs,
  createLpRewardMsgs,
  createLockdropRewardMsgs,
} from "modules/reward";

type Params = {
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useClaimAll = ({ onBroadcasting, onError }: Params) => {
  const {
    lockdrop,
    auction,
    generator,
    airdrop: airdropContract,
    airdrop2: airdrop2Contract,
  } = useContracts();
  const address = useAddress();
  const userInfoWithList = useUserInfoWithList();
  const { isLoading, data: airdropData } = useAirdrop(address);
  const auctionUserInfo = useAuctionUserInfo();
  const airdropUserInfo = useAirdropUserInfo();
  const airdrop2UserInfo = useAirdrop2UserInfo();
  const airdropBalance = useAirdropBalance();
  const airdrop2Balance = useAirdrop2Balance();
  const { data: lockdropRewards } = useLockdropRewards();
  const lpRewards = useLpRewards();
  const lpAndLockdropRewards = useBreakdownRewardsInUst();

  const items = useMemo(() => {
    if (userInfoWithList == null) {
      return [];
    }

    return userInfoWithList.lockup_infos.map((info) => {
      return {
        contract: info.pool_address,
        duration: info.duration,
      };
    });
  }, [userInfoWithList]);

  const msgs = useMemo(() => {
    let data = [];
    let claimedLps = [];
    let claimedLockdrops = [];

    if (num(airdropBalance).gt(0)) {
      const airdrop = airdropData.find(
        ({ airdrop_series }) => airdrop_series === 1
      );
      const airdropMsgs = createClaimAirdropMsgs(
        {
          contract: airdropContract,
          isClaimed: num(airdropUserInfo.airdrop_amount).gt(0),
          merkleProof: airdrop?.merkle_proof,
          claimAmount: airdrop?.amount,
          rootIndex: airdrop?.index,
        },
        address
      );

      data.push(...airdropMsgs);
    }

    if (num(airdrop2Balance).gt(0)) {
      const airdrop = airdropData.find(
        ({ airdrop_series }) => airdrop_series === 2
      );
      const airdrop2Msgs = createClaimAirdropMsgs(
        {
          contract: airdrop2Contract,
          isClaimed: num(airdrop2UserInfo.airdrop_amount).gt(0),
          merkleProof: airdrop?.merkle_proof,
          claimAmount: airdrop?.amount,
          rootIndex: airdrop?.index,
        },
        address
      );

      data.push(...airdrop2Msgs);
    }

    if (
      userInfoWithList != null &&
      !userInfoWithList.astro_transferred &&
      num(userInfoWithList.total_astro_rewards).gt(0)
    ) {
      // createPhase1ClaimAllMsgs currently adds 1st item to data.
      // add this to claimedLockdrops to prevent duplicate from
      // positions in lpAndLockdropRewards
      if (items.length > 0) {
        claimedLockdrops.push(items[0].contract);
      }

      const phase1Msgs = createPhase1ClaimAllMsgs(
        {
          contract: lockdrop,
          items,
        },
        address
      );

      data.push(...phase1Msgs);
    }

    if (
      auctionUserInfo != null &&
      num(auctionUserInfo.auction_incentive_amount).gt(0)
    ) {
      const phase2Msgs = createPhase2ClaimAllMsgs(
        {
          contract: auction,
        },
        address
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
                address
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
                address
              );
            }
          }

          if (msg) {
            data.push(...msg);
          }
        });
      });
    }

    /*
      if (lockdropRewards?.length > 0) {
        const lockdropMsgs = createLockdropRewardsMsgs(
          {
            contract: lockdrop,
            items: lockdropRewards,
          },
          address
        );

        data.push(...lockdropMsgs);
      }

      if (lpRewards?.length > 0) {
        const lpMsgs = createLpRewardsMsgs(
          {
            contract: generator,
            items: lpRewards,
          },
          address
        );

        data.push(...lpMsgs);
      }
    */

    if (data.length == 0) {
      return null;
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
    airdropUserInfo,
    auctionUserInfo,
    userInfoWithList,
    airdrop2UserInfo,
    airdropContract,
    airdrop2Contract,
    airdropBalance,
    airdrop2Balance,
    lockdropRewards,
    lpAndLockdropRewards[0]?.amountUst,
    airdropData,
    isLoading,
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
