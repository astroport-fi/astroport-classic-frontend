import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Pools from "components/pages/Pools";
import HideOnMobile from "components/common/HideOnMobile";

const DashboardPage: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      <Pools />
    </HideOnMobile>
  );
};

export default DashboardPage;
