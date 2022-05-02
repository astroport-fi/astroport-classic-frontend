import React, { FC } from "react";
import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import { TxStep } from "modules/common";

type Props = {
  data: any;
  txFeeNotEnough?: boolean;
  onConfirmClick: () => void;
};

const StakeLpFormFooter: FC<Props> = ({
  data,
  txFeeNotEnough,
  onConfirmClick,
}) => {
  const confirmButton: ConfirmButton = {
    title: "Stake LP Tokens",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready || !!txFeeNotEnough,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter fee={data.fee} confirmButton={confirmButton} />;
};

export default StakeLpFormFooter;
