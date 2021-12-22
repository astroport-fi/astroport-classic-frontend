import React, { FC } from "react";
import { fromTerraAmount, toTerraAmount, TxStep } from "@arthuryeti/terra";
import { useShareOfPool } from "modules/pool";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  pool: any;
  data: any;
  amount: string;
  onConfirmClick: () => void;
};

const ProvideFormFooter: FC<Props> = ({
  pool,
  amount,
  data,
  onConfirmClick,
}) => {
  const shareOfPool = useShareOfPool({ pool, amount1: toTerraAmount(amount) });

  const cells = [
    {
      title: "Liquidity",
      value: pool.total.shareInUst,
    },
    {
      title: "Share of Pool",
      value: `${shareOfPool || "0"}%`,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Provide Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter fee={data.fee} cells={cells} confirmButton={confirmButton} />
  );
};

export default ProvideFormFooter;
