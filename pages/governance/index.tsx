import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "@chakra-ui/react";

import { GovPage } from "modules/governance";

const Governance: NextPage = () => {
  return (
    <>
      <Head>
        <title>Astroport</title>
      </Head>
      <Container
        px={["3", null, "12"]}
        pt={["8", null, "24"]}
        pb={["16", null, "64"]}
        maxWidth="container.xl"
        color="white"
      >
        <GovPage />
      </Container>
    </>
  );
};

export default Governance;
