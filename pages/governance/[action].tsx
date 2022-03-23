import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { ENV_DISPLAY_GOVERNANCE } from "constants/constants";

import GovStake from "components/pages/GovStake";
import HideOnMobile from "components/common/HideOnMobile";

const GovernancePage: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      {ENV_DISPLAY_GOVERNANCE && <GovStake />}
    </HideOnMobile>
  );
};

export default GovernancePage;
