import React, { FC } from "react";
import { fromTerraAmount, toTerraAmount, TxStep } from "@arthuryeti/terra";
import { useEstShareOfPool } from "modules/pool";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import numeral from "numeral";

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
  const shareOfPool = useEstShareOfPool({
    pool,
    amount1: amount,
  });
  const shareInUst = numeral(pool.mine.shareInUst).format("0,0.00");

  const cells = [
    {
      title: "My Liquidity",
      value: `$ ${shareInUst || "0"}`,
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
