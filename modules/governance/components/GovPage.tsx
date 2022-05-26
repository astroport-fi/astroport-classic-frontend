import React from "react";
import { GovPageStake, GovPageProposals } from "modules/governance";

const GovPage = () => {
  return (
    <>
      <GovPageStake />
      <GovPageProposals />
    </>
  );
};

export default GovPage;
