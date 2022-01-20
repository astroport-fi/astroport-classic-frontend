import React, { FC } from "react";
import { TxStep, useBalance, num } from "@arthuryeti/terra";
import numeral from "numeral";
import { ONE_TOKEN } from "constants/constants";
import { handleTinyAmount, handleBigApy } from "modules/common";
import { useShareInUst, Pool, useShareOfPool } from "modules/pool";
import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import ApyFooter from "components/pool/ApyFooter";

type Props = {
  pool: Pool;
  data: any;
  amount: string;
  onConfirmClick: () => void;
};

const WithdrawFormFooter: FC<Props> = ({
  pool,
  amount,
  data,
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
  const formattedApy = handleBigApy(pool.apy.total * 100);

  const cells = [
    {
      title: "My Liquidity",
      value: `$ ${formattedShareInUst}`,
    },
    {
      title: "Share of Pool",
      value: `${handleTinyAmount(shareOfPool, "0.00") || 0}%`,
    },
    {
      title: "APY",
      value: formattedApy,
      render: () => <ApyFooter pool={pool} />,
    },
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
