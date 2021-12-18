import React, { FC, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { chakra, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, fromTerraAmount, num, toTerraAmount } from "@arthuryeti/terra";
import { Fee } from "@terra-money/terra.js";
import { useWallet } from "@terra-money/wallet-provider";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import {
  useSwap,
  usePriceImpact,
  useSwapRoute,
  useSwapSimulate,
} from "modules/swap";
import { useTokenInfo, useAstroswap, Route } from "modules/common";
import useDebounceValue from "hooks/useDebounceValue";
import useLocalStorage from "hooks/useLocalStorage";

import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";
import SwapFormInitial from "components/swap/SwapFormInitial";
import FormLoading from "components/common/FormLoading";
import TransactionNotification from "components/notifications/Transaction";

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
  minReceive: string;
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
  const { getSymbol } = useTokenInfo();
  const priceImpact = usePriceImpact({
    from: token1,
    to: token2,
    price,
  });

  return (
    <FormConfirm
      fee={fee}
      title="Confirm swap"
      actionLabel="Confirm swap"
      contentComponent={
        <FormSummary
          label1="You are swapping from:"
          label2="↓You are swapping to:"
          token1={{ asset: token1, amount: amount1 }}
          token2={{ asset: token2, amount: amount2 }}
        />
      }
      details={[
        { label: "Price Impact", value: `${priceImpact}%` },
        {
          label: "Liquidity Provider fee",
          value: `${fromTerraAmount(commission, "0,000")} UST`,
        },
        {
          label: "Slippage Tolerance",
          value: `${slippage}%`,
        },
        // {
        //   label: "Route",
        //   value: `${getSymbol(token1)}→${getSymbol(token2)}`,
        // },
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
