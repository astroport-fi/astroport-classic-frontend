import React, { FC } from "react";
import { HStack, Image, Text } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";

type Props = {
  row: any;
};

const PoolNameTd: FC<Props> = ({ row }) => {
  const { name } = row.original;
  const { getSymbol, getIcon } = useTokenInfo();

  return (
    <HStack>
      <Image src={getIcon(name)} alt="Icon" />
      <Text fontSize="sm">{getSymbol(name)}</Text>
    </HStack>
  );
};

export default PoolNameTd;
