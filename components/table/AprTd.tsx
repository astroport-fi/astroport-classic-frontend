import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { handleBigPercentage } from "modules/common";
import RewardsPopover from "components/popovers/RewardsPopover";

type Props = {
  row: any;
};

const AprTd: FC<Props> = ({ row }) => {
  const { rewards } = row.original;

  return (
    <RewardsPopover rewards={rewards}>
      <Text cursor={rewards.total > 0 ? "pointer" : "auto"} fontSize="sm">
        {handleBigPercentage(rewards.total * 100)}
      </Text>
    </RewardsPopover>
  );
};

export default AprTd;
