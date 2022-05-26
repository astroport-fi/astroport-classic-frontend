import React, { FC, useState, useCallback, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuctionUnlock } from "modules/auction";
import {
  TxStep,
  useContracts,
  useNotEnoughUSTBalanceToPayFees,
} from "modules/common";
import FormLoading from "components/common/FormLoading";
import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";
import UnlockFormInitial from "components/auction/unlock/UnlockFormInitial";
import { toTerraAmount } from "libs/terra";

type FormValues = {
  token: string;
  amount: string;
};

const UnlockForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { astroUstLpToken } = useContracts();

  const methods = useForm<FormValues>({
    defaultValues: {
      token: astroUstLpToken,
      amount: "",
    },
  });
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  const error = useMemo(() => {
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    return false;
  }, [notEnoughUSTToPayFees]);

  const { watch, handleSubmit } = methods;
  const { token, amount } = watch();

  const state = useAuctionUnlock({
    amount: toTerraAmount(amount),
    onBroadcasting: () => {
      router.push("/locked-liquidity");
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
    return <FormLoading txHash={state.txHash || ""} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        {!showConfirm && (
          <UnlockFormInitial
            state={state}
            error={error}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            txFeeNotEnough={notEnoughUSTToPayFees}
            title="Confirm Unlocking LP Tokens"
            actionLabel="Confirm Unlocking LP Tokens"
            contentComponent={
              <FormSummary
                label="You'll unlock"
                tokens={[{ asset: token, amount, isLp: true }]}
              />
            }
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default UnlockForm;
