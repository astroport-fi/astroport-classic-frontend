import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { NextLink } from "modules/common";
import { useProposals, GovProposalDash } from "modules/governance";

const GovPageProposals = () => {
  const { status } = useWallet();
  const proposals = useProposals();

  return (
    <Box my="24" color="white">
      <Flex px="2" mb="6" justify="space-between" align="center">
        <Heading fontSize="xl">Assembly Proposals</Heading>
        <NextLink
          href="/governance/new-proposal"
          passHref
          isDisabled={status === WalletStatus.WALLET_NOT_CONNECTED}
        >
          <Button
            borderRadius="md"
            variant="primary"
            isDisabled={status === WalletStatus.WALLET_NOT_CONNECTED}
          >
            Submit Proposal
          </Button>
        </NextLink>
      </Flex>
      {proposals?.length > 0 && <GovProposalDash proposals={proposals} />}
      {proposals?.length === 0 && (
        <Text my="50px" color="whiteAlpha.500" textAlign="center">
          No active proposals
        </Text>
      )}
    </Box>
  );
};

export default GovPageProposals;
