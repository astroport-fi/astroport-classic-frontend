import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import GovStake from "components/pages/GovStake";
import HideOnMobile from "components/common/HideOnMobile";

const GovernancePage: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      <GovStake />
    </HideOnMobile>
  );
};

export default GovernancePage;
