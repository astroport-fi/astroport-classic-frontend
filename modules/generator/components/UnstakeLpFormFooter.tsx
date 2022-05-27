import React, { FC } from "react";
import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import { TxStep } from "modules/common";

type Props = {
  data: any;
  txFeeNotEnough?: boolean;
  onConfirmClick: () => void;
};

const UnstakeLpFormFooter: FC<Props> = ({
  data,
  txFeeNotEnough,
  onConfirmClick,
}) => {
  // const cells = [
  //   {
  //     title: "Astro Generator APY",
  //     value: "0",
  //   },
  //   {
  //     title: "[Asset] Reward APY",
  //     value: "0",
  //   },
  //   {
  //     title: "Pool APY",
  //     value: "0",
  //   },
  //   {
  //     title: "Total APY",
  //     value: "0",
  //   },
  // ];

  const confirmButton: ConfirmButton = {
    title: "Unstake LP Tokens",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready || txFeeNotEnough,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter fee={data.fee} confirmButton={confirmButton} />;
};

export default UnstakeLpFormFooter;
