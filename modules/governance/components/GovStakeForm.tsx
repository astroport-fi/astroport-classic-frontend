import React, { FC, useCallback, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TxStep } from "@arthuryeti/terra";

import { AstroFormType } from "types/common";
import { useContracts, useAstroswap } from "modules/common";
import { useGovStake } from "../hooks";

import GovStakeFormInitial from "./GovStakeFormInitial";
import FormLoading from "components/common/FormLoading";
import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";

type FormValue = {
  amount: string;
  token: string;
};

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
};

const GovStakeForm: FC<Props> = ({ type, setType }) => {
  const { astroToken, xAstroToken } = useContracts();
  const { addNotification } = useAstroswap();
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const methods = useForm<FormValue>({
    defaultValues: {
      amount: "",
      token: astroToken,
    },
  });

  const { watch, setValue } = methods;
  const { token, amount } = watch();

  const state = useGovStake({
    type,
    amount,
    onBroadcasting: (txHash) => {
      const txType = type == AstroFormType.Stake ? "govStake" : "govUnstake";

      router.push("/governance");
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType,
        },
      });
    },
    onError: () => {
      resetForm();
    },
  });

  useEffect(() => {
    if (type == AstroFormType.Stake) {
      setValue("token", astroToken);
    }
    if (type == AstroFormType.Unstake) {
      setValue("token", xAstroToken);
    }

    setValue("amount", "");
  }, [type, xAstroToken, astroToken, setValue]);

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
      <chakra.form onSubmit={methods.handleSubmit(state.submit)} width="full">
        {!showConfirm && (
          <GovStakeFormInitial
            type={type}
            setType={setType}
            amount={amount}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            title={
              type === AstroFormType.Stake
                ? "Confirm Staking"
                : "Confirm Unstaking"
            }
            actionLabel={
              type === AstroFormType.Stake
                ? "Confirm Staking"
                : "Confirm Unstaking"
            }
            fee={state.fee}
            contentComponent={
              <FormSummary
                label={
                  type === AstroFormType.Stake
                    ? "You are staking:"
                    : "You are receiving:"
                }
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

export default GovStakeForm;
