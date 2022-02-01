import React, { FC } from "react";
import Link from "next/link";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { PoolFormType } from "types/common";

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
    return (
      <ButtonGroup isAttached>
        {canManage && (
          <Link href={`/pools/${contract}`} passHref>
            <Button
              as="a"
              variant="primary"
              size="sm"
              px="0"
              minW={isStakable ? "20" : "40"}
            >
              Manage
            </Button>
          </Link>
        )}
        {isStakable && canStake && (
          <Link
            href={{
              pathname: `/pools/${contract}/stake`,
              query: { type: PoolFormType.Stake },
            }}
            passHref
          >
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
        )}
        {isStakable && !canStake && (
          <Link
            href={{
              pathname: `/pools/${contract}/stake`,
              query: { type: PoolFormType.Unstake },
            }}
            passHref
          >
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
        )}
      </ButtonGroup>
    );
  };

  return <Flex justify="flex-end">{renderButtons()}</Flex>;
};

export default MyPoolActionsTd;
