import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";

import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/governance/FormSummary";

import { GovernanceProposal } from "types/common";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  fee: Fee;
  xAstroPrice?: number;
  xAstroRequired?: string;
  proposal: GovernanceProposal;
  onCloseClick: () => void;
};

const GovProposalFormConfirm: FC<Props> = ({
  fee,
  xAstroPrice,
  xAstroRequired,
  proposal,
  onCloseClick,
}) => {
  const xAstroRequiredTokens = Number(xAstroRequired) / ONE_TOKEN || null;

  return (
    <FormConfirm
      maxW="540px"
      fee={fee}
      title="Submit Proposal"
      titleLarge={true}
      actionLabel="Submit Proposal"
      buttonVariant="primarywhite"
      buttonRadius="md"
      buttonSize="md"
      contentComponent={
        <FormSummary
          proposal={proposal}
          xAstroRequiredTokens={xAstroRequiredTokens}
          xAstroPrice={xAstroPrice}
        />
      }
      details={null}
      onCloseClick={onCloseClick}
    />
  );
};

export default GovProposalFormConfirm;
