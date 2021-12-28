import React, { FC, useState, useCallback, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, num } from "@arthuryeti/terra";

import { useUnlock, useLockedLpAmount } from "modules/lockdrop";

import FormLoading from "components/common/FormLoading";
import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";
import UnlockFormInitial from "components/lockdrop/unlock/UnlockFormInitial";
import { ONE_TOKEN } from "constants/constants";

type FormValues = {
  token: string;
  amount: string;
};

type Props = {
  lpToken: string;
  duration: number;
};

const UnlockForm: FC<Props> = ({ lpToken, duration }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      token: lpToken,
      amount: "",
    },
  });

  const { watch, setValue, handleSubmit } = methods;

  const { token, amount } = watch();

  const stakedAmount = useLockedLpAmount(token, duration);
  const state = useUnlock({ token, amount, duration: +duration });

  const submit = async () => {
    state.submit();
  };

  useEffect(() => {
    if (!num(stakedAmount).div(ONE_TOKEN).eq(amount)) {
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
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            actionLabel="Confirm Unlocking LP Token"
            contentComponent={
              <FormSummary
                label="You'll unlock"
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

export default UnlockForm;
