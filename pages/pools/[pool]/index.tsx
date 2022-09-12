import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import Pool from "components/pages/Pool";
import { useAstroswap } from "modules/common";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const poolAddress = query["pool"]?.toString();
  const lpTokenAddress = query["lp_address"]?.toString();
  const { pools } = useAstroswap();

  const pool =
    pools &&
    pools.find(({ pool_address }) => {
      return pool_address === poolAddress;
    });

  if (!poolAddress) return null;

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Pool
        poolAddress={poolAddress}
        lpTokenAddress={pool?.lp_address || lpTokenAddress}
      />
    </>
  );
};

export default PoolPage;
