import React from "react";
import { VStack, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AirdropCheck from "components/AirdropCheck";
import AirdropResult from "components/AirdropResult";

const Airdrop = () => {
  const router = useRouter();
  const address = router.query.address as string;

  const renderContent = () => {
    if (address) {
      return <AirdropResult />;
    }

    return <AirdropCheck />;
  };

  return (
    <VStack my="12" spacing="10">
      <Container px={["6", null, "12"]} maxWidth="container.md">
        {renderContent()}
      </Container>
    </VStack>
  );
};

export default Airdrop;
