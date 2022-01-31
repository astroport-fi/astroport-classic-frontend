import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { handleBigPercentage } from "modules/common";
import { Pool } from "modules/pool";
import RewardsPopover from "components/popovers/RewardsPopover";

type Props = {
  pool: Pool;
};

const ApyFooter: FC<Props> = ({ pool }) => {
  const formattedApy = handleBigPercentage(pool.rewards.apy * 100);

  return (
    <RewardsPopover rewards={pool.rewards}>
      <Box
        cursor={pool.rewards.apy > 0 ? "pointer" : "auto"}
        color="white"
        key="apy"
        flex="1"
        borderRightColor="whiteAlpha.600"
        borderRightWidth="1px"
        pl="4"
        _first={{
          borderLeftColor: "whiteAlpha.600",
          borderLeftWidth: "1px",
        }}
        textAlign="center"
      >
        <Text textStyle="medium">{formattedApy || 0}</Text>
        <Text textStyle="small" variant="dimmed">
          APY
        </Text>
      </Box>
    </RewardsPopover>
  );
};

export default ApyFooter;
