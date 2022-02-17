import React from "react";
import { Box } from "@chakra-ui/react";

import { GovPageStake, GovPageProposals } from "modules/governance";

const GovPage = () => {
  return (
    <Box mt="24">
      <GovPageStake />
      <GovPageProposals />
    </Box>
  );
};

export default GovPage;
