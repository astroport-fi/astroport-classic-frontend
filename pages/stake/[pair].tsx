import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Stake from "components/pages/Stake";
import { useAstroswap } from "modules/common";

const StakePage: NextPage = () => {
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
      <Flex>{pair != null && <Stake pair={pair} />}</Flex>
    </>
  );
};

export default StakePage;
