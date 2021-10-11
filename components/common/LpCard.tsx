import React, { FC } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";

type Props = {
  token: string;
  apy: string;
};

const LpCard: FC<Props> = ({ token, apy }) => {
  const { getIcon, getSymbol } = useTokenInfo();

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="whiteAlpha.100"
      px="4"
      py="4"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <HStack spacing="4">
            <Box>
              <Image
                src={getIcon(token)}
                width="2.5rem"
                height="2.5rem"
                alt="Logo"
              />
            </Box>
            <Box>
              <Text fontSize="2xl" color="white">
                {getSymbol(token)}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text fontSize="2xl" color="white">
            {apy}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LpCard;
