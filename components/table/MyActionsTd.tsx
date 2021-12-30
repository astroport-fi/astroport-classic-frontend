import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

type Props = {
  name: string;
  duration: number;
  isClaimable: boolean;
  isClaimed: boolean;
  astroLpToken: string;
};

const MyActionsTd: FC<Props> = ({
  name,
  duration,
  isClaimable,
  isClaimed,
  astroLpToken,
}) => {
  if (!isClaimable) {
    return (
      <Flex justify="flex-end">
        <Button as="a" variant="silent" size="sm" isFullWidth isDisabled>
          Locked
        </Button>
      </Flex>
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
    <Flex justify="flex-end">
      <Link href={`/unlock/${name}/${duration}/${astroLpToken}`} passHref>
        <Button as="a" variant="primary" size="sm" isFullWidth>
          Manage
        </Button>
      </Link>
    </Flex>
  );
};

export default MyActionsTd;
