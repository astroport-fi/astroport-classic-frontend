import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAstroswap } from "modules/common";

import Swap from "components/pages/Swap";

const SwapPage: NextPage = () => {
  const router = useRouter();
  const { tokens: terraTokens } = useAstroswap();

  const getTokenFromUrlParam = (
    param: string | undefined,
    defaultValue: string
  ) => {
    const token = param && terraTokens?.[param]?.token;
    return token ?? defaultValue;
  };

  const token1 = getTokenFromUrlParam(router.query.to?.toString(), "uluna");
  const token2 = getTokenFromUrlParam(router.query.to?.toString(), "uusd");

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Swap />
    </>
  );
};

export default SwapPage;
