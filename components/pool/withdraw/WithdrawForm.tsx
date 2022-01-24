import React, { FC, useCallback, useState, useEffect, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { TxStep, toTerraAmount } from "@arthuryeti/terra";

import useDebounceValue from "hooks/useDebounceValue";
import { PairResponse, useAstroswap, useNotEnoughUSTBalanceToPayFees } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import { useWithdraw, Pool } from "modules/pool";

import FormLoading from "components/common/FormLoading";
import WithdrawFormInitial from "components/pool/withdraw/WithdrawFormInitial";
import WithdrawFormConfirm from "components/pool/withdraw//WithdrawFormConfirm";

type FormValues = {
  amount: string;
  token: string;
};

type Props = {
  pair: PairResponse;
  pool: Pool;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: (v: ProvideFormMode) => void;
  onTypeClick: (v: PoolFormType) => void;
};

const WithdrawForm: FC<Props> = ({
  pair,
  pool,
  mode,
  type,
  onModeClick,
  onTypeClick,
}) => {
  const { addNotification } = useAstroswap();
  // const { getSymbol } = useTokenInfo();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      token: pair.liquidity_token,
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

  const { token, amount } = methods.watch();

  const debouncedAmount = useDebounceValue(amount, 500);

  const state = useWithdraw({
    contract: pair.contract_addr,
    lpToken: pair.liquidity_token,
    amount: toTerraAmount(debouncedAmount),
    onBroadcasting: (txHash) => {
      router.push("/pools");
      addNotification({
        notification: {
          type: "started",
          txHash,
          txType: "withdraw",
        },
      });
    },
    onError: () => {
      resetForm();
    },
  });

  const {
    txStep,
    withdraw,
    token1,
    token1Amount,
    token2,
    token2Amount,
    reset,
  } = state;

  const resetForm = useCallback(() => {
    setShowConfirm(false);
    methods.reset();
    reset();
  }, [reset, methods]);

  const submit = async () => {
    withdraw();
  };

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <WithdrawFormInitial
            pool={pool}
            mode={mode}
            type={type}
            onModeClick={onModeClick}
            onTypeClick={onTypeClick}
            token={token}
            error={error}
            amount={amount}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <WithdrawFormConfirm
            pool={pool}
            token1={token1}
            amount1={token1Amount}
            token2={token2}
            amount2={token2Amount}
            fee={state.fee}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default WithdrawForm;
