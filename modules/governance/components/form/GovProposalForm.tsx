// TO DO: handling of tx using useTx()

import React, { useState, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { Fee } from "@terra-money/terra.js";

import { useNotEnoughUSTBalanceToPayFees } from "modules/common";
import {
  GovProposalFormInitial,
  GovProposalFormConfirm,
} from "modules/governance";

import { GovernanceProposal } from "types/common";

const GovProposalForm = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<GovernanceProposal>();
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();
  const formProposal = methods.watch();

  const error = useMemo(() => {
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    return false;
  }, [notEnoughUSTToPayFees]);

  // Temporary fee example
  const fee = new Fee(500, { uusd: 45000 });

  return (
    <FormProvider {...methods}>
      <chakra.form
        onSubmit={methods.handleSubmit(() => {
          if (showConfirm === true) {
            router.push("/governance");
          } else if (Object.keys(methods.formState.errors).length === 0) {
            setShowConfirm(true);
          }
        })}
        width="full"
      >
        {!showConfirm && (
          <GovProposalFormInitial
            fee={fee}
            inputErrors={methods.formState.errors}
            methods={methods}
          />
        )}
        {showConfirm && (
          <GovProposalFormConfirm
            proposal={formProposal}
            fee={fee}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default GovProposalForm;
