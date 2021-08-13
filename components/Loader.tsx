import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex w="100vw" h="80vh" justifyContent="center" alignItems="center">
      <Spinner size="xl" thickness="lg" color="pink.500" />
    </Flex>
  );
};

export default Loader;
