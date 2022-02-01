import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex, HStack } from "@chakra-ui/react";

import { ClaimAuctionRewardBtn } from "modules/reward";

type Props = {
  isClaimable: boolean;
  isClaimed: boolean;
  amount: string;
};

const AuctionActionsTd: FC<Props> = ({ isClaimable, isClaimed, amount }) => {
  if (!isClaimable) {
    return (
      <HStack justify="flex-end">
        <ClaimAuctionRewardBtn amount={amount} />
        <Button as="div" variant="silent" size="sm" isDisabled flex="1">
          Locked
        </Button>
      </HStack>
    );
  }

  if (isClaimed) {
    return (
      <Flex justify="flex-end">
        <Button as="a" variant="silent" size="sm" isFullWidth isDisabled>
          Claimed
        </Button>
      </Flex>
    );
  }

  return (
    <HStack justify="flex-end">
      <ClaimAuctionRewardBtn amount={amount} />
      <Link href={`/unlock-phase-2`} passHref>
        <Button as="a" variant="primary" size="sm" flex="1">
          Manage
        </Button>
      </Link>
    </HStack>
  );
};

export default AuctionActionsTd;
