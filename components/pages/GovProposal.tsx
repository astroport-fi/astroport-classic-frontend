import React, { FC } from "react";
import { Container } from "@chakra-ui/react";

import { GovProposalPage } from "modules/governance";

type Props = {
  id: string;
};

const GovProposal: FC<Props> = ({ id }) => {
  return (
    <Container
      px={["6", null, "12"]}
      maxWidth="container.lg"
      pt="12"
      pb="64"
      color="white"
    >
      <GovProposalPage id={id} />
    </Container>
  );
};

export default GovProposal;
