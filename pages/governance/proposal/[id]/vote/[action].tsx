import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";

import GovVote from "components/pages/GovVote";

const GovernanceProposal: NextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <GovVote id={String(query.id)} action={String(query.action)} />
    </>
  );
};

export default GovernanceProposal;
