import React from "react";
import Head from "next/head";
import { NextPage } from "next";

// import Swap from "components/pages/Swap";
import Airdrop from "components/pages/Airdrop";

const AirdropPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Airdrop />
      {/* <Swap /> */}
      {/* <Dashboard /> */}
    </>
  );
};

export default AirdropPage;
