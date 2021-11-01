import React, { FC } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import { useTokenPriceInUst } from "modules/swap";

type Props = {
  asset: string;
};

const Single: FC<Props> = ({ asset }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUst(asset);
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
          <Text textStyle="h3">{getSymbol(asset)}</Text>
          <Text textStyle="small" variant="dimmed">
            {/* TODO: Fix issue */}
            Price: ${fromTerraAmount(price as any, "uusd")}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Single;
