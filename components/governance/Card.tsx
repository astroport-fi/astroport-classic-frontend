import React, { FC } from "react";
import { GridItem } from "@chakra-ui/react";
import { GovernanceProposal } from "types/common";

type Props = {
  proposal: GovernanceProposal;
};

const Card: FC<Props> = ({ proposal }) => {
  return (
    <GridItem
      h="300px"
      alignItems="center"
      justifyContent="center"
      display="flex"
      bg="blackAlpha.400"
    >
      {proposal.title}
    </GridItem>
  );
};

export default Card;
