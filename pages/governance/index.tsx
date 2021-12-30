import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { GovernancePage } from "modules/governance";

const Governance: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <GovernancePage />
    </>
  );
};

export default Governance;
