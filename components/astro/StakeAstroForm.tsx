import React, { FC, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { chakra } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { TxStep } from "@arthuryeti/terra";

import { useAstro } from "modules/astro";
import { AstroFormType } from "types/common";
import { useContracts } from "modules/common";

import StakeAstroFormInitial from "components/astro/StakeAstroFormInitial";
import FormLoading from "components/common/FormLoading";
import FormSummary from "components/common/FormSummary";
import FormSuccess from "components/common/FormSuccess";
import FormConfirm from "components/common/FormConfirm";
import FormError from "components/common/FormError";

type FormValue = {
  token: {
    amount: string;
    asset: string;
  };
};

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
};

const StakeAstroForm: FC<Props> = ({ type, setType }) => {
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { astroToken, xAstroToken } = useContracts();
  const methods = useForm<FormValue>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: astroToken,
      },
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries(["balance", astroToken]);
    queryClient.invalidateQueries(["balance", xAstroToken]);
  };

  const { watch, setValue, reset: resetForm } = methods;
  const token = watch("token");

  // TODO: refactor to use one function for staking and unstaking
  const state = useAstro({
    type,
    amount: token.amount,
    onSuccess: handleSuccess,
  });

  const { reset: resetTx, txHash, txStep } = state;

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  useEffect(() => {
    if (type == AstroFormType.Stake) {
      setValue("token.asset", astroToken);
    }
    if (type == AstroFormType.Unstake) {
      setValue("token.asset", xAstroToken);
    }
  }, [type, xAstroToken, astroToken, setValue]);

  const reset = () => {
    setShowConfirm(false);
    resetForm({
      token: {
        amount: undefined,
        asset: astroToken,
      },
    });
    resetTx();
  };

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={txHash} />;
  }

  if (txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={<FormSummary label1="Staking Astro" token1={token} />}
        details={[{ label: "Price Impact", value: "0.02%" }]}
        onCloseClick={reset}
      />
    );
  }

  if (txStep == TxStep.Failed) {
    return (
      <FormError
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua."
        onCloseClick={reset}
        onClick={reset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(state.submit)} width="full">
        {!showConfirm && (
          <StakeAstroFormInitial
            type={type}
            setType={setType}
            token={token}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            actionLabel={
              type === AstroFormType.Stake
                ? "Confirm Staking"
                : "Confirm Unstaking"
            }
            fee={state.fee}
            contentComponent={
              <FormSummary
                label1={
                  type === AstroFormType.Stake
                    ? "You are staking:"
                    : "You are receiving:"
                }
                token1={token}
              />
            }
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default StakeAstroForm;
