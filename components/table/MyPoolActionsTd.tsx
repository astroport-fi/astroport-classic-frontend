import React, { FC } from "react";
import Link from "next/link";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

type Props = {
  data: {
    contract: string;
    canManage: boolean;
    canStake: boolean;
    isStakable: boolean;
  };
};

const MyPoolActionsTd: FC<Props> = ({ data }) => {
  const { contract, canManage, canStake, isStakable } = data;

  const renderButtons = () => {
    if (isStakable) {
      <Link href={`/pools/${contract}/stake`} passHref>
        <Button
          as="a"
          variant="primary"
          size="sm"
          px="0"
          minW="40"
          borderLeft="2px"
          borderLeftColor="brand.deepBlue"
        >
          Stake
        </Button>
      </Link>;
    }

    if (canStake && !isStakable) {
      return (
        <ButtonGroup isAttached>
          <Link href={`/pools/${contract}`} passHref>
            <Button as="a" variant="primary" size="sm" px="0" minW="20">
              Manage
            </Button>
          </Link>
          <Link href={`/pools/${contract}/stake`} passHref>
            <Button
              as="a"
              variant="primary"
              size="sm"
              px="0"
              minW="20"
              borderLeft="2px"
              borderLeftColor="brand.deepBlue"
            >
              Unstake
            </Button>
          </Link>
        </ButtonGroup>
      );
    }

    if (canManage && !isStakable) {
      return (
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary" size="sm" px="0" minW="40">
            Manage
          </Button>
        </Link>
      );
    }

    return (
      <ButtonGroup isAttached>
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary" size="sm" px="0" minW="20">
            Manage
          </Button>
        </Link>
        <Link href={`/pools/${contract}/stake`} passHref>
          <Button
            as="a"
            variant="primary"
            size="sm"
            px="0"
            minW="20"
            borderLeft="2px"
            borderLeftColor="brand.deepBlue"
          >
            Stake
          </Button>
        </Link>
      </ButtonGroup>
    );
  };

  return <Flex justify="flex-end">{renderButtons()}</Flex>;
};

export default MyPoolActionsTd;
