import React, { FC } from "react";
import { Box, Text, Flex, Image, HStack } from "@chakra-ui/react";
import { useAstroswap, getTokenDenoms, useTokenInfo } from "modules/common";
import { orderPoolTokens } from "modules/pool";

type Props = {
  asset: string;
  isMobile?: boolean;
};

const SingleLP: FC<Props> = ({ asset, isMobile = false }) => {
  const { pools } = useAstroswap();
  const { getProtocol, getIcon, getSymbol } = useTokenInfo();
  const pool = (pools || []).find((p) => p.lp_address == asset);
  const assets = getTokenDenoms(pool?.assets || []);
  const [token1, token2] = orderPoolTokens(
    { asset: assets[0] || "", symbol: getSymbol(assets[0] || "") },
    { asset: assets[1] || "", symbol: getSymbol(assets[1] || "") }
  );
  const protocol1 = getProtocol(token1 || "");
  const icon1 = getIcon(token1 || "");
  const symbol1 = getSymbol(token1 || "");
  const protocol2 = getProtocol(token2 || "");
  const icon2 = getIcon(token2 || "");
  const symbol2 = getSymbol(token2 || "");

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
        <HStack spacing="-2">
          <Image src={icon1} width="1.5rem" height="1.5rem" alt="Logo" />
          <Image src={icon2} width="1.5rem" height="1.5rem" alt="Logo" />
        </HStack>

        <Box ml="3" fontWeight="500" flex="1" overflow="hidden">
          <Text fontSize={["0.8rem", "0.8rem", "lg"]} color="white">
            {symbol1}-{symbol2}-LP
          </Text>
          <Text fontSize="xs" color="white.400" isTruncated>
            {protocol1} - {protocol2}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleLP;
