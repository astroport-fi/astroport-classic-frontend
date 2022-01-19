import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex, HStack } from "@chakra-ui/react";

import { ClaimLockdropRewardBtn } from "modules/reward";

type Props = {
  name: string;
  duration: number;
  isClaimable: boolean;
  isClaimed: boolean;
  astroLpToken: string;
};

const MyLockActionsTd: FC<Props> = ({
  name,
  duration,
  isClaimable,
  isClaimed,
  astroLpToken,
}) => {
  if (!isClaimable) {
    return (
      <HStack justify="flex-end">
        <ClaimLockdropRewardBtn contract={name} duration={duration} />
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
      <ClaimLockdropRewardBtn contract={name} duration={duration} />
      <Link href={`/unlock/${name}/${duration}/${astroLpToken}`} passHref>
        <Button as="a" variant="primary" size="sm" flex="1">
          Manage
        </Button>
      </Link>
    </HStack>
  );
};

export default MyLockActionsTd;
