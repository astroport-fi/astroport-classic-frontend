import React, { FC } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { calculatePercentage, useFeeToString } from "@arthuryeti/terra";

import { format } from "libs/parse";

type Props = {
  pool: any;
  data: any;
};

const WithdrawFormFooter: FC<Props> = ({ pool, data }) => {
  const percentage = calculatePercentage(
    pool.myShareInUST,
    pool.totalShareInUST
  );
  const feeString = useFeeToString(data.fee);

  return (
    <Box>
      <Flex justify="space-between" px="12" my="8">
        <Box
          flex="1"
          borderLeftColor="whiteAlpha.600"
          borderLeftWidth="1px"
          borderRightColor="whiteAlpha.600"
          borderRightWidth="1px"
          pl="4"
        >
          <Text color="white" fontSize="sm">
            ${format(pool.totalShareInUST, "uusd")}
          </Text>
          <Text variant="light">Liquidity</Text>
        </Box>
        <Box
          flex="1"
          borderRightColor="whiteAlpha.600"
          borderRightWidth="1px"
          pl="4"
        >
          <Text color="white" fontSize="sm">
            {`${percentage || "0"}%`}
          </Text>
          <Text variant="light">Share of Pool</Text>
        </Box>
        <Box
          flex="1"
          borderRightColor="whiteAlpha.600"
          borderRightWidth="1px"
          pl="4"
        >
          <Text color="white" fontSize="sm">
            {feeString || "0.00"}
          </Text>
          <Text variant="light">TX Fee</Text>
        </Box>
      </Flex>
      <Flex flex="1" align="center" flexDirection="column">
        <Button variant="primary" type="submit" isDisabled={!data.isReady}>
          Withdraw Liquidity Now
        </Button>
      </Flex>
    </Box>
  );
};

export default WithdrawFormFooter;
