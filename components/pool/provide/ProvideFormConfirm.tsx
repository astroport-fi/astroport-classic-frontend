import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";
import { Box, Text } from "@chakra-ui/react";
import numeral from "numeral";
import { APY_NOTICE } from "constants/constants";
import { useTokenInfo, handleTinyAmount, handleBigApy } from "modules/common";
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
  const formattedApy = handleBigApy(pool.apy.total * 100);

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
        { label: "My provided Liquidity", value: `$ ${formattedShareInUst}` },
        {
          label: "Exchange Rate",
          value: `1 ${symbol1} = ${handleTinyAmount(
            pool.token1.price
          )} ${symbol2}`,
        },
        {
          label: "APY",
          value: formattedApy,
          tooltip: APY_NOTICE,
        },
        {
          label: "Share of Pool",
          value: `${handleTinyAmount(shareOfPool, "0.00") || 0}%`,
        },
        {
          label: "Staked LP Tokens",
          value: `${
            autoStake ? handleTinyAmount(estLpBalance, "0.00", true) : 0
          } ${symbol1}-${symbol2}-LP`,
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
