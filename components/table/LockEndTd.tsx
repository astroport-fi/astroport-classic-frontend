import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import dayjs from "dayjs";

type Props = {
  row: any;
};

const LockEndTd: FC<Props> = ({ row }) => {
  const { lockEnd } = row.original;
  const date = dayjs.unix(lockEnd);
  if (date.isBefore(Date.now())) {
    return (
      <Text textStyle="medium" color="green.500">
        unlocked
      </Text>
    );
  }
  const remainingDays = date.diff(Date.now(), "day", false);
  return (
    <HStack spacing="3">
      <Text fontSize="sm">{date.format("MM/DD/YY")}</Text>
      <Text textStyle="medium" variant="dimmed">
        ({remainingDays}d)
      </Text>
    </HStack>
  );
};

export default LockEndTd;
