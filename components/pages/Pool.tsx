import React, { FC, useEffect, useState } from "react";
import { Box, Heading, HStack, Text, Button, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Card from "components/Card";
import ProvideSingleForm from "components/pool/provide/ProvideSingleForm";
import ProvideForm from "components/pool/provide/ProvideForm";
import { usePool } from "modules/pool";
import { useTokenInfo, useTerra } from "@arthuryeti/terra";
import { lookupSymbol } from "libs/parse";
import { Pair } from "types/common";
import GraphIcon from "components/icons/GraphIcon";
import PoolGraph from "components/pool/PoolGraph";

const Pool: FC = () => {
  const [mode, setMode] = useState(0);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const { query } = useRouter();
  const { getSymbol } = useTokenInfo();
  const { pairs } = useTerra();

  const pair: Pair = pairs?.find(({ contract }) => {
    return query?.pair === contract;
  });
  const pool = usePool(pair);
  const tokens = [pool?.token1, pool?.token2];

  return (
    <Box
      m="0 auto"
      pt="12"
    >
      <Flex
        justify="space-between"
        alignItems="center"
        px="6"
        mb="4"
      >
        <Box>
          <Heading variant="brand">Provide</Heading>
        </Box>
        <IconButton
          aria-label="Graph"
          icon={<GraphIcon />}
          color="white"
          variant="icon"
          isActive={isChartOpen}
          onClick={() => setIsChartOpen(!isChartOpen)}
        />
      </Flex>
      <Flex gridGap="30px">
        <Box w="container.sm">
          <Card mb="2">
            <Flex justify="space-between">
              <Box>
                <Text variant="light">
                  Selected Pool:{' '}
                  <Text as="span" color="white" fontSize="md">
                    {lookupSymbol(getSymbol(pool.token1))} /{' '}
                    {lookupSymbol(getSymbol(pool.token2))}
                  </Text>
                </Text>
              </Box>
              <HStack>
                <Button
                  variant="mini"
                  isActive={mode === 0}
                  onClick={() => setMode(0)}
                >
                  Doublesided
                </Button>
                <Button
                  variant="mini"
                  isActive={mode === 1}
                  onClick={() => setMode(1)}
                >
                  Onesided
                </Button>
              </HStack>
            </Flex>
          </Card>
          {pair && mode === 0 && (
            <ProvideForm
              pair={pair}
              pool={pool}
              initialValues={{ token1: pool.token1, token2: pool.token2 }}
            />
          )}
          {pair && mode === 1 && (
            <ProvideSingleForm
              pair={pair}
              pool={pool}
              initialValues={{ token: pool.token1 }}
              tokens={tokens}
            />
          )}
        </Box>
        {isChartOpen && <PoolGraph tokens={tokens}/>}
      </Flex>
    </Box>
  );
};

export default Pool;
