import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";

type Props = {
  row: any;
};

const LockEndTd: FC<Props> = ({ row }) => {
  const { lockEnd } = row.original;
  const date = dayjs.unix(lockEnd).utc();

  const remainingDays = date.diff(Date.now(), "day", false);

  return (
    <>
      <Text fontSize="sm">{date.format("MMM/DD/YY")}</Text>
      {remainingDays > 0 && (
        <Text textStyle="small" variant="dimmed">
          ({remainingDays}d)
        </Text>
      )}
    </>
  );
};

export default LockEndTd;
