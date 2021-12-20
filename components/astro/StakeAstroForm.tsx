import React, { FC, useCallback, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { chakra, Text, useToast } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { TxStep } from "@arthuryeti/terra";

import { useAstro } from "modules/astro";
import { AstroFormType } from "types/common";
import { useContracts, useTokenInfo } from "modules/common";

import StakeAstroFormInitial from "components/astro/StakeAstroFormInitial";
import FormLoading from "components/common/FormLoading";
import FormSummary from "components/common/FormSummary";
import FormSuccess from "components/common/FormSuccess";
import FormConfirm from "components/common/FormConfirm";
import FormError from "components/common/FormError";
import TransactionNotification from "components/notifications/Transaction";

type FormValue = {
  amount: string;
  token: string;
};

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
};

const StakeAstroForm: FC<Props> = ({ type, setType }) => {
  const toast = useToast();
  const { getSymbol } = useTokenInfo();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { astroToken, xAstroToken } = useContracts();
  const methods = useForm<FormValue>({
    defaultValues: {
      amount: "",
      token: astroToken,
    },
  });

  const handleSuccess = useCallback(
    (txHash: string) => () => {
      queryClient.invalidateQueries(["balance", astroToken]);
      queryClient.invalidateQueries(["balance", xAstroToken]);
      showNotification(txHash);
    },
    []
  );

  const { watch, getValues, setValue, reset: resetForm } = methods;
  const { token, amount } = watch();

  const showNotification = (txHash: string) => {
    const { token } = getValues();
    if (!toast.isActive(txHash)) {
      toast({
        id: txHash,
        position: "top-right",
        duration: 9000,
        render: ({ onClose }) => (
          <TransactionNotification onClose={onClose} txHash={txHash}>
            <Text textStyle="medium">
              Stake {amount} {getSymbol(token)}
            </Text>
          </TransactionNotification>
        ),
      });
    }
  };

  // TODO: refactor to use one function for staking and unstaking
  const state = useAstro({
    type,
    amount,
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
      setValue("token", astroToken);
    }
    if (type == AstroFormType.Unstake) {
      setValue("token", xAstroToken);
    }
  }, [type, xAstroToken, astroToken, setValue]);

  const reset = () => {
    setShowConfirm(false);
    resetForm({
      amount: "",
      token: astroToken,
    });
    resetTx();
  };

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={txHash} />;
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
                token1={{ asset: token, amount }}
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
