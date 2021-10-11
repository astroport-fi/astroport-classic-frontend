import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Swap from "components/pages/Swap";
// import Dashboard from "components/pages/Dashboard";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Swap />
      {/* <Dashboard /> */}
    </>
  );
};

export default DashboardPage;
