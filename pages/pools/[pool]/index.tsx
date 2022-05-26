import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import Pool from "components/pages/Pool";
import { useAstroswap } from "modules/common";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const { pools } = useAstroswap();

  const pool =
    pools &&
    pools.find(({ pool_address }) => {
      return query["pool"] === pool_address;
    });

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      {pool != null && <Pool pool={pool} />}
    </>
  );
};

export default PoolPage;
