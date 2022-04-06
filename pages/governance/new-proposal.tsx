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
      <Flex>
        <Box m="0 auto" py="12">
          <Flex gridGap="8">
            <Box w="container.sm">
              <GovProposalForm />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default GovNewProposalPage;
