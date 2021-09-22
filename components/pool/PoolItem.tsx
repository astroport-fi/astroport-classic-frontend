import React, { FC } from "react";
import Link from "next/link";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terra";

import GraphIcon from "components/icons/GraphIcon";
import Td from "components/Td";
import { lookupSymbol, format } from "libs/parse";
import { Pair } from "types/common";
import { usePool } from "modules/pool";

type Props = {
  item: Pair;
};

const PoolItem: FC<Props> = ({ item }) => {
  const { contract, lpToken } = item;
  const { getIcon, getSymbol } = useTokenInfo();
  const { token1, token2, totalShareInUST, myShareInUST } = usePool({
    pairContract: contract,
    lpTokenContract: lpToken,
  });

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
      <Td>{`${format(myShareInUST, "uusd")} UST`}</Td>
      <Td>{`${format(totalShareInUST, "uusd")} UST`}</Td>
      <Td>
        <Flex justify="flex-end" align="center">
          <Link href={`/pools/${contract}`} passHref>
            <Button as="a" variant="primary" size="sm">
              Add Liquidity
            </Button>
          </Link>
          <IconButton aria-label="Graph" icon={<GraphIcon />} variant="icon" />
        </Flex>
      </Td>
    </>
  );
};

export default PoolItem;
