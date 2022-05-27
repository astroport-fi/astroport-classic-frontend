import React, { FC } from "react";
import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import { TxStep } from "modules/common";

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const UnlockFormFooter: FC<Props> = ({ data, onConfirmClick }) => {
  const confirmButton: ConfirmButton = {
    title: "Unlock LP Tokens",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter fee={data.fee} confirmButton={confirmButton} />;
};

export default UnlockFormFooter;
