import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import {
  TxStep,
  useAstroswap,
  useNotEnoughUSTBalanceToPayFees,
} from "modules/common";
import { useUnlock, useLockedLpAmount } from "modules/lockdrop";

import FormLoading from "components/common/FormLoading";
import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";
import UnlockFormInitial from "components/lockdrop/unlock/UnlockFormInitial";
import num from "libs/num";

type FormValues = {
  token: string;
  amount: number;
};

type Props = {
  lpToken: string;
  duration: number;
  astroLpToken: string;
};

const UnlockForm: FC<Props> = ({ lpToken, duration, astroLpToken }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { addNotification } = useAstroswap();
  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues: {
      token: astroLpToken,
    },
  });
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  const error = useMemo(() => {
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    return false;
  }, [notEnoughUSTToPayFees]);

  const { watch, setValue, handleSubmit } = methods;

  const { token, amount } = watch();

  const stakedAmount = useLockedLpAmount(lpToken, duration);
  const state = useUnlock({
    token: lpToken,
    astroLpToken,
    amount,
    duration: +duration,
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

  useEffect(() => {
    if (!num(stakedAmount).eq(amount)) {
      setValue("amount", stakedAmount);
    }
  }, [stakedAmount]);

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
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        {!showConfirm && (
          <UnlockFormInitial
            state={state}
            duration={duration}
            error={error}
            txFeeNotEnough={notEnoughUSTToPayFees}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
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
