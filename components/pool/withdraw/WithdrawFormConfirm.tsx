import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import numeral from "numeral";

import { useTokenInfo, handleTinyAmount } from "modules/common";

import {
  Pool,
  useTokensToLp,
  useEstShareOfPool,
  useEstShareInUst,
} from "modules/pool";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";

type Props = {
  pool: Pool;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  fee: Fee;
  onCloseClick: () => void;
};

const WithdrawFormConfirm: FC<Props> = ({
  pool,
  token1,
  amount1,
  token2,
  amount2,
  fee,
  onCloseClick,
}) => {
  const { getSymbol } = useTokenInfo();
  const estLpBalance = useTokensToLp({ pool, amount1, amount2 });
  const shareInUst = useEstShareInUst({ pool, amount1, amount2 });
  const shareOfPool = useEstShareOfPool({ pool, amount1, amount2 });
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);
  const formattedApy = numeral(pool.apy.total * 100).format("0.00");

  return (
    <FormConfirm
      fee={fee}
      title="Confirm withdraw liquidity"
      actionLabel="Confirm withdraw"
      contentComponent={
        <FormSummary
          label="You are receiving:"
          tokens={[
            { asset: token1, amount: amount1 },
            { asset: token2, amount: amount2 },
          ]}
        />
      }
      details={[
        {
          label: "Rates",
          value: `1 ${symbol1} = ${handleTinyAmount(
            pool.token1.price
          )} ${symbol2}`,
        },
        {
          label: "APY",
          value: `${formattedApy || 0}%`,
        },
        {
          label: "Share of Pool",
          value: `${handleTinyAmount(shareOfPool, "0.00") || 0}%`,
        },
      ]}
      onCloseClick={onCloseClick}
    >
      <Text mt={6} textStyle="small" variant="secondary">
        The numbers above are estimates based on the current composition of the
        pool. These numbers could change between now and the time your
        transaction completes.
      </Text>
    </FormConfirm>
  );
};

export default WithdrawFormConfirm;
