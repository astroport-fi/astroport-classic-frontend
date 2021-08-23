import React, { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";

import PoolsOverview from "components/pool/PoolsOverview";
import PoolList from "components/pool/PoolList";
import Card from "components/Card";
import { useTerra } from "contexts/TerraContext";

const Pools: FC = () => {
  const { pairs } = useTerra();

  console.log(pairs);

  return (
    <Box w="container.xl" m="0 auto" pt="12">
      <Box px="6" mb="4">
        <Heading variant="brand">Pools Overview</Heading>
      </Box>
      <PoolsOverview totalLiquidity="0" />

      <Box px="6" mb="4" mt="10">
        <Heading variant="brand">All Pools</Heading>
      </Box>
      {pairs && (
        <Card noPadding>
          <PoolList pools={pairs} />
        </Card>
      )}
    </Box>
  );
};

export default Pools;
