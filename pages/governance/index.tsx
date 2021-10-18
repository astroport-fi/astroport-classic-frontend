import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Governance from "components/pages/Governance";

const GovernancePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Governance />
    </>
  );
};

export default GovernancePage;
