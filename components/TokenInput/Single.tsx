import React, { FC } from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import {
  handleTinyAmount,
  usePriceDerived,
  useTokenInfo,
} from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  asset: string;
  hidePrice?: boolean;
  isMobile?: boolean;
  priceSource?: "swap-simulation" | "pool-ratio" | undefined;
};

const Single: FC<Props> = ({
  asset,
  hidePrice = false,
  isMobile = false,
  priceSource = "swap-simulation",
}) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const swapSimulationPrice = useTokenPriceInUstWithSimulate(asset);
  const poolRatioPrice = usePriceDerived(asset);
  const price =
    priceSource === "swap-simulation" ? swapSimulationPrice : poolRatioPrice;
  const formattedPrice =
    price === 0
      ? "--.-- USTC"
      : handleTinyAmount(price.toFixed(2), "0,0.00", false, " USTC");
  const icon = getIcon(asset);

  return (
    <Box
      bg="white.100"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="left"
      px="4"
      h="16"
      lineHeight="1.2"
      {...(!isMobile && {
        borderRadius: "full",
        borderWidth: "1px",
        borderColor: "white.200",
      })}
    >
      <Flex align="center">
        <Box flexShrink={0}>
          <Image src={icon} width="8" height="8" alt="Logo" />
        </Box>

        <Box ml="3" fontWeight="500" flex="1" overflow="hidden">
          <Text textStyle={["0.8rem", "0.8rem", "h3"]} isTruncated>
            {getSymbol(asset)}
          </Text>
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
