import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  data: any;
  txFeeNotEnough?: boolean;
  amount: string;
  lpToken: string;
  duration: number;
  onConfirmClick: () => void;
};

const UnlockFormFooter: FC<Props> = ({
  data,
  txFeeNotEnough,
  onConfirmClick,
}) => {
  const confirmButton: ConfirmButton = {
    title: "Unlock LP token",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready || txFeeNotEnough,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter fee={data.fee} confirmButton={confirmButton} />;
};

export default UnlockFormFooter;
