import React, { FC } from "react";
import { format } from "libs/parse";
import { fromTerraAmount, num, TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  pool: any;
  data: any;
  amount: string;
  onConfirmClick: () => void;
};

const WithdrawFormFooter: FC<Props> = ({
  pool,
  data,
  amount,
  onConfirmClick,
}) => {
  const { token1Amount, token2Amount, token1Price, token2Price } = data;
  const myLiquidity = format(
    String(
      Number(token1Amount) * Number(token1Price) +
        Number(token2Amount) * Number(token2Price)
    ),
    "uusd"
  );

  const shareOfPool = num(amount)
    .div(num(fromTerraAmount(pool.assets[0].amount, "0.[00]")))
    .times("100")
    .toFixed(2)
    .toString();
  const feeString = useFeeToString(data.fee);

  const cells = [
    {
      title: "My Liquidity",
      value: `$ ${myLiquidity}`,
    },
    { title: "Share of Pool", value: `${shareOfPool || "0"}%` },
    {
      title: "TX Fee",
      value: feeString || "0.00",
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Withdraw Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter cells={cells} confirmButton={confirmButton} />;
};

export default WithdrawFormFooter;
