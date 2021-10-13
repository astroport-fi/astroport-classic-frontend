import React, { FC } from "react";
import { fromTerraAmount, toTerraAmount, TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";
import { useShareOfPool } from "modules/pool";

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
  const shareOfPool = useShareOfPool({ pool, amount1: toTerraAmount(amount) });
  const feeString = useFeeToString(data.fee);

  const cells = [
    {
      title: "Liquidity",
      value: fromTerraAmount(pool.total.shareInUst),
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
