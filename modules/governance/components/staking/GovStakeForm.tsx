import React, { FC, useCallback, useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { AstroFormType } from "types/common";
import {
  useContracts,
  useNotEnoughUSTBalanceToPayFees,
  useTx,
} from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { useGovStake, useAstroMintRatio } from "modules/governance/hooks";

import GovStakeFormInitial from "./GovStakeFormInitial";
import FormLoading from "components/common/FormLoading";
import useEstimateFee from "hooks/useEstimateFee";
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
  const astroMintRatio = useAstroMintRatio();
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  const methods = useForm<FormValue>({
    defaultValues: {
      amount: "",
      token: astroToken,
    },
  });
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  const error = useMemo(() => {
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    return false;
  }, [notEnoughUSTToPayFees]);

  const { watch, setValue } = methods;
  const { amount } = watch();
  let price = useTokenPriceInUstWithSimulate(astroToken);

  const { msgs } = useGovStake({
    type,
    amount: Number(amount),
  });

  const { submit } = useTx({
    notification: {
      type: type == AstroFormType.Stake ? "govStake" : "govUnstake",
    },
    onPosting: () => {
      setIsPosting(true);
    },
    onBroadcasting: (txHash) => {
      router.push("/governance");
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
    return <FormLoading />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(onSubmit)} width="full">
        <GovStakeFormInitial
          type={type}
          setType={setType}
          amount={amount}
          price={price}
          astroMintRatio={astroMintRatio}
          error={error}
          isLoading={feeIsLoading}
          txFeeNotEnough={notEnoughUSTToPayFees}
          fee={fee}
        />
      </chakra.form>
    </FormProvider>
  );
};

export default GovStakeForm;
