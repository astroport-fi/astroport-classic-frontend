import React, { FC } from "react";
import numeral from "numeral";
import { ONE_TOKEN } from "constants/constants";
import {
  useBalance,
  handleTinyAmount,
  handleBigPercentage,
  TxStep,
} from "modules/common";
import { useShareInUst, Pool, useShareOfPool } from "modules/pool";
import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import AprFooter from "components/pool/AprFooter";
import num from "libs/num";

type Props = {
  pool: Pool;
  amount: string;
  data: any;
  txFeeNotEnough?: boolean;
  onConfirmClick: () => void;
};

const WithdrawFormFooter: FC<Props> = ({
  pool,
  amount,
  data,
  txFeeNotEnough,
  onConfirmClick,
}) => {
  const balance = useBalance(pool.lpTokenContract);
  const safeAmount = amount || 0;
  const total = num(balance).minus(num(safeAmount).times(ONE_TOKEN)).toString();

  const myShareInUst = useShareInUst({
    pool: {
      ...pool,
      total_share: pool.total.share,
    },
    amount: total,
  });
  const formattedShareInUst = numeral(myShareInUst).format("0,0.00");
  const shareOfPool = useShareOfPool({
    pool: {
      ...pool,
      total_share: pool.total.share,
    },
    lpAmount: total,
  });
  const formattedApr = handleBigPercentage(pool.rewards.total * 100);

  const cells = [
    {
      title: "My Liquidity",
      value: `UST ${formattedShareInUst}`,
    },
    {
      title: "Share of Pool",
      value: `${handleTinyAmount(shareOfPool, "0.00") || 0}%`,
    },
    {
      title: "APR",
      value: `${handleTinyAmount(formattedApr, "0.00") || 0}%`,
      render: () => <AprFooter pool={pool} />,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Withdraw Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready || txFeeNotEnough,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter fee={data.fee} cells={cells} confirmButton={confirmButton} />
  );
};

export default WithdrawFormFooter;
