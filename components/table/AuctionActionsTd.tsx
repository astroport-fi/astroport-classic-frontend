import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex, HStack } from "@chakra-ui/react";

type Props = {
  row: any;
};

const AuctionActionsTd: FC<Props> = ({ row }) => {
  const { contract, assets, isClaimable } = row.original;
  const [token1, token2] = assets;

  const renderButton = () => {
    if (!isClaimable) {
      return (
        <Flex justify="flex-end">
          <Button as="a" variant="silent" size="sm" isFullWidth isDisabled>
            Unlock
          </Button>
        </Flex>
      );
    }

    return (
      <Link href={`/unlock-phase-2`} passHref>
        <Button as="a" variant="primary" size="sm" px="0" minW="40">
          Unlock
        </Button>
      </Link>
    );
  };

  return <HStack justify="flex-end">{renderButton()}</HStack>;
};

export default AuctionActionsTd;
