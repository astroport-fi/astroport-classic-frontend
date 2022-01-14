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
  const { contract } = data;

  const renderButtons = () => {
    return (
      <Link href={`/pools/${contract}`} passHref>
        <Button as="a" variant="primary" size="sm" px="0" minW="40">
          Manage
        </Button>
      </Link>
    );
  };

  return <Flex justify="flex-end">{renderButtons()}</Flex>;
};

export default MyPoolActionsTd;
