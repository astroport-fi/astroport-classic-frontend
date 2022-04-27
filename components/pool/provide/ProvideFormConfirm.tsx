import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";
import { Box, Text } from "@chakra-ui/react";
import numeral from "numeral";
import { APR_TOOLTIP } from "constants/constants";
import {
  useTokenInfo,
  handleTinyAmount,
  handleBigPercentage,
} from "modules/common";
import {
  Pool,
  useTokensToLp,
  useEstShareOfPool,
  useEstShareInUst,
} from "modules/pool";
import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";

type Props = {
  pool: Pool;
  fee: Fee;
  txFeeNotEnough?: boolean;
  token1: string;
  token2: string;
  amount1: string;
  amount2: string;
  autoStake: boolean;
  onCloseClick: () => void;
};

const ProvideForm: FC<Props> = ({
  pool,
  fee,
  txFeeNotEnough,
  token1,
  token2,
  amount1,
  amount2,
  autoStake,
  onCloseClick,
}) => {
  const { getSymbol } = useTokenInfo();
  const estLpBalance = useTokensToLp({ pool, amount1, amount2 });
  const shareInUst = useEstShareInUst({ pool, amount1, amount2 });
  const shareOfPool = useEstShareOfPool({ pool, amount1, amount2 });
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);
  const formattedShareInUst = numeral(shareInUst).format("0,0.00");
  const formattedApr = handleBigPercentage(
    pool.rewards.total * 100,
    "0,0a.00",
    ""
  );

  let details = [
    {
      label: "My Provided Liquidity",
      value: handleTinyAmount(formattedShareInUst, "0.00", false, "$"),
    },
    {
      label: "APR",
      value: `${handleTinyAmount(formattedApr, "0.00") || 0}%`,
      tooltip: APR_TOOLTIP,
    },
    {
      label: "Share of Pool",
      value: `${handleTinyAmount(shareOfPool, "0.00") || 0}%`,
    },
  ];

  // autoStake = canStake
  if (autoStake) {
    details.push({
      label: "Staked LP Tokens",
      value: `${handleTinyAmount(
        estLpBalance,
        "0.00",
        true
      )} ${symbol1}-${symbol2}-LP`,
    });
  }

  return (
    <FormConfirm
      fee={fee}
      txFeeNotEnough={txFeeNotEnough}
      title="Confirm Adding Liquidity"
      actionLabel="Confirm Add"
      contentComponent={
        <FormSummary
          label="You are providing"
          tokens={[
            { asset: token1, amount: amount1 },
            { asset: token2, amount: amount2 },
          ]}
        />
      }
      details={details}
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
