import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import GovVote from "components/pages/GovVote";

const GovernanceProposal: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <GovVote />
    </>
  );
};

export default GovernanceProposal;
