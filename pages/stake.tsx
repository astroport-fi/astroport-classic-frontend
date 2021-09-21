import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Stake from "components/pages/Stake";

const SalePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>

      <Stake />
    </>
  );
};

export default SalePage;
