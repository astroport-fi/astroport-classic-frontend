import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Flex, Box } from "@chakra-ui/react";

import UnlockForm from "components/auction/unlock/UnlockForm";

const UnlockPhase2: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Box m="0 auto" pt="6">
        <Flex justify="center">
          <Box
            maxW="650px"
            mx="6"
            mt={[25, 25, 10]}
            mb={[100, 100, 25]}
            w="full"
          >
            <UnlockForm />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default UnlockPhase2;
