import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

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
    title: "Stake LP Tokens",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready || txFeeNotEnough,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter fee={data.fee} confirmButton={confirmButton} />;
};

export default StakeLpFormFooter;
