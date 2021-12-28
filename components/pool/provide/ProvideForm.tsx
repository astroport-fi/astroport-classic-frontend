import React, { FC, useState, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { TxStep, toTerraAmount } from "@arthuryeti/terra";

import { PairResponse, useAstroswap } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import { useProvide, Pool } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";

import ProvideFormInitial from "components/pool/provide/ProvideFormInitial";
import ProvideFormConfirm from "components/pool/provide/ProvideFormConfirm";
import FormLoading from "components/common/FormLoading";

type FormValues = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  autoStake: boolean;
};

type Props = {
  pair: PairResponse;
  pool: Pool;
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
  const { addNotification } = useAstroswap();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: pool?.token1.asset,
      amount1: "",
      token2: pool?.token2.asset,
      amount2: "",
      autoStake: false,
    },
  });

  const { token1, amount1, token2, amount2, autoStake } = methods.watch();

  const debouncedAmount1 = useDebounceValue(amount1, 200);
  const debouncedAmount2 = useDebounceValue(amount2, 200);

  const state = useProvide({
    contract: pair.contract_addr,
    pool: pool,
    token1: token1,
    token2: token2,
    amount1: toTerraAmount(debouncedAmount1),
    amount2: toTerraAmount(debouncedAmount2),
    autoStake,
    onBroadcasting: (txHash) => {
      router.push("/pools");
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "provide",
        },
      });
    },
    onError: () => {
      resetForm();
    },
  });

  const submit = async () => {
    state.submit();
  };

  const resetForm = useCallback(() => {
    setShowConfirm(false);
    state.reset();
    methods.reset();
  }, [state, methods]);

  if (state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <ProvideFormInitial
            token1={token1}
            amount1={amount1}
            token2={token2}
            amount2={amount2}
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
          <ProvideFormConfirm
            pool={pool}
            fee={state.fee}
            token1={token1}
            amount1={amount1}
            token2={token2}
            amount2={amount2}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default ProvideForm;
