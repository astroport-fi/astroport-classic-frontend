import React, { FC } from "react";
import { fromTerraAmount, num } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";

import {
  usePriceImpact,
  usePriceImpactColor,
  useSwapRoutePath,
} from "modules/swap";
import { useTokenInfo, Route, handleTinyAmount } from "modules/common";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  swapRoute: Route[];
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: number;
  fee: Fee;
  price: string;
  exchangeRate: string;
  commission: string;
  minReceive: string | number;
  onCloseClick: () => void;
};

const SwapFormConfirm: FC<Props> = ({
  swapRoute,
  token1,
  token2,
  amount1,
  amount2,
  slippage,
  fee,
  price,
  exchangeRate,
  commission,
  minReceive,
  onCloseClick,
}) => {
  const swapRoutePath = useSwapRoutePath(swapRoute);
  const { getSymbol } = useTokenInfo();
  const priceImpact = usePriceImpact({
    from: token1,
    to: token2,
    amount1,
    amount2,
    price,
  });
  const priceImpactColor = usePriceImpactColor(priceImpact);
  const liquidityProviderFee = num(commission).div(ONE_TOKEN).dp(6).toNumber();

  let details = [
    {
      label: "Price Impact",
      value: `${handleTinyAmount(priceImpact, "0.00")}%`,
      color: priceImpactColor,
    },
    {
      label: "Liquidity Provider Fee",
      value: `${handleTinyAmount(
        liquidityProviderFee,
        "0,000.000[000]",
        true
      )} UST`,
    },
    {
      label: "Slippage Tolerance",
      value: `${slippage}%`,
    },
    {
      label: "Route",
      value: swapRoutePath.text,
    },
    {
      label: "Exchange Rate",
      value: exchangeRate,
    },
    {
      label: "Minimum Received",
      value: `${fromTerraAmount(minReceive, "0.000[000]")} ${getSymbol(
        token2
      )}`,
      tooltip:
        "The amount includes the maximum slippage tolerance you selected",
    },
  ];

  if (swapRoute.length > 1) {
    details = [
      {
        label: "Slippage Tolerance",
        value: `${slippage}%`,
      },
      {
        label: "Route",
        value: swapRoutePath.text,
        tooltip: swapRoutePath.tooltip,
      },
      {
        label: "Exchange Rate",
        value: exchangeRate,
      },
      {
        label: "Minimum Received",
        value: `${fromTerraAmount(minReceive, "0.000[000]")} ${getSymbol(
          token2
        )}`,
        tooltip:
          "The amount includes the maximum slippage tolerance you selected",
      },
    ];
  }

  return (
    <FormConfirm
      fee={fee}
      title="Confirm Swap"
      actionLabel="Confirm Swap"
      contentComponent={
        <FormSummary
          label="You are swapping from:"
          tokens={[
            { asset: token1, amount: amount1 },
            { label: "↓You are swapping to:", asset: token2, amount: amount2 },
          ]}
        />
      }
      details={details}
      onCloseClick={onCloseClick}
    />
  );
};

export default SwapFormConfirm;
