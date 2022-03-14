import React from "react";
import Head from "next/head";
import { NextPage } from "next";

// import Swap from "components/pages/Swap";
import Airdrop from "components/pages/Airdrop";
import HideOnMobile from "components/common/HideOnMobile";

const AirdropPage: NextPage = () => {
  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      <Airdrop />
    </HideOnMobile>
  );
};

export default AirdropPage;
