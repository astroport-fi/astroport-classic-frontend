import React, { useMemo } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAstroswap } from "modules/common";

import Swap from "components/pages/Swap";

const SwapPage: NextPage = () => {
  const { query } = useRouter();
  const { tokens } = useAstroswap();

  const getTokenFromUrlParam = (
    param: string | undefined,
    defaultValue: string
  ) => {
    const token = param && tokens?.[param]?.token;
    return token ?? defaultValue;
  };

  const [token1, token2] = useMemo(() => {
    return [
      getTokenFromUrlParam(query["from"]?.toString(), "uusd"),
      getTokenFromUrlParam(query["to"]?.toString(), "uluna"),
    ];
  }, [query]);

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Swap token1={token1} token2={token2} />
    </>
  );
};

export default SwapPage;
