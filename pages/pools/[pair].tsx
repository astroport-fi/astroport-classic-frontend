import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Pool from "components/pages/Pool";
import { Flex } from "@chakra-ui/react";

const PoolPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Pool />
      </Flex>
    </>
  );
};

export default PoolPage;
