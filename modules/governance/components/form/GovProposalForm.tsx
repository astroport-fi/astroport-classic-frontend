import React, { useCallback, useState, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { useEstimateFee } from "@arthuryeti/terra";

import {
  useContracts,
  useNotEnoughUSTBalanceToPayFees,
  useTx,
} from "modules/common";
import {
  GovProposalFormInitial,
  GovProposalFormConfirm,
} from "modules/governance";
import {
  useAstroMintRatio,
  useConfig,
  useCreateProposal,
  useGovStakingBalances,
} from "modules/governance/hooks";
import { GovernanceProposal } from "types/common";
import FormLoading from "components/common/FormLoading";
import useDebounceValue from "hooks/useDebounceValue";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

const GovProposalForm = () => {
  const { astroToken } = useContracts();
  const router = useRouter();
  const proposalConfig = useConfig();
  const { xAstroBalance } = useGovStakingBalances();
  const astroMintRatio = useAstroMintRatio();
  const astroPrice = useTokenPriceInUstWithSimulate(astroToken);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const methods = useForm<GovernanceProposal>();
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();
  const formProposal = methods.watch();
  const { msgs } = useCreateProposal({
    amount: proposalConfig?.proposal_required_deposit,
    proposal: formProposal,
  });
  const xAstroPrice = astroMintRatio ? astroPrice * astroMintRatio : null;

  // Limit fee calculations to once every 1000ms
  const debouncedMsg = useDebounceValue(msgs, 1000);

  const { fee, isLoading: feeIsLoading } = useEstimateFee({
    msgs: debouncedMsg,
  });

  const { submit } = useTx({
    notification: {
      type: "createProposal",
    },
    onPosting: () => {
      setIsPosting(true);
    },
    onBroadcasting: (txHash) => {
      setIsPosting(false);
      router.push("/governance");
    },
    onError: () => {
      setIsPosting(false);
    },
  });

  const onFormSubmit = useCallback(() => {
    submit({
      msgs,
      fee,
    });
  }, [msgs, fee]);

  if (isPosting) {
    return <FormLoading />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form
        onSubmit={methods.handleSubmit(() => {
          if (showConfirm === true) {
            onFormSubmit();
          } else if (Object.keys(methods.formState.errors).length === 0) {
            setShowConfirm(true);
          }
        })}
        width="full"
      >
        {!showConfirm && (
          <GovProposalFormInitial
            fee={fee}
            txFeeNotEnough={notEnoughUSTToPayFees}
            feeIsLoading={feeIsLoading}
            xAstroPrice={xAstroPrice}
            xAstroRequired={proposalConfig?.proposal_required_deposit}
            xAstroBalance={xAstroBalance}
            inputErrors={methods.formState.errors}
            methods={methods}
          />
        )}
        {showConfirm && (
          <GovProposalFormConfirm
            proposal={formProposal}
            fee={fee}
            xAstroPrice={xAstroPrice}
            xAstroRequired={proposalConfig?.proposal_required_deposit}
            onCloseClick={() => {
              setShowConfirm(false);
            }}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default GovProposalForm;
