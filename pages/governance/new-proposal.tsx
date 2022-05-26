import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Box, Flex } from "@chakra-ui/react";

import { GovProposalForm } from "modules/governance";

const GovNewProposalPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Box m="0 auto" pt="6">
        <Flex justify="center">
          <Box maxW="650px" mt={[15, 15, 10]} mb={[100, 100, 25]} w="full">
            <GovProposalForm />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default GovNewProposalPage;
