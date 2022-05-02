import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";

import GovProposal from "components/pages/GovProposal";

const GovernanceProposal: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <GovProposal id={String(query["id"])} />
    </>
  );
};

export default GovernanceProposal;
