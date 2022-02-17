import React, { FC } from "react";
import { Fee } from "@terra-money/terra.js";

import FormConfirm from "components/common/FormConfirm";
import FormSummary from "components/governance/FormSummary";

import { GovernanceProposal } from "types/common";

type Props = {
  fee: Fee;
  proposal: GovernanceProposal;
  onCloseClick: () => void;
};

const GovProposalFormConfirm: FC<Props> = ({ fee, proposal, onCloseClick }) => {
  return (
    <FormConfirm
      maxW="540px"
      fee={fee}
      title="Submit Proposal"
      actionLabel="Submit Proposal"
      buttonVariant="primarywhite"
      buttonRadius="md"
      contentComponent={<FormSummary proposal={proposal} />}
      details={null}
      onCloseClick={onCloseClick}
    />
  );
};

export default GovProposalFormConfirm;
