import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import { useContracts } from "modules/common";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

type Props = {
  value: string;
};

const PoolTotalTd: FC<Props> = ({ value }) => {
  const { lockdrop } = useContracts();
  const balance = useBalance(value, lockdrop);

  return <Text fontSize="sm">{fromTerraAmount(balance, "0,0.00")}</Text>;
};

export default PoolTotalTd;
