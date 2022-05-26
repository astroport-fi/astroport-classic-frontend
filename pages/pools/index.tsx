import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Pools from "components/pages/Pools";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Pools />
    </>
  );
};

export default DashboardPage;
