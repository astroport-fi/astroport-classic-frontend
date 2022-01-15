import React, { FC } from "react";
import numeral from "numeral";
import { Text } from "@chakra-ui/react";
import ApyPopover from "components/popovers/ApyPopover";

type Props = {
  row: any;
};

const ApyTd: FC<Props> = ({ row }) => {
  const { apy } = row.original;
  const formatted = numeral(apy.total * 100).format("0,0.00");

  return (
    <ApyPopover apy={apy} rewardToken={apy.reward_symbol}>
      <Text cursor={apy.total > 0 ? "pointer" : "auto"} fontSize="sm">
        {formatted}%
      </Text>
    </ApyPopover>
  );
};

export default ApyTd;
