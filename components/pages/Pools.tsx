import React, { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";

import { usePools } from "modules/pool";

import PoolsOverview from "components/pool/PoolsOverview";
import PoolTable from "components/pool/table/PoolTable";
import Card from "components/Card";

const Pools: FC = () => {
  const pools = usePools();

  return (
    <Box w="container.xl" m="0 auto" pt="12" pb="64" color="white">
      <Box px="6" mb="4">
        <Heading>Pools Overview</Heading>
      </Box>
      <PoolsOverview />

      <Box px="6" mb="4" mt="12">
        <Heading>My Pools</Heading>
      </Box>
      {pools.mine && (
        <Card noPadding>
          <PoolTable data={pools.mine} />
        </Card>
      )}

      <Box px="6" mb="4" mt="12">
        <Heading>All Pools</Heading>
      </Box>
      {pools.all && (
        <Card noPadding>
          <PoolTable data={pools.all} />
        </Card>
      )}
    </Box>
  );
};

export default Pools;
