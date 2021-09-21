import React, { FC } from "react";
import { calculatePercentage, useFeeToString } from "@arthuryeti/terra";
import { format } from "libs/parse";
import { CommonFooter, ConfirmButton } from 'components/CommonFooter';

type Props = {
  pool: any;
  data: any;
};

const ProvideFormFooter: FC<Props> = ({ pool, data }) => {
  const percentage = calculatePercentage(
    pool.sharePrice[0],
    pool.sharePrice[1]
  );
  const feeString = useFeeToString(data.fee);

  const cells = [
    {
      title: "Liquidity",
      value: format(pool.sharePrice[1], "uusd")
    },
    {
      title: "Share of Pool",
      value: `${percentage || "0"}%`
    },
    {
      title: "TX Fee",
      value: feeString || "0.00",
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Add Liquidity Now",
    isDisabled: !data.isReady,
    type: "submit"
  }

  return (
    <CommonFooter
      cells={cells}
      confirmButton={confirmButton}
    />
  );
};

export default ProvideFormFooter;
