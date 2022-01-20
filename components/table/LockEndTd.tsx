import React, { FC } from "react";
import { HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

type Props = {
  row: any;
};

const LockEndTd: FC<Props> = ({ row }) => {
  const { lockEnd } = row.original;
  const date = dayjs.unix(lockEnd).utc();

  const remainingDays = date.diff(Date.now(), "day", false);

  return (
    <HStack spacing="3">
      <Text fontSize="sm">{date.format("MMM/DD/YY")}</Text>
      {remainingDays > 0 && (
        <Text textStyle="medium" variant="dimmed">
          ({remainingDays}d)
        </Text>
      )}
    </HStack>
  );
};

export default LockEndTd;
