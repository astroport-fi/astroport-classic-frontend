import React, { FC, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import num from "libs/num";
import numeral from "numeral";

import { useAstroswap, getTokenDenoms } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { useGetPool, useLpToTokens } from "modules/pool";

type Props = {
  token: string;
  amount: string;
};

const PriceLP: FC<Props> = ({ token, amount }) => {
  const { pairs } = useAstroswap();
  const pair = (pairs || []).find((v) => v.liquidity_token == token);
  const [token1, token2] = getTokenDenoms(pair?.asset_infos || []);
  const { data: pool } = useGetPool(pair?.contract_addr || "");
  const price1 = useTokenPriceInUstWithSimulate(token1 || "");
  const price2 = useTokenPriceInUstWithSimulate(token2 || "");
  const tokenAmounts = useLpToTokens({ pool, amount });

  const totalInUst = useMemo(() => {
    if (pool == null || tokenAmounts == null) {
      return 0;
    }

    const totalPrice1 = num(tokenAmounts[token1 || ""]).times(price1);
    const totalPrice2 = num(tokenAmounts[token2 || ""]).times(price2);

    return totalPrice1.plus(totalPrice2).toString();
  }, [pool, tokenAmounts]);

  const totalAmount = numeral(totalInUst).format("0,0.[00]");

  return (
    <Box position="absolute" bottom="2" right="4" color="white">
      <Text textStyle="small" variant="dimmed">
        {totalAmount} UST
      </Text>
    </Box>
  );
};

export default PriceLP;
