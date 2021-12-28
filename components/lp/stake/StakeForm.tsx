import React, { FC, useState, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";

import { useStakeLpToken } from "modules/lp";
import { PairResponse, useAstroswap } from "modules/common";
import { PoolFormType } from "types/common";

import FormLoading from "components/common/FormLoading";
import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";
import StakeFormInitial from "components/lp/stake/StakeFormInitial";

type FormValues = {
  token: string;
  amount: string;
};

type Props = {
  pair: PairResponse;
  pool: any;
  type: PoolFormType;
  onTypeClick: (v: PoolFormType) => void;
  isChartOpen: boolean;
  onChartClick: () => void;
};

const StakeForm: FC<Props> = ({
  pair,
  type,
  onTypeClick,
  isChartOpen,
  onChartClick,
}) => {
  const { addNotification } = useAstroswap();
  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      token: pair.liquidity_token,
      amount: "",
    },
  });

  const { watch, handleSubmit } = methods;
  const token = watch("token");
  const amount = watch("amount");

  const state = useStakeLpToken({
    token,
    amount,
    onBroadcasting: (txHash) => {
      resetForm();
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "stakeLp",
        },
      });
    },
    onError: () => {
      resetForm();
    },
  });

  const { reset, submit } = state;

  const resetForm = useCallback(() => {
    setShowConfirm(false);
    methods.reset();
    reset();
  }, [reset, methods]);

  if (state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        {!showConfirm && (
          <StakeFormInitial
            state={state}
            type={type}
            onTypeClick={onTypeClick}
            isChartOpen={isChartOpen}
            onChartClick={onChartClick}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            title="Confirm Staking LP Token"
            actionLabel="Confirm Staking LP Token"
            contentComponent={
              <FormSummary
                label="You are staking"
                tokens={[{ asset: token, amount }]}
              />
            }
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default StakeForm;
