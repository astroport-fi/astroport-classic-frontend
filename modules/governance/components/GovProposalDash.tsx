import React, { FC } from "react";
import { Grid } from "@chakra-ui/react";

import Card from "components/governance/Card";
import { GovernanceProposal } from "types/common";

type Props = {
  proposals: GovernanceProposal[];
};

const GovProposalDash: FC<Props> = ({ proposals }) => {
  return (
    <>
      {proposals.length === 0 && "no proposals"}
      {proposals.length > 0 && (
        <Grid templateColumns={["auto", "auto", "auto", "auto auto"]} gap={8}>
          {proposals.map((proposal, i) => {
            return <Card key={i} proposal={proposal} />;
          })}
        </Grid>
      )}
    </>
  );
};

export default GovProposalDash;
