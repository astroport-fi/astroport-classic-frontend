import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const UnstakeFormFooter: FC<Props> = ({ data, onConfirmClick }) => {
  const cells = [
    {
      title: "Astro Generator APY",
      value: "0",
    },
    {
      title: "[Asset] Reward APY",
      value: "0",
    },
    {
      title: "Pool APY",
      value: "0",
    },
    {
      title: "Total APY",
      value: "0",
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Unstake LP Tokens",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter fee={data.fee} cells={cells} confirmButton={confirmButton} />
  );
};

export default UnstakeFormFooter;
