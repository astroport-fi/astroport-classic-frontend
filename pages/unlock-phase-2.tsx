import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container, Box } from "@chakra-ui/react";

import UnlockForm from "components/auction/unlock/UnlockForm";

const UnlockPhase2: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container pt="12">
        <Box w="container.sm">
          <UnlockForm />
        </Box>
      </Container>
    </>
  );
};

export default UnlockPhase2;
