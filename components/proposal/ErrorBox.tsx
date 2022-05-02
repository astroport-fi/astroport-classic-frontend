import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import ErrorBubble from "components/common/ErrorBubble";
import { NextLink } from "modules/common";

const ErrorBox = () => {
  return (
    <Flex
      bg="brand.defaultTable"
      py={["2", "5"]}
      px={["4", "8"]}
      mb="5"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="errors.main"
      align="center"
    >
      <ErrorBubble text="!" />
      <Text ml="3" color="white" fontSize="xs">
        You don&apos;t have enough xASTRO in your wallet to submit a proposal
      </Text>
      <NextLink href={`/governance/stake`} passHref>
        <Button
          ml="auto"
          h="24px"
          bg="brand.purple"
          color="white"
          _hover={{ bg: "brand.purple" }}
          _focus={{ bg: "brand.purple" }}
          _active={{ bg: "brand.purple" }}
        >
          Stake Astro
        </Button>
      </NextLink>
    </Flex>
  );
};

export default ErrorBox;
