import React from "react";
import { Flex, Text, Button, useMediaQuery } from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import { NextLink } from "modules/common";
import ErrorBubble from "components/common/ErrorBubble";
import UnderlineButton from "components/UnderlineButton";

const StakeButton = ({ isMobile }: { isMobile: boolean | undefined }) => {
  return (
    <NextLink href={`/governance/stake`} passHref>
      {isMobile ? (
        <UnderlineButton fontWeight="500" color="brand.purpleAlt" px="9">
          Stake Astro
        </UnderlineButton>
      ) : (
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
      )}
    </NextLink>
  );
};

const ErrorBox = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);

  return (
    <Flex
      bg="brand.defaultTable"
      py="5"
      px={["4", "4", "8"]}
      m="5"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="errors.main"
      align={isMobile ? "flex-start" : "center"}
      flexDirection={isMobile ? "column" : "row"}
    >
      {isMobile ? (
        <>
          <Flex>
            <ErrorBubble text="!" />
            <Text ml="3" mb="2" color="white" fontSize="xs">
              You don&apos;t have enough xASTRO in your wallet to submit a
              proposal
            </Text>
          </Flex>
          <StakeButton isMobile={isMobile} />
        </>
      ) : (
        <>
          <ErrorBubble text="!" />
          <Text ml="3" color="white" fontSize="xs">
            You don&apos;t have enough xASTRO in your wallet to submit a
            proposal
          </Text>
          <StakeButton isMobile={isMobile} />
        </>
      )}
    </Flex>
  );
};

export default ErrorBox;
