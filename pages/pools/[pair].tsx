import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Pool from "components/pages/Pool";

const PoolPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Pool />
    </>
  );
};

export default PoolPage;
