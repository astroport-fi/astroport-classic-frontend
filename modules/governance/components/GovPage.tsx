import React from "react";
import { Box } from "@chakra-ui/react";

import GovPageStake from "./GovPageStake";
import GovPageProposals from "./GovPageProposals";

const GovPage = () => {
  return (
    <Box mt="24">
      <GovPageStake />
      <GovPageProposals />
    </Box>
  );
};

export default GovPage;
