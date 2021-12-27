import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";

type Props = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  fee: Fee;
  onCloseClick: () => void;
};

const WithdrawFormConfirm: FC<Props> = ({
  token1,
  amount1,
  token2,
  amount2,
  fee,
  onCloseClick,
}) => {
  // TODO: Create a component and remove it from here
  // const estimateExchangeRate = () => {
  //   return `1 ${getSymbol(token1)} = ${num(token2Amount)
  //     .div(token1Amount)
  //     .toPrecision(2)} ${getSymbol(token2)}`;
  // };

  // const balance = useBalance(token);
  // const amount = fromTerraAmount(balance, "0.000000");
  // // TODO: Create a hook for this calc
  // const shareOfPool = num(amount)
  //   .minus(amount || "0")
  //   .div(num(fromTerraAmount(pool.assets[0].amount, "0.000000")))
  //   .times("100")
  //   .toFixed(2)
  //   .toString();

  return (
    <FormConfirm
      fee={fee}
      title="Confirm withdraw liquidity"
      actionLabel="Confirm withdraw"
      contentComponent={
        <FormSummary
          label1="You are receiving:"
          token1={{ asset: token1, amount: amount1 }}
          token2={{ asset: token2, amount: amount2 }}
        />
      }
      // details={[
      //   { label: "Rates", value: estimateExchangeRate() },
      //   { label: "Share of Pool", value: `${shareOfPool || "0"}%` },
      // ]}
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
