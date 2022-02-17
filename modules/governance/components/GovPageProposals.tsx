import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import Card from "components/Card";
import { NextLink } from "modules/common";
import { useProposals, GovProposalDash } from "modules/governance";

const GovPageProposals = () => {
  const proposals = useProposals();

  return (
    <Box my="24" color="white">
      <Flex px="2" mb="6" justify="space-between" align="center">
        <Heading>Active Proposals</Heading>
        <NextLink href="/governance/new-proposal" passHref>
          <Button borderRadius="md" variant="primary">
            Submit Proposal
          </Button>
        </NextLink>
      </Flex>
      <GovProposalDash proposals={proposals} />
    </Box>
  );
};

export default GovPageProposals;
