import React, { FC } from "react";
import Link from "next/link";
import { Button, IconButton, Flex } from "@chakra-ui/react";

import GraphIcon from "components/icons/GraphIcon";

type Props = {
  row: any;
};

const ActionsTd: FC<Props> = ({ row }) => {
  const { contract_addr } = row.original;

  return (
    <Flex justify="flex-end" align="center">
      <Link href={`/pairs/${contract_addr}`} passHref>
        <Button as="a" variant="primary" size="sm">
          Add Liquidity
        </Button>
      </Link>
      <IconButton
        aria-label="Graph"
        icon={<GraphIcon />}
        variant="icon"
        {...row.getToggleRowExpandedProps()}
      />
    </Flex>
  );
};

export default ActionsTd;
