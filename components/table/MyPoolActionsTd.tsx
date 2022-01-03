import React, { FC } from "react";
import Link from "next/link";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

type Props = {
  data: {
    contract: string;
    canManage: boolean;
    canStake: boolean;
  };
};

const MyPoolActionsTd: FC<Props> = ({ data }) => {
  const { contract, canManage, canStake } = data;

  return (
    <Flex justify="flex-end">
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
    </Flex>
  );
};

export default MyPoolActionsTd;
