import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Pool from "components/pages/Pool";
import { useAstroswap } from "modules/common";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const { pairs } = useAstroswap();

  const pair =
    pairs &&
    pairs.find(({ contract_addr }) => {
      return query?.pair === contract_addr;
    });

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>{pair != null && <Pool pair={pair} />}</Flex>
    </>
  );
};

export default PoolPage;
