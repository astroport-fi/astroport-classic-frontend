import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import Airdrop from "components/pages/Airdrop";

const AirdropPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Airdrop />
    </>
  );
};

export default AirdropPage;
