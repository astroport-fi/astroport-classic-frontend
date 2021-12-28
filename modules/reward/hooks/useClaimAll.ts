import { useMemo } from "react";
import { useAddress, useTransaction, num } from "@arthuryeti/terra";
import { TxInfo } from "@terra-money/terra.js";

import { useContracts } from "modules/common";
import { useUserInfo } from "modules/lockdrop";
import {
  useAirdrop,
  useAirdropBalance,
  useUserInfo as useAirdropUserInfo,
} from "modules/airdrop";
import { useUserInfo as useAuctionUserInfo } from "modules/auction";
import {
  createClaimAirdropMsgs,
  createPhase1ClaimAllMsgs,
  createPhase2ClaimAllMsgs,
} from "modules/reward";

type Params = {
  onBroadcasting?: (txHash: string) => void;
  onSuccess?: (txHash: string, txInfo?: TxInfo) => void;
  onError?: (txHash?: string, txInfo?: TxInfo) => void;
};

export const useClaimAll = ({ onBroadcasting, onSuccess, onError }: Params) => {
  const { lockdrop, auction, airdrop } = useContracts();
  const address = useAddress();
  const userInfo = useUserInfo();
  const { isLoading, data: airdropData } = useAirdrop(address);
  const auctionUserInfo = useAuctionUserInfo();
  const airdropUserInfo = useAirdropUserInfo();
  const airdropBalance = useAirdropBalance();

  const items = useMemo(() => {
    if (userInfo == null) {
      return [];
    }

    return userInfo.lockup_infos.map((info) => {
      return {
        contract: info.terraswap_lp_token,
        duration: info.duration,
      };
    });
  }, [userInfo]);

  const msgs = useMemo(() => {
    if (
      userInfo == null ||
      auctionUserInfo == null ||
      airdropUserInfo == null ||
      airdropData == null ||
      isLoading
    ) {
      return null;
    }

    let data = [];

    if (num(airdropBalance).gt(0)) {
      const airdropMsgs = createClaimAirdropMsgs(
        {
          contract: airdrop,
          isClaimed: num(airdropUserInfo.airdrop_amount).gt(0),
          merkleProof: airdropData?.merkle_proof,
          claimAmount: airdropData?.amount,
          rootIndex: airdropData?.index,
        },
        address
      );

      data.push(...airdropMsgs);
    }

    if (
      !userInfo.astro_transferred &&
      num(userInfo.total_astro_rewards).gt(0)
    ) {
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
      !auctionUserInfo.astro_incentive_transferred &&
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

    return data;
  }, [
    address,
    lockdrop,
    items,
    auction,
    airdropUserInfo,
    auctionUserInfo,
    userInfo,
    airdrop,
    airdropBalance,
    airdropData,
    isLoading,
  ]);

  return useTransaction({
    msgs,
    onBroadcasting,
    onSuccess,
    onError,
  });
};

export default useClaimAll;
