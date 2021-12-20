import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  pool: any;
  data: any;
  onConfirmClick: () => void;
};

const WithdrawFormFooter: FC<Props> = ({ pool, data, onConfirmClick }) => {
  const {
    mine: { shareInUst, shareOfPool },
  } = pool;

  const cells = [
    {
      title: "My Liquidity",
      value: `$ ${shareInUst}`,
    },
    { title: "Share of Pool", value: `${shareOfPool || "0"}%` },
  ];

  const confirmButton: ConfirmButton = {
    title: "Withdraw Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter fee={data.fee} cells={cells} confirmButton={confirmButton} />
  );
};

export default WithdrawFormFooter;
