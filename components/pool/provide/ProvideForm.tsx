import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";

import { toAmount } from "libs/parse";
import { PoolFormType, ProvideFormMode, Pair, FormStep } from "types/common";
import { useProvide } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";

import ProvideFormInitial from "components/pool/provide/ProvideFormInitial";
import FormConfirmOrSuccess from "components/common/FormConfirmOrSuccess";
import FormSummary from "components/common/FormSummary";
import FormError from "components/common/FormError";

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
  pair: Pair;
  pool: any;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: any;
  onTypeClick: any;
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
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: pool?.token1,
      },
      token2: {
        amount: undefined,
        asset: pool?.token2,
      },
    },
  });

  const token1 = methods.watch("token1");
  const token2 = methods.watch("token2");

  const debouncedAmount1 = useDebounceValue(token1.amount, 500);
  const debouncedAmount2 = useDebounceValue(token2.amount, 500);

  const provideState = useProvide({
    contract: pair.contract,
    pool: pool,
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
  });

  const submit = async () => {
    provideState.provideLiquidity();
  };

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {provideState.step === FormStep.Initial && (
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
            state={provideState}
          />
        )}

        {provideState.step === FormStep.Confirm && (
          <FormConfirmOrSuccess
            fee={provideState.fee}
            actionLabel="Confirm Provide"
            isConfirm
            contentComponent={
              <FormSummary
                label1="You are providing"
                label2="and"
                token1={token1}
                token2={token2}
              />
            }
            details={[{ label: "APY", value: "12%" }]}
            onCloseClick={() => provideState.resetForm()}
          />
        )}
      </chakra.form>

      {provideState.step === FormStep.Success && (
        <FormConfirmOrSuccess
          contentComponent={
            <FormSummary
              label1="You are providing"
              label2="and"
              token1={token1}
              token2={token2}
            />
          }
          details={[{ label: "APY", value: "12%" }]}
          onCloseClick={() => provideState.resetForm()}
        />
      )}

      {provideState.step === FormStep.Error && (
        <FormError
          content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua."
          onCloseClick={() => provideState.setStep(FormStep.Initial)}
          onClick={() => provideState.setStep(FormStep.Initial)}
        />
      )}
    </FormProvider>
  );
};

export default ProvideForm;
