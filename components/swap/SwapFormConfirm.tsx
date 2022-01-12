import React, { FC } from "react";
import { fromTerraAmount, num } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";
import numeral from "numeral";

import {
  usePriceImpact,
  usePriceImpactColor,
  useSwapRoutePath,
} from "modules/swap";
import { useTokenInfo, Route } from "modules/common";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";

type Props = {
  swapRoute: Route[];
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: number;
  fee: Fee;
  price: string;
  formattedPrice: string;
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
  formattedPrice,
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
  const symbol1 = getSymbol(token1);
  const symbol2 = getSymbol(token2);
  const isLow = num(price).lt(0.01);
  const formattedPrice = numeral(price).format("0,0.00[000]").toString();
  const exchangeRate = isLow ? `< 0.01` : `= ${formattedPrice}`;

  const exchangeRateDetail = {
    label: "Exchange Rate",
    value: `1 ${getSymbol(token2)} = ${formattedPrice} ${getSymbol(token1)}`,
  };

  let details = [
    {
      label: "Price Impact",
      value: `${priceImpact}%`,
      color: priceImpactColor,
    },
    {
      label: "Liquidity Provider fee",
      value: `${fromTerraAmount(commission, "0,000")} UST`,
    },
    {
      label: "Slippage Tolerance",
      value: `${slippage}%`,
    },
    {
      label: "Route",
      value: swapRoutePath,
    },
    exchangeRateDetail,
    {
      label: "Exchange Rate",
      value: `1 ${symbol1} ${exchangeRate} ${symbol2}`,
    },
    {
      label: "Minimum received",
      value: `${fromTerraAmount(minReceive, "0.000[000]")} ${getSymbol(
        token2
      )}`,
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
        value: swapRoutePath,
      },
      exchangeRateDetail,
      {
        label: "Minimum received",
        value: `${fromTerraAmount(minReceive, "0.000[000]")} ${getSymbol(
          token2
        )}`,
      },
    ];
  }

  return (
    <FormConfirm
      fee={fee}
      title="Confirm swap"
      actionLabel="Confirm swap"
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
