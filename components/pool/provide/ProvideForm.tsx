import React, { FC, useEffect, useState, useCallback } from "react";
import { chakra, useToast, Text } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, toTerraAmount } from "@arthuryeti/terra";

import { PairResponse, useTokenInfo } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import { useProvide } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";

import ProvideFormInitial from "components/pool/provide/ProvideFormInitial";
import FormConfirm from "components/common/FormConfirm";
import FormLoading from "components/common/FormLoading";
import FormSuccess from "components/common/FormSuccess";
import FormSummary from "components/common/FormSummary";
import FormError from "components/common/FormError";
import TransactionNotification from "components/notifications/Transaction";

type FormValues = {
  token1: {
    amount: string;
    asset: string;
  };
  token2: {
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
  isChartOpen: boolean;
  onChartClick: () => void;
};

const ProvideForm: FC<Props> = ({
  pair,
  pool,
  mode,
  onModeClick,
  type,
  onTypeClick,
  isChartOpen,
  onChartClick,
}) => {
  const toast = useToast();
  const { getSymbol } = useTokenInfo();
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: pool?.token1.asset,
      },
      token2: {
        amount: undefined,
        asset: pool?.token2.asset,
      },
    },
  });

  const token1 = methods.watch("token1");
  const token2 = methods.watch("token2");

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);
  const debouncedAmount2 = useDebounceValue(token2.amount, 200);

  const showNotification = useCallback(
    (type: "success" | "error", txHash?: string) => {
      const { token1, token2 } = methods.getValues();
      if (!txHash || !toast.isActive(txHash)) {
        toast({
          id: txHash,
          position: "top-right",
          duration: 9000,
          render: ({ onClose }) => (
            <TransactionNotification
              onClose={onClose}
              txHash={txHash}
              type={type}
            >
              <Text textStyle="medium">
                Provide {token1.amount} {getSymbol(token1.asset)} and{" "}
                {token2.amount} {getSymbol(token2.asset)}
              </Text>
            </TransactionNotification>
          ),
        });
      }
    },
    []
  );

  const state = useProvide({
    contract: pair.contract_addr,
    pool: pool,
    token1: token1.asset,
    token2: token2.asset,
    amount1: toTerraAmount(debouncedAmount1),
    amount2: toTerraAmount(debouncedAmount2),
    onSuccess: (txHash) => showNotification("success", txHash),
    onError: (txHash) => showNotification("error", txHash),
  });

  const submit = async () => {
    state.provideLiquidity();
  };

  useEffect(() => {
    if (state.txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [state.txStep]);

  const resetForm = useCallback(() => {
    methods.reset();
    state.reset();
  }, [state, methods]);

  if (state.txStep == TxStep.Broadcasting || state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (state.txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary
            label1="You are providing"
            label2="and"
            token1={token1}
            token2={token2}
          />
        }
        details={[{ label: "APY", value: "12%" }]}
        onCloseClick={resetForm}
      />
    );
  }

  if (state.txStep == TxStep.Failed) {
    return (
      <FormError
        content={state.error}
        onCloseClick={state.reset}
        onClick={state.reset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <ProvideFormInitial
            token1={token1}
            token2={token2}
            pool={pool}
            mode={mode}
            onModeClick={onModeClick}
            type={type}
            onTypeClick={onTypeClick}
            isChartOpen={isChartOpen}
            onChartClick={onChartClick}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            actionLabel="Confirm Provide"
            contentComponent={
              <FormSummary
                label1="You are providing"
                label2="and"
                token1={token1}
                token2={token2}
              />
            }
            details={[{ label: "APY", value: "12%" }]}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default ProvideForm;
