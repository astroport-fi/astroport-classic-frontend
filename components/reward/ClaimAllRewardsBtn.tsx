import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";
import { Button, VStack } from "@chakra-ui/react";
import { useQueryClient } from "react-query";

import { useAstroswap } from "modules/common";
import { useClaimAll } from "modules/reward";

import FormFee from "components/common/FormFee";

type Props = {
  onSuccess?: () => void;
};

const ClaimAllRewardsBtn: FC<Props> = ({ onSuccess }) => {
  const { addNotification } = useAstroswap();
  const queryClient = useQueryClient();

  const state = useClaimAll({
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
      onSuccess();
    },
    onBroadcasting: (txHash) => {
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "claimRewards",
        },
      });
    },
  });

  return (
    <VStack>
      <Button
        mt={6}
        size="sm"
        w="full"
        variant="primary"
        onClick={state.submit}
        isDisabled={state.txStep != TxStep.Ready}
      >
        Claim Rewards
      </Button>
      <FormFee fee={state.fee} />
    </VStack>
  );
};

export default ClaimAllRewardsBtn;
