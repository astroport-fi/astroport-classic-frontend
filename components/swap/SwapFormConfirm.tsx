import React, { FC } from "react";
import { fromTerraAmount } from "libs/terra";
import { Fee } from "@terra-money/terra.js";
import tokenRules from "constants/tokenRules";
import num from "libs/num";
import {
  usePriceImpact,
  usePriceImpactColor,
  usePriceImpactMultiSwap,
  useSwapRoutePath,
} from "modules/swap";
import { useTokenInfo, Route, handleTinyAmount } from "modules/common";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import { ONE_TOKEN } from "constants/constants";
import { useTerraWebapp } from "context/TerraWebappContext";

type Props = {
  swapRoute: Route[];
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: number;
  fee?: Fee | undefined;
  taxEnabled: boolean;
  price: string | null;
  exchangeRate: string | null;
  commission: string | null;
  minReceive: string | number | null;
  onCloseClick: () => void;
  taxRate: number;
};

const SwapFormConfirm: FC<Props> = ({
  swapRoute,
  token1,
  token2,
  amount1,
  amount2,
  slippage,
  fee,
  taxEnabled,
  price,
  exchangeRate,
  commission,
  minReceive,
  onCloseClick,
  taxRate,
}) => {
  const {
    network: { chainID },
  } = useTerraWebapp();
  const swapRoutePath = useSwapRoutePath(swapRoute);
  const { getSymbol } = useTokenInfo();

  const priceImpact = usePriceImpact({ from: token1, to: token2, price });
  const priceImpactMultiSwap = usePriceImpactMultiSwap({
    from: token1,
    to: token2,
    amountInitial: amount1,
  });
  const priceImpactValue =
    swapRoute.length > 1 ? Number(priceImpactMultiSwap) : Number(priceImpact);
  const priceImpactColor = usePriceImpactColor(priceImpactValue);

  const liquidityProviderFee = num(commission || "")
    .div(ONE_TOKEN)
    .dp(6)
    .toNumber();
  // @ts-ignore
  const rulesForToken = tokenRules[chainID];

  let details = [
    {
      label: "Price Impact",
      value: `${handleTinyAmount(priceImpactValue, "0.00")}%`,
      color: priceImpactColor,
    },
    {
      label: "Liquidity Provider Fee",
      value: `${handleTinyAmount(
        liquidityProviderFee,
        "0,000.000[000]",
        true
      )} USTC`,
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
      value: `${fromTerraAmount(minReceive || "", "0.000[000]")} ${getSymbol(
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
        value: `${fromTerraAmount(minReceive || "", "0.000[000]")} ${getSymbol(
          token2
        )}`,
        tooltip:
          "The amount includes the maximum slippage tolerance you selected",
      },
    ];
  }

  if (rulesForToken[token1] || rulesForToken[token2]) {
    details.push({
      label: "Token Behaviour",
      value: "",
      tooltip: rulesForToken[token1]
        ? rulesForToken[token1]
        : rulesForToken[token2],
    });
  }

  return (
    <FormConfirm
      fee={fee}
      taxEnabled={taxEnabled}
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
      taxRate={taxRate}
    />
  );
};

export default SwapFormConfirm;
