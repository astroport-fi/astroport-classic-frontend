import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import dayjs from "dayjs";

type Props = {
  row: any;
};

const LockEndTd: FC<Props> = ({ row }) => {
  const { lockEnd } = row.original;
  const date = dayjs.unix(lockEnd).format("MM/DD/YY");

  return <Text fontSize="sm">{date}</Text>;
};

export default LockEndTd;
