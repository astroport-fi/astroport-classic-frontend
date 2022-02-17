import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import GovProposal from "components/pages/GovProposal";

const GovernanceProposal: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <GovProposal />
    </>
  );
};

export default GovernanceProposal;
