import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";
import { Box, Text } from "@chakra-ui/react";
import numeral from "numeral";
import { num } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";
import { Pool, useEstShareOfPool, useEstShareInUst } from "modules/pool";

import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";

type Props = {
  pool: Pool;
  fee: Fee;
  token1: string;
  token2: string;
  amount1: string;
  amount2: string;
  onCloseClick: () => void;
};

const ProvideForm: FC<Props> = ({
  pool,
  fee,
  token1,
  token2,
  amount1,
  amount2,
  onCloseClick,
}) => {
  const { getSymbol } = useTokenInfo();
  const shareInUst = useEstShareInUst({ pool, amount1, amount2 });
  const shareOfPool = useEstShareOfPool({ pool, amount1, amount2 });
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);
  const formattedShareInUst = numeral(shareInUst).format("0,0.00");
  const isLow = num(pool.token1.price).lt(0.01);
  const exchangeRate = isLow ? `< 0.01` : `= ${pool.token1.price}`;

  return (
    <FormConfirm
      fee={fee}
      title="Confirm adding liquidity"
      actionLabel="Confirm adding liquidity"
      contentComponent={
        <FormSummary
          label="You are providing"
          tokens={[
            { asset: token1, amount: amount1 },
            { asset: token2, amount: amount2 },
          ]}
        />
      }
      details={[
        { label: "My provided Liquidiy", value: `$ ${formattedShareInUst}` },
        {
          label: "Exchange Rate",
          value: `1 ${symbol1} ${exchangeRate} ${symbol2}`,
        },
        {
          label: "Share of Pool",
          value: `${shareOfPool || "0"}%`,
        },
      ]}
      onCloseClick={onCloseClick}
    >
      <Box mt="6">
        <Text textStyle="small" variant="dimmed">
          The numbers above are estimates based on the current composition of
          the pool. These numbers could change between now and the time your
          transaction completes.
        </Text>
      </Box>
    </FormConfirm>
  );
};

export default ProvideForm;
