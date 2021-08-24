import React from "react";
import Link from "next/link";
import { Box, Text, Image, Button, HStack } from "@chakra-ui/react";

import Td from "components/Td";
import { useTokenInfo, getTokenDenoms } from "modules/terra";
import { lookupSymbol } from "libs/parse";

const PoolItem = ({ pool }) => {
  const {
    pool: { assets },
    contract,
  } = pool;
  const { getIcon, getSymbol } = useTokenInfo();
  const [token1, token2] = getTokenDenoms([assets[0], assets[1]]);

  return (
    <>
      <Td>
        <HStack>
          <HStack spacing="0.5">
            <Box>
              <Image src={getIcon(token1)} alt="Logo" boxSize="4" />
            </Box>
            <Box>
              <Image src={getIcon(token2)} alt="Logo" boxSize="4" />
            </Box>
          </HStack>
          <Box>
            <Text>
              {lookupSymbol(getSymbol(token1))}-
              {lookupSymbol(getSymbol(token2))}
            </Text>
          </Box>
        </HStack>
      </Td>
      <Td>-</Td>
      <Td>-</Td>
      <Td>-</Td>
      <Td>-</Td>
      <Td>
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary">
            Add Liquidity
          </Button>
        </Link>
      </Td>
    </>
  );
};

export default PoolItem;
