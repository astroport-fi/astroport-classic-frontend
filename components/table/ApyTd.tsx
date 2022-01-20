import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { handleBigApy } from "modules/common";
import ApyPopover from "components/popovers/ApyPopover";

type Props = {
  row: any;
};

const ApyTd: FC<Props> = ({ row }) => {
  const { apy } = row.original;

  return (
    <ApyPopover apy={apy} rewardToken={apy.reward_symbol}>
      <Text cursor={apy.total > 0 ? "pointer" : "auto"} fontSize="sm">
        {handleBigApy(apy.total * 100)}
      </Text>
    </ApyPopover>
  );
};

export default ApyTd;
