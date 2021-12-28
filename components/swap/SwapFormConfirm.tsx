import React, { FC } from "react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";

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
      details={[
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
        // {
        //   label: "Exchange Rate",
        //   value: estimateExchangeRate(simulated),
        // },
        {
          label: "Minimum received",
          value: `${fromTerraAmount(minReceive, "0.000")} ${getSymbol(token2)}`,
        },
      ]}
      onCloseClick={onCloseClick}
    />
  );
};

export default SwapFormConfirm;
