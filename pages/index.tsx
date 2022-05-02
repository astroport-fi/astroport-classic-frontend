import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Swap from "components/pages/Swap";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Swap />
    </>
  );
};

export default DashboardPage;
