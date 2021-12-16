import React from "react";
import { VStack, Container, Link } from "@chakra-ui/react";

import Notification from "components/Notification";
import AstroAirdrop from "components/AstroAirdrop";

const Airdrop = () => {
  return (
    <VStack my="12" spacing="10">
      {/* <Container px={["6", null, "12"]} maxWidth="container.xl">
        <Notification variant="info">
          You can claim 3,000 ASTRO in your rewards center.{" "}
          <Link>Learn More</Link>
        </Notification>
      </Container> */}
      <Container px={["6", null, "12"]} maxWidth="container.md">
        <AstroAirdrop />
      </Container>
    </VStack>
  );
};

export default Airdrop;
