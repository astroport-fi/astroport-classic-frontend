import React, { FC } from "react";
import { Flex, HStack, Text, IconButton, Box } from "@chakra-ui/react";

import { ProposalStatus } from "types/common";
import { getProposalStatusProperties } from "modules/governance/helpers";

type Props = {
  status: ProposalStatus;
  fontSize?: string;
};

const StatusTitle: FC<Props> = ({ status, fontSize = "sm" }) => {
  const proposalStatus = getProposalStatusProperties(status);

  return (
    <Box
      fontSize={fontSize}
      borderWidth="1px"
      borderColor={proposalStatus.color}
      px="2"
      borderRadius="md"
      bg={proposalStatus.lightColor}
      color={proposalStatus.color}
      fontWeight="500"
    >
      {proposalStatus.title}
    </Box>
  );
};

export default StatusTitle;
