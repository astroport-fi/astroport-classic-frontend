import React, { FC, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";

import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  token: string;
  amount: string;
};

const Price: FC<Props> = ({ token, amount }) => {
  const price = useTokenPriceInUstWithSimulate(token);

  const totalInUst = useMemo(() => {
    if (amount == "" || num(amount).eq(0)) {
      return 0;
    }

    return num(amount).times(price).toFixed(2);
  }, [price, amount]);

  return (
    <Box position="absolute" bottom="2" right="4" color="white">
      <Text textStyle="small" variant="dimmed">
        ${totalInUst}
      </Text>
    </Box>
  );
};

export default Price;
