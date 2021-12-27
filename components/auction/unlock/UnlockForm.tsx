import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep, num, toTerraAmount } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useAuctionUnlock, useUserInfo } from "modules/auction";

import FormLoading from "components/common/FormLoading";
import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/common/FormSummary";
import UnlockFormInitial from "components/auction/unlock/UnlockFormInitial";

type FormValues = {
  token: string;
  amount: string;
};

const UnlockForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      token: "terra163r28w6jlcn27mzepr6t9lgxmp5vg8305j23j2",
      amount: "",
    },
  });

  const { watch, setValue, handleSubmit } = methods;
  const { token, amount } = watch();

  const state = useAuctionUnlock({
    amount: toTerraAmount(amount),
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
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        {!showConfirm && (
          <UnlockFormInitial
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            actionLabel="Confirm Unlocking LP Token"
            contentComponent={
              <FormSummary
                label1="You'll unlock"
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

export default UnlockForm;
