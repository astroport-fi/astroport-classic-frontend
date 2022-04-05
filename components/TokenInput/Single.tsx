import React, { FC } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { handleTinyAmount, useTokenInfo } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  asset: string;
  hidePrice?: boolean;
};

const Single: FC<Props> = ({ asset, hidePrice = false }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUstWithSimulate(asset).toFixed(2);
  const formattedPrice = handleTinyAmount(price, "0,0.00", false, "$");
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
    >
      <Flex align="center">
        <Box>
          <Image src={icon} width="8" height="8" alt="Logo" />
        </Box>

        <Box ml="3" fontWeight="500" flex="1">
          <Text textStyle="h3">{getSymbol(asset)}</Text>
          {!hidePrice && (
            <Text textStyle="small" variant="dimmed">
              Price: {formattedPrice}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Single;
