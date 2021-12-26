import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Unlock from "components/pages/Unlock";

const UnlockPage: NextPage = () => {
  const { query } = useRouter();
  const lpToken = query?.lpToken as string;
  const duration = query?.duration as string;

  if (lpToken == null || duration == null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>
        <Unlock lpToken={lpToken} duration={parseFloat(duration)} />
      </Flex>
    </>
  );
};

export default UnlockPage;
