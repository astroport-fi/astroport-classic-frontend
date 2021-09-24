import React, { FC } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";

import useDebounceValue from "hooks/useDebounceValue";
import { PoolFormType, ProvideFormMode, Pair, FormStep } from "types/common";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/pool";

import FormError from "components/common/FormError";
import FormSummary from "components/common/FormSummary";
import FormConfirmOrSuccess from "components/common/FormConfirmOrSuccess";
import WithdrawFormInitial from "components/pool/withdraw/WithdrawFormInitial";

type FormValues = {
  token: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: Pair;
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
  const methods = useForm<FormValues>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: pair.lpToken,
      },
    },
  });

  const token = methods.watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const state = useWithdraw({
    contract: pair.contract,
    lpToken: pair.lpToken,
    amount: toAmount(debouncedAmount),
  });

  const {
    fee,
    step,
    resetForm,
    setStep,
    withdraw,
    token1,
    token1Amount,
    token2,
    token2Amount,
  } = state;

  const submit = async () => {
    withdraw();
  };

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {step === FormStep.Initial && (
          <WithdrawFormInitial
            pool={pool}
            mode={mode}
            type={type}
            onModeClick={onModeClick}
            onTypeClick={onTypeClick}
            token={token}
            state={state}
          />
        )}

        {step === FormStep.Confirm && (
          <FormConfirmOrSuccess
            isConfirm
            fee={fee}
            actionLabel="Confirm Withdraw"
            contentComponent={
              <FormSummary
                label1="You are receving"
                label2="and"
                // @ts-expect-error
                token1={{ asset: token1, amount: token1Amount }}
                // @ts-expect-error
                token2={{ asset: token2, amount: token2Amount }}
              />
            }
            details={[{ label: "Price Impact", value: "0.02%" }]}
            onCloseClick={resetForm}
          />
        )}
      </chakra.form>

      {step === FormStep.Success && (
        <FormConfirmOrSuccess
          contentComponent={
            <FormSummary
              label1="You are receving"
              label2="and"
              // @ts-expect-error
              token1={{ asset: token1, amount: token1Amount }}
              // @ts-expect-error
              token2={{ asset: token2, amount: token2Amount }}
            />
          }
          details={[{ label: "Price Impact", value: "0.02%" }]}
          onCloseClick={resetForm}
        />
      )}

      {step === FormStep.Error && (
        <FormError
          content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua."
          onCloseClick={() => setStep(FormStep.Initial)}
          onClick={() => setStep(FormStep.Initial)}
        />
      )}
    </FormProvider>
  );
};

export default WithdrawForm;
