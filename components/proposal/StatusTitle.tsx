import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Proposal_Status } from "types/common";
import { PROPOSAL_STATE_COLORS } from "constants/proposals";

type Props = {
  state: Proposal_Status;
  fontSize?: string;
};

const StatusTitle: FC<Props> = ({ state, fontSize = "sm" }) => {
  const proposalStatus = PROPOSAL_STATE_COLORS[state];

  return (
    <Box
      fontSize={fontSize}
      borderColor={proposalStatus?.color || ""}
      bg={proposalStatus?.lightColor || ""}
      color={proposalStatus?.color || ""}
      px="2"
      borderWidth="1px"
      borderRadius="md"
      fontWeight="500"
    >
      {proposalStatus?.title}
    </Box>
  );
};

export default StatusTitle;
