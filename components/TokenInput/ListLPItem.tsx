import React, { FC } from "react";
import { Box, Text, Image, Flex, HStack } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import {
  useBalance,
  useTokenInfo,
  getTokenDenoms,
  PairResponse,
} from "modules/common";
import { orderPoolTokens } from "modules/pool";

type Props = {
  pair: PairResponse;
  onClick: (v: string) => void;
};

const ListLPItem: FC<Props> = ({ pair, onClick }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const balance = useBalance(pair.liquidity_token);
  const assets = getTokenDenoms(pair.asset_infos);
  const [token1, token2] = orderPoolTokens(
    { asset: assets[0], symbol: getSymbol(assets[0]) },
    { asset: assets[1], symbol: getSymbol(assets[1]) }
  );

  const icon1 = getIcon(token1);
  const symbol1 = getSymbol(token1);
  const icon2 = getIcon(token2);
  const symbol2 = getSymbol(token2);

  return (
    <Box
      transition="0.2s all"
      type="button"
      outline="none"
      textAlign="left"
      p="0"
      _hover={{
        bg: "white.500",
      }}
      onClick={() => onClick(pair.liquidity_token)}
    >
      <Flex align="center" justify="space-between" py="2.5" w="full">
        <Box mr="2">
          <HStack spacing="-4">
            <Image src={icon1} boxSize="10" alt="Logo" />
            <Image src={icon2} boxSize="10" alt="Logo" />
          </HStack>
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {symbol1} - {symbol2}
          </Text>
          <Text fontSize="sm" color="brand.dark" opacity="0.4">
            LP Token
          </Text>
        </Box>
        <Box>
          <HStack>
            <Box>
              <Text fontSize="sm" color="brand.dark" opacity="0.4">
                Balance:
              </Text>
              <Text fontSize="sm" color="brand.dark" opacity="0.4">
                Price:
              </Text>
            </Box>
            <Box minW="24">
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                {fromTerraAmount(balance, "0,0.000")}
              </Text>
              <Text fontSize="sm" color="brand.dark" textAlign="right">
                UST {fromTerraAmount("0", "0,0.000")}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListLPItem;
