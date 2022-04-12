import React, { FC, useState, useCallback, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";

import { useContracts, useNotEnoughUSTBalanceToPayFees } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import { useProvide, Pool } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";
import ProvideFormInitial from "components/pool/provide/ProvideFormInitial";
import ProvideFormConfirm from "components/pool/provide/ProvideFormConfirm";
import FormLoading from "components/common/FormLoading";

type FormValues = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  autoStake: boolean;
};

type Props = {
  pool: Pool;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: (v: ProvideFormMode) => void;
  onTypeClick: (v: PoolFormType) => void;
};

const ProvideForm: FC<Props> = ({
  pool,
  mode,
  onModeClick,
  type,
  onTypeClick,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { stakableLp } = useContracts();
  const canStake = stakableLp.includes(pool.lpTokenContract);
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: pool?.token1.asset,
      amount1: "",
      token2: pool?.token2.asset,
      amount2: "",
      autoStake: canStake,
    },
  });
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  const error = useMemo(() => {
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    return false;
  }, [notEnoughUSTToPayFees]);

  const { token1, amount1, token2, amount2, autoStake } = methods.watch();

  const debouncedAmount1 = useDebounceValue(amount1, 200);
  const debouncedAmount2 = useDebounceValue(amount2, 200);

  const state = useProvide({
    contract: pool.pairContract,
    pool: pool,
    token1: token1,
    token2: token2,
    amount1: debouncedAmount1,
    amount2: debouncedAmount2,
    autoStake,
    onBroadcasting: () => {
      router.push("/pools");
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

  if (state.txHash && state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <ProvideFormInitial
            token1={token1}
            amount1={amount1}
            token2={token2}
            amount2={amount2}
            pool={pool}
            mode={mode}
            error={error}
            onModeClick={onModeClick}
            type={type}
            onTypeClick={onTypeClick}
            state={state}
            canStake={canStake}
            txFeeNotEnough={notEnoughUSTToPayFees}
            onClick={() => setShowConfirm(true)}
          />
        )}
        {showConfirm && (
          <ProvideFormConfirm
            pool={pool}
            fee={state.fee}
            txFeeNotEnough={notEnoughUSTToPayFees}
            autoStake={autoStake}
            token1={token1}
            amount1={amount1}
            token2={token2}
            amount2={amount2}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default ProvideForm;
