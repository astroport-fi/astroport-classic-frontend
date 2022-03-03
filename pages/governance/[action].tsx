import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { ENV_DISPLAY_GOVERNANCE } from "constants/constants";

import GovStake from "components/pages/GovStake";

const GovernancePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      {ENV_DISPLAY_GOVERNANCE && <GovStake />}
    </>
  );
};

export default GovernancePage;
