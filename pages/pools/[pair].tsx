import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTerra } from "@arthuryeti/terra";
import { Flex } from "@chakra-ui/react";

import Pool from "components/pages/Pool";
import { Pair } from "types/common";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const { pairs } = useTerra();

  const pair: Pair = pairs.find(({ contract }) => {
    return query?.pair === contract;
  });

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Pool pair={pair} />
      </Flex>
    </>
  );
};

export default PoolPage;
