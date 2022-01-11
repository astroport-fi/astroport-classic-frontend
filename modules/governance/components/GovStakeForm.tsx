import React, { FC, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TxStep, useTx, useEstimateFee } from "@arthuryeti/terra";

import { AstroFormType } from "types/common";
import { useContracts, useAstroswap } from "modules/common";
import { useGovStake } from "../hooks";

import GovStakeFormInitial from "./GovStakeFormInitial";
import FormLoading from "components/common/FormLoading";
// import FormSummary from "components/common/FormSummary";
// import FormConfirm from "components/common/FormConfirm";

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
  const [isPosting, setIsPosting] = useState(false);
  const { addNotification } = useAstroswap();
  const router = useRouter();

  const methods = useForm<FormValue>({
    defaultValues: {
      amount: "",
      token: astroToken,
    },
  });

  const { watch, setValue } = methods;
  const { amount } = watch();

  const { msgs } = useGovStake({
    type,
    amount,
  });

  const { submit, txHash } = useTx({
    onPosting: () => {
      setIsPosting(true);
    },
    onBroadcasting: (txHash) => {
      setIsPosting(false);
      const txType = type == AstroFormType.Stake ? "govStake" : "govUnstake";

      router.push("/staking");
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType,
        },
      });
    },
    onError: () => {
      setIsPosting(false);
    },
  });

  const { fee, isLoading: feeIsLoading } = useEstimateFee({
    msgs,
  });

  const onSubmit = useCallback(() => {
    submit({
      msgs,
      fee,
    });
  }, [msgs, fee]);

  useEffect(() => {
    if (type == AstroFormType.Stake) {
      setValue("token", astroToken);
    }
    if (type == AstroFormType.Unstake) {
      setValue("token", xAstroToken);
    }

    setValue("amount", "");
  }, [type, xAstroToken, astroToken, setValue]);

  if (isPosting) {
    return <FormLoading txHash={txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(onSubmit)} width="full">
        <GovStakeFormInitial
          type={type}
          setType={setType}
          amount={amount}
          isLoading={feeIsLoading}
          fee={fee}
        />
      </chakra.form>
    </FormProvider>
  );
};

export default GovStakeForm;
