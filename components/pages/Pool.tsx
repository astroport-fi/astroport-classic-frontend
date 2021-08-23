import React, { FC } from "react";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Card from "components/Card";
import ProvideLiquidityForm from "components/pool/provide/ProvideLiquidityForm";
import { usePool } from "modules/pool";
import { useTerra } from "contexts/TerraContext";
import { useTokenInfo } from "modules/terra";
import { lookupSymbol } from "libs/parse";

const Pool: FC = () => {
  const { query } = useRouter();
  const { getSymbol } = useTokenInfo();
  const { pairs } = useTerra();
  const pair = pairs?.find(({ pair }) => {
    return query?.pair === pair;
  });
  const pool = usePool(pair);

  return (
    <Box w="container.sm" m="0 auto" pt="12">
      <Box px="6" mb="4">
        <Heading variant="brand">Provide</Heading>
      </Box>
      <Card mb="2">
        <HStack>
          <Text variant="light">
            Selected Pool:{" "}
            <Text as="span" color="white" fontSize="md">
              {lookupSymbol(getSymbol(pool.token1))} /{" "}
              {lookupSymbol(getSymbol(pool.token2))}
            </Text>
          </Text>
        </HStack>
      </Card>
      {pair && (
        <ProvideLiquidityForm
          pair={pair}
          initialValues={{ token1: pool.token1, token2: pool.token2 }}
        />
      )}
    </Box>
  );
};

export default Pool;
