import React, { FC, useMemo } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

import PoolsOverview from "components/pool/PoolsOverview";
import MyPools from "components/pool/MyPools";
import OtherPools from "components/pool/OtherPools";

const Pools: FC = () => {
  return (
    <Container
      px={["6", null, "12"]}
      maxWidth="container.xl"
      pt="12"
      pb="64"
      color="white"
    >
      <Box px="6" mb="4" mt="12">
        <Heading fontSize="xl">Overview</Heading>
      </Box>
      <PoolsOverview />

      <Box px="6" mb="4" mt="12">
        <Heading fontSize="xl">My Pools</Heading>
      </Box>
      <MyPools />

      <Box px="6" mb="4" mt="12">
        <Heading fontSize="xl">Other Pools</Heading>
      </Box>
      <OtherPools />
    </Container>
  );
};

export default Pools;
