import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Astro from "components/pages/Astro";

const GovernancePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Astro />
    </>
  );
};

export default GovernancePage;
