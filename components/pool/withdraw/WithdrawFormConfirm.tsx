import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { handleTinyAmount, handleBigPercentage } from "modules/common";
import { Pool, useEstShareOfPool } from "modules/pool";
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
  const shareOfPool = useEstShareOfPool({ pool, amount1, amount2 });
  const formattedApr = handleBigPercentage(pool.rewards.total * 100);

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
          label: "APR",
          value: formattedApr,
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
