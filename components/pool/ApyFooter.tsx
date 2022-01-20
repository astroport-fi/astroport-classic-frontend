import React, { FC } from "react";
import numeral from "numeral";
import { Box, Text } from "@chakra-ui/react";
import { Pool } from "modules/pool";
import ApyPopover from "components/popovers/ApyPopover";

type Props = {
  pool: Pool;
};

const ApyFooter: FC<Props> = ({ pool }) => {
  const formattedApy = numeral(pool.apy.total * 100).format("0.00");

  return (
    <ApyPopover apy={pool.apy} rewardToken={pool.apy?.reward_symbol}>
      <Box
        cursor={pool.apy.total > 0 ? "pointer" : "auto"}
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
        <Text textStyle="medium">{formattedApy || 0}%</Text>
        <Text textStyle="small" variant="dimmed">
          APY
        </Text>
      </Box>
    </ApyPopover>
  );
};

export default ApyFooter;
