import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terra";

import { format } from "libs/parse";
import { useTokenPrice } from "modules/swap";

type Props = {
  asset: string;
};

const Single: FC<Props> = ({ asset }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPrice(asset);
  const icon = getIcon(asset);

  return (
    <Box
      bg="white.100"
      color="white"
      display="flex"
      justify="center"
      align="center"
      borderRadius="full"
      borderWidth="1px"
      borderColor="white.200"
      textAlign="left"
      px="4"
      h="16"
      lineHeight="1.2"
      isFullWidth
    >
      <Flex align="center">
        <Box>
          <Image src={icon} width="2.5rem" height="2.5rem" alt="Logo" />
        </Box>

        <Box ml="3" fontWeight="500" flex="1">
          <Text fontSize="2xl" color="white">
            {getSymbol(asset)}
          </Text>
          <Text fontSize="xs" color="white.400">
            Price: ${format(price, Denom.USD)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Single;
