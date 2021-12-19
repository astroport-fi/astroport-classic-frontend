import React, { FC, useCallback, useState, useEffect } from "react";
import { chakra, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import {
  TxStep,
  num,
  fromTerraAmount,
  useBalance,
  toTerraAmount,
} from "@arthuryeti/terra";

import useDebounceValue from "hooks/useDebounceValue";
import { PairResponse, useAstroswap, useTokenInfo } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import { useWithdraw } from "modules/pool";

import FormSummary from "components/common/FormSummary";
import FormLoading from "components/common/FormLoading";
import FormConfirm from "components/common/FormConfirm";
import WithdrawFormInitial from "components/pool/withdraw/WithdrawFormInitial";
import TransactionNotification from "components/notifications/Transaction";

type FormValues = {
  token: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: PairResponse;
  pool: any;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: (v: ProvideFormMode) => void;
  onTypeClick: (v: PoolFormType) => void;
};

const WithdrawForm: FC<Props> = ({
  pair,
  pool,
  mode,
  type,
  onModeClick,
  onTypeClick,
}) => {
  const { addNotification } = useAstroswap();
  const { getSymbol } = useTokenInfo();
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      token: {
        amount: "0",
        asset: pair.liquidity_token,
      },
    },
  });

  const token = methods.watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const state = useWithdraw({
    contract: pair.contract_addr,
    lpToken: pair.liquidity_token,
    amount: toTerraAmount(debouncedAmount),
    onBroadcasting: (txHash) => {
      resetForm();
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "withdraw",
        },
      });
    },
    onError: () => {
      resetForm();
    },
  });

  const {
    fee,
    txStep,
    withdraw,
    token1,
    token1Amount,
    token2,
    token2Amount,
    reset,
  } = state;

  const resetForm = useCallback(() => {
    setShowConfirm(false);
    methods.reset();
    reset();
  }, [reset, methods]);

  const submit = async () => {
    withdraw();
  };

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  // TODO: Create a component and remove it from here
  const estimateExchangeRate = () => {
    return `1 ${getSymbol(token1)} = ${num(token2Amount)
      .div(token1Amount)
      .toPrecision(2)} ${getSymbol(token2)}`;
  };

  const balance = useBalance(token.asset);
  const amount = fromTerraAmount(balance, "0.000000");
  // TODO: Create a hook for this calc
  const shareOfPool = num(amount)
    .minus(token.amount || "0")
    .div(num(fromTerraAmount(pool.assets[0].amount, "0.000000")))
    .times("100")
    .toFixed(2)
    .toString();

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <WithdrawFormInitial
            pool={pool}
            mode={mode}
            type={type}
            onModeClick={onModeClick}
            onTypeClick={onTypeClick}
            token={token}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={fee}
            title="Confirm withdraw liquidity"
            actionLabel="Confirm withdraw"
            contentComponent={
              <FormSummary
                label1="You are receving:"
                token1={{ asset: token1, amount: token1Amount }}
                token2={{ asset: token2, amount: token2Amount }}
              />
            }
            details={[
              { label: "Rates", value: estimateExchangeRate() },
              { label: "Share of Pool", value: `${shareOfPool || "0"}%` },
            ]}
            onCloseClick={() => setShowConfirm(false)}
          >
            <Text mt={6} textStyle="small" variant="secondary">
              The numbers above are estimates based on the current composition
              of the pool. These numbers could change between now and the time
              your transaction completes.
            </Text>
          </FormConfirm>
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default WithdrawForm;
