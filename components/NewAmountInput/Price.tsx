import React, { FC, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";

import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { handleTinyAmount } from "modules/common";

type Props = {
  token: string;
  amount: string;
  priceToken?: number;
};

const Price: FC<Props> = ({ token, amount, priceToken }) => {
  let price = useTokenPriceInUstWithSimulate(token);

  if (priceToken) {
    price = priceToken;
  }

  const totalInUst = useMemo(() => {
    if (amount == "" || num(amount).eq(0)) {
      return (0).toFixed(2) + " UST";
    }

    return handleTinyAmount(
      num(amount).times(price).toNumber(),
      "0,0.00",
      false,
      " UST"
    );
  }, [price, amount]);

  return (
    <Box position="absolute" bottom="2" right="4" color="white">
      <Text textStyle="small" variant="dimmed">
        {totalInUst}
      </Text>
    </Box>
  );
};

export default Price;
