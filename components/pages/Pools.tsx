import React, { FC, useMemo } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

// import PoolsOverview from "components/pool/PoolsOverview";
import MyPools from "components/pool/MyPools";
import AllPools from "components/pool/AllPools";

const Pools: FC = () => {
  return (
    <Container
      px={["6", null, "12"]}
      maxWidth="container.xl"
      pt="12"
      pb="64"
      color="white"
    >
      {/* <Box px="6" mb="4">
        <Heading>Pools Overview</Heading>
      </Box>
      <PoolsOverview /> */}

      <Box px="6" mb="4" mt="12">
        <Heading>My Pools</Heading>
      </Box>
      <MyPools />

      <Box px="6" mb="4" mt="12">
        <Heading>Other Pools</Heading>
      </Box>
      <AllPools />
    </Container>
  );
};

export default Pools;
